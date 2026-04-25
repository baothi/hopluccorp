from modeltranslation.translator import TranslationOptions, register

from .models import (
    AboutBlock,
    AboutSection,
    AchievementGalleryItem,
    Award,
    BannerSlide,
    BusinessCategory,
    BusinessField,
    BusinessFieldGallery,
    BusinessFieldService,
    CareerCompany,
    CareersPage,
    Certificate,
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
    StaffBreakdown,
    StatItem,
    VideoSection,
    VisionMission,
    WorkBenefitItem,
)


@register(SiteConfig)
class SiteConfigTranslationOptions(TranslationOptions):
    fields = ("address_hn", "address_hcm")


@register(BannerSlide)
class BannerSlideTranslationOptions(TranslationOptions):
    fields = ("title", "image", "alt")


@register(AboutSection)
class AboutSectionTranslationOptions(TranslationOptions):
    fields = ("label", "title", "description", "cta_text")


@register(AboutBlock)
class AboutBlockTranslationOptions(TranslationOptions):
    fields = ("title", "subtitle", "image")


@register(VideoSection)
class VideoSectionTranslationOptions(TranslationOptions):
    fields = ("title", "subtitle", "thumbnail", "youtube_id")


@register(StatItem)
class StatItemTranslationOptions(TranslationOptions):
    fields = ("label",)


@register(BusinessCategory)
class BusinessCategoryTranslationOptions(TranslationOptions):
    fields = ("title", "subtitle", "image")


@register(NewsArticle)
class NewsArticleTranslationOptions(TranslationOptions):
    fields = ("title", "slug", "excerpt", "content", "image")


@register(NewsCategory)
class NewsCategoryTranslationOptions(TranslationOptions):
    fields = ("name",)


@register(Partner)
class PartnerTranslationOptions(TranslationOptions):
    fields = ("name",)


# ==================== ABOUT PAGE ====================
@register(LeaderMessage)
class LeaderMessageTranslationOptions(TranslationOptions):
    fields = ("title", "subtitle", "slogan", "content", "leader_name", "leader_position")


@register(HistoryItem)
class HistoryItemTranslationOptions(TranslationOptions):
    fields = ("description",)


@register(CoreValue)
class CoreValueTranslationOptions(TranslationOptions):
    fields = ("title",)


@register(VisionMission)
class VisionMissionTranslationOptions(TranslationOptions):
    fields = ("vision_title", "vision_content", "mission_title", "mission_content")


@register(LeadershipMember)
class LeadershipMemberTranslationOptions(TranslationOptions):
    fields = ("name", "position")


# ==================== SEO ====================
@register(PageSEO)
class PageSEOTranslationOptions(TranslationOptions):
    fields = ("title", "description", "keywords", "og_image")


# ==================== ORGANIZATION PAGE ====================
@register(OrganizationOverview)
class OrganizationOverviewTranslationOptions(TranslationOptions):
    fields = ("title", "description", "download_text")


@register(OrganizationChart)
class OrganizationChartTranslationOptions(TranslationOptions):
    fields = ("title", "image")


@register(OrganizationGalleryItem)
class OrganizationGalleryItemTranslationOptions(TranslationOptions):
    fields = ("alt",)


# ==================== RESOURCES PAGE ====================
@register(ResourcesBanner)
class ResourcesBannerTranslationOptions(TranslationOptions):
    fields = ("image", "alt")


@register(HumanResources)
class HumanResourcesTranslationOptions(TranslationOptions):
    fields = ("title", "description", "total_staff")


@register(StaffBreakdown)
class StaffBreakdownTranslationOptions(TranslationOptions):
    fields = ("role",)


@register(ManagementSystem)
class ManagementSystemTranslationOptions(TranslationOptions):
    fields = ("title", "description", "slogan")


@register(Certificate)
class CertificateTranslationOptions(TranslationOptions):
    fields = ("name", "title")


@register(ResourceProjectSection)
class ResourceProjectSectionTranslationOptions(TranslationOptions):
    fields = ("title", "total_projects")


@register(ResourceProject)
class ResourceProjectTranslationOptions(TranslationOptions):
    fields = ("name", "location", "province")


# ==================== PROJECTS PAGE ====================
@register(ProjectCategory)
class ProjectCategoryTranslationOptions(TranslationOptions):
    fields = ("name",)


@register(ProjectItem)
class ProjectItemTranslationOptions(TranslationOptions):
    fields = ("name", "slug", "image", "location", "scale", "progress")


# ==================== BUSINESS FIELDS ====================
@register(BusinessField)
class BusinessFieldTranslationOptions(TranslationOptions):
    fields = ("name", "intro_title", "intro_description", "banner_alt")


@register(BusinessFieldService)
class BusinessFieldServiceTranslationOptions(TranslationOptions):
    fields = ("title", "description")


@register(BusinessFieldGallery)
class BusinessFieldGalleryTranslationOptions(TranslationOptions):
    fields = ("alt",)


# ==================== ACHIEVEMENTS PAGE ====================
@register(Award)
class AwardTranslationOptions(TranslationOptions):
    fields = ("title", "organization", "description")


@register(AchievementGalleryItem)
class AchievementGalleryItemTranslationOptions(TranslationOptions):
    fields = ("alt",)


# ==================== CAREERS PAGE ====================
@register(CareerCompany)
class CareerCompanyTranslationOptions(TranslationOptions):
    fields = ("name",)


@register(CareersPage)
class CareersPageTranslationOptions(TranslationOptions):
    fields = ("banner_title", "culture_title", "culture_subtitle")


@register(CulturePhoto)
class CulturePhotoTranslationOptions(TranslationOptions):
    fields = ("alt",)


@register(WorkBenefitItem)
class WorkBenefitItemTranslationOptions(TranslationOptions):
    fields = ("title", "description")


@register(JobPosting)
class JobPostingTranslationOptions(TranslationOptions):
    fields = (
        "title",
        "slug",
        "location_display",
        "benefits_content",
        "job_description",
        "requirements",
        "how_to_apply",
        "level",
        "industry",
        "skills",
        "resume_language",
    )
