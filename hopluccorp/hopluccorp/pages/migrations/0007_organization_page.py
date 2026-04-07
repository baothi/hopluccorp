from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("pages", "0006_pageseo"),
    ]

    operations = [
        # OrganizationOverview (singleton)
        migrations.CreateModel(
            name="OrganizationOverview",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(default="TỔNG QUAN", max_length=100)),
                ("title_vi", models.CharField(default="TỔNG QUAN", max_length=100, null=True)),
                ("title_en", models.CharField(default="TỔNG QUAN", max_length=100, null=True)),
                ("title_zh_hans", models.CharField(default="TỔNG QUAN", max_length=100, null=True)),
                ("title_ko", models.CharField(default="TỔNG QUAN", max_length=100, null=True)),
                ("logo", models.ImageField(blank=True, upload_to="organization/")),
                ("description", models.TextField(blank=True, default="")),
                ("description_vi", models.TextField(blank=True, default="", null=True)),
                ("description_en", models.TextField(blank=True, default="", null=True)),
                ("description_zh_hans", models.TextField(blank=True, default="", null=True)),
                ("description_ko", models.TextField(blank=True, default="", null=True)),
                ("image", models.ImageField(blank=True, upload_to="organization/")),
                ("download_link", models.URLField(blank=True, default="", help_text="Link tải Profile PDF")),
                ("download_text", models.CharField(default="Tải tài liệu", max_length=100)),
                ("download_text_vi", models.CharField(default="Tải tài liệu", max_length=100, null=True)),
                ("download_text_en", models.CharField(default="Tải tài liệu", max_length=100, null=True)),
                ("download_text_zh_hans", models.CharField(default="Tải tài liệu", max_length=100, null=True)),
                ("download_text_ko", models.CharField(default="Tải tài liệu", max_length=100, null=True)),
            ],
            options={
                "verbose_name": "⑬ Tổng quan (Cơ cấu tổ chức)",
                "verbose_name_plural": "⑬ Tổng quan (Cơ cấu tổ chức)",
                "db_table": "pages_organization_overview",
            },
        ),
        # OrganizationChart (singleton)
        migrations.CreateModel(
            name="OrganizationChart",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(default="SƠ ĐỒ TỔ CHỨC", max_length=100)),
                ("title_vi", models.CharField(default="SƠ ĐỒ TỔ CHỨC", max_length=100, null=True)),
                ("title_en", models.CharField(default="SƠ ĐỒ TỔ CHỨC", max_length=100, null=True)),
                ("title_zh_hans", models.CharField(default="SƠ ĐỒ TỔ CHỨC", max_length=100, null=True)),
                ("title_ko", models.CharField(default="SƠ ĐỒ TỔ CHỨC", max_length=100, null=True)),
                ("image", models.ImageField(blank=True, upload_to="organization/chart/")),
                ("image_vi", models.ImageField(blank=True, null=True, upload_to="organization/chart/")),
                ("image_en", models.ImageField(blank=True, null=True, upload_to="organization/chart/")),
                ("image_zh_hans", models.ImageField(blank=True, null=True, upload_to="organization/chart/")),
                ("image_ko", models.ImageField(blank=True, null=True, upload_to="organization/chart/")),
            ],
            options={
                "verbose_name": "⑭ Sơ đồ tổ chức",
                "verbose_name_plural": "⑭ Sơ đồ tổ chức",
                "db_table": "pages_organization_chart",
            },
        ),
        # OrganizationGalleryItem (ordered)
        migrations.CreateModel(
            name="OrganizationGalleryItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(db_index=True, editable=False, verbose_name="order")),
                ("image", models.ImageField(blank=True, upload_to="organization/gallery/")),
                ("alt", models.CharField(blank=True, default="", max_length=255)),
                ("alt_vi", models.CharField(blank=True, default="", max_length=255, null=True)),
                ("alt_en", models.CharField(blank=True, default="", max_length=255, null=True)),
                ("alt_zh_hans", models.CharField(blank=True, default="", max_length=255, null=True)),
                ("alt_ko", models.CharField(blank=True, default="", max_length=255, null=True)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={
                "verbose_name": "⑮ Thư viện ảnh (Cơ cấu tổ chức)",
                "verbose_name_plural": "⑮ Thư viện ảnh (Cơ cấu tổ chức)",
                "db_table": "pages_organization_gallery",
                "ordering": ["order"],
                "abstract": False,
            },
        ),
    ]
