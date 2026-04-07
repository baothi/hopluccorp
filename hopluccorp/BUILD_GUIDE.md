# HopLucCorp - Hướng Dẫn Build Dự Án Mới

> Dự án Django REST API mới, clone cấu trúc từ PrismVio, nâng cấp lên **Django 5.1** + **Python 3.12**.
> Sử dụng `pyproject.toml` (không dùng `requirements/`).
> Chỉ giữ lại: **users, users_auth, social_login**.

---

## Mục Lục

1. [Tổng quan cấu trúc dự án](#1-tổng-quan-cấu-trúc-dự-án)
2. [Bước 1: Tạo cấu trúc thư mục](#bước-1-tạo-cấu-trúc-thư-mục)
3. [Bước 2: Tạo pyproject.toml](#bước-2-tạo-pyprojecttoml)
4. [Bước 3: Tạo manage.py](#bước-3-tạo-managepy)
5. [Bước 4: Tạo config/ (Settings)](#bước-4-tạo-config-settings)
6. [Bước 5: Tạo config/urls.py](#bước-5-tạo-configUrlspy)
7. [Bước 6: Tạo ASGI/WSGI](#bước-6-tạo-asgiwsgi)
8. [Bước 7: Tạo app hopluccorp/ (package chính)](#bước-7-tạo-app-hopluccorp-package-chính)
9. [Bước 8: Tạo Docker Compose (local)](#bước-8-tạo-docker-compose-local)
10. [Bước 9: Tạo Docker Compose (production)](#bước-9-tạo-docker-compose-production)
11. [Bước 10: Tạo Dockerfiles](#bước-10-tạo-dockerfiles)
12. [Bước 11: Tạo startup scripts](#bước-11-tạo-startup-scripts)
13. [Bước 12: Tạo Makefile](#bước-12-tạo-makefile)
14. [Bước 13: Tạo .envs](#bước-13-tạo-envs)
15. [Bước 14: Migrate apps từ PrismVio](#bước-14-migrate-apps-từ-prismvio)
16. [Bước 15: Build và chạy thử](#bước-15-build-và-chạy-thử)
17. [Lưu ý nâng cấp Django 5.1](#lưu-ý-nâng-cấp-django-51)

---

## 1. Tổng Quan Cấu Trúc Dự Án

```
hopluccorp/                          # Root project
├── BUILD_GUIDE.md                   # File này
├── pyproject.toml                   # Dependencies + tool config (thay requirements/)
├── manage.py                        # Django management
├── Makefile                         # Shortcut commands
├── local.yml                        # Docker Compose (dev)
├── production.yml                   # Docker Compose (prod)
├── .envs/
│   ├── .local/
│   │   ├── .django                  # Django env vars (dev)
│   │   └── .postgres                # PostgreSQL env vars (dev)
│   └── .production/
│       ├── .django                  # Django env vars (prod)
│       └── .postgres                # PostgreSQL env vars (prod)
├── compose/
│   ├── local/
│   │   └── django/
│   │       ├── Dockerfile
│   │       ├── start
│   │       └── celery/
│   │           ├── worker/start
│   │           ├── beat/start
│   │           └── flower/start
│   └── production/
│       └── django/
│           ├── Dockerfile
│           ├── entrypoint
│           ├── start
│           └── celery/
│               ├── worker/start
│               ├── beat/start
│               └── flower/start
├── config/
│   ├── __init__.py
│   ├── celery_app.py
│   ├── urls.py
│   ├── asgi.py
│   ├── wsgi.py
│   └── settings/
│       ├── __init__.py
│       ├── base.py
│       ├── local.py
│       ├── production.py
│       └── test.py
└── hopluccorp/                      # Main app package
    ├── __init__.py
    ├── conftest.py
    ├── contrib/
    │   └── sites/                   # Django sites
    ├── core/                        # Utilities chung
    │   └── drf_exception/
    ├── utils/
    ├── users/                       # User management
    ├── users_auth/                  # Authentication
    └── social_login/                # Social auth (Google, Apple)
```

---

## Bước 1: Tạo Cấu Trúc Thư Mục

```bash
# Từ thư mục root của dự án (hopluccorp/)
mkdir -p config/settings
mkdir -p hopluccorp/{contrib/sites,core/drf_exception,utils,users,users_auth,social_login}
mkdir -p compose/local/django/celery/{worker,beat,flower}
mkdir -p compose/production/django/celery/{worker,beat,flower}
mkdir -p compose/production/postgres/maintenance/{backups,_sourced}
mkdir -p .envs/.local
mkdir -p .envs/.production
mkdir -p locale/{en_US,vi_VN}/LC_MESSAGES
mkdir -p tests

# Tạo các __init__.py
touch config/__init__.py
touch config/settings/__init__.py
touch hopluccorp/__init__.py
touch hopluccorp/contrib/__init__.py
touch hopluccorp/contrib/sites/__init__.py
touch hopluccorp/core/__init__.py
touch hopluccorp/core/drf_exception/__init__.py
touch hopluccorp/utils/__init__.py
touch hopluccorp/users/__init__.py
touch hopluccorp/users_auth/__init__.py
touch hopluccorp/social_login/__init__.py
```

---

## Bước 2: Tạo pyproject.toml

> **QUAN TRỌNG**: Thay thế hoàn toàn `requirements/` bằng `pyproject.toml`.

```toml
[build-system]
requires = ["setuptools>=68.0", "wheel"]
build-backend = "setuptools.backends._legacy:_Backend"

[project]
name = "hopluccorp"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = [
    # Django
    "django==5.1.5",
    "django-environ==0.11.2",
    "django-model-utils==5.0.0",
    "django-allauth[socialaccount]==65.3.0",
    "django-crispy-forms==2.3",
    "crispy-bootstrap5==2024.10",
    "django-redis==5.4.0",
    "django-cors-headers==4.6.0",
    "django-filter==24.3",
    "django-celery-beat==2.7.0",
    "django-phonenumber-field[phonenumberslite]==8.0.0",

    # Django REST Framework
    "djangorestframework==3.15.2",
    "djangorestframework-simplejwt==5.3.1",
    "drf-spectacular==0.28.0",
    "django-rest-framework-social-oauth2==1.2.0",

    # Celery
    "celery==5.4.0",
    "flower==2.0.1",

    # Database
    "psycopg[binary]==3.2.4",

    # Search (tuỳ chọn - bỏ nếu chưa cần)
    # "elasticsearch==8.17.0",
    # "elasticsearch-dsl==8.17.1",
    # "django-elasticsearch-dsl==8.0",

    # Cache & Message Broker
    "redis==5.2.1",

    # Auth
    "PyJWT==2.10.1",
    "cryptography==44.0.0",
    "social-auth-core==4.5.4",
    "social-auth-app-django==5.4.2",
    "google-auth==2.37.0",

    # Firebase (tuỳ chọn)
    # "firebase-admin==6.6.0",

    # Server
    "uvicorn[standard]==0.34.0",
    "gunicorn==23.0.0",

    # Utils
    "pillow==11.1.0",
    "python-slugify==8.0.4",
    "argon2-cffi==23.1.0",
    "whitenoise==6.8.2",
    "pydantic==2.10.5",
    "loguru==0.7.3",
    "geopy==2.4.1",
    "python-dateutil==2.9.0.post0",
]

[project.optional-dependencies]
dev = [
    "werkzeug[watchdog]==3.1.3",
    "ipdb==0.13.13",
    "watchfiles==1.0.4",

    # Testing
    "pytest==8.3.4",
    "pytest-django==4.9.0",
    "pytest-sugar==1.0.0",
    "factory-boy==3.3.1",
    "coverage==7.6.10",

    # Type checking
    "mypy==1.14.1",
    "django-stubs[compatible-mypy]==5.1.1",
    "djangorestframework-stubs[compatible-mypy]==3.15.1",

    # Code quality
    "ruff==0.9.4",
    "pre-commit==4.0.1",
    "djlint==1.36.4",

    # Django dev tools
    "django-debug-toolbar==4.4.6",
    "django-extensions==3.2.3",
]

production = [
    "sentry-sdk==2.19.2",
    "django-anymail[sendgrid]==12.0",
]

# ==== pytest ====
[tool.pytest.ini_options]
minversion = "6.0"
addopts = "--ds=config.settings.test --reuse-db"
python_files = ["tests.py", "test_*.py"]

# ==== Coverage ====
[tool.coverage.run]
include = ["hopluccorp/**"]
omit = ["*/migrations/*", "*/tests/*"]
plugins = ["django_coverage_plugin"]

# ==== Ruff (thay thế black + isort + flake8) ====
[tool.ruff]
target-version = "py312"
line-length = 119

[tool.ruff.lint]
select = [
    "E",   # pycodestyle errors
    "W",   # pycodestyle warnings
    "F",   # pyflakes
    "I",   # isort
    "B",   # flake8-bugbear
    "UP",  # pyupgrade
]

[tool.ruff.lint.isort]
known-first-party = ["hopluccorp", "config"]

# ==== mypy ====
[tool.mypy]
python_version = "3.12"
check_untyped_defs = true
ignore_missing_imports = true
warn_unused_ignores = true
warn_redundant_casts = true
warn_unused_configs = true
plugins = ["mypy_django_plugin.main", "mypy_drf_plugin.main"]

[[tool.mypy.overrides]]
module = "*.migrations.*"
ignore_errors = true

[tool.django-stubs]
django_settings_module = "config.settings.test"

# ==== djLint ====
[tool.djlint]
blank_line_after_tag = "load,extends"
close_void_tags = true
format_css = true
format_js = true
ignore = "H006,H030,H031,T002"
include = "H017,H035"
indent = 2
max_line_length = 119
profile = "django"
```

**Lưu ý quan trọng:**
- Dùng **Ruff** thay thế black + isort + flake8 (nhanh hơn, tất cả trong một)
- Tất cả dependencies đều ở version mới nhất tính đến đầu 2025
- Bỏ comment `#` cho elasticsearch/firebase nếu bạn cần dùng

---

## Bước 3: Tạo manage.py

```python
#!/usr/bin/env python
import os
import sys

def main():
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")
    try:
        from django.core.management import execute_from_command_line
    except ImportError:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        )
    current_path = os.path.dirname(os.path.abspath(__file__))
    sys.path.append(os.path.join(current_path, "hopluccorp"))
    execute_from_command_line(sys.argv)

if __name__ == "__main__":
    main()
```

---

## Bước 4: Tạo config/ (Settings)

### config/settings/base.py

```python
"""
Base settings for HopLucCorp project.
Django 5.1 + Python 3.12
"""
from datetime import timedelta
from pathlib import Path

import environ

# Build paths
BASE_DIR = Path(__file__).resolve(strict=True).parent.parent.parent
APPS_DIR = BASE_DIR / "hopluccorp"

env = environ.Env()

# GENERAL
DEBUG = env.bool("DJANGO_DEBUG", False)
TIME_ZONE = "Asia/Ho_Chi_Minh"
LANGUAGE_CODE = "en-us"
SITE_ID = 1
USE_I18N = True
USE_TZ = True
LOCALE_PATHS = [str(BASE_DIR / "locale")]

# DATABASES
DATABASES = {
    "default": env.db("DATABASE_URL", default="postgres:///hopluccorp"),
}
DATABASES["default"]["ATOMIC_REQUESTS"] = True
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# URLS
ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"

# APPS
DJANGO_APPS = [
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.sites",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.admin",
]
THIRD_PARTY_APPS = [
    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",
    "django_celery_beat",
    "drf_spectacular",
    "django_filters",
    # Thêm social auth nếu cần:
    # "social_django",
]
LOCAL_APPS = [
    "hopluccorp.users",
    "hopluccorp.users_auth",
    "hopluccorp.social_login",
    # Thêm apps mới ở đây
]
INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

# AUTHENTICATION
AUTH_USER_MODEL = "users.User"
AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
]

# PASSWORDS
PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.Argon2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher",
    "django.contrib.auth.hashers.BCryptSHA256PasswordHasher",
]
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# MIDDLEWARE
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# STATIC
STATIC_ROOT = str(BASE_DIR / "staticfiles")
STATIC_URL = "/static/"
STATICFILES_DIRS = [str(APPS_DIR / "static")]
STATICFILES_FINDERS = [
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
]

# MEDIA
MEDIA_ROOT = str(APPS_DIR / "media")
MEDIA_URL = "/media/"

# TEMPLATES
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [str(APPS_DIR / "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.template.context_processors.i18n",
                "django.template.context_processors.media",
                "django.template.context_processors.static",
                "django.template.context_processors.tz",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# SECURITY
SESSION_COOKIE_HTTPONLY = True
CSRF_COOKIE_HTTPONLY = True
X_FRAME_OPTIONS = "DENY"

# ADMIN
ADMIN_URL = "admin/"

# LOGGING
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s",
        },
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "root": {"level": "INFO", "handlers": ["console"]},
}

# DJANGO REST FRAMEWORK
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
    ),
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "PAGE_SIZE": 20,
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
    ],
}

# SIMPLE JWT
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "AUTH_HEADER_TYPES": ("Bearer",),
}

# DRF SPECTACULAR
SPECTACULAR_SETTINGS = {
    "TITLE": "HopLucCorp API",
    "DESCRIPTION": "Documentation of API endpoints of HopLucCorp",
    "VERSION": "1.0.0",
    "SERVE_PERMISSIONS": ["rest_framework.permissions.IsAdminUser"],
}

# CELERY
if USE_TZ:
    CELERY_TIMEZONE = TIME_ZONE
CELERY_BROKER_URL = env("CELERY_BROKER_URL", default="redis://localhost:6379/0")
CELERY_RESULT_BACKEND = CELERY_BROKER_URL
CELERY_RESULT_EXTENDED = True
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"
CELERY_TASK_TIME_LIMIT = 5 * 60  # 5 minutes
CELERY_TASK_SOFT_TIME_LIMIT = 60  # 1 minute
CELERY_BEAT_SCHEDULER = "django_celery_beat.schedulers:DatabaseScheduler"

# CORS
CORS_ALLOW_ALL_ORIGINS = env.bool("CORS_ALLOW_ALL_ORIGINS", default=False)
CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS", default=[])
```

### config/settings/local.py

```python
from .base import *  # noqa: F403
from .base import env

# GENERAL
DEBUG = True
SECRET_KEY = env(
    "DJANGO_SECRET_KEY",
    default="your-local-secret-key-change-me-in-production",
)
ALLOWED_HOSTS = ["localhost", "0.0.0.0", "127.0.0.1"]

# CACHES
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "",
    },
}

# EMAIL
EMAIL_BACKEND = env("DJANGO_EMAIL_BACKEND", default="django.core.mail.backends.console.EmailBackend")

# WHITENOISE
INSTALLED_APPS = ["whitenoise.runserver_nostatic", *INSTALLED_APPS]  # noqa: F405

# DJANGO DEBUG TOOLBAR
INSTALLED_APPS += ["debug_toolbar", "django_extensions"]  # noqa: F405
MIDDLEWARE += ["debug_toolbar.middleware.DebugToolbarMiddleware"]  # noqa: F405
DEBUG_TOOLBAR_CONFIG = {
    "DISABLE_PANELS": ["debug_toolbar.panels.redirects.RedirectsPanel"],
    "SHOW_TEMPLATE_CONTEXT": True,
}
INTERNAL_IPS = ["127.0.0.1", "10.0.2.2"]
import socket
hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())
INTERNAL_IPS += [".".join(ip.split(".")[:-1] + ["1"]) for ip in ips]

# CELERY - chạy đồng bộ trong dev
CELERY_TASK_EAGER_PROPAGATES = True
CELERY_TASK_ALWAYS_EAGER = True

# CORS
CORS_ALLOW_ALL_ORIGINS = True
```

### config/settings/production.py

```python
import logging

from .base import *  # noqa: F403
from .base import env

# GENERAL
SECRET_KEY = env("DJANGO_SECRET_KEY")
ALLOWED_HOSTS = env.list("DJANGO_ALLOWED_HOSTS", default=["api.hopluccorp.com"])
DEBUG = False

# DATABASES
DATABASES["default"]["CONN_MAX_AGE"] = env.int("CONN_MAX_AGE", default=60)  # noqa: F405

# CACHES
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": env("REDIS_URL"),
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "IGNORE_EXCEPTIONS": True,
        },
    },
}

# SECURITY
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = env.bool("DJANGO_SECURE_SSL_REDIRECT", default=True)
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 518400
SECURE_HSTS_INCLUDE_SUBDOMAINS = env.bool("DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS", default=True)
SECURE_HSTS_PRELOAD = env.bool("DJANGO_SECURE_HSTS_PRELOAD", default=True)
SECURE_CONTENT_TYPE_NOSNIFF = env.bool("DJANGO_SECURE_CONTENT_TYPE_NOSNIFF", default=True)

# STATIC
STORAGES = {
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

# ADMIN
ADMIN_URL = env("DJANGO_ADMIN_URL")

# EMAIL (sử dụng Anymail + SendGrid hoặc service khác)
# INSTALLED_APPS += ["anymail"]  # noqa: F405
# EMAIL_BACKEND = "anymail.backends.sendgrid.EmailBackend"
# ANYMAIL = {"SENDGRID_API_KEY": env("SENDGRID_API_KEY")}

# LOGGING
LOGGING = {
    "version": 1,
    "disable_existing_loggers": True,
    "formatters": {
        "verbose": {
            "format": "%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s",
        },
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "root": {"level": "INFO", "handlers": ["console"]},
    "loggers": {
        "django.db.backends": {
            "level": "ERROR",
            "handlers": ["console"],
            "propagate": False,
        },
        "sentry_sdk": {
            "level": "ERROR",
            "handlers": ["console"],
            "propagate": False,
        },
        "django.security.DisallowedHost": {
            "level": "ERROR",
            "handlers": ["console"],
            "propagate": False,
        },
    },
}

# SENTRY
SENTRY_DSN = env("SENTRY_DSN", default="")
if SENTRY_DSN:
    import sentry_sdk
    from sentry_sdk.integrations.celery import CeleryIntegration
    from sentry_sdk.integrations.django import DjangoIntegration
    from sentry_sdk.integrations.logging import LoggingIntegration
    from sentry_sdk.integrations.redis import RedisIntegration

    sentry_sdk.init(
        dsn=SENTRY_DSN,
        integrations=[
            DjangoIntegration(),
            CeleryIntegration(),
            LoggingIntegration(event_level=logging.ERROR),
            RedisIntegration(),
        ],
        traces_sample_rate=env.float("SENTRY_TRACES_SAMPLE_RATE", default=0.0),
    )
```

### config/settings/test.py

```python
from .base import *  # noqa: F403

SECRET_KEY = "test-secret-key-not-for-production"
TEST_RUNNER = "django.test.runner.DiscoverRunner"
PASSWORD_HASHERS = ["django.contrib.auth.hashers.MD5PasswordHasher"]
EMAIL_BACKEND = "django.core.mail.backends.locmem.EmailBackend"
```

---

## Bước 5: Tạo config/urls.py

```python
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


urlpatterns = [
    path("", index),
    path(settings.ADMIN_URL, admin.site.urls),
    # API
    path("api/schema/", SpectacularAPIView.as_view(), name="api-schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="api-schema"), name="api-docs"),
    # Thêm API URLs ở đây:
    # path("api/users/", include("hopluccorp.users.urls")),
    # path("api/auth/", include("hopluccorp.users_auth.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
```

---

## Bước 6: Tạo ASGI/WSGI

### config/asgi.py

```python
import os

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")
application = get_asgi_application()
```

### config/wsgi.py

```python
import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.production")
application = get_wsgi_application()
```

### config/celery_app.py

```python
import os

from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")

app = Celery("hopluccorp")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
```

### config/__init__.py

```python
from .celery_app import app as celery_app

__all__ = ("celery_app",)
```

---

## Bước 7: Tạo App hopluccorp/ (Package Chính)

### hopluccorp/users/apps.py

```python
from django.apps import AppConfig

class UsersConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "hopluccorp.users"
    verbose_name = "Users"
```

### hopluccorp/users/models.py (ví dụ cơ bản)

```python
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Custom user model cho HopLucCorp."""
    phone_number = models.CharField(max_length=20, blank=True, default="")

    class Meta:
        db_table = "users"
        ordering = ["-date_joined"]

    def __str__(self):
        return self.email or self.username
```

### hopluccorp/users_auth/apps.py

```python
from django.apps import AppConfig

class UsersAuthConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "hopluccorp.users_auth"
    verbose_name = "Users Auth"
```

### hopluccorp/social_login/apps.py

```python
from django.apps import AppConfig

class SocialLoginConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "hopluccorp.social_login"
    verbose_name = "Social Login"
```

---

## Bước 8: Tạo Docker Compose (local)

### local.yml

```yaml
volumes:
  hopluccorp_local_postgres_data: {}
  hopluccorp_local_redis_data: {}

services:
  django: &django
    build:
      context: .
      dockerfile: ./compose/local/django/Dockerfile
    image: hopluccorp_local_django
    depends_on:
      - postgres
      - redis
    volumes:
      - .:/app:z
    env_file:
      - ./.envs/.local/.django
      - ./.envs/.local/.postgres
    ports:
      - "8000:8000"
    command: /start

  postgres:
    image: postgres:16
    volumes:
      - hopluccorp_local_postgres_data:/var/lib/postgresql/data
    env_file:
      - ./.envs/.local/.postgres
    ports:
      - "5432:5432"

  redis:
    image: redis:7
    volumes:
      - hopluccorp_local_redis_data:/data
    ports:
      - "6379:6379"

  celeryworker:
    <<: *django
    image: hopluccorp_local_celeryworker
    depends_on:
      - redis
      - postgres
    ports: []
    command: /start-celeryworker

  celerybeat:
    <<: *django
    image: hopluccorp_local_celerybeat
    depends_on:
      - redis
      - postgres
    ports: []
    command: /start-celerybeat

  flower:
    <<: *django
    image: hopluccorp_local_flower
    ports:
      - "5555:5555"
    command: /start-flower
```

> **Lưu ý**: So với PrismVio đã bỏ RabbitMQ (dùng Redis làm broker), bỏ Elasticsearch/Kibana.
> Thêm lại nếu cần.

---

## Bước 9: Tạo Docker Compose (production)

### production.yml

```yaml
volumes:
  hopluccorp_production_postgres_data: {}
  hopluccorp_production_media: {}

services:
  django: &django
    build:
      context: .
      dockerfile: ./compose/production/django/Dockerfile
    image: hopluccorp_production_django
    depends_on:
      - postgres
      - redis
    volumes:
      - hopluccorp_production_media:/app/hopluccorp/media
    env_file:
      - ./.envs/.production/.django
      - ./.envs/.production/.postgres
    command: /start

  postgres:
    build:
      context: .
      dockerfile: ./compose/production/postgres/Dockerfile
    image: hopluccorp_production_postgres
    volumes:
      - hopluccorp_production_postgres_data:/var/lib/postgresql/data
      - ./compose/production/postgres/maintenance:/maintenance
    env_file:
      - ./.envs/.production/.postgres

  redis:
    image: redis:7

  celeryworker:
    <<: *django
    image: hopluccorp_production_celeryworker
    command: /start-celeryworker

  celerybeat:
    <<: *django
    image: hopluccorp_production_celerybeat
    command: /start-celerybeat

  flower:
    <<: *django
    image: hopluccorp_production_flower
    command: /start-flower
```

---

## Bước 10: Tạo Dockerfiles

### compose/local/django/Dockerfile

```dockerfile
# ---- Build Stage ----
FROM python:3.12-slim-bookworm AS python-build-stage
ARG BUILD_ENVIRONMENT=local

RUN apt-get update && apt-get install --no-install-recommends -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml /app/
WORKDIR /app
RUN pip install --no-cache-dir .[dev]

# ---- Run Stage ----
FROM python:3.12-slim-bookworm AS python-run-stage
ARG BUILD_ENVIRONMENT=local

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

RUN apt-get update && apt-get install --no-install-recommends -y \
    libpq-dev \
    gettext \
    git \
    nano \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && rm -rf /var/lib/apt/lists/*

# Copy installed packages from build stage
COPY --from=python-build-stage /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=python-build-stage /usr/local/bin /usr/local/bin

COPY ./compose/local/django/start /start
RUN sed -i 's/\r$//g' /start && chmod +x /start

COPY ./compose/local/django/celery/worker/start /start-celeryworker
RUN sed -i 's/\r$//g' /start-celeryworker && chmod +x /start-celeryworker

COPY ./compose/local/django/celery/beat/start /start-celerybeat
RUN sed -i 's/\r$//g' /start-celerybeat && chmod +x /start-celerybeat

COPY ./compose/local/django/celery/flower/start /start-flower
RUN sed -i 's/\r$//g' /start-flower && chmod +x /start-flower

WORKDIR /app
COPY . /app
```

### compose/production/django/Dockerfile

```dockerfile
# ---- Build Stage ----
FROM python:3.12-slim-bookworm AS python-build-stage
ARG BUILD_ENVIRONMENT=production

RUN apt-get update && apt-get install --no-install-recommends -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml /app/
WORKDIR /app
RUN pip install --no-cache-dir ".[production]"

# ---- Run Stage ----
FROM python:3.12-slim-bookworm AS python-run-stage
ARG BUILD_ENVIRONMENT=production

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

RUN addgroup --system django && adduser --system --ingroup django django

RUN apt-get update && apt-get install --no-install-recommends -y \
    libpq-dev \
    gettext \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && rm -rf /var/lib/apt/lists/*

COPY --from=python-build-stage /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=python-build-stage /usr/local/bin /usr/local/bin

COPY ./compose/production/django/entrypoint /entrypoint
RUN sed -i 's/\r$//g' /entrypoint && chmod +x /entrypoint

COPY ./compose/production/django/start /start
RUN sed -i 's/\r$//g' /start && chmod +x /start

COPY ./compose/production/django/celery/worker/start /start-celeryworker
RUN sed -i 's/\r$//g' /start-celeryworker && chmod +x /start-celeryworker

COPY ./compose/production/django/celery/beat/start /start-celerybeat
RUN sed -i 's/\r$//g' /start-celerybeat && chmod +x /start-celerybeat

COPY ./compose/production/django/celery/flower/start /start-flower
RUN sed -i 's/\r$//g' /start-flower && chmod +x /start-flower

WORKDIR /app
COPY --chown=django:django . /app

# Compile messages nếu có locale
RUN DATABASE_URL="" CELERY_BROKER_URL="" DJANGO_SETTINGS_MODULE="config.settings.production" \
    DJANGO_SECRET_KEY="build-only" DJANGO_ADMIN_URL="admin/" \
    python manage.py compilemessages || true

USER django

ENTRYPOINT ["/entrypoint"]
```

---

## Bước 11: Tạo Startup Scripts

### compose/local/django/start

```bash
#!/bin/bash
set -o errexit
set -o pipefail
set -o nounset

python manage.py migrate
uvicorn config.asgi:application --host 0.0.0.0 --port 8000 --reload --reload-include '*.html'
```

### compose/production/django/entrypoint

```bash
#!/bin/bash
set -o errexit
set -o pipefail
set -o nounset

# Wait for PostgreSQL
python << END
import sys
import time
import psycopg

suggest_unrecoverable_after = 30
start = time.time()

while True:
    try:
        psycopg.connect(
            dbname="${POSTGRES_DB}",
            user="${POSTGRES_USER}",
            password="${POSTGRES_PASSWORD}",
            host="${POSTGRES_HOST}",
            port="${POSTGRES_PORT}",
        )
        break
    except psycopg.OperationalError as error:
        sys.stderr.write("Waiting for PostgreSQL to become available...\n")
        if time.time() - start > suggest_unrecoverable_after:
            sys.stderr.write("This is taking longer than expected. The following exception may be indicative of an unrecoverable error: '{}'\n".format(error))
    time.sleep(1)
END

>&2 echo 'PostgreSQL is available'
exec "$@"
```

### compose/production/django/start

```bash
#!/bin/bash
set -o errexit
set -o pipefail
set -o nounset

python /app/manage.py collectstatic --noinput
python /app/manage.py migrate
gunicorn config.asgi:application \
    --bind 0.0.0.0:5000 \
    --chdir=/app \
    -k uvicorn.workers.UvicornWorker \
    --workers 4 \
    --timeout 120
```

### compose/local/django/celery/worker/start

```bash
#!/bin/bash
set -o errexit
set -o pipefail
set -o nounset

watchfiles \
    --filter python \
    'celery -A config.celery_app worker -l INFO'
```

### compose/local/django/celery/beat/start

```bash
#!/bin/bash
set -o errexit
set -o pipefail
set -o nounset

rm -f './celerybeat.pid'
watchfiles \
    --filter python \
    'celery -A config.celery_app beat -l INFO --scheduler django_celery_beat.schedulers:DatabaseScheduler'
```

### compose/local/django/celery/flower/start

```bash
#!/bin/bash
set -o errexit
set -o pipefail
set -o nounset

watchfiles \
    --filter python \
    'celery -A config.celery_app -b "${CELERY_BROKER_URL}" flower --basic_auth="${CELERY_FLOWER_USER}:${CELERY_FLOWER_PASSWORD}"'
```

### compose/production/django/celery/worker/start

```bash
#!/bin/bash
set -o errexit
set -o pipefail
set -o nounset

celery -A config.celery_app worker -l INFO
```

### compose/production/django/celery/beat/start

```bash
#!/bin/bash
set -o errexit
set -o pipefail
set -o nounset

rm -f './celerybeat.pid'
celery -A config.celery_app beat -l INFO --scheduler django_celery_beat.schedulers:DatabaseScheduler
```

### compose/production/django/celery/flower/start

```bash
#!/bin/bash
set -o errexit
set -o pipefail
set -o nounset

celery -A config.celery_app \
    -b "${CELERY_BROKER_URL}" \
    flower \
    --basic_auth="${CELERY_FLOWER_USER}:${CELERY_FLOWER_PASSWORD}"
```

---

## Bước 12: Tạo Makefile

```makefile
.DEFAULT_GOAL := oneshot
COMPOSE_FILE ?= local.yml

shell:
	docker compose -f ${COMPOSE_FILE} exec django /bin/bash

makemigrations:
	docker compose -f ${COMPOSE_FILE} run --rm django python manage.py makemigrations

migrate:
	docker compose -f ${COMPOSE_FILE} exec django python manage.py migrate

oneshot:
	docker compose -f ${COMPOSE_FILE} up -d

restart: stop oneshot

stop:
	docker compose -f ${COMPOSE_FILE} down

destroy:
	docker compose -f ${COMPOSE_FILE} down -v

test:
	docker compose -f ${COMPOSE_FILE} run --rm django python -m pytest .

build:
	docker compose -f ${COMPOSE_FILE} build --no-cache

build.cache:
	docker compose -f ${COMPOSE_FILE} build

logs:
	docker compose -f ${COMPOSE_FILE} logs -f

logs.%:
	docker compose -f ${COMPOSE_FILE} logs -f $*

createsuperuser:
	docker compose -f ${COMPOSE_FILE} run --rm django python manage.py createsuperuser

runserver:
	python manage.py runserver

celery:
	celery -A config.celery_app worker --loglevel=INFO
```

---

## Bước 13: Tạo .envs

### .envs/.local/.django

```bash
# Django
DJANGO_SETTINGS_MODULE=config.settings.local
DJANGO_DEBUG=True

# Celery
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_FLOWER_USER=admin
CELERY_FLOWER_PASSWORD=admin
```

### .envs/.local/.postgres

```bash
# PostgreSQL
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=hopluccorp
POSTGRES_USER=hopluccorp_dev
POSTGRES_PASSWORD=hopluccorp_dev_password
DATABASE_URL=postgres://hopluccorp_dev:hopluccorp_dev_password@postgres:5432/hopluccorp
```

### .envs/.production/.django (ví dụ - thay đổi khi deploy)

```bash
DJANGO_SETTINGS_MODULE=config.settings.production
DJANGO_SECRET_KEY=CHANGE-ME-TO-RANDOM-STRING
DJANGO_ADMIN_URL=admin-secret-url/
DJANGO_ALLOWED_HOSTS=api.hopluccorp.com

REDIS_URL=redis://redis:6379/0
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_FLOWER_USER=admin
CELERY_FLOWER_PASSWORD=CHANGE-ME

SENTRY_DSN=
```

### .envs/.production/.postgres (ví dụ - thay đổi khi deploy)

```bash
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=hopluccorp
POSTGRES_USER=hopluccorp_prod
POSTGRES_PASSWORD=CHANGE-ME-STRONG-PASSWORD
DATABASE_URL=postgres://hopluccorp_prod:CHANGE-ME-STRONG-PASSWORD@postgres:5432/hopluccorp
```

---

## Bước 14: Migrate Apps Từ PrismVio

Khi cần copy apps từ PrismVio sang, làm theo các bước:

### 1. Copy thư mục app

```bash
# Ví dụ: copy users app
cp -r ../prisvio/prismvio/users/ ./hopluccorp/users/
```

### 2. Đổi tên package trong mỗi file

Tìm và thay thế trong toàn bộ app:
```
prismvio  →  hopluccorp
PrismVio  →  HopLucCorp
```

### 3. Cập nhật apps.py

```python
# Đổi từ:
name = "prismvio.users"
# Sang:
name = "hopluccorp.users"
```

### 4. Xoá migrations cũ và tạo lại

```bash
# Xoá tất cả migrations (giữ __init__.py)
find hopluccorp/users/migrations -name "*.py" ! -name "__init__.py" -delete

# Tạo migration mới
python manage.py makemigrations users
```

### 5. Đăng ký trong settings

```python
# config/settings/base.py
LOCAL_APPS = [
    "hopluccorp.users",
    "hopluccorp.users_auth",
    "hopluccorp.social_login",
]
```

---

## Bước 15: Build và Chạy Thử

```bash
# 1. Build Docker images
make build

# 2. Chạy
make oneshot

# 3. Tạo superuser
make createsuperuser

# 4. Kiểm tra
# Mở browser: http://localhost:8000
# API Docs: http://localhost:8000/api/docs/
# Admin: http://localhost:8000/admin/

# 5. Xem logs
make logs
```

### Chạy không dùng Docker (local development)

```bash
# 1. Tạo virtual environment
python3.12 -m venv .venv
source .venv/bin/activate   # Linux/Mac
# .venv\Scripts\activate    # Windows

# 2. Cài dependencies
pip install -e ".[dev]"

# 3. Set environment
export DATABASE_URL=postgres://user:pass@localhost:5432/hopluccorp
export DJANGO_SETTINGS_MODULE=config.settings.local

# 4. Chạy migrations
python manage.py migrate

# 5. Chạy server
python manage.py runserver
```

---

## Lưu Ý Nâng Cấp Django 5.1

### Thay đổi quan trọng so với Django 4.2 (PrismVio):

| Mục | Django 4.2 (cũ) | Django 5.1 (mới) |
|-----|-----------------|-------------------|
| Python | 3.8 - 3.11 | **3.10 - 3.13** |
| `DEFAULT_AUTO_FIELD` | Khuyến nghị set | **Bắt buộc** (đã set `BigAutoField`) |
| `STORAGES` | `STATICFILES_STORAGE` | Dùng dict `STORAGES` |
| LoginRequiredMiddleware | Không có | **Mới** - có thể thêm |
| Form fields | Cũ | Hỗ trợ `db_default` trên model fields |
| `HttpResponse.content_type` | Không có `charset` riêng | Default không còn `charset` trong `content_type` |

### Khi copy code từ PrismVio, chú ý:

1. **`STATICFILES_STORAGE`** → Đổi sang `STORAGES` dict (đã cập nhật trong guide)
2. **`DEFAULT_FILE_STORAGE`** → Đổi sang `STORAGES["default"]` nếu dùng custom storage
3. **`django.utils.encoding.force_text`** → Dùng `force_str` (đã deprecated từ 4.0)
4. **`django.conf.urls.url()`** → Dùng `path()` hoặc `re_path()` (đã xoá hoàn toàn)
5. **`django.utils.translation.ugettext`** → Dùng `gettext` (đã deprecated)

### Dependencies cần nâng cấp tương ứng:

Tất cả đã được cập nhật trong `pyproject.toml` ở trên. Đảm bảo:
- `djangorestframework >= 3.15` (hỗ trợ Django 5.1)
- `django-allauth >= 65.0` (hỗ trợ Django 5.1)
- `django-celery-beat >= 2.7` (hỗ trợ Django 5.1)
- `psycopg >= 3.2` (khuyến nghị dùng psycopg3 thay psycopg2)

---

## Tóm Tắt So Sánh

| | PrismVio (cũ) | HopLucCorp (mới) |
|---|---|---|
| Django | 4.2.5 | **5.1.5** |
| Python | 3.11 | **3.12** |
| Dependencies | `requirements/*.txt` | **`pyproject.toml`** |
| Linting | black + isort + flake8 | **Ruff** (all-in-one) |
| PostgreSQL | 15 | **16** |
| Redis | 6 | **7** |
| Broker | RabbitMQ | **Redis** (đơn giản hơn) |
| Apps | 14 apps | **3 apps** (users, auth, social) |
| Base image | `python:3.11-slim-bullseye` | **`python:3.12-slim-bookworm`** |
| psycopg | psycopg 3.1 | **psycopg 3.2** |

---

Chúc bạn build thành công! Nếu gặp lỗi, kiểm tra:
1. Docker Compose logs: `make logs`
2. Django logs: `make logs.django`
3. PostgreSQL connection: kiểm tra `.envs/.local/.postgres`
