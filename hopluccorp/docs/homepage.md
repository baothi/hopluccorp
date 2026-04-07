# Homepage - Hướng dẫn nhập liệu

## Tổng quan

Homepage gồm 7 sections + Header/Footer, tất cả đều quản lý qua **Django Admin**.
Tất cả ảnh upload sẽ tự động lưu lên **Cloudinary** (không lưu local).
Khi xóa record hoặc thay ảnh mới → ảnh cũ trên Cloudinary tự động bị xóa (`django-cleanup`).

### Đa ngôn ngữ

Hỗ trợ **4 ngôn ngữ**: VI (mặc định), EN, ZH, KO.
Mỗi model trong Admin hiển thị **tabs ngôn ngữ** — nhập VI xong chuyển tab EN, ZH, KO.
Fields có dịch sẽ có 4 ô input (1 ô/ngôn ngữ). Fields không dịch chỉ có 1 ô.
Fallback: nếu chưa nhập bản dịch → tự động hiển thị bản VI.

> Chi tiết đa ngôn ngữ: xem [docs/i18n.md](./i18n.md)

### Cấu trúc trang Homepage

```
┌─────────────────────────────────────┐
│  Header (logo, menu)                │ ← ⚙ Cấu hình chung
├─────────────────────────────────────┤
│  1. Banner Slider                   │ ← ① Banner Slides (2+ ảnh)
├─────────────────────────────────────┤
│  2. Giới thiệu                     │ ← ② About Section + About Blocks (3 cards)
├─────────────────────────────────────┤
│  3. Video nổi bật                   │ ← ③ Video Section
├─────────────────────────────────────┤
│  4. Số liệu ấn tượng               │ ← ④ Stat Items + ⚙ (ảnh nền)
├─────────────────────────────────────┤
│  5. Lĩnh vực hoạt động             │ ← ⑤ Business Categories (5 mục)
├─────────────────────────────────────┤
│  6. Tin tức                         │ ← ⑥ News Articles (1 featured + 2 thường)
├─────────────────────────────────────┤
│  7. Đối tác                        │ ← ⑦ Partners (8+ logos)
├─────────────────────────────────────┤
│  Footer (địa chỉ, SĐT, social)     │ ← ⚙ Cấu hình chung
└─────────────────────────────────────┘
```

### Django Admin sidebar

```
HOMEPAGE
├── ⚙ Cấu hình chung (Logo, Liên hệ, Ảnh nền)
├── ① Banner Slides (Ảnh slider)
├── ② About Blocks (3 cards giới thiệu)
├── ② About Section (Nội dung giới thiệu)
├── ③ Video Section (Video nổi bật)
├── ④ Stat Items (Số liệu ấn tượng)
├── ⑤ Business Categories (Lĩnh vực hoạt động)
├── ⑥ News Articles (Tin tức)
└── ⑦ Partners (Đối tác)

MEDIA LIBRARY
├── Media Categories
└── Media Items
```

---

## Bước 1: Cấu hình Cloudinary

Thêm credentials vào `.envs/.local/.django`:

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Lấy credentials tại: https://console.cloudinary.com/settings/api-keys

---

## Bước 2: Chạy Docker + Seed dữ liệu

```bash
# Build + khởi động
make build
make oneshot

# Chạy migration
make migrate

# Seed dữ liệu text mẫu (chạy bao nhiêu lần cũng an toàn, không tạo trùng)
make seed.homepage

# Reset nếu cần xóa sạch + seed lại (⚠ mất ảnh đã upload)
make seed.homepage.reset
```

---

## Bước 3: Đăng nhập Django Admin

- URL: http://localhost:8000/admin/
- Username: `admin`
- Password: `admin123456`

---

## Bước 4: Upload ảnh theo từng section

### ⚙ Cấu hình chung (Logo, Liên hệ, Ảnh nền)

**Admin → HOMEPAGE → ⚙ Cấu hình chung → click bản ghi duy nhất**

Gồm 4 nhóm:

**Logos** (không dịch — chung cho mọi ngôn ngữ):

| Field | Mô tả | Gợi ý |
|-------|--------|-------|
| `logo_header` | Logo trên header | `logo-hl.png` |
| `logo_footer` | Logo ở footer | `Asset-1-02.png` |
| `favicon` | Icon tab trình duyệt | `Hop-Luc@2x-1.png` |
| `qr_code` | QR code WeChat/Zalo | `MA-QR-GONGZHONGHAO.jpg` |

**Thông tin liên hệ** (🌐 `address_hn`, `address_hcm` có dịch 4 ngôn ngữ):

| Field | Dịch? | Giá trị seed VI |
|-------|:-----:|-----------------|
| `address_hn` | 🌐 | Tầng 10 Tòa nhà Lotus Building... |
| `address_hcm` | 🌐 | 290/22 Nam Kỳ Khởi Nghĩa... |
| `phone` | ❌ | (+84) 3795 7658 |
| `email` | ❌ | contact@hopluccorp.vn |

**Mạng xã hội** (không dịch):

| Field | Giá trị seed |
|-------|-------------|
| `facebook_url` | https://www.facebook.com/hopluccorp.vn |
| `youtube_url` | https://www.youtube.com/channel/UCzHlh6l... |
| `linkedin_url` | https://www.linkedin.com/company/hop-luc... |

**Ảnh nền** (không dịch — ảnh trang trí chung):

| Field | Mô tả | Gợi ý |
|-------|--------|-------|
| `bg_stats` | Ảnh nền section thống kê | `bg-number.png` |
| `bg_footer` | Ảnh nền footer | `bg-footer.png` |
| `bg_stats_image` | Ảnh bên phải section thống kê | `HopLuc_16-1.png` |

---

### ① Banner Slides (Ảnh slider)

**Admin → HOMEPAGE → ① Banner Slides**

🌐 Fields dịch: `title`, `image`, `alt` — mỗi field có **4 tabs ngôn ngữ**.

Seed đã tạo 2 slides (4 ngôn ngữ). Click từng slide → nhập/upload theo từng tab ngôn ngữ:

| Slide | Title VI | Title EN |
|-------|----------|----------|
| Slide 1 | Hợp Lực Banner | Hop Luc Banner |
| Slide 2 | TOP 50 Vietnam The Best 2025 | TOP 50 Vietnam The Best 2025 |

> **Mỗi ngôn ngữ có ảnh riêng** (vì ảnh banner thường có chữ trên đó).
> **Thêm slide mới:** click **Add** → nhập title + upload ảnh cho từng tab.
> **Sắp xếp:** dùng nút ↑↓ bên phải.

---

### ② About Section (Nội dung giới thiệu)

**Admin → HOMEPAGE → ② About Section → click bản ghi duy nhất**

🌐 Fields dịch: `label`, `title`, `description` (CKEditor), `cta_text`

| Field | VI | EN |
|-------|----|----|
| `label` | Giới thiệu | About |
| `title` | Hợp lực | Hop Luc |
| `description` | CKEditor — nội dung giới thiệu | CKEditor — about content |
| `cta_text` | Tìm hiểu thêm | Learn more |
| `cta_link` | /gioi-thieu (❌ không dịch) | — |

> `description` dùng **CKEditor** — mỗi tab ngôn ngữ có 1 editor riêng.

---

### ② About Blocks (3 cards giới thiệu)

**Admin → HOMEPAGE → ② About Blocks**

🌐 Fields dịch: `title`, `subtitle`, `image` — mỗi field có 4 tabs ngôn ngữ.
❌ `icon` không dịch (icon tượng trưng, chung cho mọi ngôn ngữ).

| Block | Title VI | Title EN | Upload |
|-------|----------|----------|--------|
| Block 1 | Lịch sử / hình thành | History | `image` (4 ngôn ngữ) + `icon` (1 chung) |
| Block 2 | Tầm nhìn / sứ mệnh | Vision & Mission | — |
| Block 3 | Giá trị / cốt lõi | Core Values | — |

---

### ③ Video Section (Video nổi bật)

**Admin → HOMEPAGE → ③ Video Section → click bản ghi duy nhất**

🌐 Fields dịch: `title`, `subtitle`, `thumbnail`, `youtube_id`

| Field | VI | EN |
|-------|----|----|
| `title` | VIDEO NỔI BẬT | FEATURED VIDEO |
| `subtitle` | CLIP TỔNG KẾT NĂM 2024... | YEAR 2024 RECAP... |
| `youtube_id` | Cc2oTROOqqg | (khác video hoặc dùng chung — fallback VI) |
| `thumbnail` | Upload ảnh thumbnail | — |

---

### ④ Stat Items (Số liệu ấn tượng)

**Admin → HOMEPAGE → ④ Stat Items**

🌐 Fields dịch: `label` — chỉ label text.
❌ `icon`, `number`, `suffix` không dịch.

| Item | `number` | Label VI | Label EN |
|------|----------|----------|----------|
| 1 | 16 | Năm hoạt động | Years of operation |
| 2 | 200 | Dự án | Projects |
| 3 | 15000 | Sản lượng hợp nhất năm 2024 | Consolidated output 2024 |
| 4 | 1500 | Nhân sự | Employees |

> Ảnh nền section này upload ở **⚙ Cấu hình chung → Ảnh nền → `bg_stats`** và **`bg_stats_image`**.

---

### ⑤ Business Categories (Lĩnh vực hoạt động)

**Admin → HOMEPAGE → ⑤ Business Categories**

🌐 Fields dịch: `title`, `subtitle`, `image`

| Category VI | Category EN |
|-------------|-------------|
| Tổng thầu / xây dựng | General Contractor / Construction |
| Tổng thầu / cơ điện | General Contractor / M&E |
| Hoàn thiện / nội thất | Finishing / Interior |
| Vật liệu / xây dựng | Construction Materials |
| Công nghiệp / phụ trợ | Industrial / Support |

---

### ⑥ News Articles (Tin tức)

**Admin → HOMEPAGE → ⑥ News Articles**

🌐 Fields dịch: `title`, `slug`, `excerpt`, `content` (CKEditor), `image`

| Bài viết VI | Featured? |
|-------------|-----------|
| Hợp Lực vinh dự đón Phó Thủ Tướng... | ✅ Yes |
| Hệ sinh thái Hợp Lực... top 500... | No |
| Hợp Lực tham dự VRT&CONS 2025 | No |

> `slug` tự sinh từ `title` theo từng ngôn ngữ (VD: `slug_vi = "hop-luc-vinh-du..."`, `slug_en = "hop-luc-honored-to..."`)
> **Thêm bài mới:** Add → nhập title, excerpt, upload ảnh, viết content bằng **CKEditor** — cho từng tab ngôn ngữ.
> **Đánh dấu nổi bật:** tick ✅ `is_featured` (không dịch — chung cho mọi ngôn ngữ).

---

### ⑦ Partners (Đối tác)

**Admin → HOMEPAGE → ⑦ Partners**

🌐 Fields dịch: `name` — tên đối tác (VD: "삼성" vs "Samsung").
❌ `logo` không dịch — logo chung cho mọi ngôn ngữ.

| Partner | Name VI | Name EN |
|---------|---------|---------|
| 1 | Partner 1 | Partner 1 |
| ... | ... | ... |
| 8 | Partner 8 | Partner 8 |

> Đổi tên partner: sửa field `name` trong từng tab ngôn ngữ.
> Sắp xếp: dùng nút ↑↓.

---

## Bước 5: Kiểm tra

### Xem dữ liệu qua API

```bash
# Tiếng Việt (mặc định)
curl http://localhost:8000/api/pages/homepage/ | python -m json.tool

# English
curl -H "Accept-Language: en" http://localhost:8000/api/pages/homepage/ | python -m json.tool

# Chinese
curl -H "Accept-Language: zh" http://localhost:8000/api/pages/homepage/ | python -m json.tool

# Korean
curl -H "Accept-Language: ko" http://localhost:8000/api/pages/homepage/ | python -m json.tool
```

Hoặc mở Swagger: http://localhost:8000/api/docs/ → tìm `/api/pages/homepage/`

### Media Library (tuỳ chọn)

Ngoài việc upload ảnh trực tiếp vào từng section, bạn cũng có thể dùng **Media Library** để quản lý ảnh tập trung:

**Admin → MEDIA LIBRARY → Media Categories** → Tạo categories (VD: Banner, Logo, Dự án...)
**Admin → MEDIA LIBRARY → Media Items** → Upload ảnh + gán category

Media Library hữu ích khi muốn tái sử dụng ảnh ở nhiều nơi hoặc quản lý thư viện ảnh riêng.

---

## Tổng kết ảnh cần upload

| Admin Section | Số ảnh | Loại |
|---------------|--------|------|
| ⚙ Cấu hình chung | 7 | logos, QR, backgrounds |
| ① Banner Slides | 2+ | ảnh banner lớn |
| ② About Blocks | 3 ảnh nền + 3 icons | ảnh card + icon |
| ③ Video Section | 1 | thumbnail |
| ④ Stat Items | 4 | icons nhỏ |
| ⑤ Business Categories | 5 | ảnh lĩnh vực |
| ⑥ News Articles | 3+ | ảnh đại diện bài viết |
| ⑦ Partners | 8+ | logo đối tác |
| **Tổng** | **~36 ảnh** | |

---

## Lưu ý quan trọng

- **Cloudinary**: Tất cả ảnh lưu trên Cloudinary, cần cấu hình credentials trước khi upload.
- **django-cleanup**: Khi xóa record hoặc thay ảnh mới → ảnh cũ trên Cloudinary tự động bị xóa.
- **django-modeltranslation**: Admin hiển thị tabs VI/EN/ZH/KO. Fallback VI nếu chưa nhập bản dịch.
- **Singleton models** (⚙, ②About Section, ③Video): Chỉ có 1 bản ghi duy nhất, không thêm/xóa được.
- **Ordered models** (①②④⑤⑦): Dùng nút ↑↓ để sắp xếp thứ tự hiển thị.
- **Seed an toàn**: `make seed.homepage` chạy nhiều lần không tạo trùng. Dùng `make seed.homepage.reset` để xóa sạch + seed lại.
- **🌐 = dịch được**: Fields có icon 🌐 sẽ có 4 tabs ngôn ngữ trong Admin.

---

## Models tổng quan

| Model | Loại | Admin Section |
|-------|------|---------------|
| `SiteConfig` | Singleton (1 bản ghi) | HOMEPAGE → ⚙ Cấu hình chung |
| `BannerSlide` | Ordered list | HOMEPAGE → ① Banner Slides |
| `AboutSection` | Singleton | HOMEPAGE → ② About Section |
| `AboutBlock` | Ordered list | HOMEPAGE → ② About Blocks |
| `VideoSection` | Singleton | HOMEPAGE → ③ Video Section |
| `StatItem` | Ordered list | HOMEPAGE → ④ Stat Items |
| `BusinessCategory` | Ordered list | HOMEPAGE → ⑤ Business Categories |
| `NewsArticle` | List (sort by date) | HOMEPAGE → ⑥ News Articles |
| `Partner` | Ordered list | HOMEPAGE → ⑦ Partners |
| `MediaCategory` | List | MEDIA LIBRARY → Media Categories |
| `MediaItem` | List | MEDIA LIBRARY → Media Items |
