# AGENTS.md — Quy tắc làm việc

## Nguyên tắc BẮT BUỘC

### 1. LUÔN HỎI TRƯỚC KHI LÀM
- **KHÔNG tự ý chạy Docker build/up** — hỏi user trước
- **KHÔNG tự ý chạy git** (commit, push, branch) — hỏi user trước
- **KHÔNG chạy lệnh tốn thời gian** (build, migrate, test suite) — hỏi user trước
- **KHÔNG tự ý xóa file/data** — hỏi user trước
- Khi sửa code xong → thông báo cho user biết đã sửa gì, để user tự chạy build/test

### 2. TIẾT KIỆM TOKEN
- Không chạy Docker build trong conversation (tốn token chờ đợi)
- Không lặp lại lệnh khi bị lỗi — dừng lại, hỏi user
- Không đọc file quá dài nếu chỉ cần vài dòng
- Tập trung vào code, để user tự chạy commands

### 3. THẢO LUẬN TRƯỚC KHI CODE
- Task mới → thảo luận approach trước
- Thay đổi lớn (thêm package, đổi cấu trúc) → hỏi ý kiến trước
- Không assume — nếu không chắc thì hỏi

### 4. GIT
- **TUYỆT ĐỐI KHÔNG** tự commit/push
- Nếu cần git operations → chỉ gợi ý lệnh, user tự chạy

---

## Project Structure

```
hopluccorp/                    ← Root
├── hopluccorp/                ← Django project (backend)
│   ├── config/settings/       ← Django settings (base.py, local.py)
│   ├── hopluccorp/            ← Django apps
│   │   ├── users/             ← Custom User model
│   │   ├── users_auth/        ← JWT auth
│   │   ├── media/             ← Media Library (Cloudinary)
│   │   └── pages/             ← Homepage models + admin
│   ├── local.yml              ← Docker Compose
│   ├── Makefile               ← Make commands
│   └── docs/                  ← Documentation
│       ├── PLAN.md            ← Kế hoạch tổng thể
│       ├── homepage.md        ← Hướng dẫn nhập liệu homepage
│       └── i18n.md            ← Tài liệu đa ngôn ngữ
└── hopluccorp-fontend/        ← Next.js frontend
```

## Tech Stack
- **Backend**: Django 5.1.5 + DRF + PostgreSQL 16 + Redis 7 + Celery
- **Frontend**: Next.js 15 + React 19 + Tailwind CSS
- **CMS**: django-ckeditor-5, django-cloudinary-storage, django-modeltranslation
- **i18n**: 4 ngôn ngữ (vi, en, zh, ko) — django-modeltranslation
- **Docker**: local.yml (PostgreSQL:5433, Redis:6381)
- **Auth**: JWT (SimpleJWT)

## Trạng thái hiện tại

### Đã hoàn thành
- [x] Docker setup (Django, PostgreSQL, Redis, Celery, Flower)
- [x] Custom User model + JWT auth + seed 6 users
- [x] CKEditor 5 + Cloudinary config
- [x] Media app (MediaCategory, MediaItem)
- [x] Pages app (9 models homepage)
- [x] Admin với TabbedTranslationAdmin
- [x] Seed homepage 4 ngôn ngữ (code ready)
- [x] Docs: PLAN.md, homepage.md, i18n.md

### Cần làm (chưa build/test)
- [ ] Build Docker lại (thêm django-modeltranslation package)
- [ ] Tạo migration cho translation fields
- [ ] Chạy migrate + seed_homepage --reset
- [ ] Tạo API serializers + views cho homepage
- [ ] Kết nối frontend ↔ backend API
- [ ] Các trang: About, News detail, Projects

## Make Commands
```bash
make build          # Build Docker
make up             # Start services
make down           # Stop services
make logs           # View logs
make seed           # Seed users
make seed.homepage  # Seed homepage data
make seed.homepage.reset  # Reset + seed homepage
```

## Default Accounts
| Username | Password | Role |
|----------|----------|------|
| admin | admin123456 | Superuser |
| staff1 | staff123456 | Staff |
| staff2 | staff123456 | Staff |
| user1/user2/user3 | user123456 | User |



# SSH vào server Dokku
ssh root@<IP_server>

# Chạy seed command trong Dokku app
dokku run hopluc-api python manage.py seed_projects --reset
