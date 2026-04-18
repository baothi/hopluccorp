from rest_framework import serializers

from .models import (
    AboutBlock,
    AboutSection,
    BannerSlide,
    BusinessCategory,
    BusinessField,
    BusinessFieldGallery,
    BusinessFieldService,
    Certificate,
    ContactSubmission,
    CoreValue,
    HistoryItem,
    HumanResources,
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
    StaffBreakdown,
    StatItem,
    VideoSection,
    VisionMission,
)


# ==================== HOMEPAGE ====================
class SiteConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfig
        fields = [
            "logo_header", "logo_footer", "favicon", "qr_code",
            "address_hn", "address_hcm", "phone", "email",
            "facebook_url", "youtube_url", "linkedin_url",
            "bg_stats", "bg_footer", "bg_stats_image",
        ]


class BannerSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = BannerSlide
        fields = ["id", "title", "image", "alt"]


class AboutSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSection
        fields = ["label", "title", "description", "cta_text", "cta_link"]


class AboutBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutBlock
        fields = ["id", "title", "subtitle", "image", "icon", "link"]


class VideoSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoSection
        fields = ["title", "subtitle", "youtube_id", "thumbnail"]


class StatItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatItem
        fields = ["id", "icon", "number", "suffix", "label"]


class BusinessCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessCategory
        fields = ["id", "title", "subtitle", "image", "link"]


class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = ["id", "name", "logo"]


class NewsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsCategory
        fields = ["id", "name", "slug"]


class NewsArticleListSerializer(serializers.ModelSerializer):
    """For listing news (no full content)."""

    category = NewsCategorySerializer(read_only=True)
    featured = serializers.BooleanField(source="is_featured", read_only=True)
    link = serializers.SerializerMethodField()

    class Meta:
        model = NewsArticle
        fields = [
            "id", "category", "title", "slug", "excerpt",
            "image", "featured", "published_at", "link",
        ]

    def get_link(self, obj):
        slug = obj.slug or obj.pk
        return f"/tin-tuc/{slug}"


class NewsArticleDetailSerializer(serializers.ModelSerializer):
    """Full news detail with content."""

    category = NewsCategorySerializer(read_only=True)
    featured = serializers.BooleanField(source="is_featured", read_only=True)

    class Meta:
        model = NewsArticle
        fields = [
            "id", "category", "title", "slug", "excerpt", "content",
            "image", "featured", "published_at", "created_at",
        ]


class HomepageSerializer(serializers.Serializer):
    """Aggregated homepage data — single API call for all sections."""

    site_config = SiteConfigSerializer()
    banners = BannerSlideSerializer(many=True)
    about_section = AboutSectionSerializer()
    about_blocks = AboutBlockSerializer(many=True)
    video_section = VideoSectionSerializer()
    stats = StatItemSerializer(many=True)
    categories = BusinessCategorySerializer(many=True)
    news = NewsArticleListSerializer(many=True)
    partners = PartnerSerializer(many=True)


# ==================== ABOUT PAGE ====================
class LeaderMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaderMessage
        fields = [
            "title", "subtitle", "slogan", "content",
            "leader_image", "leader_name", "leader_position", "signature_image",
        ]


class HistoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoryItem
        fields = ["id", "year", "image", "description"]


class CoreValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreValue
        fields = ["id", "icon", "title"]


class VisionMissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisionMission
        fields = [
            "vision_title", "vision_content", "vision_image",
            "mission_title", "mission_content", "mission_image",
        ]


class LeadershipMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadershipMember
        fields = ["id", "name", "position", "image"]


class AboutPageSerializer(serializers.Serializer):
    """Aggregated about page data — single API call."""

    leader_message = LeaderMessageSerializer()
    history = HistoryItemSerializer(many=True)
    core_values = CoreValueSerializer(many=True)
    vision_mission = VisionMissionSerializer()
    leadership = LeadershipMemberSerializer(many=True)


# ==================== ORGANIZATION PAGE ====================
class OrganizationOverviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationOverview
        fields = ["title", "logo", "description", "image", "download_link", "download_text"]


class OrganizationChartSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationChart
        fields = ["title", "image"]


class OrganizationGalleryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationGalleryItem
        fields = ["id", "image", "alt"]


class OrganizationPageSerializer(serializers.Serializer):
    """Aggregated organization page data — single API call."""

    overview = OrganizationOverviewSerializer()
    chart = OrganizationChartSerializer()
    gallery = OrganizationGalleryItemSerializer(many=True)


# ==================== RESOURCES PAGE ====================
class ResourcesBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourcesBanner
        fields = ["image", "alt"]


class StaffBreakdownSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffBreakdown
        fields = ["id", "role", "count"]


class HumanResourcesSerializer(serializers.ModelSerializer):
    staff_breakdown = serializers.SerializerMethodField()

    class Meta:
        model = HumanResources
        fields = ["title", "description", "image", "total_staff", "staff_breakdown"]

    def get_staff_breakdown(self, obj):
        items = StaffBreakdown.objects.filter(is_active=True)
        return StaffBreakdownSerializer(items, many=True).data


class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = ["id", "name", "title", "image"]


class ManagementSystemSerializer(serializers.ModelSerializer):
    certificates = serializers.SerializerMethodField()

    class Meta:
        model = ManagementSystem
        fields = ["title", "description", "slogan", "certificates"]

    def get_certificates(self, obj):
        items = Certificate.objects.filter(is_active=True)
        return CertificateSerializer(items, many=True).data


class ResourceProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceProject
        fields = ["id", "name", "location", "province"]


class ResourceProjectSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceProjectSection
        fields = ["title", "total_projects", "background_image"]


class ResourcesPageSerializer(serializers.Serializer):
    """Aggregated resources page data — single API call."""

    banner = ResourcesBannerSerializer()
    human_resources = HumanResourcesSerializer()
    management_system = ManagementSystemSerializer()
    projects_section = ResourceProjectSectionSerializer()
    projects = ResourceProjectSerializer(many=True)
    provinces = serializers.ListField(child=serializers.CharField())


# ==================== SEO ====================
class PageSEOSerializer(serializers.ModelSerializer):
    og_image = serializers.SerializerMethodField()

    class Meta:
        model = PageSEO
        fields = ["page_key", "title", "description", "keywords", "og_image"]

    def get_og_image(self, obj):
        if obj.og_image:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.og_image.url)
            return obj.og_image.url
        return ""


# ==================== PROJECTS PAGE ====================
class ProjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCategory
        fields = ["id", "name", "slug"]


class ProjectItemSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field="slug", read_only=True)

    class Meta:
        model = ProjectItem
        fields = [
            "id", "name", "slug", "image", "category",
            "location", "scale", "progress", "year", "status",
        ]


class ProjectsPageSerializer(serializers.Serializer):
    """Aggregated projects page data — single API call."""

    categories = ProjectCategorySerializer(many=True)
    projects = ProjectItemSerializer(many=True)


# ==================== BUSINESS FIELD PAGES ====================
class BusinessFieldServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessFieldService
        fields = ["id", "icon", "title", "description"]


class BusinessFieldGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessFieldGallery
        fields = ["id", "image", "alt"]


class BusinessFieldDetailSerializer(serializers.ModelSerializer):
    """Detail of a single business field page."""

    services = BusinessFieldServiceSerializer(many=True, source="active_services")
    gallery = BusinessFieldGallerySerializer(many=True, source="active_gallery")

    class Meta:
        model = BusinessField
        fields = [
            "id", "name", "slug",
            "banner_image", "banner_alt",
            "intro_title", "intro_description", "intro_image",
            "services", "gallery",
        ]


# ==================== CONTACT PAGE ====================
class ContactPageSerializer(serializers.ModelSerializer):
    """Thông tin liên hệ từ SiteConfig."""

    class Meta:
        model = SiteConfig
        fields = [
            "address_hn", "address_hcm", "phone", "email",
            "facebook_url", "youtube_url", "linkedin_url",
        ]


class ContactSubmissionSerializer(serializers.ModelSerializer):
    """Validate + tạo form liên hệ."""

    class Meta:
        model = ContactSubmission
        fields = ["id", "name", "email", "phone", "message", "created_at"]
        read_only_fields = ["id", "created_at"]
