from django.utils.translation import activate
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    AboutBlock,
    AboutSection,
    AchievementGalleryItem,
    Award,
    BannerSlide,
    BusinessCategory,
    BusinessField,
    CareerCompany,
    CareersPage,
    ContactSubmission,
    CoreValue,
    CulturePhoto,
    HistoryItem,
    HumanResources,
    JobPosting,
    LeaderMessage,
    LeadershipMember,
    ManagementSystem,
    NewsArticle,
    NewsCategory,
    OrganizationChart,
    OrganizationGalleryItem,
    OrganizationOverview,
    PageSEO,
    Partner,
    ProjectCategory,
    ProjectItem,
    ResourceProject,
    ResourceProjectSection,
    ResourcesBanner,
    SiteConfig,
    StatItem,
    VideoSection,
    VisionMission,
    WorkBenefitItem,
)
from .serializers import (
    AboutPageSerializer,
    AchievementsPageSerializer,
    BusinessFieldDetailSerializer,
    CareersPageSerializer,
    ContactPageSerializer,
    ContactSubmissionSerializer,
    HomepageSerializer,
    JobApplicationSerializer,
    JobPostingDetailSerializer,
    JobPostingListSerializer,
    NewsArticleDetailSerializer,
    NewsCategorySerializer,
    NewsArticleListSerializer,
    OrganizationPageSerializer,
    PageSEOSerializer,
    ProjectsPageSerializer,
    ResourcesPageSerializer,
)


class LangMixin:
    """Activate language from ?lang= query param."""

    LANG_ALIASES = {
        "vi": "vi",
        "en": "en",
        "en-us": "en",
        "en-gb": "en",
        "zh": "zh-hans",
        "zh-cn": "zh-hans",
        "zh-hans": "zh-hans",
        "ko": "ko",
        "kr": "ko",
    }

    def get_lang(self, request):
        lang = request.query_params.get("lang", "vi").lower()
        return self.LANG_ALIASES.get(lang, "vi")

    def activate_lang(self, request):
        lang = self.get_lang(request)
        activate(lang)
        return lang


class HomepageView(LangMixin, APIView):
    """
    GET /api/pages/homepage/?lang=vi
    Returns all homepage sections in one call.
    """

    permission_classes = [AllowAny]

    def get(self, request):
        self.activate_lang(request)
        data = {
            "site_config": SiteConfig.objects.first(),
            "banners": BannerSlide.objects.filter(is_active=True),
            "about_section": AboutSection.objects.first(),
            "about_blocks": AboutBlock.objects.filter(is_active=True),
            "video_section": VideoSection.objects.first(),
            "stats": StatItem.objects.filter(is_active=True),
            "categories": BusinessCategory.objects.filter(is_active=True),
            "news": NewsArticle.objects.filter(is_active=True)[:6],
            "partners": Partner.objects.filter(is_active=True),
        }
        serializer = HomepageSerializer(data, context={"request": request})
        return Response(serializer.data)


class AboutPageView(LangMixin, APIView):
    """
    GET /api/pages/about/?lang=vi
    Returns all about page sections in one call.
    """

    permission_classes = [AllowAny]

    def get(self, request):
        self.activate_lang(request)
        data = {
            "leader_message": LeaderMessage.objects.first(),
            "history": HistoryItem.objects.filter(is_active=True),
            "core_values": CoreValue.objects.filter(is_active=True),
            "vision_mission": VisionMission.objects.first(),
            "leadership": LeadershipMember.objects.filter(is_active=True),
        }
        serializer = AboutPageSerializer(data, context={"request": request})
        return Response(serializer.data)


class OrganizationPageView(LangMixin, APIView):
    """
    GET /api/pages/organization/?lang=vi
    Returns all organization page sections in one call.
    """

    permission_classes = [AllowAny]

    def get(self, request):
        self.activate_lang(request)
        data = {
            "overview": OrganizationOverview.objects.first(),
            "chart": OrganizationChart.objects.first(),
            "gallery": OrganizationGalleryItem.objects.filter(is_active=True),
        }
        serializer = OrganizationPageSerializer(data, context={"request": request})
        return Response(serializer.data)


class NewsListView(LangMixin, ListAPIView):
    """
    GET /api/pages/news/?lang=vi
    List all published news articles.
    """

    serializer_class = NewsArticleListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        self.activate_lang(self.request)
        queryset = NewsArticle.objects.select_related("category").filter(is_active=True)
        category = self.request.query_params.get("category")
        if category and category != "all":
            queryset = queryset.filter(category__slug=category, category__is_active=True)
        return queryset


class NewsCategoryListView(LangMixin, ListAPIView):
    """
    GET /api/pages/news/categories/?lang=vi
    List active news categories.
    """

    serializer_class = NewsCategorySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        self.activate_lang(self.request)
        return NewsCategory.objects.filter(is_active=True)


class NewsDetailView(LangMixin, RetrieveAPIView):
    """
    GET /api/pages/news/<slug>/?lang=vi
    Get a single news article by slug.
    """

    serializer_class = NewsArticleDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"

    def get_queryset(self):
        self.activate_lang(self.request)
        return NewsArticle.objects.select_related("category").filter(is_active=True)


class ResourcesPageView(LangMixin, APIView):
    """
    GET /api/pages/resources/?lang=vi
    Returns all resources page sections in one call.
    """

    permission_classes = [AllowAny]

    def get(self, request):
        self.activate_lang(request)
        projects = ResourceProject.objects.filter(is_active=True)
        # Build unique provinces list
        provinces_qs = projects.values_list("province", flat=True).distinct().order_by("province")
        provinces = ["Tất cả"] + list(provinces_qs)

        data = {
            "banner": ResourcesBanner.objects.first(),
            "human_resources": HumanResources.objects.first(),
            "management_system": ManagementSystem.objects.first(),
            "projects_section": ResourceProjectSection.objects.first(),
            "projects": projects,
            "provinces": provinces,
        }
        serializer = ResourcesPageSerializer(data, context={"request": request})
        return Response(serializer.data)


class PageSEOView(LangMixin, APIView):
    """
    GET /api/pages/seo/<page_key>/?lang=vi
    Returns SEO metadata for a specific page.
    """

    permission_classes = [AllowAny]

    def get(self, request, page_key):
        self.activate_lang(request)
        try:
            seo = PageSEO.objects.get(page_key=page_key)
        except PageSEO.DoesNotExist:
            return Response(
                {"title": "", "description": "", "keywords": "", "og_image": None},
            )
        serializer = PageSEOSerializer(seo, context={"request": request})
        return Response(serializer.data)


class ProjectsPageView(LangMixin, APIView):
    """
    GET /api/pages/projects/?lang=vi
    GET /api/pages/projects/?lang=vi&category=cong-nghiep
    GET /api/pages/projects/?lang=vi&status=completed
    Returns all projects page data in one call.
    """

    permission_classes = [AllowAny]

    def get(self, request):
        self.activate_lang(request)

        projects = ProjectItem.objects.filter(is_active=True).select_related("category")

        # Filter by category slug
        category_slug = request.query_params.get("category")
        if category_slug and category_slug != "all":
            projects = projects.filter(category__slug=category_slug)

        # Filter by status
        status = request.query_params.get("status")
        if status in ("ongoing", "completed"):
            projects = projects.filter(status=status)

        data = {
            "categories": ProjectCategory.objects.all(),
            "projects": projects,
        }
        serializer = ProjectsPageSerializer(data, context={"request": request})
        return Response(serializer.data)


class BusinessFieldDetailView(LangMixin, APIView):
    """
    GET /api/pages/business-fields/<slug>/?lang=vi
    Returns a single business field page by slug.
    """

    permission_classes = [AllowAny]

    def get(self, request, slug):
        self.activate_lang(request)
        try:
            field = BusinessField.objects.get(slug=slug, is_active=True)
        except BusinessField.DoesNotExist:
            return Response({"detail": "Not found."}, status=404)
        serializer = BusinessFieldDetailSerializer(field, context={"request": request})
        return Response(serializer.data)


# ==================== CONTACT PAGE ====================
class ContactPageView(LangMixin, APIView):
    """
    GET /api/pages/contact/?lang=vi
    Returns contact info from SiteConfig.
    """

    permission_classes = [AllowAny]

    def get(self, request):
        self.activate_lang(request)
        config = SiteConfig.objects.first()
        if not config:
            return Response({
                "address_hn": "",
                "address_hcm": "",
                "phone": "",
                "email": "",
                "facebook_url": "",
                "youtube_url": "",
                "linkedin_url": "",
            })
        serializer = ContactPageSerializer(config, context={"request": request})
        return Response(serializer.data)


class ContactSubmitView(LangMixin, APIView):
    """
    POST /api/pages/contact/submit/
    Submit a contact form.
    """

    permission_classes = [AllowAny]

    SUCCESS_MESSAGES = {
        "vi": "Gửi liên hệ thành công!",
        "en": "Your message has been sent successfully!",
        "zh-hans": "您的联系信息已成功提交！",
        "ko": "문의가 성공적으로 접수되었습니다!",
    }

    def post(self, request):
        lang = self.activate_lang(request)
        serializer = ContactSubmissionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": self.SUCCESS_MESSAGES[lang], "data": serializer.data}, status=201)


class AchievementsPageView(LangMixin, APIView):
    """
    GET /api/pages/achievements/?lang=vi
    Returns awards and gallery for the achievements page.
    """

    permission_classes = [AllowAny]

    def get(self, request):
        self.activate_lang(request)
        data = {
            "awards": Award.objects.filter(is_active=True),
            "gallery": AchievementGalleryItem.objects.filter(is_active=True),
        }
        serializer = AchievementsPageSerializer(data, context={"request": request})
        return Response(serializer.data)


# ==================== CAREERS PAGE ====================
class CareersPageView(LangMixin, APIView):
    """
    GET /api/pages/careers/?lang=vi
    GET /api/pages/careers/?lang=vi&company=hop-luc-corp&province=H%C3%A0+N%E1%BB%99i&keyword=k%E1%BB%B9+s%C6%B0&page=1
    Returns page config, culture photos, benefits, companies, and paginated job list.
    """

    permission_classes = [AllowAny]
    PAGE_SIZE = 9

    def get(self, request):
        self.activate_lang(request)

        jobs = JobPosting.objects.filter(is_active=True).select_related("company")

        # -- Filters --
        company_slug = request.query_params.get("company", "").strip()
        province = request.query_params.get("province", "").strip()
        keyword = request.query_params.get("keyword", "").strip()

        if company_slug:
            jobs = jobs.filter(company__slug=company_slug)
        if province:
            jobs = jobs.filter(province__iexact=province)
        if keyword:
            jobs = jobs.filter(title__icontains=keyword)

        # -- Pagination --
        total_count = jobs.count()
        try:
            page = max(1, int(request.query_params.get("page", 1)))
        except (ValueError, TypeError):
            page = 1
        page_size = self.PAGE_SIZE
        total_pages = max(1, (total_count + page_size - 1) // page_size)
        offset = (page - 1) * page_size
        jobs_page = jobs[offset: offset + page_size]

        # -- Provinces list (all active jobs, not filtered) --
        all_provinces = (
            JobPosting.objects.filter(is_active=True)
            .exclude(province="")
            .values_list("province", flat=True)
            .distinct()
            .order_by("province")
        )

        data = {
            "page_config": CareersPage.objects.first(),
            "culture_photos": CulturePhoto.objects.filter(is_active=True),
            "benefits": WorkBenefitItem.objects.filter(is_active=True),
            "companies": CareerCompany.objects.filter(is_active=True),
            "jobs": jobs_page,
            "total_count": total_count,
            "page": page,
            "page_size": page_size,
            "total_pages": total_pages,
            "provinces": list(all_provinces),
        }
        serializer = CareersPageSerializer(data, context={"request": request})
        return Response(serializer.data)


class JobDetailView(LangMixin, APIView):
    """
    GET /api/pages/careers/<slug>/?lang=vi
    Returns full job detail + 3 related jobs from the same company.
    """

    permission_classes = [AllowAny]

    def get(self, request, slug):
        self.activate_lang(request)
        try:
            job = JobPosting.objects.select_related("company").get(slug=slug, is_active=True)
        except JobPosting.DoesNotExist:
            return Response({"detail": "Not found."}, status=404)

        # Related jobs: same company, exclude current, max 3
        related_qs = (
            JobPosting.objects.filter(is_active=True)
            .select_related("company")
            .exclude(pk=job.pk)
        )
        if job.company:
            related_qs = related_qs.filter(company=job.company)
        related = related_qs[:3]

        job_data = JobPostingDetailSerializer(job, context={"request": request}).data
        related_data = JobPostingListSerializer(related, many=True, context={"request": request}).data
        return Response({"job": job_data, "related_jobs": related_data})


class JobApplicationSubmitView(LangMixin, APIView):
    """
    POST /api/pages/careers/apply/
    Submit a job application form.
    Supports multipart/form-data for cv_file upload.
    """

    permission_classes = [AllowAny]

    SUCCESS_MESSAGES = {
        "vi": "Nộp đơn ứng tuyển thành công! Chúng tôi sẽ liên hệ với bạn sớm.",
        "en": "Your application has been submitted successfully! We will contact you soon.",
        "zh-hans": "您的申请已成功提交！我们将尽快与您联系。",
        "ko": "지원서가 성공적으로 제출되었습니다! 곧 연락드리겠습니다.",
    }

    def post(self, request):
        lang = self.activate_lang(request)
        serializer = JobApplicationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": self.SUCCESS_MESSAGES.get(lang, self.SUCCESS_MESSAGES["vi"])},
            status=201,
        )
