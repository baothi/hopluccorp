from django.conf import settings
from django.db import models


class MediaCategory(models.Model):
    """Category to organize media files."""

    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True, default="")

    class Meta:
        db_table = "media_categories"
        verbose_name = "Media Category"
        verbose_name_plural = "Media Categories"
        ordering = ["name"]

    def __str__(self):
        return self.name


class MediaItem(models.Model):
    """Image uploaded to Cloudinary, organized by category."""

    category = models.ForeignKey(
        MediaCategory,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="items",
    )
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to="media/images/")
    alt_text = models.CharField(max_length=255, blank=True, default="")
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="media_items",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "media_items"
        verbose_name = "Media Item"
        verbose_name_plural = "Media Items"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title
