# HopLucCorp

HopLucCorp - Django REST API Backend

[![Python](https://img.shields.io/badge/Python-3.12-blue.svg)](https://www.python.org/downloads/)
[![Django](https://img.shields.io/badge/Django-5.1-green.svg)](https://www.djangoproject.com/)
[![DRF](https://img.shields.io/badge/DRF-3.15-red.svg)](https://www.django-rest-framework.org/)
[![Ruff](https://img.shields.io/badge/code%20style-ruff-000000.svg)](https://github.com/astral-sh/ruff)

---

## Tech Stack

| Component | Version |
|-----------|---------|
| Python | 3.12 |
| Django | 5.1.5 |
| Django REST Framework | 3.15.2 |
| PostgreSQL | 16 |
| Redis | 7 |
| Celery | 5.4.0 |
| Uvicorn | 0.34.0 |
| Gunicorn | 23.0.0 |
| Docker Compose | v2 |

---

## 1. Chạy Local (Không Docker)

### 1.1. Yêu cầu

- Python 3.12+
- PostgreSQL 16
- Redis 7

### 1.2. Tạo virtual environment

**Windows:**
```bash
python -m venv .venv
.venv\Scripts\activate
```

**macOS / Linux:**
```bash
python3.12 -m venv .venv
source .venv/bin/activate
```

### 1.3. Cài dependencies

```bash
pip install --upgrade pip
pip install -e ".[dev]"
```

### 1.4. Cấu hình environment

Copy file `.env.example` thành `.env` và chỉnh sửa:

```bash
cp .env.example .env
```

Nội dung `.env`:
```bash
DATABASE_URL=postgres://hopluccorp_dev:hopluccorp_dev_password@localhost:5432/hopluccorp
CELERY_BROKER_URL=redis://localhost:6379/0
DJANGO_SETTINGS_MODULE=config.settings.local
DJANGO_DEBUG=True
```

### 1.5. Tạo database PostgreSQL

```bash
# Đăng nhập PostgreSQL
psql -U postgres

# Tạo user và database
CREATE USER hopluccorp_dev WITH PASSWORD 'hopluccorp_dev_password';
CREATE DATABASE hopluccorp OWNER hopluccorp_dev;
ALTER USER hopluccorp_dev CREATEDB;
\q
```

### 1.6. Chạy migrations

```bash
python manage.py migrate
```

### 1.7. Tạo superuser

```bash
python manage.py createsuperuser
```

### 1.8. Chạy server

```bash
python manage.py runserver
```

Server chạy tại: http://localhost:8000

### 1.9. Chạy Celery (terminal riêng)

```bash
# Worker
celery -A config.celery_app worker --loglevel=INFO

# Beat (scheduled tasks) - terminal khác
celery -A config.celery_app beat --loglevel=INFO --scheduler django_celery_beat.schedulers:DatabaseScheduler
```

### 1.10. Kiểm tra

| URL | Mô tả |
|-----|-------|
| http://localhost:8000 | Health check |
| http://localhost:8000/ping/ | Ping pong |
| http://localhost:8000/api/docs/ | Swagger API Docs |
| http://localhost:8000/admin/ | Django Admin |

---

## 2. Chạy với Docker (Step by Step cho Team)

### Yêu cầu
- Docker Desktop (bao gồm Docker Compose v2)
- Git

### Step 1: Clone project

```bash
git clone <repo-url>
cd hopluccorp
```

### Step 2: Cấu hình Cloudinary (bắt buộc nếu muốn upload ảnh)

Mở file `.envs/.local/.django`, kiểm tra 3 dòng cuối:

```bash
CLOUDINARY_CLOUD_NAME=dcbvevlly
CLOUDINARY_API_KEY=961257116877381
CLOUDINARY_API_SECRET=UuGPrfGifiA-4CPlQs6mY-h4mK0
```

> Nếu chưa có hoặc sai → lấy credentials tại https://console.cloudinary.com/settings/api-keys

### Step 3: Build Docker images (lần đầu tiên)

```bash
make build
```

> Lần đầu sẽ tốn ~5-10 phút. Các lần sau dùng `make build.cache` nhanh hơn.
> Chỉ cần build lại khi thay đổi dependencies trong `pyproject.toml`.

### Step 4: Khởi động tất cả services

```bash
make oneshot
```

Đợi ~30 giây cho tất cả services khởi động. Kiểm tra logs:

```bash
make logs
```

Khi thấy dòng `Uvicorn running on http://0.0.0.0:8000` là thành công. Nhấn `Ctrl+C` để thoát logs.

Services đang chạy:

| Service | URL | Mô tả |
|---------|-----|-------|
| Django API | http://localhost:8000 | Backend server |
| Swagger Docs | http://localhost:8000/api/docs/ | API documentation |
| Django Admin | http://localhost:8000/admin/ | Quản lý nội dung |
| Flower | http://localhost:5555 | Celery monitoring |
| PostgreSQL | localhost:5433 | Database |
| Redis | localhost:6381 | Cache & Message Broker |

### Step 5: Tạo migration cho đa ngôn ngữ (lần đầu tiên)

```bash
make makemigrations
make migrate
```

> `makemigrations` tạo file migration cho translation fields (modeltranslation).
> `migrate` áp dụng tất cả migrations vào database.

### Step 6: Seed dữ liệu mẫu

```bash
# Seed tài khoản users
make seed

# Seed dữ liệu homepage (4 ngôn ngữ)
make seed.homepage
```

### Step 7: Đăng nhập Django Admin

Mở http://localhost:8000/admin/ → đăng nhập:

| Username | Password |
|----------|----------|
| `admin` | `admin123456` |

### Step 8: Nhập liệu homepage

Trong Django Admin, vào section **HOMEPAGE** để nhập nội dung + upload ảnh.
Chi tiết xem [docs/homepage.md](docs/homepage.md).

---

### Tài khoản mặc định (sau khi seed)

| Account | Username | Email | Password |
|---------|----------|-------|----------|
| Admin | `admin` | admin@hopluccorp.com | `admin123456` |
| Staff 1 | `staff1` | staff1@hopluccorp.com | `staff123456` |
| Staff 2 | `staff2` | staff2@hopluccorp.com | `staff123456` |
| User 1 | `user1` | user1@example.com | `user123456` |
| User 2 | `user2` | user2@example.com | `user123456` |
| User 3 | `user3` | user3@example.com | `user123456` |

> **Lưu ý:** Login API dùng `username` (không phải email). Ví dụ: `{"username": "admin", "password": "admin123456"}`

---

### Các lệnh thường dùng

```bash
# Khởi động
make oneshot

# Dừng
make stop

# Khởi động lại
make restart

# Xem logs tất cả
make logs

# Xem logs chỉ Django
make logs.django

# Xem logs chỉ Celery Worker
make logs.celeryworker

# Truy cập shell Django container
make shell

# Chạy migrations
make makemigrations
make migrate

# Seed data
make seed                  # Seed users
make seed.reset            # Reset + seed lại users
make seed.homepage         # Seed homepage
make seed.homepage.reset   # Reset + seed lại homepage

# Tạo superuser thủ công
make createsuperuser

# Chạy tests
make test

# Build lại (khi thay đổi pyproject.toml)
make build          # Không cache (chắc chắn nhất)
make build.cache    # Có cache (nhanh hơn)

# Xoá hoàn toàn (kể cả database data)
make destroy
```

---

### Khi gặp lỗi

| Lỗi | Nguyên nhân | Cách fix |
|-----|-------------|----------|
| `ModuleNotFoundError` | Package mới chưa được cài | `make build` rồi `make oneshot` |
| `column xxx does not exist` | Chưa chạy migration | `make makemigrations` rồi `make migrate` |
| `port already allocated` | Port bị chiếm | Tắt app đang dùng port hoặc đổi port trong `local.yml` |
| `relation xxx does not exist` | Database chưa migrate | `make migrate` |
| Container không khởi động | Lỗi code | `make logs.django` để xem chi tiết |

---

## 3. Chạy Production với Docker

### 3.1. Cấu hình environment

Chỉnh sửa các file trong `.envs/.production/`:

**.envs/.production/.django:**
```bash
DJANGO_SECRET_KEY=your-random-secret-key-here
DJANGO_ADMIN_URL=your-secret-admin-url/
DJANGO_ALLOWED_HOSTS=api.hopluccorp.com
REDIS_URL=redis://redis:6379/0
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_FLOWER_USER=admin
CELERY_FLOWER_PASSWORD=your-strong-password
SENTRY_DSN=your-sentry-dsn
```

**.envs/.production/.postgres:**
```bash
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=hopluccorp
POSTGRES_USER=hopluccorp_prod
POSTGRES_PASSWORD=your-strong-db-password
DATABASE_URL=postgres://hopluccorp_prod:your-strong-db-password@postgres:5432/hopluccorp
```

### 3.2. Build và chạy

```bash
# Build
docker compose -f production.yml build

# Chạy
docker compose -f production.yml up -d

# Xem logs
docker compose -f production.yml logs -f
```

### 3.3. Database backup & restore

```bash
# Backup
docker compose -f production.yml exec postgres /maintenance/backup

# Xem danh sách backups
docker compose -f production.yml exec postgres /maintenance/list_backups

# Restore
docker compose -f production.yml exec postgres /maintenance/restore <backup_filename>
```

---

## 4. Cấu Trúc Dự Án

```
hopluccorp/
├── pyproject.toml              # Dependencies + tool config
├── manage.py                   # Django management
├── Makefile                    # Shortcut commands
├── local.yml                   # Docker Compose (dev)
├── production.yml              # Docker Compose (prod)
├── .envs/                      # Environment variables
├── config/                     # Django configuration
│   ├── settings/
│   │   ├── base.py             # Base settings
│   │   ├── local.py            # Dev settings
│   │   ├── production.py       # Prod settings
│   │   └── test.py             # Test settings
│   ├── urls.py                 # URL routing
│   ├── celery_app.py           # Celery config
│   ├── asgi.py                 # ASGI (Uvicorn)
│   └── wsgi.py                 # WSGI (Gunicorn)
├── hopluccorp/                 # Main application
│   ├── users/                  # User management
│   ├── users_auth/             # Authentication (JWT)
│   ├── social_login/           # Social auth
│   ├── media/                  # Media library (Cloudinary upload)
│   ├── pages/                  # CMS pages (Homepage, About, Organization, Resources, Projects, News...)
│   │   ├── models.py           # Homepage + About + Organization + Resources + Projects models
│   │   ├── serializers.py      # DRF serializers
│   │   ├── views.py            # API views (HomepageView, AboutPageView, etc.)
│   │   ├── urls.py             # API URLs (/api/pages/...)
│   │   ├── admin.py            # Django Admin registration
│   │   ├── translation.py      # django-modeltranslation (4 ngôn ngữ)
│   │   └── management/commands/ # seed_homepage, seed_about, seed_organization, seed_resources, seed_projects
│   ├── core/                   # Shared utilities
│   └── utils/                  # Helper functions
├── compose/                    # Docker configs
│   ├── local/django/           # Dev Dockerfile + scripts
│   └── production/             # Prod Dockerfile + scripts
└── tests/                      # Test files
```

---

## 5. API Endpoints

### Authentication

| Method | URL | Mô tả |
|--------|-----|-------|
| POST | `/api/auth/register/` | Đăng ký tài khoản mới |
| POST | `/api/auth/login/` | Đăng nhập (nhận JWT token + user info) |
| POST | `/api/auth/token/refresh/` | Refresh JWT token |

### Users

| Method | URL | Mô tả |
|--------|-----|-------|
| GET | `/api/users/` | Danh sách users |
| GET | `/api/users/{id}/` | Chi tiết user |
| GET | `/api/users/me/` | Thông tin user hiện tại |
| PUT/PATCH | `/api/users/{id}/` | Cập nhật user |

### Pages (Homepage)

| Method | URL | Mô tả |
|--------|-----|-------|
| GET | `/api/pages/homepage/` | Lấy toàn bộ dữ liệu homepage (1 call) |

Response `/api/pages/homepage/`:
```json
{
  "banners": [{"id", "title", "image", "alt"}],
  "about_section": {"label", "title", "description", "cta_text", "cta_link"},
  "about_blocks": [{"id", "title", "subtitle", "image", "icon", "link"}],
  "video_section": {"title", "subtitle", "youtube_id", "thumbnail"},
  "stats": [{"id", "icon", "number", "suffix", "label"}],
  "categories": [{"id", "title", "subtitle", "image", "link"}],
  "partners": [{"id", "name", "logo"}]
}
```

### Pages (About)

| Method | URL | Mô tả |
|--------|-----|-------|
| GET | `/api/pages/about/` | Lấy toàn bộ dữ liệu trang Giới thiệu |

### Pages (Organization)

| Method | URL | Mô tả |
|--------|-----|-------|
| GET | `/api/pages/organization/` | Lấy dữ liệu trang Cơ cấu tổ chức |

### Pages (Resources / Nguồn lực)

| Method | URL | Mô tả |
|--------|-----|-------|
| GET | `/api/pages/resources/` | Lấy dữ liệu trang Nguồn lực |

Response `/api/pages/resources/`:
```json
{
  "banner": {"image", "alt"},
  "human_resources": {"title", "description", "image", "total_staff", "staff_breakdown": [...]},
  "management_system": {"title", "description", "slogan", "certificates": [...]},
  "projects_section": {"title", "total_projects", "background_image"},
  "projects": [{"id", "name", "location", "province"}],
  "provinces": ["Tất cả", "Nghệ An", ...]
}
```

### Pages (SEO)

| Method | URL | Mô tả |
|--------|-----|-------|
| GET | `/api/pages/seo/{page_key}/` | Lấy SEO metadata cho 1 trang |

### Projects (Dự án)

| Method | URL | Mô tả |
|--------|-----|-------|
| GET | `/api/pages/projects/` | Danh sách dự án (có filter + pagination) |
| GET | `/api/pages/projects/{slug}/` | Chi tiết 1 dự án |
| GET | `/api/pages/projects/categories/` | Danh sách danh mục dự án |

Query params cho `/api/pages/projects/`:
- `?category={slug}` — filter theo danh mục (cong-nghiep, dan-dung, ha-tang)
- `?status=ongoing|completed` — filter theo trạng thái
- `?search=keyword` — tìm kiếm theo tên, địa điểm
- `?lang=vi|en|zh-hans|ko` — đa ngôn ngữ

> **Đa ngôn ngữ:** Thêm `?lang=vi|en|zh-hans|ko` vào URL để lấy dữ liệu theo ngôn ngữ.

---

## 6. Lệnh Makefile

| Lệnh | Mô tả |
|-------|-------|
| `make build` | Build Docker images (không cache) |
| `make build.cache` | Build Docker images (có cache) |
| `make oneshot` | Khởi động tất cả services |
| `make stop` | Dừng tất cả services |
| `make restart` | Khởi động lại |
| `make destroy` | Xoá tất cả (kể cả data) |
| `make logs` | Xem logs tất cả services |
| `make logs.django` | Xem logs Django |
| `make logs.celeryworker` | Xem logs Celery |
| `make shell` | Truy cập shell Django container |
| `make migrate` | Chạy database migrations |
| `make makemigrations` | Tạo migration files mới |
| `make createsuperuser` | Tạo tài khoản admin |
| `make test` | Chạy tests |
| `make seed` | Seed tài khoản mặc định |
| `make seed.reset` | Reset + seed lại tài khoản |
| `make seed.homepage` | Seed dữ liệu homepage |
| `make seed.homepage.reset` | Reset + seed lại homepage |
| `make seed.about` | Seed dữ liệu trang Giới thiệu |
| `make seed.about.reset` | Reset + seed lại Giới thiệu |
| `make seed.organization` | Seed dữ liệu trang Cơ cấu tổ chức |
| `make seed.organization.reset` | Reset + seed lại Cơ cấu tổ chức |
| `make seed.resources` | Seed dữ liệu trang Nguồn lực |
| `make seed.resources.reset` | Reset + seed lại Nguồn lực |
| `make seed.projects` | Seed dữ liệu trang Dự án (19 dự án) |
| `make seed.projects.reset` | Reset + seed lại Dự án |
| `make seed.all` | Reset + seed tất cả (users + homepage + about + organization + resources + projects + seo) |
| `make runserver` | Chạy local (không Docker) |
| `make celery` | Chạy Celery worker (không Docker) |

---

## 7. Code Quality

### Lint & Format (Ruff)

```bash
# Check lỗi
ruff check .

# Auto fix
ruff check --fix .

# Format code
ruff format .
```

### Type Check (mypy)

```bash
mypy hopluccorp
```

### Test

```bash
# Chạy tests
pytest

# Với coverage
coverage run -m pytest
coverage html
# Mở htmlcov/index.html
```

---

## 8. Tạo App Mới

```bash
# Bước 1: Tạo app
cd hopluccorp
python ../manage.py startapp <app_name>

# Bước 2: Sửa apps.py
# name = "hopluccorp.<app_name>"

# Bước 3: Thêm vào config/settings/base.py
# LOCAL_APPS = [
#     ...
#     "hopluccorp.<app_name>",
# ]

# Bước 4: Tạo migrations
python manage.py makemigrations
python manage.py migrate

# Bước 5: Thêm URLs vào config/urls.py
# path("api/<app_name>/", include("hopluccorp.<app_name>.urls")),
```

---

## 9. CMS & Media (Cloudinary + CKEditor 5)

### 9.1. Tổng quan

- **Cloudinary** — Lưu trữ ảnh trên cloud (không lưu local)
- **CKEditor 5** — Rich text editor trong Django Admin
- **django-ordered-model** — Kéo thả sắp xếp thứ tự items

### 9.2. Cấu hình Cloudinary

Thêm credentials vào `.envs/.local/.django`:
```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Lấy credentials tại: https://console.cloudinary.com/settings/api-keys

### 9.3. Nhập liệu qua Django Admin

**Bước 1:** Chạy Docker + migrate
```bash
# Build + khởi động
make build
make oneshot
# Đợi container khởi động xong

# Migrate (Makefile)
make migrate
# hoặc docker trực tiếp
docker compose -f local.yml exec django python manage.py migrate
```

**Bước 2:** Seed dữ liệu mẫu (text only, chưa có ảnh)
```bash
# Seed tất cả cùng lúc (khuyến nghị)
make seed.all

# Hoặc seed từng trang:
make seed.homepage
make seed.about
make seed.organization
make seed.resources
make seed.projects

# Reset rồi seed lại
make seed.homepage.reset
make seed.projects.reset
```

**Bước 3:** Vào Django Admin tại http://localhost:8000/admin/

Đăng nhập: `admin` / `admin123456`

**Bước 4:** Nhập liệu trong section **PAGES**:

#### Homepage (①~⑧)

| Model | Mô tả | Cách nhập |
|-------|--------|----------|
| **① Banner Slides** | Ảnh banner carousel | Thêm mới → upload ảnh + title + alt text |
| **② About Section** | Nội dung giới thiệu | Chỉ 1 bản ghi → sửa label, title, description (CKEditor) |
| **③ About Blocks** | 3 cards giới thiệu | Mỗi card: title, subtitle, ảnh nền, icon, link |
| **④ Video Section** | Video nổi bật | Chỉ 1 bản ghi → YouTube ID + thumbnail |
| **⑤ Stat Items** | Con số thống kê | Mỗi item: icon, số, label (VD: 16 Năm hoạt động) |
| **⑥ Business Categories** | Lĩnh vực hoạt động | 5 mục: title, subtitle, ảnh, link |
| **⑦ Partners** | Logo đối tác | Mỗi partner: tên + logo |

#### Giới thiệu (⑧~⑩)

| Model | Mô tả |
|-------|--------|
| **⑧ Banner Giới thiệu** | Ảnh banner trang Giới thiệu |
| **⑨ About Intro** | Nội dung giới thiệu chính (CKEditor) |
| **⑩ Lịch sử / Giá trị / Tầm nhìn** | Các section timeline, core values, vision |

#### Cơ cấu tổ chức (⑪~⑬)

| Model | Mô tả |
|-------|--------|
| **⑪ Banner CCTC** | Ảnh banner |
| **⑫ Org Chart Levels** | Sơ đồ tổ chức (drag-to-reorder) |
| **⑬ Member Companies** | Công ty thành viên |

#### Nguồn lực (⑯~⑲)

| Model | Mô tả |
|-------|--------|
| **⑯ Banner Nguồn lực** | Ảnh banner |
| **⑰ Nguồn nhân lực** | Tổng nhân sự + breakdown |
| **⑱ Hệ thống quản lý** | ISO certificates |
| **⑲ Dự án tiêu biểu** | Danh sách dự án + filter theo tỉnh |

#### Dự án (⑳)

| Model | Mô tả |
|-------|--------|
| **⑳ Danh mục dự án** | Categories: Công nghiệp, Dân dụng, Hạ tầng |
| **⑳ Dự án** | Từng dự án: tên, ảnh, địa điểm, quy mô, tiến độ, trạng thái |

> Tất cả ảnh upload sẽ tự động lưu lên Cloudinary.
> Các model có nút ↑↓ để sắp xếp thứ tự hiển thị.
> Tất cả text fields hỗ trợ 4 ngôn ngữ (VI, EN, ZH, KO) qua tabs.

**Bước 5:** Upload ảnh trong section **MEDIA LIBRARY** (tuỳ chọn):

| Model | Mô tả |
|-------|--------|
| **Media Categories** | Tạo category phân loại ảnh (VD: Banner, Logo, Dự án...) |
| **Media Items** | Upload ảnh + gán category + alt text |

### 9.4. Kiểm tra API

Sau khi nhập liệu, gọi API để xem dữ liệu:

```bash
curl http://localhost:8000/api/pages/homepage/
```

Hoặc mở Swagger: http://localhost:8000/api/docs/ → tìm `/api/pages/homepage/`

### 9.5. Kết nối Database (DBeaver)

| Field | Value |
|-------|-------|
| Host | `localhost` |
| Port | `5433` |
| Database | `hopluccorp` |
| Username | `hopluccorp_dev` |
| Password | `hopluccorp_dev_password` |

> Nếu gặp lỗi `TimeZone: Asia/Saigon` → Trong DBeaver: Edit Connection → Driver properties → đổi TimeZone thành `Asia/Ho_Chi_Minh`
