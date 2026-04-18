from django.utils.translation import activate
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    AboutBlock,
    AboutSection,
    BannerSlide,
    BusinessCategory,
    BusinessField,
    ContactSubmission,
    CoreValue,
    HistoryItem,
    HumanResources,
    LeaderMessage,
    LeadershipMember,
    ManagementSystem,
    NewsArticle,
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
)
from .serializers import (
    AboutPageSerializer,
    BusinessFieldDetailSerializer,
    ContactPageSerializer,
    ContactSubmissionSerializer,
    HomepageSerializer,
    NewsArticleDetailSerializer,
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
        return NewsArticle.objects.filter(is_active=True)


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
        return NewsArticle.objects.filter(is_active=True)


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
