# HopLucCorp - Plan kết nối Backend ↔ Frontend

> Cập nhật: 2026-03-08

## Tổng quan

Frontend Next.js đang dùng **static data** (hardcoded trong `hopluccorp-fontend/src/lib/data/`).
Cần chuyển sang dùng **Django REST API** để user quản lý nội dung qua **Django Admin**.

- **Ảnh**: Upload lên **Cloudinary** qua Django (`django-cloudinary-storage`)
- **Rich text**: Dùng **CKEditor 5** (`django-ckeditor-5`)
- **Admin**: Dùng Django Admin có sẵn (không build custom admin trên Next.js)
- **Đa ngôn ngữ**: `django-modeltranslation` — 4 ngôn ngữ: VI (default), EN, ZH, KO
- **Cleanup**: `django-cleanup` — tự động xóa ảnh cũ trên Cloudinary khi xóa/thay record

> Chi tiết i18n: xem [docs/i18n.md](./i18n.md)
> Chi tiết nhập liệu homepage: xem [docs/homepage.md](./homepage.md)

---

## Scope: 4 trang chính

| Trang | Route frontend | Data hiện tại |
|-------|---------------|---------------|
| Trang chủ | `/[locale]/` | `lib/data/homepage.ts` |
| Tin tức | `/[locale]/tin-tuc/` | `lib/data/newspage.ts` |
| Giới thiệu | `/[locale]/gioi-thieu/` | `lib/data/aboutpage.ts` |
| Dự án | `/[locale]/du-an/` | `lib/data/projectspage.ts` |

---

## Phase 1: Backend

### 1.1. Packages (`pyproject.toml`)

```
django-cloudinary-storage    # Upload ảnh lên Cloudinary
cloudinary                   # Cloudinary SDK
django-ckeditor-5            # Rich text editor
django-ordered-model         # Sortable models
django-cleanup               # Auto-delete files khi xóa/thay record
django-modeltranslation      # Đa ngôn ngữ (4 langs)
```

### 1.2. Cấu hình (`config/settings/base.py`)

- INSTALLED_APPS: `cloudinary_storage`, `cloudinary`, `django_ckeditor_5`, `ordered_model`, `django_cleanup` (cuối cùng)
- `DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"`
- Cloudinary config đọc từ env
- CKEditor 5 config (toolbar, plugins, upload)
- `LANGUAGES`: vi, en, zh, ko
- `MODELTRANSLATION_DEFAULT_LANGUAGE = "vi"`
- `MODELTRANSLATION_FALLBACK_LANGUAGES = {"default": ("vi",)}`
- `LocaleMiddleware` trong MIDDLEWARE

> **Ghi chú CKEditor:** Dự án cũ (blog_feng_shui) dùng CKEditor 4 (`django-ckeditor==6.5.1`) với toolbar đầy đủ (Source, Bold, Italic, Image upload, Table, Link, Font, Color...). CKEditor 4 đã EOL. Dự án mới dùng **CKEditor 5** (`django-ckeditor-5`) với toolbar tương đương: heading, bold, italic, link, image upload, table, list, blockquote, media embed, font color, alignment, source editing.

### 1.3. Django App mới: `pages`

**Location:** `hopluccorp/hopluccorp/pages/`

#### Models

**Homepage:**

| Model | Fields |
|-------|--------|
| `BannerSlide` | image, title, subtitle, order, is_active |
| `AboutBlock` | title, description, icon, link, order |
| `Stat` | icon, value, suffix, label, order |
| `ServiceCategory` | name, image, gradient_from, gradient_to, link, order |
| `Partner` | name, logo, type (international/domestic), order, is_active |
| `VideoSection` | youtube_id, thumbnail, title, subtitle |
| `ContactInfo` | address_hn, address_hcm, phone, email, facebook, zalo, youtube |
| `SiteLogo` | header_logo, footer_logo, favicon, qr_code |
| `BackgroundImage` | key (about/stats/category/video), image |

**Giới thiệu (About):**

| Model | Fields |
|-------|--------|
| `LeaderMessage` | title, subtitle, slogan, leader_image, leader_name, leader_position, content (CKEditor), signature_image |
| `HistoryTimeline` | year, image, description, order |
| `CoreValue` | icon, title, description, order |
| `VisionMission` | type (vision/mission), title, image, content (CKEditor) |
| `LeadershipMember` | name, position, image, order |

**Tin tức (News):**

| Model | Fields |
|-------|--------|
| `NewsCategory` | name, slug |
| `NewsArticle` | title, slug, image, category (FK), date, excerpt, content (CKEditor), is_featured, is_published |

**Dự án (Projects):**

| Model | Fields |
|-------|--------|
| `ProjectCategory` | name, slug |
| `ProjectLocation` | name |
| `Project` | name, slug, image, category (FK), location (FK), scale, progress, year, status, description (CKEditor) |

### 1.4. Django Admin

- Register tất cả models
- `list_display`, `list_filter`, `search_fields`
- CKEditor 5 widget cho rich text
- Image preview
- Ordering cho ordered models

### 1.5. API Endpoints (public, read-only)

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/pages/homepage/` | Tất cả data trang chủ (1 request) |
| GET | `/api/pages/about/` | Tất cả data trang giới thiệu |
| GET | `/api/pages/news/` | Danh sách tin (pagination, filter by category) |
| GET | `/api/pages/news/{slug}/` | Chi tiết bài viết |
| GET | `/api/pages/news/categories/` | Danh sách categories |
| GET | `/api/pages/projects/` | Danh sách dự án (pagination, filter) |
| GET | `/api/pages/projects/{slug}/` | Chi tiết dự án |
| GET | `/api/pages/projects/filters/` | Categories + locations + years |

### 1.6. Seed data

- Command: `python manage.py seed_pages`
- Migrate data từ frontend static files → database
- Chạy tự động khi Docker start

---

## Phase 2: Frontend

### 2.1. Environment

```env
# hopluccorp-fontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 2.2. API Client

```
src/lib/api/client.ts      → Fetch wrapper (base URL, error handling)
src/lib/api/homepage.ts     → fetchHomepage()
src/lib/api/about.ts        → fetchAbout()
src/lib/api/news.ts         → fetchNews(), fetchNewsDetail(slug)
src/lib/api/projects.ts     → fetchProjects(), fetchProjectDetail(slug)
```

### 2.3. Cập nhật pages

Thay `import { data } from '@/lib/data/xxx'` → API calls.
**Giữ nguyên UI components**, chỉ thay nguồn data.
Giữ `lib/data/` làm fallback nếu API chưa có data.

---

## Phase 3: Docker & Infra

- CORS: đã có `CORS_ALLOW_ALL_ORIGINS = True` (local)
- Cloudinary env vars thêm vào `.envs/.local/.django`
- `compose/local/django/start` thêm `python manage.py seed_pages`

---

## Thứ tự thực hiện

1. Backend models + migrations
2. Django Admin (register models, CKEditor)
3. API serializers + views + urls
4. Seed data (static → database)
5. Frontend API client
6. Frontend pages (thay data source)
7. Test end-to-end

---

## Trạng thái hiện tại

### Backend (đã hoàn thành)

- [x] Docker setup (PostgreSQL, Redis, Celery, Flower)
- [x] Custom User model + JWT Auth
- [x] API: users, auth (register, login, token refresh)
- [x] DB seed (6 users mặc định)
- [x] Swagger docs tại `/api/docs/`
- [x] Cloudinary integration (`django-cloudinary-storage`)
- [x] CKEditor 5 integration (`django-ckeditor-5`)
- [x] `django-cleanup` (auto-delete files)
- [x] App `pages` — Homepage models + admin + seed
- [x] App `media` — Media Library (MediaCategory + MediaItem)

### Backend (đang làm)

- [ ] `django-modeltranslation` — đa ngôn ngữ 4 langs (VI, EN, ZH, KO)
- [ ] Seed homepage 4 ngôn ngữ

### Backend (chưa làm)

- [ ] API serializers + views + urls cho `pages`
- [ ] Trang Giới thiệu — models + admin
- [ ] Trang Tin tức — mở rộng NewsArticle (categories, pagination)
- [ ] Trang Dự án — models + admin
- [ ] Seed data cho About, News, Projects

### Frontend (chưa làm)

- [ ] API client layer (`Accept-Language` header)
- [ ] Kết nối 4 trang với backend API

---

## Cấu trúc thư mục hiện tại

```
d:/laptrinh/Nextjs/hopluccorp/
├── hopluccorp/                    # Backend (Django)
│   ├── config/
│   │   ├── settings/
│   │   │   ├── base.py
│   │   │   ├── local.py
│   │   │   └── production.py
│   │   ├── urls.py
│   │   └── celery_app.py
│   ├── hopluccorp/
│   │   ├── users/                 # ✅ User model + API
│   │   ├── users_auth/            # ✅ JWT Auth
│   │   ├── social_login/          # ⬜ Chưa implement
│   │   ├── pages/                 # ⬜ CẦN TẠO
│   │   └── core/                  # ✅ Exception handler
│   ├── local.yml                  # Docker compose
│   └── pyproject.toml
│
└── hopluccorp-fontend/            # Frontend (Next.js 15)
    └── src/
        ├── app/[locale]/          # Pages (14 routes)
        ├── components/            # UI components
        ├── lib/
        │   ├── data/              # ⚠️ Static data (cần thay bằng API)
        │   ├── api/               # ⬜ CẦN TẠO
        │   └── utils/
        └── types/
```

---

## Tài khoản mặc định

| Username | Email | Password | Role |
|----------|-------|----------|------|
| admin | admin@hopluccorp.com | admin123456 | Superuser |
| staff1 | staff1@hopluccorp.com | staff123456 | Staff |
| staff2 | staff2@hopluccorp.com | staff123456 | Staff |
| user1 | user1@example.com | user123456 | User |
| user2 | user2@example.com | user123456 | User |
| user3 | user3@example.com | user123456 | User |

## URLs

| URL | Mô tả |
|-----|-------|
| http://localhost:8000 | Backend API |
| http://localhost:8000/api/docs/ | Swagger |
| http://localhost:8000/admin/ | Django Admin |
| http://localhost:5555 | Flower (Celery) - admin/admin |
| http://localhost:3000 | Frontend (Next.js) |

## Ports

| Service | Host Port | Container Port |
|---------|-----------|---------------|
| Django | 8000 | 8000 |
| PostgreSQL | 5433 | 5432 |
| Redis | 6381 | 6379 |
| Flower | 5555 | 5555 |
