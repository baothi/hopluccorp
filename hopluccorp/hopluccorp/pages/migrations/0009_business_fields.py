import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("pages", "0008_resources_projects_page"),
    ]

    operations = [
        migrations.CreateModel(
            name="BusinessField",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(help_text="Tên lĩnh vực: VD Tổng thầu Xây dựng", max_length=255)),
                ("slug", models.SlugField(help_text="URL slug: VD trang-tong-thau-xay-dung", max_length=255, unique=True)),
                ("intro_title", models.CharField(default="Giới thiệu chung", max_length=255)),
                ("intro_description", models.TextField(blank=True, default="")),
                ("intro_image", models.ImageField(blank=True, upload_to="business-fields/intro/")),
                ("banner_image", models.ImageField(blank=True, upload_to="business-fields/banners/")),
                ("banner_alt", models.CharField(blank=True, default="", max_length=255)),
                ("is_active", models.BooleanField(default=True)),
                # Translation fields (vi, en, zh_hans, ko)
                ("name_vi", models.CharField(help_text="Tên lĩnh vực: VD Tổng thầu Xây dựng", max_length=255, null=True)),
                ("name_en", models.CharField(help_text="Tên lĩnh vực: VD Tổng thầu Xây dựng", max_length=255, null=True)),
                ("name_zh_hans", models.CharField(help_text="Tên lĩnh vực: VD Tổng thầu Xây dựng", max_length=255, null=True)),
                ("name_ko", models.CharField(help_text="Tên lĩnh vực: VD Tổng thầu Xây dựng", max_length=255, null=True)),
                ("intro_title_vi", models.CharField(default="Giới thiệu chung", max_length=255, null=True)),
                ("intro_title_en", models.CharField(default="Giới thiệu chung", max_length=255, null=True)),
                ("intro_title_zh_hans", models.CharField(default="Giới thiệu chung", max_length=255, null=True)),
                ("intro_title_ko", models.CharField(default="Giới thiệu chung", max_length=255, null=True)),
                ("intro_description_vi", models.TextField(blank=True, default="", null=True)),
                ("intro_description_en", models.TextField(blank=True, default="", null=True)),
                ("intro_description_zh_hans", models.TextField(blank=True, default="", null=True)),
                ("intro_description_ko", models.TextField(blank=True, default="", null=True)),
                ("banner_alt_vi", models.CharField(blank=True, default="", max_length=255, null=True)),
                ("banner_alt_en", models.CharField(blank=True, default="", max_length=255, null=True)),
                ("banner_alt_zh_hans", models.CharField(blank=True, default="", max_length=255, null=True)),
                ("banner_alt_ko", models.CharField(blank=True, default="", max_length=255, null=True)),
            ],
            options={
                "verbose_name": "㉑ Lĩnh vực hoạt động",
                "verbose_name_plural": "㉑ Lĩnh vực hoạt động",
                "db_table": "pages_business_fields",
                "ordering": ["id"],
            },
        ),
        migrations.CreateModel(
            name="BusinessFieldService",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(db_index=True, editable=False, verbose_name="order")),
                ("icon", models.ImageField(blank=True, upload_to="business-fields/services/icons/")),
                ("title", models.CharField(max_length=255)),
                ("description", models.TextField(blank=True, default="")),
                ("is_active", models.BooleanField(default=True)),
                ("field", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="services", to="pages.businessfield")),
                # Translation fields
                ("title_vi", models.CharField(max_length=255, null=True)),
                ("title_en", models.CharField(max_length=255, null=True)),
                ("title_zh_hans", models.CharField(max_length=255, null=True)),
                ("title_ko", models.CharField(max_length=255, null=True)),
                ("description_vi", models.TextField(blank=True, default="", null=True)),
                ("description_en", models.TextField(blank=True, default="", null=True)),
                ("description_zh_hans", models.TextField(blank=True, default="", null=True)),
                ("description_ko", models.TextField(blank=True, default="", null=True)),
            ],
            options={
                "verbose_name": "㉑ Dịch vụ lĩnh vực",
                "verbose_name_plural": "㉑ Dịch vụ lĩnh vực",
                "db_table": "pages_business_field_services",
                "ordering": ["order"],
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="BusinessFieldGallery",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(db_index=True, editable=False, verbose_name="order")),
                ("image", models.ImageField(blank=True, upload_to="business-fields/gallery/")),
                ("alt", models.CharField(blank=True, default="", max_length=255)),
                ("is_active", models.BooleanField(default=True)),
                ("field", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="gallery", to="pages.businessfield")),
                # Translation fields
                ("alt_vi", models.CharField(blank=True, default="", max_length=255, null=True)),
                ("alt_en", models.CharField(blank=True, default="", max_length=255, null=True)),
                ("alt_zh_hans", models.CharField(blank=True, default="", max_length=255, null=True)),
                ("alt_ko", models.CharField(blank=True, default="", max_length=255, null=True)),
            ],
            options={
                "verbose_name": "㉑ Gallery lĩnh vực",
                "verbose_name_plural": "㉑ Gallery lĩnh vực",
                "db_table": "pages_business_field_gallery",
                "ordering": ["order"],
                "abstract": False,
            },
        ),
    ]
