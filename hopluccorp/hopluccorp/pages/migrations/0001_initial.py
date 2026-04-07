import django_ckeditor_5.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="BannerSlide",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(db_index=True, editable=False, verbose_name="order")),
                ("title", models.CharField(blank=True, default="", max_length=255)),
                ("image", models.ImageField(blank=True, upload_to="pages/banners/")),
                ("alt", models.CharField(blank=True, default="", max_length=255)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={
                "verbose_name": "Banner Slide",
                "verbose_name_plural": "Banner Slides",
                "db_table": "pages_banner_slides",
                "ordering": ["order"],
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="AboutSection",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("label", models.CharField(default="Giới thiệu", max_length=100)),
                ("title", models.CharField(default="Hợp lực", max_length=255)),
                ("description", django_ckeditor_5.fields.CKEditor5Field(blank=True, verbose_name="Text")),
                ("cta_text", models.CharField(default="Tìm hiểu thêm", max_length=100)),
                ("cta_link", models.CharField(default="/gioi-thieu", max_length=255)),
            ],
            options={
                "verbose_name": "About Section",
                "verbose_name_plural": "About Section",
                "db_table": "pages_about_section",
            },
        ),
        migrations.CreateModel(
            name="AboutBlock",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(db_index=True, editable=False, verbose_name="order")),
                ("title", models.CharField(max_length=255)),
                ("subtitle", models.CharField(blank=True, default="", max_length=255)),
                ("image", models.ImageField(blank=True, upload_to="pages/about/")),
                ("icon", models.ImageField(blank=True, upload_to="pages/about/icons/")),
                ("link", models.CharField(blank=True, default="", max_length=255)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={
                "verbose_name": "About Block",
                "verbose_name_plural": "About Blocks",
                "db_table": "pages_about_blocks",
                "ordering": ["order"],
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="VideoSection",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(default="VIDEO NỔI BẬT", max_length=255)),
                ("subtitle", models.CharField(blank=True, default="", max_length=500)),
                ("youtube_id", models.CharField(blank=True, default="", max_length=50)),
                ("thumbnail", models.ImageField(blank=True, upload_to="pages/video/")),
            ],
            options={
                "verbose_name": "Video Section",
                "verbose_name_plural": "Video Section",
                "db_table": "pages_video_section",
            },
        ),
        migrations.CreateModel(
            name="StatItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(db_index=True, editable=False, verbose_name="order")),
                ("icon", models.ImageField(blank=True, upload_to="pages/stats/icons/")),
                ("number", models.IntegerField()),
                ("suffix", models.CharField(blank=True, default="", max_length=20)),
                ("label", models.CharField(max_length=255)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={
                "verbose_name": "Stat Item",
                "verbose_name_plural": "Stat Items",
                "db_table": "pages_stat_items",
                "ordering": ["order"],
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="BusinessCategory",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(db_index=True, editable=False, verbose_name="order")),
                ("title", models.CharField(max_length=255)),
                ("subtitle", models.CharField(blank=True, default="", max_length=255)),
                ("image", models.ImageField(blank=True, upload_to="pages/categories/")),
                ("link", models.CharField(blank=True, default="", max_length=255)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={
                "verbose_name": "Business Category",
                "verbose_name_plural": "Business Categories",
                "db_table": "pages_business_categories",
                "ordering": ["order"],
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Partner",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(db_index=True, editable=False, verbose_name="order")),
                ("name", models.CharField(max_length=255)),
                ("logo", models.ImageField(blank=True, upload_to="pages/partners/")),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={
                "verbose_name": "Partner",
                "verbose_name_plural": "Partners",
                "db_table": "pages_partners",
                "ordering": ["order"],
                "abstract": False,
            },
        ),
    ]
