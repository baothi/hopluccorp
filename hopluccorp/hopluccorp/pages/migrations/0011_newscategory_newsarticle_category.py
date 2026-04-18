# Generated manually for news categories.

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("pages", "0010_contactsubmission_alter_businessfieldgallery_options_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="NewsCategory",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveIntegerField(db_index=True, editable=False, verbose_name="order")),
                ("name", models.CharField(max_length=255)),
                ("name_en", models.CharField(max_length=255, null=True)),
                ("name_ko", models.CharField(max_length=255, null=True)),
                ("name_vi", models.CharField(max_length=255, null=True)),
                ("name_zh_hans", models.CharField(max_length=255, null=True)),
                ("slug", models.SlugField(max_length=120, unique=True)),
                ("is_active", models.BooleanField(default=True)),
            ],
            options={
                "verbose_name": "⑥ News Category",
                "verbose_name_plural": "⑥ News Categories (Danh mục tin tức)",
                "db_table": "pages_news_categories",
                "ordering": ("order",),
                "abstract": False,
            },
        ),
        migrations.AddField(
            model_name="newsarticle",
            name="category",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="articles",
                to="pages.newscategory",
            ),
        ),
    ]
