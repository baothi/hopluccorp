from django import forms
from django.contrib import admin
from django.utils.html import format_html
from django_ckeditor_5.widgets import CKEditor5Widget
from modeltranslation.admin import TranslationAdmin
from ordered_model.admin import OrderedModelAdmin

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
    ContactSubmission,
    CoreValue,
    CulturePhoto,
    HistoryItem,
    HumanResources,
    JobApplication,
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


class ImagePreviewMixin:
    """Mixin to add image preview to admin."""

    def image_preview(self, obj):
        img = getattr(obj, "image", None) or getattr(obj, "logo", None)
        if img:
            return format_html(
                '<img src="{}" style="max-height:50px;max-width:80px;object-fit:cover;" />',
                img.url,
            )
        return "-"

    image_preview.short_description = "Preview"


class SingletonAdminMixin:
    """Mixin for singleton models — no add/delete."""

    def has_add_permission(self, request):
        return not self.model.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


# ========== SITE CONFIG ==========
@admin.register(SiteConfig)
class SiteConfigAdmin(SingletonAdminMixin, TranslationAdmin):
    fieldsets = (
        ("Logos", {
            "fields": ("logo_header", "logo_footer", "favicon", "qr_code"),
        }),
        ("Thông tin liên hệ", {
            "fields": ("address_hn", "address_hcm", "phone", "email"),
        }),
        ("Mạng xã hội", {
            "fields": ("facebook_url", "youtube_url", "linkedin_url"),
        }),
        ("Ảnh nền", {
            "fields": ("bg_stats", "bg_footer", "bg_stats_image"),
        }),
    )


# ========== BANNER ==========
@admin.register(BannerSlide)
class BannerSlideAdmin(ImagePreviewMixin, TranslationAdmin, OrderedModelAdmin):
    list_display = ["title", "image_preview", "is_active", "move_up_down_links"]
    list_filter = ["is_active"]


# ========== ABOUT ==========
class AboutSectionForm(forms.ModelForm):
    class Meta:
        model = AboutSection
        fields = "__all__"
        widgets = {
            "description_vi": CKEditor5Widget(config_name="simple"),
            "description_en": CKEditor5Widget(config_name="simple"),
            "description_zh_hans": CKEditor5Widget(config_name="simple"),
            "description_ko": CKEditor5Widget(config_name="simple"),
        }


@admin.register(AboutSection)
class AboutSectionAdmin(SingletonAdminMixin, TranslationAdmin):
    form = AboutSectionForm


@admin.register(AboutBlock)
class AboutBlockAdmin(ImagePreviewMixin, TranslationAdmin, OrderedModelAdmin):
    list_display = ["title", "subtitle", "image_preview", "is_active", "move_up_down_links"]
    list_filter = ["is_active"]


# ========== VIDEO ==========
@admin.register(VideoSection)
class VideoSectionAdmin(SingletonAdminMixin, TranslationAdmin):
    list_display = ["title", "youtube_id"]


# ========== STATS ==========
@admin.register(StatItem)
class StatItemAdmin(TranslationAdmin, OrderedModelAdmin):
    list_display = ["label", "number", "suffix", "is_active", "move_up_down_links"]
    list_filter = ["is_active"]


# ========== BUSINESS CATEGORIES ==========
@admin.register(BusinessCategory)
class BusinessCategoryAdmin(ImagePreviewMixin, TranslationAdmin, OrderedModelAdmin):
    list_display = ["title", "subtitle", "image_preview", "is_active", "move_up_down_links"]
    list_filter = ["is_active"]


# ========== NEWS ==========
@admin.register(NewsCategory)
class NewsCategoryAdmin(TranslationAdmin, OrderedModelAdmin):
    list_display = ["name", "slug", "is_active", "move_up_down_links"]
    list_filter = ["is_active"]
    search_fields = ["name_vi", "name_en", "name_zh_hans", "name_ko", "slug"]


class NewsArticleForm(forms.ModelForm):
    class Meta:
        model = NewsArticle
        fields = "__all__"
        widgets = {
            "content_vi": CKEditor5Widget(config_name="default"),
            "content_en": CKEditor5Widget(config_name="default"),
            "content_zh_hans": CKEditor5Widget(config_name="default"),
            "content_ko": CKEditor5Widget(config_name="default"),
        }


@admin.register(NewsArticle)
class NewsArticleAdmin(ImagePreviewMixin, TranslationAdmin):
    form = NewsArticleForm
    list_display = ["title", "category", "image_preview", "is_featured", "is_active", "published_at"]
    list_filter = ["category", "is_featured", "is_active"]
    search_fields = ["title_vi", "title_en", "title_zh_hans", "title_ko", "excerpt_vi"]

    def get_prepopulated_fields(self, request, obj=None):
        return {}


# ========== PARTNERS ==========
@admin.register(Partner)
class PartnerAdmin(TranslationAdmin, OrderedModelAdmin):
    list_display = ["name", "logo_preview", "is_active", "move_up_down_links"]
    list_filter = ["is_active"]

    def logo_preview(self, obj):
        if obj.logo:
            return format_html(
                '<img src="{}" style="max-height:50px;max-width:80px;object-fit:contain;background:#f3f4f6;padding:4px;" />',
                obj.logo.url,
            )
        return "-"

    logo_preview.short_description = "Logo"


# ==================== ABOUT PAGE ====================

# ========== LEADER MESSAGE ==========
class LeaderMessageForm(forms.ModelForm):
    class Meta:
        model = LeaderMessage
        fields = "__all__"
        widgets = {
            "content_vi": CKEditor5Widget(config_name="default"),
            "content_en": CKEditor5Widget(config_name="default"),
            "content_zh_hans": CKEditor5Widget(config_name="default"),
            "content_ko": CKEditor5Widget(config_name="default"),
        }


@admin.register(LeaderMessage)
class LeaderMessageAdmin(SingletonAdminMixin, TranslationAdmin):
    form = LeaderMessageForm
    fieldsets = (
        ("Tiêu đề", {
            "fields": ("title", "subtitle", "slogan"),
        }),
        ("Lãnh đạo", {
            "fields": ("leader_image", "leader_name", "leader_position", "signature_image"),
        }),
        ("Nội dung thư ngỏ", {
            "fields": ("content",),
        }),
    )


# ========== HISTORY ==========
@admin.register(HistoryItem)
class HistoryItemAdmin(ImagePreviewMixin, TranslationAdmin, OrderedModelAdmin):
    list_display = ["year", "image_preview", "is_active", "move_up_down_links"]
    list_filter = ["is_active"]


# ========== CORE VALUES ==========
@admin.register(CoreValue)
class CoreValueAdmin(TranslationAdmin, OrderedModelAdmin):
    list_display = ["title", "icon_preview", "is_active", "move_up_down_links"]
    list_filter = ["is_active"]

    def icon_preview(self, obj):
        if obj.icon:
            return format_html(
                '<img src="{}" style="max-height:40px;max-width:40px;border-radius:50%;object-fit:cover;" />',
                obj.icon.url,
            )
        return "-"

    icon_preview.short_description = "Icon"


# ========== VISION & MISSION ==========
class VisionMissionForm(forms.ModelForm):
    class Meta:
        model = VisionMission
        fields = "__all__"
        widgets = {
            "vision_content_vi": CKEditor5Widget(config_name="simple"),
            "vision_content_en": CKEditor5Widget(config_name="simple"),
            "vision_content_zh_hans": CKEditor5Widget(config_name="simple"),
            "vision_content_ko": CKEditor5Widget(config_name="simple"),
            "mission_content_vi": CKEditor5Widget(config_name="simple"),
            "mission_content_en": CKEditor5Widget(config_name="simple"),
            "mission_content_zh_hans": CKEditor5Widget(config_name="simple"),
            "mission_content_ko": CKEditor5Widget(config_name="simple"),
        }


@admin.register(VisionMission)
class VisionMissionAdmin(SingletonAdminMixin, TranslationAdmin):
    form = VisionMissionForm
    fieldsets = (
        ("Tầm nhìn", {
            "fields": ("vision_title", "vision_image", "vision_content"),
        }),
        ("Sứ mệnh", {
            "fields": ("mission_title", "mission_image", "mission_content"),
        }),
    )


# ========== LEADERSHIP ==========
@admin.register(LeadershipMember)
class LeadershipMemberAdmin(ImagePreviewMixin, TranslationAdmin, OrderedModelAdmin):
    list_display = ["name", "position", "image_preview", "is_active", "move_up_down_links"]
    list_filter = ["is_active"]


# ==================== ORGANIZATION PAGE ====================

# ========== ORGANIZATION OVERVIEW ==========
class OrganizationOverviewForm(forms.ModelForm):
    class Meta:
        model = OrganizationOverview
        fields = "__all__"
        widgets = {
            "description_vi": forms.Textarea(attrs={"rows": 8}),
            "description_en": forms.Textarea(attrs={"rows": 8}),
            "description_zh_hans": forms.Textarea(attrs={"rows": 8}),
            "description_ko": forms.Textarea(attrs={"rows": 8}),
        }


@admin.register(OrganizationOverview)
class OrganizationOverviewAdmin(SingletonAdminMixin, TranslationAdmin):
    form = OrganizationOverviewForm
    fieldsets = (
        ("Tiêu đề", {
            "fields": ("title",),
        }),
        ("Nội dung", {
            "fields": ("logo", "description", "image"),
        }),
        ("Tải tài liệu", {
            "fields": ("download_link", "download_text"),
        }),
    )


# ========== ORGANIZATION CHART ==========
@admin.register(OrganizationChart)
class OrganizationChartAdmin(SingletonAdminMixin, TranslationAdmin):
    fieldsets = (
        (None, {
            "fields": ("title", "image"),
            "description": "Sơ đồ tổ chức — mỗi ngôn ngữ có thể upload ảnh riêng",
        }),
    )


# ========== ORGANIZATION GALLERY ==========
@admin.register(OrganizationGalleryItem)
class OrganizationGalleryItemAdmin(ImagePreviewMixin, TranslationAdmin, OrderedModelAdmin):
    list_display = ["alt", "image_preview", "is_active", "move_up_down_links"]
    list_filter = ["is_active"]


# ==================== RESOURCES PAGE ====================

# ========== RESOURCES BANNER ==========
@admin.register(ResourcesBanner)
class ResourcesBannerAdmin(SingletonAdminMixin, ImagePreviewMixin, TranslationAdmin):
    list_display = ["__str__", "image_preview"]


# ========== HUMAN RESOURCES ==========
@admin.register(HumanResources)
class HumanResourcesAdmin(SingletonAdminMixin, TranslationAdmin):
    pass


@admin.register(StaffBreakdown)
class StaffBreakdownAdmin(TranslationAdmin, OrderedModelAdmin):
    list_display = ["role", "count", "is_active", "move_up_down_links"]
    list_filter = ["is_active"]


# ========== MANAGEMENT SYSTEM ==========
@admin.register(ManagementSystem)
class ManagementSystemAdmin(SingletonAdminMixin, TranslationAdmin):
    pass


@admin.register(Certificate)
class CertificateAdmin(ImagePreviewMixin, TranslationAdmin, OrderedModelAdmin):
    list_display = ["name", "title", "image_preview", "is_active", "move_up_down_links"]
    list_filter = ["is_active"]


# ========== PROJECTS ==========
@admin.register(ResourceProjectSection)
class ResourceProjectSectionAdmin(SingletonAdminMixin, TranslationAdmin):
    pass


@admin.register(ResourceProject)
class ResourceProjectAdmin(TranslationAdmin, OrderedModelAdmin):
    list_display = ["name", "location", "province", "is_active", "move_up_down_links"]
    list_filter = ["province", "is_active"]
    search_fields = ["name_vi", "name_en", "location_vi", "province_vi"]


# ==================== SEO METADATA ====================
@admin.register(PageSEO)
class PageSEOAdmin(TranslationAdmin):
    list_display = ["page_key", "page_name", "title", "og_preview"]
    search_fields = ["page_key", "page_name", "title_vi", "title_en"]
    readonly_fields = ["og_preview_large"]

    fieldsets = (
        ("Page", {
            "fields": ("page_key", "page_name"),
        }),
        ("SEO Content", {
            "fields": ("title", "description", "keywords"),
        }),
        ("Open Graph Image", {
            "fields": ("og_image", "og_preview_large"),
            "description": "Ảnh hiển thị khi share link trên Facebook, Zalo, LinkedIn... Kích thước khuyến nghị: 1200x630px",
        }),
    )

    def og_preview(self, obj):
        img = obj.og_image
        if img:
            return format_html(
                '<img src="{}" style="max-height:40px;max-width:70px;object-fit:cover;" />',
                img.url,
            )
        return "-"

    og_preview.short_description = "OG Image"

    def og_preview_large(self, obj):
        img = obj.og_image
        if img:
            return format_html(
                '<img src="{}" style="max-height:200px;max-width:400px;object-fit:contain;" />',
                img.url,
            )
        return "Chưa có ảnh OG"

    og_preview_large.short_description = "Preview"


# ==================== PROJECTS PAGE ====================

@admin.register(ProjectCategory)
class ProjectCategoryAdmin(TranslationAdmin):
    list_display = ["name", "slug", "project_count"]
    prepopulated_fields = {"slug": ("name",)}

    @admin.display(description="Dự án")
    def project_count(self, obj):
        return obj.projects.count()


@admin.register(ProjectItem)
class ProjectItemAdmin(ImagePreviewMixin, TranslationAdmin):
    list_display = ["name", "image_preview", "category", "location", "year", "status", "is_active"]
    list_filter = ["category", "status", "is_active", "year"]
    search_fields = ["name_vi", "name_en", "name_zh_hans", "name_ko", "location_vi"]

    def get_prepopulated_fields(self, request, obj=None):
        return {}


# ==================== BUSINESS FIELD PAGES ====================

class BusinessFieldServiceInline(admin.TabularInline):
    model = BusinessFieldService
    extra = 1
    fields = ["title", "icon", "description", "is_active", "order"]
    readonly_fields = ["order"]
    ordering = ["order"]


class BusinessFieldGalleryInline(admin.TabularInline):
    model = BusinessFieldGallery
    extra = 1
    fields = ["image", "alt", "is_active", "order"]
    readonly_fields = ["order"]
    ordering = ["order"]


@admin.register(BusinessField)
class BusinessFieldAdmin(ImagePreviewMixin, TranslationAdmin):
    list_display = ["name", "slug", "service_count", "gallery_count", "is_active"]
    list_filter = ["is_active"]
    prepopulated_fields = {"slug": ("name",)}
    inlines = [BusinessFieldServiceInline, BusinessFieldGalleryInline]
    fieldsets = (
        (None, {
            "fields": ("name", "slug", "is_active"),
        }),
        ("Banner", {
            "fields": ("banner_image", "banner_alt"),
        }),
        ("Giới thiệu", {
            "fields": ("intro_title", "intro_description", "intro_image"),
        }),
    )

    @admin.display(description="Dịch vụ")
    def service_count(self, obj):
        return obj.services.count()

    @admin.display(description="Gallery")
    def gallery_count(self, obj):
        return obj.gallery.count()

    def image_preview(self, obj):
        if obj.intro_image:
            return format_html(
                '<img src="{}" style="max-height:50px;max-width:80px;object-fit:cover;" />',
                obj.intro_image.url,
            )
        return "-"

    image_preview.short_description = "Preview"


# ==================== ACHIEVEMENTS PAGE ====================
@admin.register(Award)
class AwardAdmin(ImagePreviewMixin, TranslationAdmin):
    list_display = ["year", "title", "organization", "image_preview", "is_active", "order"]
    list_filter = ["year", "is_active"]
    list_editable = ["is_active"]
    search_fields = ["title_vi", "title_en", "organization_vi"]
    ordering = ["-year", "order"]

    def get_prepopulated_fields(self, request, obj=None):
        return {}


@admin.register(AchievementGalleryItem)
class AchievementGalleryItemAdmin(ImagePreviewMixin, TranslationAdmin, OrderedModelAdmin):
    list_display = ["alt", "image_preview", "is_active", "order", "move_up_down_links"]
    list_editable = ["is_active"]
    ordering = ["order"]


# ==================== CAREERS PAGE ====================

@admin.register(CareerCompany)
class CareerCompanyAdmin(ImagePreviewMixin, TranslationAdmin, OrderedModelAdmin):
    list_display = ["name", "slug", "image_preview", "is_active", "move_up_down_links"]
    list_editable = ["is_active"]
    prepopulated_fields = {"slug": ("name",)}
    ordering = ["order"]


@admin.register(CareersPage)
class CareersPageAdmin(SingletonAdminMixin, TranslationAdmin):
    fieldsets = (
        ("Banner", {
            "fields": ("banner_image", "banner_title"),
        }),
        ("Phần Văn hóa", {
            "fields": ("culture_video_url", "culture_title", "culture_subtitle"),
        }),
    )


@admin.register(CulturePhoto)
class CulturePhotoAdmin(ImagePreviewMixin, TranslationAdmin, OrderedModelAdmin):
    list_display = ["alt", "image_preview", "is_active", "move_up_down_links"]
    list_editable = ["is_active"]
    ordering = ["order"]


@admin.register(WorkBenefitItem)
class WorkBenefitItemAdmin(ImagePreviewMixin, TranslationAdmin, OrderedModelAdmin):
    list_display = ["title", "icon_type", "icon_text", "image_preview", "is_active", "move_up_down_links"]
    list_editable = ["is_active"]
    ordering = ["order"]
    fieldsets = (
        (None, {
            "fields": ("title", "description", "is_active"),
        }),
        ("Icon", {
            "fields": ("icon_type", "icon_text", "icon_image"),
            "description": "Chọn icon_type=text rồi điền icon_text, hoặc icon_type=image rồi upload icon_image",
        }),
    )


class JobPostingForm(forms.ModelForm):
    class Meta:
        model = JobPosting
        fields = "__all__"
        widgets = {
            "benefits_content_vi": CKEditor5Widget(config_name="default"),
            "benefits_content_en": CKEditor5Widget(config_name="default"),
            "benefits_content_zh_hans": CKEditor5Widget(config_name="default"),
            "benefits_content_ko": CKEditor5Widget(config_name="default"),
            "job_description_vi": CKEditor5Widget(config_name="default"),
            "job_description_en": CKEditor5Widget(config_name="default"),
            "job_description_zh_hans": CKEditor5Widget(config_name="default"),
            "job_description_ko": CKEditor5Widget(config_name="default"),
            "requirements_vi": CKEditor5Widget(config_name="default"),
            "requirements_en": CKEditor5Widget(config_name="default"),
            "requirements_zh_hans": CKEditor5Widget(config_name="default"),
            "requirements_ko": CKEditor5Widget(config_name="default"),
            "how_to_apply_vi": CKEditor5Widget(config_name="default"),
            "how_to_apply_en": CKEditor5Widget(config_name="default"),
            "how_to_apply_zh_hans": CKEditor5Widget(config_name="default"),
            "how_to_apply_ko": CKEditor5Widget(config_name="default"),
        }


@admin.register(JobPosting)
class JobPostingAdmin(TranslationAdmin):
    form = JobPostingForm
    list_display = ["title", "company", "quantity", "province", "is_active", "published_at", "application_count"]
    list_filter = ["company", "province", "is_active", "published_at"]
    list_editable = ["is_active"]
    search_fields = ["title_vi", "title_en", "province"]
    date_hierarchy = "published_at"
    fieldsets = (
        ("Thông tin cơ bản", {
            "fields": ("title", "company", "quantity", "province", "location_display", "is_active", "published_at"),
        }),
        ("Metadata tuyển dụng", {
            "fields": ("level", "industry", "skills", "resume_language"),
        }),
        ("Nội dung (VI)", {
            "fields": (
                "benefits_content_vi",
                "job_description_vi",
                "requirements_vi",
                "how_to_apply_vi",
            ),
            "classes": ("collapse",),
        }),
        ("Nội dung (EN)", {
            "fields": (
                "benefits_content_en",
                "job_description_en",
                "requirements_en",
                "how_to_apply_en",
            ),
            "classes": ("collapse",),
        }),
        ("Nội dung (ZH)", {
            "fields": (
                "benefits_content_zh_hans",
                "job_description_zh_hans",
                "requirements_zh_hans",
                "how_to_apply_zh_hans",
            ),
            "classes": ("collapse",),
        }),
        ("Nội dung (KO)", {
            "fields": (
                "benefits_content_ko",
                "job_description_ko",
                "requirements_ko",
                "how_to_apply_ko",
            ),
            "classes": ("collapse",),
        }),
    )

    def get_prepopulated_fields(self, request, obj=None):
        return {}

    @admin.display(description="Đơn ứng tuyển")
    def application_count(self, obj):
        count = obj.applications.count()
        return format_html(
            '<a href="/admin/pages/jobapplication/?job__id__exact={}">{} đơn</a>',
            obj.pk, count,
        )


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = [
        "fullname", "email", "phone", "position",
        "job_link", "sex", "is_read", "created_at",
    ]
    list_filter = ["is_read", "sex", "created_at", "job__company"]
    search_fields = ["fullname", "email", "phone", "position", "address"]
    readonly_fields = [
        "fullname", "email", "phone", "birthday", "sex",
        "nationality", "address", "position", "cv_file",
        "job", "created_at",
    ]
    list_editable = ["is_read"]
    ordering = ["-created_at"]

    def has_add_permission(self, request):
        return False

    @admin.display(description="Vị trí")
    def job_link(self, obj):
        if obj.job:
            return format_html(
                '<a href="/admin/pages/jobposting/{}/change/">{}</a>',
                obj.job.pk, obj.job.title,
            )
        return "— (chung)"


# ==================== CONTACT SUBMISSIONS ====================
@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "phone", "is_read", "created_at"]
    list_filter = ["is_read", "created_at"]
    search_fields = ["name", "email", "phone", "message"]
    readonly_fields = ["name", "email", "phone", "message", "created_at"]
    list_editable = ["is_read"]

    def has_add_permission(self, request):
        return False
