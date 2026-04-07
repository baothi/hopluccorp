from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("pages", "0005_about_page_models"),
    ]

    operations = [
        migrations.CreateModel(
            name="PageSEO",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("page_key", models.CharField(help_text="Unique key for each page, e.g. homepage, about, news, projects", max_length=100, unique=True)),
                ("page_name", models.CharField(blank=True, default="", help_text="Tên hiển thị trong admin, e.g. Trang chủ, Giới thiệu", max_length=255)),
                # Base fields
                ("title", models.CharField(max_length=255)),
                ("description", models.TextField(blank=True, default="")),
                ("keywords", models.CharField(blank=True, default="", max_length=500)),
                ("og_image", models.ImageField(blank=True, help_text="Ảnh hiển thị khi share link lên Facebook, Zalo, LinkedIn...", upload_to="seo/")),
                # Translation fields: title
                ("title_vi", models.CharField(max_length=255, null=True)),
                ("title_en", models.CharField(max_length=255, null=True)),
                ("title_zh_hans", models.CharField(max_length=255, null=True)),
                ("title_ko", models.CharField(max_length=255, null=True)),
                # Translation fields: description
                ("description_vi", models.TextField(blank=True, default="", null=True)),
                ("description_en", models.TextField(blank=True, default="", null=True)),
                ("description_zh_hans", models.TextField(blank=True, default="", null=True)),
                ("description_ko", models.TextField(blank=True, default="", null=True)),
                # Translation fields: keywords
                ("keywords_vi", models.CharField(blank=True, default="", max_length=500, null=True)),
                ("keywords_en", models.CharField(blank=True, default="", max_length=500, null=True)),
                ("keywords_zh_hans", models.CharField(blank=True, default="", max_length=500, null=True)),
                ("keywords_ko", models.CharField(blank=True, default="", max_length=500, null=True)),
                # Translation fields: og_image
                ("og_image_vi", models.ImageField(blank=True, upload_to="seo/", null=True)),
                ("og_image_en", models.ImageField(blank=True, upload_to="seo/", null=True)),
                ("og_image_zh_hans", models.ImageField(blank=True, upload_to="seo/", null=True)),
                ("og_image_ko", models.ImageField(blank=True, upload_to="seo/", null=True)),
            ],
            options={
                "verbose_name": "🔍 SEO Metadata",
                "verbose_name_plural": "🔍 SEO Metadata",
                "db_table": "pages_seo",
                "ordering": ["page_key"],
            },
        ),
    ]
