from django.contrib import admin
from django.contrib.auth import admin as auth_admin

from .models import User


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    list_display = ["username", "email", "first_name", "last_name", "is_staff"]
    search_fields = ["username", "first_name", "last_name", "email"]
    fieldsets = auth_admin.UserAdmin.fieldsets + (
        ("Extra Info", {"fields": ("phone_number", "avatar")}),
    )
