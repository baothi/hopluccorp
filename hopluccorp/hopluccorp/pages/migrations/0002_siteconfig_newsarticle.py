import django_ckeditor_5.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("pages", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="SiteConfig",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("logo_header", models.ImageField(blank=True, upload_to="site/logos/")),
                ("logo_footer", models.ImageField(blank=True, upload_to="site/logos/")),
                ("favicon", models.ImageField(blank=True, upload_to="site/logos/")),
                ("qr_code", models.ImageField(blank=True, upload_to="site/")),
                ("address_hn", models.TextField(blank=True, default="")),
                ("address_hcm", models.TextField(blank=True, default="")),
                ("phone", models.CharField(blank=True, default="", max_length=50)),
                ("email", models.EmailField(blank=True, default="", max_length=254)),
                ("facebook_url", models.URLField(blank=True, default="")),
                ("youtube_url", models.URLField(blank=True, default="")),
                ("linkedin_url", models.URLField(blank=True, default="")),
                ("bg_stats", models.ImageField(blank=True, upload_to="site/backgrounds/")),
                ("bg_footer", models.ImageField(blank=True, upload_to="site/backgrounds/")),
                ("bg_stats_image", models.ImageField(blank=True, help_text="Ảnh bên phải section thống kê", upload_to="site/backgrounds/")),
            ],
            options={
                "verbose_name": "Site Config",
                "verbose_name_plural": "Site Config",
                "db_table": "pages_site_config",
            },
        ),
        migrations.CreateModel(
            name="NewsArticle",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=500)),
                ("slug", models.SlugField(blank=True, max_length=500, unique=True)),
                ("excerpt", models.TextField(blank=True, default="", help_text="Mô tả ngắn")),
                ("content", django_ckeditor_5.fields.CKEditor5Field(blank=True, verbose_name="Text")),
                ("image", models.ImageField(blank=True, upload_to="news/")),
                ("is_featured", models.BooleanField(default=False, help_text="Hiển thị nổi bật trên homepage")),
                ("is_active", models.BooleanField(default=True)),
                ("published_at", models.DateTimeField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "News Article",
                "verbose_name_plural": "News Articles",
                "db_table": "pages_news_articles",
                "ordering": ["-published_at", "-created_at"],
            },
        ),
    ]
