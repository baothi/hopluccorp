from django.core.management.base import BaseCommand

from hopluccorp.pages.models import (
    BusinessField,
    BusinessFieldGallery,
    BusinessFieldService,
)


class Command(BaseCommand):
    help = "Seed business fields data with 4 languages (VI, EN, ZH, KO)"

    def add_arguments(self, parser):
        parser.add_argument("--reset", action="store_true", help="Delete existing data before seeding")

    def handle(self, *args, **options):
        if options["reset"]:
            BusinessField.objects.all().delete()
            self.stdout.write(self.style.WARNING("Deleted all business fields data"))

        if BusinessField.objects.exists():
            self.stdout.write(self.style.WARNING("Business fields data already exists. Use --reset to recreate."))
            return

        fields_data = [
            {
                "slug": "tong-thau-xay-dung",
                "name_vi": "Tổng thầu Xây dựng",
                "name_en": "Construction General Contractor",
                "name_zh_hans": "建筑总承包",
                "name_ko": "건설 종합건설사",
                "banner_alt_vi": "Tổng thầu Xây dựng",
                "banner_alt_en": "Construction General Contractor",
                "banner_alt_zh_hans": "建筑总承包",
                "banner_alt_ko": "건설 종합건설사",
                "intro_title_vi": "Tổng thầu Xây dựng",
                "intro_title_en": "Construction General Contractor",
                "intro_title_zh_hans": "建筑总承包",
                "intro_title_ko": "건설 종합건설사",
                "intro_description_vi": (
                    "<p>Hợp Lực là tổng thầu EPC hàng đầu Việt Nam trong lĩnh vực xây dựng công nghiệp, "
                    "với hơn 16 năm kinh nghiệm thi công các dự án nhà máy, kho bãi, công trình hạ tầng "
                    "cho các tập đoàn lớn trong và ngoài nước.</p>"
                ),
                "intro_description_en": (
                    "<p>Hop Luc is Vietnam's leading EPC general contractor in industrial construction, "
                    "with over 16 years of experience building factories, warehouses, and infrastructure "
                    "for major domestic and international corporations.</p>"
                ),
                "intro_description_zh_hans": (
                    "<p>合力是越南工业建筑领域领先的EPC总承包商，拥有16年以上为国内外大型集团建设工厂、仓库和基础设施的经验。</p>"
                ),
                "intro_description_ko": (
                    "<p>합력은 베트남 산업건설 분야 최고의 EPC 종합건설사로, "
                    "16년 이상 국내외 대기업의 공장, 창고, 인프라 건설 경험을 보유하고 있습니다.</p>"
                ),
                "services": [
                    {
                        "title_vi": "Nhà máy công nghiệp", "title_en": "Industrial Factories",
                        "title_zh_hans": "工业厂房", "title_ko": "산업 공장",
                        "description_vi": "Thiết kế, thi công nhà máy sản xuất quy mô lớn",
                        "description_en": "Design and construction of large-scale manufacturing plants",
                        "description_zh_hans": "大型生产工厂的设计与施工",
                        "description_ko": "대규모 제조 공장 설계 및 시공",
                    },
                    {
                        "title_vi": "Kho bãi & Logistics", "title_en": "Warehouses & Logistics",
                        "title_zh_hans": "仓库与物流", "title_ko": "창고 및 물류",
                        "description_vi": "Xây dựng kho bãi, trung tâm phân phối hiện đại",
                        "description_en": "Construction of modern warehouses and distribution centers",
                        "description_zh_hans": "建设现代仓库和配送中心",
                        "description_ko": "현대식 창고 및 물류센터 건설",
                    },
                    {
                        "title_vi": "Hạ tầng kỹ thuật", "title_en": "Technical Infrastructure",
                        "title_zh_hans": "技术基础设施", "title_ko": "기술 인프라",
                        "description_vi": "Thi công đường giao thông, hệ thống thoát nước, san lấp mặt bằng",
                        "description_en": "Roads, drainage systems, and site preparation works",
                        "description_zh_hans": "道路、排水系统和场地准备工程",
                        "description_ko": "도로, 배수 시스템 및 부지 조성 공사",
                    },
                ],
            },
            {
                "slug": "tong-thau-co-dien",
                "name_vi": "Tổng thầu Cơ điện",
                "name_en": "M&E General Contractor",
                "name_zh_hans": "机电总承包",
                "name_ko": "기전 종합건설사",
                "banner_alt_vi": "Tổng thầu Cơ điện",
                "banner_alt_en": "M&E General Contractor",
                "banner_alt_zh_hans": "机电总承包",
                "banner_alt_ko": "기전 종합건설사",
                "intro_title_vi": "Tổng thầu Cơ điện",
                "intro_title_en": "M&E General Contractor",
                "intro_title_zh_hans": "机电总承包",
                "intro_title_ko": "기전 종합건설사",
                "intro_description_vi": (
                    "<p>HL M&E chuyên cung cấp giải pháp cơ điện toàn diện cho các công trình công nghiệp "
                    "và dân dụng, bao gồm hệ thống HVAC, điện, nước, PCCC và hệ thống điều khiển tự động.</p>"
                ),
                "intro_description_en": (
                    "<p>HL M&E specializes in comprehensive M&E solutions for industrial and civil projects, "
                    "including HVAC, electrical, plumbing, fire protection and automation control systems.</p>"
                ),
                "intro_description_zh_hans": (
                    "<p>HL M&E专业提供工业和民用工程的综合机电解决方案，"
                    "包括暖通空调、电气、给排水、消防和自动化控制系统。</p>"
                ),
                "intro_description_ko": (
                    "<p>HL M&E는 산업 및 민간 프로젝트를 위한 종합 기전 솔루션을 전문으로 합니다. "
                    "HVAC, 전기, 급배수, 소방 및 자동화 제어 시스템을 포함합니다.</p>"
                ),
                "services": [
                    {
                        "title_vi": "Hệ thống HVAC", "title_en": "HVAC Systems",
                        "title_zh_hans": "暖通空调系统", "title_ko": "HVAC 시스템",
                        "description_vi": "Thiết kế, lắp đặt hệ thống điều hòa không khí",
                        "description_en": "Design and installation of air conditioning systems",
                        "description_zh_hans": "空调系统的设计与安装",
                        "description_ko": "공조 시스템 설계 및 설치",
                    },
                    {
                        "title_vi": "Hệ thống điện", "title_en": "Electrical Systems",
                        "title_zh_hans": "电气系统", "title_ko": "전기 시스템",
                        "description_vi": "Hệ thống điện trung thế, hạ thế, chiếu sáng",
                        "description_en": "Medium voltage, low voltage and lighting systems",
                        "description_zh_hans": "中压、低压和照明系统",
                        "description_ko": "중압, 저압 및 조명 시스템",
                    },
                    {
                        "title_vi": "PCCC & Tự động hóa", "title_en": "Fire Protection & Automation",
                        "title_zh_hans": "消防与自动化", "title_ko": "소방 및 자동화",
                        "description_vi": "Hệ thống phòng cháy chữa cháy, điều khiển tự động BMS",
                        "description_en": "Fire protection systems and BMS automation control",
                        "description_zh_hans": "消防系统和BMS自动化控制",
                        "description_ko": "소방 시스템 및 BMS 자동화 제어",
                    },
                ],
            },
            {
                "slug": "hoan-thien-noi-that",
                "name_vi": "Hoàn thiện Nội thất",
                "name_en": "Interior Finishing",
                "name_zh_hans": "室内装修",
                "name_ko": "인테리어 마감",
                "banner_alt_vi": "Hoàn thiện Nội thất",
                "banner_alt_en": "Interior Finishing",
                "banner_alt_zh_hans": "室内装修",
                "banner_alt_ko": "인테리어 마감",
                "intro_title_vi": "Hoàn thiện Nội thất",
                "intro_title_en": "Interior Finishing",
                "intro_title_zh_hans": "室内装修",
                "intro_title_ko": "인테리어 마감",
                "intro_description_vi": (
                    "<p>HL Interior chuyên hoàn thiện nội thất cao cấp cho văn phòng, khách sạn, "
                    "nhà hàng và không gian thương mại, mang đến sự tinh tế và chất lượng vượt trội.</p>"
                ),
                "intro_description_en": (
                    "<p>HL Interior specializes in premium interior finishing for offices, hotels, "
                    "restaurants and commercial spaces, delivering sophistication and outstanding quality.</p>"
                ),
                "intro_description_zh_hans": (
                    "<p>HL Interior专业从事办公室、酒店、餐厅和商业空间的高端室内装修，提供精致而卓越的品质。</p>"
                ),
                "intro_description_ko": (
                    "<p>HL Interior는 사무실, 호텔, 레스토랑 및 상업 공간의 프리미엄 인테리어 마감을 전문으로 합니다.</p>"
                ),
                "services": [
                    {
                        "title_vi": "Văn phòng", "title_en": "Offices",
                        "title_zh_hans": "办公室", "title_ko": "사무실",
                        "description_vi": "Thiết kế, thi công nội thất văn phòng hiện đại",
                        "description_en": "Modern office interior design and construction",
                        "description_zh_hans": "现代办公室室内设计与施工",
                        "description_ko": "현대적 사무실 인테리어 설계 및 시공",
                    },
                    {
                        "title_vi": "Khách sạn & Nhà hàng", "title_en": "Hotels & Restaurants",
                        "title_zh_hans": "酒店与餐厅", "title_ko": "호텔 및 레스토랑",
                        "description_vi": "Hoàn thiện nội thất khách sạn, nhà hàng sang trọng",
                        "description_en": "Luxury hotel and restaurant interior finishing",
                        "description_zh_hans": "豪华酒店和餐厅室内装修",
                        "description_ko": "럭셔리 호텔 및 레스토랑 인테리어 마감",
                    },
                ],
            },
            {
                "slug": "vat-lieu-xay-dung",
                "name_vi": "Vật liệu Xây dựng",
                "name_en": "Building Materials",
                "name_zh_hans": "建筑材料",
                "name_ko": "건축 자재",
                "banner_alt_vi": "Vật liệu Xây dựng",
                "banner_alt_en": "Building Materials",
                "banner_alt_zh_hans": "建筑材料",
                "banner_alt_ko": "건축 자재",
                "intro_title_vi": "Vật liệu Xây dựng",
                "intro_title_en": "Building Materials",
                "intro_title_zh_hans": "建筑材料",
                "intro_title_ko": "건축 자재",
                "intro_description_vi": (
                    "<p>HL Platek chuyên sản xuất và cung cấp vật liệu xây dựng chất lượng cao, "
                    "bao gồm tấm panel, vật liệu cách nhiệt, cách âm phục vụ cho công trình công nghiệp.</p>"
                ),
                "intro_description_en": (
                    "<p>HL Platek specializes in manufacturing and supplying high-quality building materials, "
                    "including panels, insulation and soundproofing materials for industrial projects.</p>"
                ),
                "intro_description_zh_hans": (
                    "<p>HL Platek专业生产和供应高品质建筑材料，包括面板、隔热和隔音材料，服务于工业工程。</p>"
                ),
                "intro_description_ko": (
                    "<p>HL Platek은 산업 프로젝트를 위한 패널, 단열 및 방음 자재 등 고품질 건축 자재의 제조 및 공급을 전문으로 합니다.</p>"
                ),
                "services": [
                    {
                        "title_vi": "Tấm Panel", "title_en": "Panels",
                        "title_zh_hans": "面板", "title_ko": "패널",
                        "description_vi": "Sản xuất tấm panel EPS, PU, Rockwool",
                        "description_en": "EPS, PU, Rockwool panel manufacturing",
                        "description_zh_hans": "EPS、PU、岩棉面板生产",
                        "description_ko": "EPS, PU, 록울 패널 제조",
                    },
                    {
                        "title_vi": "Vật liệu cách nhiệt", "title_en": "Insulation Materials",
                        "title_zh_hans": "隔热材料", "title_ko": "단열 자재",
                        "description_vi": "Cung cấp vật liệu cách nhiệt, cách âm cho công trình",
                        "description_en": "Insulation and soundproofing materials supply",
                        "description_zh_hans": "提供隔热隔音材料",
                        "description_ko": "단열 및 방음 자재 공급",
                    },
                ],
            },
            {
                "slug": "cong-nghiep-phu-tro",
                "name_vi": "Công nghiệp Phụ trợ",
                "name_en": "Supporting Industries",
                "name_zh_hans": "配套工业",
                "name_ko": "부대 산업",
                "banner_alt_vi": "Công nghiệp Phụ trợ",
                "banner_alt_en": "Supporting Industries",
                "banner_alt_zh_hans": "配套工业",
                "banner_alt_ko": "부대 산업",
                "intro_title_vi": "Công nghiệp Phụ trợ",
                "intro_title_en": "Supporting Industries",
                "intro_title_zh_hans": "配套工业",
                "intro_title_ko": "부대 산업",
                "intro_description_vi": (
                    "<p>Phoenix chuyên gia công cơ khí, sản xuất kết cấu thép, "
                    "cung cấp giải pháp công nghiệp phụ trợ cho các dự án xây dựng và sản xuất.</p>"
                ),
                "intro_description_en": (
                    "<p>Phoenix specializes in mechanical processing, steel structure manufacturing, "
                    "and providing supporting industrial solutions for construction and manufacturing projects.</p>"
                ),
                "intro_description_zh_hans": (
                    "<p>Phoenix专业从事机械加工、钢结构制造，为建筑和制造项目提供配套工业解决方案。</p>"
                ),
                "intro_description_ko": (
                    "<p>Phoenix는 기계 가공, 철골 구조물 제조 및 건설·제조 프로젝트를 위한 부대 산업 솔루션을 전문으로 합니다.</p>"
                ),
                "services": [
                    {
                        "title_vi": "Kết cấu thép", "title_en": "Steel Structures",
                        "title_zh_hans": "钢结构", "title_ko": "철골 구조물",
                        "description_vi": "Sản xuất, lắp đặt kết cấu thép cho nhà xưởng",
                        "description_en": "Manufacturing and installing steel structures for factories",
                        "description_zh_hans": "工厂钢结构的制造与安装",
                        "description_ko": "공장용 철골 구조물 제조 및 설치",
                    },
                    {
                        "title_vi": "Gia công cơ khí", "title_en": "Mechanical Processing",
                        "title_zh_hans": "机械加工", "title_ko": "기계 가공",
                        "description_vi": "Gia công chi tiết cơ khí chính xác",
                        "description_en": "Precision mechanical parts processing",
                        "description_zh_hans": "精密机械零件加工",
                        "description_ko": "정밀 기계 부품 가공",
                    },
                ],
            },
        ]

        for field_data in fields_data:
            services_data = field_data.pop("services")
            field = BusinessField.objects.create(**field_data)

            for i, svc in enumerate(services_data):
                BusinessFieldService.objects.create(field=field, order=i, **svc)

            self.stdout.write(self.style.SUCCESS(
                f"  Created: {field.name_vi} ({len(services_data)} services)"
            ))

        self.stdout.write(self.style.SUCCESS(
            f"\nBusiness fields seed complete! Created {len(fields_data)} fields (4 languages)."
            "\nUpload images (banner, intro, service icons, gallery) via Django Admin."
        ))
