from django.db import models
from django.utils.text import slugify
from ordered_model.models import OrderedModel


# ==================== SITE CONFIG ====================
class SiteConfig(models.Model):
    """Global site configuration (singleton)."""

    # Logos
    logo_header = models.ImageField(upload_to="site/logos/", blank=True)
    logo_footer = models.ImageField(upload_to="site/logos/", blank=True)
    favicon = models.ImageField(upload_to="site/logos/", blank=True)
    qr_code = models.ImageField(upload_to="site/", blank=True)
    # Contact
    address_hn = models.TextField(blank=True, default="")
    address_hcm = models.TextField(blank=True, default="")
    phone = models.CharField(max_length=50, blank=True, default="")
    email = models.EmailField(blank=True, default="")
    # Social
    facebook_url = models.URLField(blank=True, default="")
    youtube_url = models.URLField(blank=True, default="")
    linkedin_url = models.URLField(blank=True, default="")
    # Background images
    bg_stats = models.ImageField(upload_to="site/backgrounds/", blank=True)
    bg_footer = models.ImageField(upload_to="site/backgrounds/", blank=True)
    bg_stats_image = models.ImageField(
        upload_to="site/backgrounds/", blank=True,
        help_text="Ảnh bên phải section thống kê",
    )

    class Meta:
        db_table = "pages_site_config"
        verbose_name = "⚙ Cấu hình chung (Logo, Liên hệ, Ảnh nền)"
        verbose_name_plural = "⚙ Cấu hình chung (Logo, Liên hệ, Ảnh nền)"

    def __str__(self):
        return "Site Config"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)


# ==================== HOMEPAGE MODELS ====================
class BannerSlide(OrderedModel):
    """Homepage banner carousel slides."""

    title = models.CharField(max_length=255, blank=True, default="")
    image = models.ImageField(upload_to="pages/banners/", blank=True)
    alt = models.CharField(max_length=255, blank=True, default="")
    is_active = models.BooleanField(default=True)

    class Meta(OrderedModel.Meta):
        db_table = "pages_banner_slides"
        verbose_name = "① Banner Slide"
        verbose_name_plural = "① Banner Slides (Ảnh slider)"

    def __str__(self):
        return self.title or f"Banner #{self.order}"


class AboutBlock(OrderedModel):
    """About section cards (Lịch sử, Tầm nhìn, Giá trị cốt lõi)."""

    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, default="")
    image = models.ImageField(upload_to="pages/about/", blank=True)
    icon = models.ImageField(upload_to="pages/about/icons/", blank=True)
    link = models.CharField(max_length=255, blank=True, default="")
    is_active = models.BooleanField(default=True)

    class Meta(OrderedModel.Meta):
        db_table = "pages_about_blocks"
        verbose_name = "② About Block"
        verbose_name_plural = "② About Blocks (3 cards giới thiệu)"

    def __str__(self):
        return self.title


class AboutSection(models.Model):
    """About section main content (singleton - only 1 row)."""

    label = models.CharField(max_length=100, default="Giới thiệu")
    title = models.CharField(max_length=255, default="Hợp lực")
    description = models.TextField(blank=True, default="")
    cta_text = models.CharField(max_length=100, default="Tìm hiểu thêm")
    cta_link = models.CharField(max_length=255, default="/gioi-thieu")

    class Meta:
        db_table = "pages_about_section"
        verbose_name = "② About Section"
        verbose_name_plural = "② About Section (Nội dung giới thiệu)"

    def __str__(self):
        return "About Section"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)


class VideoSection(models.Model):
    """Featured video section (singleton)."""

    title = models.CharField(max_length=255, default="VIDEO NỔI BẬT")
    subtitle = models.CharField(max_length=500, blank=True, default="")
    youtube_id = models.CharField(max_length=50, blank=True, default="")
    thumbnail = models.ImageField(upload_to="pages/video/", blank=True)

    class Meta:
        db_table = "pages_video_section"
        verbose_name = "③ Video Section"
        verbose_name_plural = "③ Video Section (Video nổi bật)"

    def __str__(self):
        return "Video Section"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)


class StatItem(OrderedModel):
    """Statistics section items."""

    icon = models.ImageField(upload_to="pages/stats/icons/", blank=True)
    number = models.IntegerField()
    suffix = models.CharField(max_length=20, blank=True, default="")
    label = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

    class Meta(OrderedModel.Meta):
        db_table = "pages_stat_items"
        verbose_name = "④ Stat Item"
        verbose_name_plural = "④ Stat Items (Số liệu ấn tượng)"

    def __str__(self):
        return f"{self.label}: {self.number}{self.suffix}"


class BusinessCategory(OrderedModel):
    """Business sectors carousel (Tổng thầu Xây dựng, Cơ điện, etc.)."""

    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, default="")
    image = models.ImageField(upload_to="pages/categories/", blank=True)
    link = models.CharField(max_length=255, blank=True, default="")
    is_active = models.BooleanField(default=True)

    class Meta(OrderedModel.Meta):
        db_table = "pages_business_categories"
        verbose_name = "⑤ Business Category"
        verbose_name_plural = "⑤ Business Categories (Lĩnh vực hoạt động)"

    def __str__(self):
        return self.title


class Partner(OrderedModel):
    """Partner logos carousel."""

    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to="pages/partners/", blank=True)
    is_active = models.BooleanField(default=True)

    class Meta(OrderedModel.Meta):
        db_table = "pages_partners"
        verbose_name = "⑦ Partner"
        verbose_name_plural = "⑦ Partners (Đối tác)"

    def __str__(self):
        return self.name


class NewsArticle(models.Model):
    """News articles / Tin tức."""

    title = models.CharField(max_length=500)
    slug = models.SlugField(max_length=500, blank=True)
    excerpt = models.TextField(blank=True, default="", help_text="Mô tả ngắn")
    content = models.TextField(blank=True, default="")
    image = models.ImageField(upload_to="news/", blank=True)
    is_featured = models.BooleanField(default=False, help_text="Hiển thị nổi bật trên homepage")
    is_active = models.BooleanField(default=True)
    published_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "pages_news_articles"
        verbose_name = "⑥ News Article"
        verbose_name_plural = "⑥ News Articles (Tin tức)"
        ordering = ["-published_at", "-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Generate slug for each language from corresponding title
        for lang in ("vi", "en", "zh_hans", "ko"):
            title_field = f"title_{lang}"
            slug_field = f"slug_{lang}"
            title_val = getattr(self, title_field, None)
            slug_val = getattr(self, slug_field, None)
            if title_val and not slug_val:
                base_slug = slugify(title_val, allow_unicode=True)
                slug = base_slug
                counter = 1
                while NewsArticle.objects.filter(**{slug_field: slug}).exclude(pk=self.pk).exists():
                    slug = f"{base_slug}-{counter}"
                    counter += 1
                setattr(self, slug_field, slug)
        super().save(*args, **kwargs)


# ==================== ABOUT PAGE MODELS ====================
class LeaderMessage(models.Model):
    """Thông điệp lãnh đạo (singleton)."""

    title = models.CharField(max_length=100, default="Thông điệp")
    subtitle = models.CharField(max_length=100, default="LÃNH ĐẠO")
    slogan = models.CharField(max_length=500, blank=True, default="")
    content = models.TextField(blank=True, default="", help_text="Nội dung thư ngỏ (HTML)")
    leader_image = models.ImageField(upload_to="about/leader/", blank=True)
    leader_name = models.CharField(max_length=255, blank=True, default="")
    leader_position = models.CharField(max_length=255, blank=True, default="")
    signature_image = models.ImageField(upload_to="about/leader/", blank=True)

    class Meta:
        db_table = "pages_leader_message"
        verbose_name = "⑧ Thông điệp lãnh đạo"
        verbose_name_plural = "⑧ Thông điệp lãnh đạo"

    def __str__(self):
        return "Leader Message"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)


class HistoryItem(OrderedModel):
    """Lịch sử hình thành — timeline items."""

    year = models.CharField(max_length=10)
    image = models.ImageField(upload_to="about/history/", blank=True)
    description = models.TextField(blank=True, default="")
    is_active = models.BooleanField(default=True)

    class Meta(OrderedModel.Meta):
        db_table = "pages_history_items"
        verbose_name = "⑨ Lịch sử"
        verbose_name_plural = "⑨ Lịch sử hình thành (Timeline)"

    def __str__(self):
        return f"Năm {self.year}"


class CoreValue(OrderedModel):
    """Giá trị cốt lõi."""

    icon = models.ImageField(upload_to="about/core-values/", blank=True)
    title = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)

    class Meta(OrderedModel.Meta):
        db_table = "pages_core_values"
        verbose_name = "⑩ Giá trị cốt lõi"
        verbose_name_plural = "⑩ Giá trị cốt lõi"

    def __str__(self):
        return self.title


class VisionMission(models.Model):
    """Tầm nhìn & Sứ mệnh (singleton)."""

    vision_title = models.CharField(max_length=100, default="Tầm nhìn")
    vision_content = models.TextField(blank=True, default="")
    vision_image = models.ImageField(upload_to="about/vision/", blank=True)
    mission_title = models.CharField(max_length=100, default="Sứ mệnh")
    mission_content = models.TextField(blank=True, default="")
    mission_image = models.ImageField(upload_to="about/mission/", blank=True)

    class Meta:
        db_table = "pages_vision_mission"
        verbose_name = "⑪ Tầm nhìn & Sứ mệnh"
        verbose_name_plural = "⑪ Tầm nhìn & Sứ mệnh"

    def __str__(self):
        return "Vision & Mission"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)


class LeadershipMember(OrderedModel):
    """Ban lãnh đạo."""

    name = models.CharField(max_length=255)
    position = models.CharField(max_length=255, blank=True, default="")
    image = models.ImageField(upload_to="about/leadership/", blank=True)
    is_active = models.BooleanField(default=True)

    class Meta(OrderedModel.Meta):
        db_table = "pages_leadership_members"
        verbose_name = "⑫ Ban lãnh đạo"
        verbose_name_plural = "⑫ Ban lãnh đạo"

    def __str__(self):
        return self.name


# ==================== ORGANIZATION PAGE MODELS ====================
class OrganizationOverview(models.Model):
    """Tổng quan - Cơ cấu tổ chức (singleton)."""

    title = models.CharField(max_length=100, default="TỔNG QUAN")
    logo = models.ImageField(upload_to="organization/", blank=True)
    description = models.TextField(blank=True, default="")
    image = models.ImageField(upload_to="organization/", blank=True)
    download_link = models.URLField(blank=True, default="", help_text="Link tải Profile PDF")
    download_text = models.CharField(max_length=100, default="Tải tài liệu")

    class Meta:
        db_table = "pages_organization_overview"
        verbose_name = "⑬ Tổng quan (Cơ cấu tổ chức)"
        verbose_name_plural = "⑬ Tổng quan (Cơ cấu tổ chức)"

    def __str__(self):
        return "Organization Overview"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)


class OrganizationChart(models.Model):
    """Sơ đồ tổ chức (singleton)."""

    title = models.CharField(max_length=100, default="SƠ ĐỒ TỔ CHỨC")
    image = models.ImageField(upload_to="organization/chart/", blank=True)

    class Meta:
        db_table = "pages_organization_chart"
        verbose_name = "⑭ Sơ đồ tổ chức"
        verbose_name_plural = "⑭ Sơ đồ tổ chức"

    def __str__(self):
        return "Organization Chart"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)


class OrganizationGalleryItem(OrderedModel):
    """Thư viện ảnh - Cơ cấu tổ chức."""

    image = models.ImageField(upload_to="organization/gallery/", blank=True)
    alt = models.CharField(max_length=255, blank=True, default="")
    is_active = models.BooleanField(default=True)

    class Meta(OrderedModel.Meta):
        db_table = "pages_organization_gallery"
        verbose_name = "⑮ Thư viện ảnh (Cơ cấu tổ chức)"
        verbose_name_plural = "⑮ Thư viện ảnh (Cơ cấu tổ chức)"

    def __str__(self):
        return self.alt or f"Gallery #{self.order}"


# ==================== RESOURCES PAGE MODELS ====================
class ResourcesBanner(models.Model):
    """Banner trang Nguồn lực (singleton)."""

    image = models.ImageField(upload_to="resources/banner/", blank=True)
    alt = models.CharField(max_length=255, blank=True, default="")

    class Meta:
        db_table = "pages_resources_banner"
        verbose_name = "⑯ Banner (Nguồn lực)"
        verbose_name_plural = "⑯ Banner (Nguồn lực)"

    def __str__(self):
        return "Resources Banner"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)


class HumanResources(models.Model):
    """Nguồn nhân lực section (singleton)."""

    title = models.CharField(max_length=255, default="NGUỒN NHÂN LỰC")
    description = models.TextField(blank=True, default="")
    image = models.ImageField(upload_to="resources/human/", blank=True)
    total_staff = models.CharField(max_length=50, default=">1500")

    class Meta:
        db_table = "pages_human_resources"
        verbose_name = "⑰ Nguồn nhân lực"
        verbose_name_plural = "⑰ Nguồn nhân lực"

    def __str__(self):
        return "Human Resources"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)


class StaffBreakdown(OrderedModel):
    """Chi tiết nhân sự theo vai trò."""

    role = models.CharField(max_length=255)
    count = models.IntegerField()
    is_active = models.BooleanField(default=True)

    class Meta(OrderedModel.Meta):
        db_table = "pages_staff_breakdown"
        verbose_name = "⑰ Nhân sự chi tiết"
        verbose_name_plural = "⑰ Nhân sự chi tiết"

    def __str__(self):
        return f"{self.role}: {self.count}"


class ManagementSystem(models.Model):
    """Hệ thống quản lý section (singleton)."""

    title = models.CharField(max_length=255, default="HỆ THỐNG QUẢN LÝ")
    description = models.TextField(blank=True, default="")
    slogan = models.TextField(blank=True, default="")

    class Meta:
        db_table = "pages_management_system"
        verbose_name = "⑱ Hệ thống quản lý"
        verbose_name_plural = "⑱ Hệ thống quản lý"

    def __str__(self):
        return "Management System"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)


class Certificate(OrderedModel):
    """Chứng chỉ ISO."""

    name = models.CharField(max_length=255, help_text="VD: ISO 9001:2015")
    title = models.CharField(max_length=255, help_text="VD: Quản lý chất lượng")
    image = models.ImageField(upload_to="resources/certificates/", blank=True)
    is_active = models.BooleanField(default=True)

    class Meta(OrderedModel.Meta):
        db_table = "pages_certificates"
        verbose_name = "⑱ Chứng chỉ ISO"
        verbose_name_plural = "⑱ Chứng chỉ ISO"

    def __str__(self):
        return self.name


class ResourceProjectSection(models.Model):
    """Projects section meta (singleton)."""

    title = models.CharField(max_length=255, default="Dự án")
    total_projects = models.CharField(max_length=100, default="500 dự án")
    background_image = models.ImageField(upload_to="resources/projects/", blank=True)

    class Meta:
        db_table = "pages_resource_project_section"
        verbose_name = "⑲ Dự án - Cấu hình"
        verbose_name_plural = "⑲ Dự án - Cấu hình"

    def __str__(self):
        return "Resource Projects Section"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)


class ResourceProject(OrderedModel):
    """Dự án tiêu biểu."""

    name = models.CharField(max_length=500)
    location = models.CharField(max_length=255, help_text="VD: KCN Đại An mở rộng")
    province = models.CharField(max_length=100, help_text="VD: Hải Dương")
    is_active = models.BooleanField(default=True)

    class Meta(OrderedModel.Meta):
        db_table = "pages_resource_projects"
        verbose_name = "⑲ Dự án tiêu biểu"
        verbose_name_plural = "⑲ Dự án tiêu biểu"

    def __str__(self):
        return self.name


# ==================== SEO METADATA ====================
class PageSEO(models.Model):
    """SEO metadata per page — admin quản lý title, description, og:image."""

    page_key = models.CharField(
        max_length=100,
        unique=True,
        help_text="Unique key for each page, e.g. homepage, about, news, projects",
    )
    page_name = models.CharField(
        max_length=255,
        blank=True,
        default="",
        help_text="Tên hiển thị trong admin, e.g. Trang chủ, Giới thiệu",
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")
    keywords = models.CharField(max_length=500, blank=True, default="")
    og_image = models.ImageField(
        upload_to="seo/",
        blank=True,
        help_text="Ảnh hiển thị khi share link lên Facebook, Zalo, LinkedIn...",
    )

    class Meta:
        db_table = "pages_seo"
        verbose_name = "🔍 SEO Metadata"
        verbose_name_plural = "🔍 SEO Metadata"
        ordering = ["page_key"]

    def __str__(self):
        return f"SEO: {self.page_name or self.page_key}"


# ==================== PROJECTS PAGE MODELS ====================
class ProjectCategory(models.Model):
    """Danh mục dự án: Công nghiệp, Dân dụng, Hạ tầng."""

    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)

    class Meta:
        db_table = "pages_project_categories"
        verbose_name = "⑳ Danh mục dự án"
        verbose_name_plural = "⑳ Danh mục dự án"
        ordering = ["id"]

    def __str__(self):
        return self.name


class ProjectItem(models.Model):
    """Dự án."""

    STATUS_CHOICES = [
        ("ongoing", "Đang thực hiện"),
        ("completed", "Hoàn thành"),
    ]

    name = models.CharField(max_length=500)
    slug = models.SlugField(max_length=500, blank=True)
    image = models.ImageField(upload_to="projects/", blank=True)
    category = models.ForeignKey(
        ProjectCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="projects",
    )
    location = models.CharField(max_length=255, blank=True, default="", help_text="VD: Nghệ An")
    scale = models.CharField(max_length=255, blank=True, default="", help_text="VD: 1,114,060 m²")
    progress = models.TextField(blank=True, default="", help_text="VD: 08/2023 ~ 10/2024")
    year = models.CharField(max_length=10, blank=True, default="", help_text="Năm bắt đầu VD: 2023")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="ongoing")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "pages_project_items"
        verbose_name = "⑳ Dự án"
        verbose_name_plural = "⑳ Dự án"
        ordering = ["-year", "-created_at"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        for lang in ("vi", "en", "zh_hans", "ko"):
            title_field = f"name_{lang}"
            slug_field = f"slug_{lang}"
            title_val = getattr(self, title_field, None)
            slug_val = getattr(self, slug_field, None)
            if title_val and not slug_val:
                base_slug = slugify(title_val, allow_unicode=True)
                slug = base_slug
                counter = 1
                while ProjectItem.objects.filter(**{slug_field: slug}).exclude(pk=self.pk).exists():
                    slug = f"{base_slug}-{counter}"
                    counter += 1
                setattr(self, slug_field, slug)
        super().save(*args, **kwargs)


# ==================== BUSINESS FIELD PAGES ====================
class BusinessField(models.Model):
    """Trang lĩnh vực hoạt động (5 trang dùng chung 1 model).

    Mỗi row = 1 trang: Tổng thầu XD, Cơ điện, Nội thất, Vật liệu XD, CN Phụ trợ.
    """

    name = models.CharField(max_length=255, help_text="Tên lĩnh vực: VD Tổng thầu Xây dựng")
    slug = models.SlugField(max_length=255, unique=True, help_text="URL slug: VD trang-tong-thau-xay-dung")
    # Intro section
    intro_title = models.CharField(max_length=255, default="Giới thiệu chung")
    intro_description = models.TextField(blank=True, default="")
    intro_image = models.ImageField(upload_to="business-fields/intro/", blank=True)
    # Banner
    banner_image = models.ImageField(upload_to="business-fields/banners/", blank=True)
    banner_alt = models.CharField(max_length=255, blank=True, default="")
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "pages_business_fields"
        verbose_name = "㉑ Lĩnh vực hoạt động"
        verbose_name_plural = "㉑ Lĩnh vực hoạt động"
        ordering = ["id"]

    def __str__(self):
        return self.name

    @property
    def active_services(self):
        return self.services.filter(is_active=True)

    @property
    def active_gallery(self):
        return self.gallery.filter(is_active=True)


class BusinessFieldService(OrderedModel):
    """Dịch vụ của lĩnh vực hoạt động."""

    field = models.ForeignKey(
        BusinessField,
        on_delete=models.CASCADE,
        related_name="services",
    )
    icon = models.ImageField(upload_to="business-fields/services/icons/", blank=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")
    is_active = models.BooleanField(default=True)
    order_with_respect_to = "field"

    class Meta(OrderedModel.Meta):
        db_table = "pages_business_field_services"
        verbose_name = "㉑ Dịch vụ lĩnh vực"
        verbose_name_plural = "㉑ Dịch vụ lĩnh vực"

    def __str__(self):
        return f"{self.field.name} - {self.title}"


class BusinessFieldGallery(OrderedModel):
    """Ảnh gallery của lĩnh vực hoạt động."""

    field = models.ForeignKey(
        BusinessField,
        on_delete=models.CASCADE,
        related_name="gallery",
    )
    image = models.ImageField(upload_to="business-fields/gallery/", blank=True)
    alt = models.CharField(max_length=255, blank=True, default="")
    is_active = models.BooleanField(default=True)
    order_with_respect_to = "field"

    class Meta(OrderedModel.Meta):
        db_table = "pages_business_field_gallery"
        verbose_name = "㉑ Gallery lĩnh vực"
        verbose_name_plural = "㉑ Gallery lĩnh vực"

    def __str__(self):
        return self.alt or f"Gallery #{self.order}"


# ==================== CONTACT PAGE ====================
class ContactSubmission(models.Model):
    """Lưu form liên hệ từ khách hàng."""

    name = models.CharField(max_length=255, help_text="Họ tên")
    email = models.EmailField(help_text="Email liên hệ")
    phone = models.CharField(max_length=50, blank=True, default="", help_text="Số điện thoại")
    message = models.TextField(help_text="Nội dung tin nhắn")
    is_read = models.BooleanField(default=False, help_text="Đã đọc")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "pages_contact_submissions"
        verbose_name = "㉒ Liên hệ"
        verbose_name_plural = "㉒ Liên hệ"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} — {self.email} ({self.created_at:%d/%m/%Y})"
