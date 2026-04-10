# HopLucCorp — Hướng dẫn Deploy chi tiết

> **Repo:** https://github.com/baothi/hopluccorp (monorepo: backend + frontend + terraform)
>
> Deploy Django backend + Next.js frontend lên Dokku (DigitalOcean)
> Demo mode: `terraform apply` tạo, `terraform destroy` xóa sạch.

---

## Mục lục

1. [Tổng quan kiến trúc](#1-tổng-quan-kiến-trúc)
2. [Yêu cầu trước khi bắt đầu](#2-yêu-cầu-trước-khi-bắt-đầu)
3. [Bước 1 — Cấu hình DNS](#3-bước-1--cấu-hình-dns)
4. [Bước 2 — Chuẩn bị Terraform](#4-bước-2--chuẩn-bị-terraform)
5. [Bước 3 — Chạy Terraform (tạo infra trên server)](#5-bước-3--chạy-terraform)
6. [Bước 4 — Deploy lần đầu (thủ công)](#6-bước-4--deploy-lần-đầu)
7. [Bước 5 — Bật SSL (Let's Encrypt)](#7-bước-5--bật-ssl)
8. [Bước 6 — Tạo admin + seed data](#8-bước-6--tạo-admin--seed-data)
9. [Bước 7 — Setup CI/CD (GitHub Actions)](#9-bước-7--setup-cicd)
10. [Xóa demo (terraform destroy)](#10-xóa-demo)
11. [Troubleshooting](#11-troubleshooting)
12. [Lệnh Dokku thường dùng](#12-lệnh-dokku-thường-dùng)

---

## 1. Tổng quan kiến trúc

```
DigitalOcean Droplet: 167.172.118.162 (Ubuntu 24.04, 8GB RAM)
│
├── Dokku (PaaS)
│   │
│   ├── hopluc-api   (Django 5.1 + Gunicorn + Uvicorn)
│   │   ├── Domain:   hoplucapi.verde.vn
│   │   ├── Port:     5000 (internal)
│   │   ├── Database: hopluc-db (PostgreSQL via Dokku plugin)
│   │   ├── Cache:    hopluc-redis (Redis via Dokku plugin)
│   │   └── Storage:  Cloudinary (images)
│   │
│   ├── hopluc-web   (Next.js 15 standalone)
│   │   ├── Domain:   hopluc.verde.vn
│   │   ├── Port:     3000 (internal)
│   │   └── API:      → hoplucapi.verde.vn
│   │
│   └── (Apps khác: verde-api, verde-web — không ảnh hưởng)
│
├── Nginx (Dokku tự quản lý, reverse proxy)
└── Let's Encrypt SSL (tự động gia hạn)
```

**Flow deploy:**
```
Local machine                  GitHub                    Dokku Server
─────────────                  ──────                    ────────────
terraform apply  ──SSH──────────────────────────────────→ Tạo apps, DB, Redis
git push master  ─────────→ GitHub Actions ──SSH/Docker→ Build + deploy
terraform destroy ──SSH─────────────────────────────────→ Xóa sạch
```

---

## 2. Yêu cầu trước khi bắt đầu

### Máy local cần cài:

| Tool | Version | Kiểm tra | Cài đặt |
|------|---------|----------|---------|
| Terraform | >= 1.0 | `terraform -v` | https://terraform.io/downloads |
| Docker | >= 20.0 | `docker -v` | https://docker.com |
| Git | >= 2.0 | `git -v` | https://git-scm.com |
| SSH key | - | `ls ~/.ssh/id_rsa` | `ssh-keygen -t rsa -b 4096` |

### Accounts cần có:

| Service | Cần gì | Lấy ở đâu |
|---------|--------|-----------|
| DigitalOcean | SSH access vào Droplet | Đã có |
| Cloudinary | CLOUD_NAME, API_KEY, API_SECRET | https://cloudinary.com/console |
| GitHub | Repo `baothi/hopluccorp` + Secrets cho CI/CD | https://github.com/baothi/hopluccorp |
| PA Vietnam | Quản lý DNS verde.vn | https://pavietnam.vn |

### Kiểm tra SSH vào server:

```bash
ssh root@167.172.118.162

# Thấy output này là OK:
# Welcome to Ubuntu 24.04.3 LTS
# ...
# root@dokku0375...

# Kiểm tra Dokku:
dokku version
# Dokku version 0.x.x

# Xem apps hiện tại:
dokku apps:list
# =====> My Apps
# verde-api
# verde-web

exit
```

---

## 3. Bước 1 — Cấu hình DNS

> Chỉ cần làm 1 lần. DNS propagation mất 5-30 phút.

### Đăng nhập PA Vietnam

1. Vào https://pavietnam.vn → đăng nhập
2. Chọn domain `verde.vn` → Quản lý DNS
3. Thêm 2 bản ghi **A record**:

| Host | Type | Value | TTL |
|------|------|-------|-----|
| `hopluc` | A | `167.172.118.162` | 300 |
| `hoplucapi` | A | `167.172.118.162` | 300 |

### Kiểm tra DNS đã propagate:

```bash
# Chờ 5-30 phút rồi kiểm tra:
ping hopluc.verde.vn
# → 167.172.118.162

ping hoplucapi.verde.vn
# → 167.172.118.162

# Hoặc dùng nslookup:
nslookup hopluc.verde.vn
nslookup hoplucapi.verde.vn
```

---

## 4. Bước 2 — Chuẩn bị Terraform

### 4.1 Tạo file secrets

```bash
cd terraform/
cp terraform.tfvars.example terraform.tfvars
```

### 4.2 Sửa `terraform.tfvars`

Mở file và điền giá trị thật:

```hcl
dokku_host           = "167.172.118.162"
ssh_private_key_path = "~/.ssh/id_rsa"     # path tới SSH key của bạn

# Domains
api_domain = "hoplucapi.verde.vn"
web_domain = "hopluc.verde.vn"

# Django — tạo secret key bằng lệnh:
#   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
django_secret_key = "paste-secret-key-ở-đây"
django_admin_url  = "hlc-admin/"           # URL trang admin, đổi để bảo mật

# Cloudinary — lấy từ https://cloudinary.com/console
cloudinary_cloud_name = "your-cloud-name"
cloudinary_api_key    = "your-api-key"
cloudinary_api_secret = "your-api-secret"

# Sentry (bỏ trống nếu chưa dùng)
sentry_dsn = ""
```

### 4.3 Cách tạo Django SECRET_KEY

```bash
# Cách 1: Dùng Python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"

# Cách 2: Dùng openssl
openssl rand -base64 50
```

---

## 5. Bước 3 — Chạy Terraform

> Bước này SSH vào server và tự động tạo tất cả.

```bash
cd terraform/

# 5.1 — Khởi tạo Terraform (chỉ chạy lần đầu)
terraform init
```

Output mong đợi:
```
Initializing provider plugins...
- Finding hashicorp/null versions matching "~> 3.0"...
- Installing hashicorp/null v3.2.3...
Terraform has been successfully initialized!
```

```bash
# 5.2 — Xem preview những gì sẽ tạo
terraform plan
```

Output mong đợi:
```
Plan: 1 to add, 0 to change, 0 to destroy.
```

```bash
# 5.3 — Thực thi! (gõ "yes" khi được hỏi)
terraform apply
```

### Output mong đợi khi chạy xong:

```
null_resource.dokku_setup: Creating...
========================================
 HopLucCorp — Dokku Setup
========================================
[1/7] Checking Dokku plugins...
  Installing dokku-postgres...        ← lần đầu cài plugin
  Installing dokku-redis...
  Installing dokku-letsencrypt...
[2/7] Creating apps...
  Created hopluc-api
  Created hopluc-web
[3/7] Setting up PostgreSQL...
  Created database hopluc-db
  Linked hopluc-db → hopluc-api
[4/7] Setting up Redis...
  Created redis hopluc-redis
  Linked hopluc-redis → hopluc-api
[5/7] Setting environment variables...
  Backend env vars set
  Frontend env vars set
[6/7] Setting domains...
  hopluc-api → hoplucapi.verde.vn
  hopluc-web → hopluc.verde.vn
[7/7] Setting ports...

========================================
 Setup Complete!
========================================

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.

Outputs:

admin_url = "https://hoplucapi.verde.vn/hlc-admin/"
api_url   = "https://hoplucapi.verde.vn"
web_url   = "https://hopluc.verde.vn"
```

### Kiểm tra trên server:

```bash
ssh root@167.172.118.162

dokku apps:list
# =====> My Apps
# hopluc-api        ← MỚI
# hopluc-web        ← MỚI
# verde-api
# verde-web

dokku config:show hopluc-api
# =====> hopluc-api env vars
# CLOUDINARY_API_KEY:      ...
# CLOUDINARY_API_SECRET:   ...
# CLOUDINARY_CLOUD_NAME:   ...
# CORS_ALLOWED_ORIGINS:    https://hopluc.verde.vn
# DATABASE_URL:            postgres://...        ← tự động từ plugin
# DJANGO_ADMIN_URL:        hlc-admin/
# DJANGO_ALLOWED_HOSTS:    hoplucapi.verde.vn
# DJANGO_SECRET_KEY:       ...
# DJANGO_SETTINGS_MODULE:  config.settings.production
# REDIS_URL:               redis://...           ← tự động từ plugin

dokku postgres:info hopluc-db
dokku redis:info hopluc-redis

exit
```

---

## 6. Bước 4 — Deploy lần đầu

> Lần đầu deploy thủ công. Sau đó GitHub Actions tự động.

### 6.1 Deploy Backend (Django)

```bash
# Từ root của repo (folder chứa hopluccorp/ và hopluccorp-fontend/)
cd hopluccorp

# Build Docker image
docker build -f compose/production/django/Dockerfile -t hopluc-api:latest .

# Tag cho GitHub Container Registry
docker tag hopluc-api:latest ghcr.io/baothi/hopluccorp/hopluc-api:latest

# Login GitHub Container Registry (chỉ lần đầu)
# Tạo token tại: https://github.com/settings/tokens (scope: write:packages)
echo "YOUR_GITHUB_TOKEN" | docker login ghcr.io -u baothi --password-stdin

# Push image
docker push ghcr.io/baothi/hopluccorp/hopluc-api:latest

# Deploy lên Dokku
ssh root@167.172.118.162 "\
  docker pull ghcr.io/baothi/hopluccorp/hopluc-api:latest && \
  dokku git:from-image hopluc-api ghcr.io/baothi/hopluccorp/hopluc-api:latest"
```

### 6.2 Deploy Frontend (Next.js)

```bash
cd ../hopluccorp-fontend

# Build Docker image (truyền API URL qua build arg)
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://hoplucapi.verde.vn \
  -t hopluc-web:latest .

# Tag + push
docker tag hopluc-web:latest ghcr.io/baothi/hopluccorp/hopluc-web:latest
docker push ghcr.io/baothi/hopluccorp/hopluc-web:latest

# Deploy lên Dokku
ssh root@167.172.118.162 "\
  docker pull ghcr.io/baothi/hopluccorp/hopluc-web:latest && \
  dokku git:from-image hopluc-web ghcr.io/baothi/hopluccorp/hopluc-web:latest"
```

### 6.3 Kiểm tra deploy

```bash
ssh root@167.172.118.162

# Xem logs backend
dokku logs hopluc-api -t
# ... PostgreSQL is available
# ... Performing system checks...
# ... System check identified no issues
# ... [INFO] Starting gunicorn...

# Xem logs frontend
dokku logs hopluc-web -t
# ... Ready in ...ms
# ... Listening on http://0.0.0.0:3000

# Kiểm tra status
dokku ps:report hopluc-api
# Status: running

dokku ps:report hopluc-web
# Status: running
```

---

## 7. Bước 5 — Bật SSL

> Chỉ bật SAU KHI deploy thành công + DNS đã trỏ đúng.

```bash
ssh root@167.172.118.162

# Backend SSL
dokku letsencrypt:set hopluc-api email your-email@example.com
dokku letsencrypt:enable hopluc-api

# Frontend SSL
dokku letsencrypt:set hopluc-web email your-email@example.com
dokku letsencrypt:enable hopluc-web

# Kiểm tra
curl -I https://hoplucapi.verde.vn
# HTTP/2 200

curl -I https://hopluc.verde.vn
# HTTP/2 200

# (Optional) Tự động gia hạn SSL
dokku letsencrypt:cron-job --add
```

---

## 8. Bước 6 — Tạo admin + seed data

```bash
ssh root@167.172.118.162

# Chạy migrations (thường đã chạy tự động khi deploy)
dokku run hopluc-api python manage.py migrate

# Tạo superuser thủ công
dokku run hopluc-api python manage.py createsuperuser
# Nhập: username, email, password

# HOẶC seed 6 user mặc định
dokku run hopluc-api python manage.py seed_db

# Seed homepage data
dokku run hopluc-api python manage.py seed_homepage

# Kiểm tra admin
# Mở browser: https://hoplucapi.verde.vn/hlc-admin/
# Login: admin / admin123456 (nếu dùng seed_db)
```

### Default accounts (nếu dùng seed_db):

| Username | Password | Role |
|----------|----------|------|
| admin | admin123456 | Superuser |
| staff1 | staff123456 | Staff |
| staff2 | staff123456 | Staff |
| user1 | user123456 | User |
| user2 | user123456 | User |
| user3 | user123456 | User |

---

## 9. Bước 7 — Setup CI/CD

> Sau khi deploy thủ công OK, setup GitHub Actions để auto deploy.

### 9.1 Tạo GitHub Secrets

Vào GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

| Secret name | Value | Mô tả |
|-------------|-------|-------|
| `DOKKU_HOST` | `167.172.118.162` | IP server |
| `SSH_PRIVATE_KEY` | Nội dung file `~/.ssh/id_rsa` | SSH key toàn bộ (kể cả BEGIN/END) |
| `NEXT_PUBLIC_API_URL` | `https://hoplucapi.verde.vn` | API URL cho frontend build |

### 9.2 Cách lấy SSH_PRIVATE_KEY:

```bash
cat ~/.ssh/id_rsa
# Copy TOÀN BỘ output, bao gồm:
# -----BEGIN OPENSSH PRIVATE KEY-----
# ...
# -----END OPENSSH PRIVATE KEY-----
```

### 9.3 Cách hoạt động

Mỗi lần push code lên `master`:

| Push thay đổi ở | Trigger workflow | Hành động |
|---|---|---|
| `hopluccorp/**` | `deploy-api.yml` | Build Django image → push ghcr.io → deploy Dokku |
| `hopluccorp-fontend/**` | `deploy-web.yml` | Build Next.js image → push ghcr.io → deploy Dokku |

### 9.4 Trigger thủ công (không cần push code)

1. GitHub repo → **Actions** tab
2. Chọn workflow (Deploy Backend hoặc Deploy Frontend)
3. Click **"Run workflow"** → Run

### 9.5 Login Docker Registry trên server (lần đầu)

Cần cho server pull được image từ ghcr.io:

```bash
ssh root@167.172.118.162
echo "YOUR_GITHUB_TOKEN" | docker login ghcr.io -u baothi --password-stdin
```

---

## 10. Xóa demo

> Khi demo xong, xóa sạch hopluccorp khỏi server. **Giữ nguyên verde.**

```bash
cd terraform/

# Xem preview những gì sẽ xóa
terraform plan -destroy

# Xóa! (gõ "yes" khi được hỏi)
terraform destroy
```

### Output mong đợi:

```
========================================
 HopLucCorp — Dokku Teardown
========================================

[1/4] Unlinking services...
  Unlinked hopluc-db from hopluc-api
  Unlinked hopluc-redis from hopluc-api
[2/4] Destroying apps...
  Destroyed hopluc-api
  Destroyed hopluc-web
[3/4] Destroying database...
  Destroyed database hopluc-db
[4/4] Destroying Redis...
  Destroyed redis hopluc-redis

========================================
 Teardown Complete!
========================================
 All HopLucCorp resources removed.
 Dokku plugins (postgres, redis, letsencrypt) are kept.
```

### Sau khi destroy:

```bash
ssh root@167.172.118.162
dokku apps:list
# =====> My Apps
# verde-api          ← vẫn còn
# verde-web          ← vẫn còn
# (hopluc-api GONE)
# (hopluc-web GONE)
```

### Muốn deploy lại cho khách hàng khác?

```bash
cd terraform/
# Sửa terraform.tfvars (domain mới, secrets mới)
terraform apply    # Tạo lại từ đầu
# Deploy code → SSL → seed data
```

### Xóa DNS (thủ công, nếu cần):

Vào PA Vietnam → xóa 2 A records: `hopluc`, `hoplucapi`

---

## 11. Troubleshooting

### Terraform apply lỗi SSH

```
Error: timeout - last error: dial tcp 167.172.118.162:22: i/o timeout
```

**Fix:** Kiểm tra SSH key và firewall:
```bash
ssh root@167.172.118.162         # test thủ công
# Nếu lỗi → kiểm tra ssh_private_key_path trong terraform.tfvars
```

### Deploy lỗi "no such image"

```
Error: No such image: ghcr.io/xxx/hopluc-api:xxx
```

**Fix:** Server chưa login Docker registry:
```bash
ssh root@167.172.118.162
echo "GITHUB_TOKEN" | docker login ghcr.io -u baothi --password-stdin
```

### Backend lỗi 502 Bad Gateway

```bash
ssh root@167.172.118.162
dokku logs hopluc-api -t              # xem lỗi gì

# Port mapping sai?
dokku ports:report hopluc-api         # phải là http:80:5000

# App chưa start?
dokku ps:report hopluc-api            # phải là Status: running
dokku ps:restart hopluc-api           # thử restart
```

### Frontend lỗi "API connection refused"

```bash
# Kiểm tra env var frontend
dokku config:show hopluc-web | grep API_URL
# Phải là: https://hoplucapi.verde.vn

# Kiểm tra CORS backend
dokku config:show hopluc-api | grep CORS
# Phải là: https://hopluc.verde.vn
```

### SSL lỗi "challenge failed"

```
Error: Could not obtain certificate
```

**Fix:** DNS chưa propagate hoặc app chưa deploy:
```bash
nslookup hoplucapi.verde.vn         # phải trả về 167.172.118.162
dokku ps:report hopluc-api           # phải đang running
# Chờ DNS propagate rồi thử lại:
dokku letsencrypt:enable hopluc-api
```

### Cần reset database

```bash
ssh root@167.172.118.162

# Xóa DB cũ
dokku postgres:unlink hopluc-db hopluc-api
dokku postgres:destroy hopluc-db --force

# Tạo DB mới
dokku postgres:create hopluc-db
dokku postgres:link hopluc-db hopluc-api

# Chạy lại migrate + seed
dokku run hopluc-api python manage.py migrate
dokku run hopluc-api python manage.py seed_db
dokku run hopluc-api python manage.py seed_homepage
```

---

## 12. Lệnh Dokku thường dùng

```bash
# ===== APPS =====
dokku apps:list                          # Danh sách apps
dokku ps:report hopluc-api               # Status chi tiết
dokku ps:restart hopluc-api              # Restart app
dokku ps:stop hopluc-api                 # Stop app
dokku ps:start hopluc-api                # Start app

# ===== LOGS =====
dokku logs hopluc-api                    # Logs gần nhất
dokku logs hopluc-api -t                 # Logs realtime (tail -f)
dokku logs hopluc-api -n 100             # 100 dòng cuối

# ===== ENV VARS =====
dokku config:show hopluc-api             # Xem tất cả env vars
dokku config:set hopluc-api KEY=value    # Thêm env var (auto restart)
dokku config:unset hopluc-api KEY        # Xóa env var
dokku config:set --no-restart hopluc-api KEY=value  # Set không restart

# ===== DOMAINS =====
dokku domains:report hopluc-api          # Xem domains
dokku domains:add hopluc-api new.domain  # Thêm domain
dokku domains:remove hopluc-api domain   # Xóa domain

# ===== DATABASE =====
dokku postgres:info hopluc-db            # Thông tin DB
dokku postgres:connect hopluc-db         # psql shell
dokku postgres:export hopluc-db > backup.sql   # Backup
dokku postgres:import hopluc-db < backup.sql   # Restore

# ===== REDIS =====
dokku redis:info hopluc-redis            # Thông tin Redis
dokku redis:connect hopluc-redis         # redis-cli

# ===== DJANGO COMMANDS =====
dokku run hopluc-api python manage.py migrate
dokku run hopluc-api python manage.py createsuperuser
dokku run hopluc-api python manage.py shell
dokku run hopluc-api python manage.py seed_db
dokku run hopluc-api python manage.py seed_homepage --reset
dokku run hopluc-api python manage.py collectstatic --noinput

# ===== SSL =====
dokku letsencrypt:list                   # Xem SSL status
dokku letsencrypt:enable hopluc-api      # Bật SSL
dokku letsencrypt:revoke hopluc-api      # Thu hồi SSL

# ===== DOCKER =====
dokku docker-options:report hopluc-api   # Docker options
dokku storage:report hopluc-api          # Persistent storage
```

---

## File structure

```
hopluccorp/
├── terraform/
│   ├── main.tf                    ← Terraform config (SSH → Dokku)
│   ├── variables.tf               ← Variables (IP, domain, secrets)
│   ├── outputs.tf                 ← Output URLs sau apply
│   ├── terraform.tfvars.example   ← Template (copy → terraform.tfvars)
│   ├── terraform.tfvars           ← (GITIGNORED) secrets thật
│   ├── .gitignore
│   └── scripts/
│       ├── setup.sh               ← Tạo apps, DB, Redis, env, domains
│       └── teardown.sh            ← Xóa sạch khi terraform destroy
├── hopluccorp/                    ← Django backend
│   ├── compose/production/django/
│   │   ├── Dockerfile             ← Production multi-stage build
│   │   ├── entrypoint             ← Wait for DB (hỗ trợ DATABASE_URL)
│   │   └── start                  ← Gunicorn + Uvicorn (port 5000)
│   ├── Procfile                   ← web: /start
│   └── config/settings/
│       └── production.py          ← Production settings
├── hopluccorp-fontend/            ← Next.js frontend
│   ├── Dockerfile                 ← Production (pnpm + standalone)
│   └── Procfile                   ← web: node server.js
└── .github/workflows/
    ├── deploy-api.yml             ← CI/CD backend
    └── deploy-web.yml             ← CI/CD frontend
```
