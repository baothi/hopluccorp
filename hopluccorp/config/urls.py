from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@api_view(["GET"])
@permission_classes([AllowAny])
def index(request):
    return Response({"success": True, "msg": "HopLucCorp API"})


@api_view(["GET"])
@permission_classes([AllowAny])
def ping(request):
    return Response({"ping": "pong"})


urlpatterns = [
    path("", index),
    path("ping/", ping),
    path(settings.ADMIN_URL, admin.site.urls),
    # API Schema & Docs
    path("api/schema/", SpectacularAPIView.as_view(), name="api-schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="api-schema"), name="api-docs"),
    # API URLs
    path("api/users/", include("hopluccorp.users.urls")),
    path("api/auth/", include("hopluccorp.users_auth.urls")),
    path("api/pages/", include("hopluccorp.pages.urls")),
    # CKEditor 5
    path("ckeditor5/", include("django_ckeditor_5.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
