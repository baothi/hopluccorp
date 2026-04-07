from django.contrib import admin
from django.utils.html import format_html

from .models import MediaCategory, MediaItem


@admin.register(MediaCategory)
class MediaCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "item_count"]
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ["name"]

    @admin.display(description="Items")
    def item_count(self, obj):
        return obj.items.count()


@admin.register(MediaItem)
class MediaItemAdmin(admin.ModelAdmin):
    list_display = ["title", "image_preview", "category", "uploaded_by", "created_at"]
    list_filter = ["category", "created_at"]
    search_fields = ["title", "alt_text"]
    readonly_fields = ["image_preview_large", "uploaded_by", "created_at", "updated_at"]

    @admin.display(description="Preview")
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height:50px;max-width:80px;object-fit:cover;" />', obj.image.url)
        return "-"

    @admin.display(description="Preview")
    def image_preview_large(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height:300px;max-width:500px;object-fit:contain;" />',
                obj.image.url,
            )
        return "-"

    def save_model(self, request, obj, form, change):
        if not change:
            obj.uploaded_by = request.user
        super().save_model(request, obj, form, change)
