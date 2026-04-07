from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Custom user model for HopLucCorp."""

    phone_number = models.CharField(max_length=20, blank=True, default="")
    avatar = models.ImageField(upload_to="users/avatars/", blank=True, null=True)

    class Meta:
        db_table = "users"
        ordering = ["-date_joined"]

    def __str__(self):
        return self.email or self.username
