from django.core.management.base import BaseCommand

from hopluccorp.pages.models import ProjectCategory, ProjectItem


CATEGORIES = [
    {"name": "Công nghiệp", "slug": "cong-nghiep"},
    {"name": "Dân dụng", "slug": "dan-dung"},
    {"name": "Hạ tầng", "slug": "ha-tang"},
]

PROJECTS = [
    {
        "name": "NHÀ MÁY LUXSHARE-ICT (NGHỆ AN) 2",
        "slug": "nha-may-luxshare-ict-nghe-an-2",
        "category_slug": "cong-nghiep",
        "location": "Nghệ An",
        "scale": "1,114,060 m²",
        "progress": "08/2023 ~ 10/2024\n07/2024 ~ 03/2025",
        "year": 2023,
        "status": "ongoing",
    },
    {
        "name": "NHÀ MÁY SẢN XUẤT VĂN PHÒNG PHẨM TẬP ĐOÀN DELI VIỆT NAM",
        "slug": "nha-may-san-xuat-van-phong-pham-tap-doan-deli-vet-nam",
        "category_slug": "cong-nghiep",
        "location": "Hải Dương",
        "scale": "144,152 m²",
        "progress": "09/2024 ~ 03/2026",
        "year": 2024,
        "status": "ongoing",
    },
    {
        "name": "NHÀ MÁY FOXCONN NGHỆ AN",
        "slug": "nha-may-foxconn-nghe-an",
        "category_slug": "cong-nghiep",
        "location": "Nghệ An",
        "scale": "68,541 m²",
        "progress": "06/2024 ~ 12/2024",
        "year": 2024,
        "status": "completed",
    },
    {
        "name": "NHÀ XƯỞNG XÂY SẴN VÀ VĂN PHÒNG CHO THUÊ SOILBUILD NGHỆ AN",
        "slug": "nha-xuong-xay-san-va-van-phong-cho-thue-spectrum-nghe-an",
        "category_slug": "cong-nghiep",
        "location": "Nghệ An",
        "scale": "42,844 m²",
        "progress": "07/2024 ~ 02/2025",
        "year": 2024,
        "status": "ongoing",
    },
    {
        "name": "NHÀ MÁY CÔNG TY TNHH CÔNG NGHỆ THÔNG MINH GOERTEK VINA",
        "slug": "nha-may-cong-ty-tnhh-cong-nghe-thong-minh-goertek-vina",
        "category_slug": "cong-nghiep",
        "location": "Bắc Ninh",
        "scale": "582,268 m²",
        "progress": "05/2023 ~ 05/2025",
        "year": 2023,
        "status": "ongoing",
    },
    {
        "name": "NHÀ MÁY ĐIỆN TỬ BYD (VIỆT NAM)",
        "slug": "nha-may-dien-tu-byd-viet-nam",
        "category_slug": "cong-nghiep",
        "location": "Phú Thọ",
        "scale": "388,105 m²",
        "progress": "10/2021 ~ 08/2025",
        "year": 2021,
        "status": "ongoing",
    },
    {
        "name": "NHÀ MÁY SOLEX HIGH-TECH INDUSTRIES (VIỆT NAM)",
        "slug": "nha-may-solex-high-tech-industries-viet-nam",
        "category_slug": "cong-nghiep",
        "location": "Quảng Ninh",
        "scale": "46,517 m²",
        "progress": "11/2023 ~ 10/2024",
        "year": 2023,
        "status": "completed",
    },
    {
        "name": "NHÀ MÁY DESAY BATTERY VINA",
        "slug": "nha-may-desay-battery-vina",
        "category_slug": "cong-nghiep",
        "location": "Bắc Giang",
        "scale": "27,738 m²",
        "progress": "03/2022 ~ 04/2023",
        "year": 2022,
        "status": "completed",
    },
    {
        "name": "NHÀ MÁY INNOVATION PRECISION VIỆT NAM",
        "slug": "nha-may-innovation-precision-viet-nam",
        "category_slug": "cong-nghiep",
        "location": "Nghệ An",
        "scale": "94,297 m²",
        "progress": "09/2023 ~ 05/2024",
        "year": 2023,
        "status": "completed",
    },
    {
        "name": "NHÀ MÁY COT VIỆT NAM",
        "slug": "nha-may-cot-viet-nam",
        "category_slug": "cong-nghiep",
        "location": "Hưng Yên",
        "scale": "82,500 m²",
        "progress": "12/2023 ~ 09/2024",
        "year": 2023,
        "status": "completed",
    },
    {
        "name": "NHÀ MÁY SUNNY AUTOMOTIVE QUANG HỌC VIỆT NAM",
        "slug": "nha-may-sunny-automotive-quang-hoc-viet-nam",
        "category_slug": "cong-nghiep",
        "location": "Nghệ An",
        "scale": "120,000 m²",
        "progress": "01/2024 ~ 12/2024",
        "year": 2024,
        "status": "ongoing",
    },
    {
        "name": "NHÀ MÁY LUXSHARE-ICT (NGHỆ AN)",
        "slug": "nha-may-luxshare-ict-nghe-an",
        "category_slug": "cong-nghiep",
        "location": "Nghệ An",
        "scale": "250,000 m²",
        "progress": "2020 ~ 2023",
        "year": 2020,
        "status": "completed",
    },
    {
        "name": "NHÀ MÁY DBG TECHNOLOGY VIỆT NAM",
        "slug": "nha-may-dbg-technology-viet-nam",
        "category_slug": "cong-nghiep",
        "location": "Thái Nguyên",
        "scale": "150,000 m²",
        "progress": "2022 ~ 2024",
        "year": 2022,
        "status": "completed",
    },
    {
        "name": "SLP BẮC NINH LOGISTIC",
        "slug": "slp-bac-ninh-logistic",
        "category_slug": "cong-nghiep",
        "location": "Bắc Ninh",
        "scale": "95,000 m²",
        "progress": "2023 ~ 2024",
        "year": 2023,
        "status": "completed",
    },
    {
        "name": "NHÀ MÁY CAYI TECHNOLOGY VIỆT NAM",
        "slug": "nha-may-cayi-technology-viet-nam",
        "category_slug": "cong-nghiep",
        "location": "Bắc Ninh",
        "scale": "85,000 m²",
        "progress": "2023 ~ 2024",
        "year": 2023,
        "status": "completed",
    },
    {
        "name": "NHÀ MÁY SÔNG HỒNG - XUÂN TRƯỜNG II",
        "slug": "nha-may-song-hong-xuan-truong-ii",
        "category_slug": "cong-nghiep",
        "location": "Nam Định",
        "scale": "75,000 m²",
        "progress": "2023 ~ 2024",
        "year": 2023,
        "status": "completed",
    },
    {
        "name": "KHU NHÀ Ở CÁN BỘ NHIỆT ĐIỆN VŨNG ÁNG 2",
        "slug": "khu-nha-o-can-bo-nhiet-dien-vung-ang-2",
        "category_slug": "dan-dung",
        "location": "Hà Tĩnh",
        "scale": "35,000 m²",
        "progress": "2022 ~ 2023",
        "year": 2022,
        "status": "completed",
    },
    {
        "name": "NHÀ MÁY SẢN XUẤT MDF MEKONG",
        "slug": "nha-may-san-xuat-mdf-mekong",
        "category_slug": "cong-nghiep",
        "location": "Phú Thọ",
        "scale": "65,000 m²",
        "progress": "2021 ~ 2022",
        "year": 2021,
        "status": "completed",
    },
    {
        "name": "NHÀ MÁY HW ENERGY",
        "slug": "nha-may-hw-energy",
        "category_slug": "cong-nghiep",
        "location": "Hải Phòng",
        "scale": "55,000 m²",
        "progress": "2024 ~ 2025",
        "year": 2024,
        "status": "ongoing",
    },
]


class Command(BaseCommand):
    help = "Seed projects data (categories + 19 projects, text only — upload images via Django Admin)"

    def add_arguments(self, parser):
        parser.add_argument("--reset", action="store_true", help="Delete existing data before seeding")

    def handle(self, *args, **options):
        if options["reset"]:
            ProjectItem.objects.all().delete()
            ProjectCategory.objects.all().delete()
            self.stdout.write(self.style.WARNING("Deleted all projects data"))

        # Categories
        if not ProjectCategory.objects.exists():
            for data in CATEGORIES:
                ProjectCategory.objects.create(**data)
            self.stdout.write(self.style.SUCCESS(f"Created {len(CATEGORIES)} project categories"))

        # Projects
        if not ProjectItem.objects.exists():
            cat_map = {c.slug: c for c in ProjectCategory.objects.all()}
            created = 0
            for data in PROJECTS:
                cat_slug = data.pop("category_slug")
                category = cat_map.get(cat_slug)
                ProjectItem.objects.create(category=category, **data)
                created += 1
            self.stdout.write(self.style.SUCCESS(f"Created {created} projects"))

        self.stdout.write(self.style.SUCCESS("Projects seed complete! Upload images via Django Admin."))
