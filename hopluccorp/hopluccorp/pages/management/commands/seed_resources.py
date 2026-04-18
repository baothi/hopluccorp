from django.core.management.base import BaseCommand

from hopluccorp.pages.models import (
    Certificate,
    HumanResources,
    ManagementSystem,
    ResourceProject,
    ResourceProjectSection,
    ResourcesBanner,
    StaffBreakdown,
)


class Command(BaseCommand):
    help = "Seed resources page data with 4 languages (VI, EN, ZH, KO). Upload images via Django Admin."

    def add_arguments(self, parser):
        parser.add_argument("--reset", action="store_true", help="Delete existing data before seeding")

    def handle(self, *args, **options):
        if options["reset"]:
            for model in [
                ResourcesBanner, HumanResources, StaffBreakdown,
                ManagementSystem, Certificate,
                ResourceProjectSection, ResourceProject,
            ]:
                model.objects.all().delete()
            self.stdout.write(self.style.WARNING("Deleted all resources data"))

        # Resources Banner (singleton)
        if not ResourcesBanner.objects.exists():
            ResourcesBanner.objects.create(
                alt="Nguồn lực Hợp Lực",
                alt_vi="Nguồn lực Hợp Lực",
                alt_en="Hop Luc Resources",
                alt_zh_hans="合力资源",
                alt_ko="합력 리소스",
            )
            self.stdout.write(self.style.SUCCESS("Created resources banner (4 langs)"))

        # Human Resources (singleton)
        if not HumanResources.objects.exists():
            HumanResources.objects.create(
                title="NGUỒN NHÂN LỰC",
                title_vi="NGUỒN NHÂN LỰC",
                title_en="HUMAN RESOURCES",
                title_zh_hans="人力资源",
                title_ko="인적 자원",
                description=(
                    "Ở Hợp Lực, chúng tôi tin rằng nhân lực là yếu tố cốt lõi, quyết định sự thành bại "
                    "của mỗi doanh nghiệp. Với nguồn nhân lực dồi dào và chuyên môn vững chắc, sự tin tưởng "
                    "tuyệt đối từ khách hàng vừa là thách thức, vừa là động lực để đội ngũ nhân sự của "
                    "Hợp Lực không ngừng trau dồi, học hỏi và sáng tạo, nhằm thích ứng kịp thời với "
                    "những biến đổi của thị trường hiện nay."
                ),
                description_vi=(
                    "Ở Hợp Lực, chúng tôi tin rằng nhân lực là yếu tố cốt lõi, quyết định sự thành bại "
                    "của mỗi doanh nghiệp. Với nguồn nhân lực dồi dào và chuyên môn vững chắc, sự tin tưởng "
                    "tuyệt đối từ khách hàng vừa là thách thức, vừa là động lực để đội ngũ nhân sự của "
                    "Hợp Lực không ngừng trau dồi, học hỏi và sáng tạo, nhằm thích ứng kịp thời với "
                    "những biến đổi của thị trường hiện nay."
                ),
                description_en=(
                    "At Hop Luc, we believe people are the core factor that determines the success of every "
                    "enterprise. With abundant human resources and solid expertise, our customers' absolute "
                    "trust is both a challenge and a motivation for our team to continuously improve, learn, "
                    "and innovate to adapt to changing market conditions."
                ),
                description_zh_hans=(
                    "在合力，我们相信人才是决定企业成败的核心因素。凭借充足的人力资源和扎实的专业能力，"
                    "客户的充分信任既是挑战，也是推动团队不断提升、学习和创新的动力，使我们能够及时适应市场变化。"
                ),
                description_ko=(
                    "합력은 인적 자원이 기업의 성공을 결정하는 핵심 요소라고 믿습니다. 풍부한 인력과 탄탄한 "
                    "전문성을 바탕으로 고객의 신뢰는 도전이자 동기이며, 구성원들이 시장 변화에 맞춰 지속적으로 "
                    "학습하고 혁신하도록 이끌고 있습니다."
                ),
                total_staff=">1500",
                total_staff_vi=">1500",
                total_staff_en=">1500",
                total_staff_zh_hans=">1500",
                total_staff_ko=">1500",
            )
            self.stdout.write(self.style.SUCCESS("Created human resources section (4 langs)"))

        # Staff Breakdown
        if not StaffBreakdown.objects.exists():
            for i, data in enumerate([
                {
                    "role": "Giám đốc dự án",
                    "role_vi": "Giám đốc dự án",
                    "role_en": "Project Directors",
                    "role_zh_hans": "项目总监",
                    "role_ko": "프로젝트 디렉터",
                    "count": 35,
                },
                {
                    "role": "Nhân viên Thiết kế",
                    "role_vi": "Nhân viên Thiết kế",
                    "role_en": "Design Staff",
                    "role_zh_hans": "设计人员",
                    "role_ko": "설계 인력",
                    "count": 80,
                },
                {
                    "role": "Nhân viên Văn phòng",
                    "role_vi": "Nhân viên Văn phòng",
                    "role_en": "Office Staff",
                    "role_zh_hans": "办公室人员",
                    "role_ko": "사무 인력",
                    "count": 400,
                },
                {
                    "role": "Kỹ sư & Giám sát",
                    "role_vi": "Kỹ sư & Giám sát",
                    "role_en": "Engineers & Supervisors",
                    "role_zh_hans": "工程师与监理",
                    "role_ko": "엔지니어 및 감독자",
                    "count": 985,
                },
                {
                    "role": "Công nhân",
                    "role_vi": "Công nhân",
                    "role_en": "Workers",
                    "role_zh_hans": "工人",
                    "role_ko": "근로자",
                    "count": 15000,
                },
            ]):
                StaffBreakdown.objects.create(**data, order=i)
            self.stdout.write(self.style.SUCCESS("Created 5 staff breakdown items (4 langs)"))

        # Management System (singleton)
        if not ManagementSystem.objects.exists():
            ManagementSystem.objects.create(
                title="HỆ THỐNG QUẢN LÝ",
                title_vi="HỆ THỐNG QUẢN LÝ",
                title_en="MANAGEMENT SYSTEM",
                title_zh_hans="管理体系",
                title_ko="관리 시스템",
                description=(
                    "Chất lượng luôn được xem là yếu tố làm tăng khả năng cạnh tranh cho doanh nghiệp. "
                    "Nhận thức rõ tầm quan trọng này, Hợp Lực không ngừng cải tiến và áp dụng những "
                    "quy chuẩn, hệ thống quản lý tiên tiến nhất, nhằm đáp ứng tối đa yêu cầu khắt khe "
                    "từ khách hàng và tăng cường sức mạnh nội tại của công ty."
                ),
                description_vi=(
                    "Chất lượng luôn được xem là yếu tố làm tăng khả năng cạnh tranh cho doanh nghiệp. "
                    "Nhận thức rõ tầm quan trọng này, Hợp Lực không ngừng cải tiến và áp dụng những "
                    "quy chuẩn, hệ thống quản lý tiên tiến nhất, nhằm đáp ứng tối đa yêu cầu khắt khe "
                    "từ khách hàng và tăng cường sức mạnh nội tại của công ty."
                ),
                description_en=(
                    "Quality is always regarded as a key factor in strengthening enterprise competitiveness. "
                    "Recognizing this importance, Hop Luc continuously improves and applies advanced standards "
                    "and management systems to meet strict customer requirements and reinforce internal capability."
                ),
                description_zh_hans=(
                    "质量始终被视为提升企业竞争力的关键因素。合力深知其重要性，不断改进并应用先进的标准和管理体系，"
                    "以最大限度满足客户的严格要求，并增强企业内在实力。"
                ),
                description_ko=(
                    "품질은 기업 경쟁력을 높이는 핵심 요소입니다. 합력은 이를 깊이 인식하고 선진 기준과 관리 "
                    "시스템을 지속적으로 개선, 적용하여 고객의 엄격한 요구에 대응하고 내부 역량을 강화하고 있습니다."
                ),
                slogan='Với phương châm "Trao chất lượng, Nhận niềm tin", Hợp Lực luôn đặt sự hài lòng của khách hàng làm tôn chỉ cao nhất.',
                slogan_vi='Với phương châm "Trao chất lượng, Nhận niềm tin", Hợp Lực luôn đặt sự hài lòng của khách hàng làm tôn chỉ cao nhất.',
                slogan_en='With the motto "Deliver quality, earn trust", Hop Luc always regards customer satisfaction as its highest principle.',
                slogan_zh_hans="秉持“交付质量，赢得信任”的方针，合力始终将客户满意作为最高准则。",
                slogan_ko='“품질을 제공하고 신뢰를 얻는다”는 방침 아래, 합력은 고객 만족을 최고의 원칙으로 삼고 있습니다.',
            )
            self.stdout.write(self.style.SUCCESS("Created management system section (4 langs)"))

        # Certificates
        if not Certificate.objects.exists():
            for i, data in enumerate([
                {
                    "name": "ISO 14001:2015",
                    "name_vi": "ISO 14001:2015",
                    "name_en": "ISO 14001:2015",
                    "name_zh_hans": "ISO 14001:2015",
                    "name_ko": "ISO 14001:2015",
                    "title": "Quản lý môi trường",
                    "title_vi": "Quản lý môi trường",
                    "title_en": "Environmental Management",
                    "title_zh_hans": "环境管理",
                    "title_ko": "환경 경영",
                },
                {
                    "name": "ISO 9001:2015",
                    "name_vi": "ISO 9001:2015",
                    "name_en": "ISO 9001:2015",
                    "name_zh_hans": "ISO 9001:2015",
                    "name_ko": "ISO 9001:2015",
                    "title": "Quản lý chất lượng",
                    "title_vi": "Quản lý chất lượng",
                    "title_en": "Quality Management",
                    "title_zh_hans": "质量管理",
                    "title_ko": "품질 경영",
                },
                {
                    "name": "ISO 45001:2018",
                    "name_vi": "ISO 45001:2018",
                    "name_en": "ISO 45001:2018",
                    "name_zh_hans": "ISO 45001:2018",
                    "name_ko": "ISO 45001:2018",
                    "title": "Quản lý sức khỏe nghề nghiệp",
                    "title_vi": "Quản lý sức khỏe nghề nghiệp",
                    "title_en": "Occupational Health Management",
                    "title_zh_hans": "职业健康管理",
                    "title_ko": "산업 보건 관리",
                },
            ]):
                Certificate.objects.create(**data, order=i)
            self.stdout.write(self.style.SUCCESS("Created 3 certificates (4 langs)"))

        # Resource Project Section (singleton)
        if not ResourceProjectSection.objects.exists():
            ResourceProjectSection.objects.create(
                title="Dự án",
                title_vi="Dự án",
                title_en="Projects",
                title_zh_hans="项目",
                title_ko="프로젝트",
                total_projects="500 dự án",
                total_projects_vi="500 dự án",
                total_projects_en="500 projects",
                total_projects_zh_hans="500个项目",
                total_projects_ko="500개 프로젝트",
            )
            self.stdout.write(self.style.SUCCESS("Created projects section config (4 langs)"))

        # Resource Projects
        if not ResourceProject.objects.exists():
            projects = [
                {
                    "name_vi": "NHÀ MÁY SẢN XUẤT VĂN PHÒNG PHẨM TẬP ĐOÀN DELI VIỆT NAM",
                    "name_en": "DELI VIETNAM STATIONERY MANUFACTURING FACTORY",
                    "name_zh_hans": "得力越南文具制造工厂",
                    "name_ko": "델리 베트남 문구 제조 공장",
                    "location_vi": "KCN Đại An mở rộng",
                    "location_en": "Dai An Expansion Industrial Park",
                    "location_zh_hans": "大安扩建工业园",
                    "location_ko": "다이안 확장 산업단지",
                    "province_vi": "Hải Dương",
                    "province_en": "Hai Duong",
                    "province_zh_hans": "海阳省",
                    "province_ko": "하이즈엉성",
                },
                {
                    "name_vi": "NHÀ MÁY FOXCONN NGHỆ AN",
                    "name_en": "FOXCONN NGHE AN FACTORY",
                    "name_zh_hans": "富士康乂安工厂",
                    "name_ko": "폭스콘 응에안 공장",
                    "location_vi": "KCN WHA",
                    "location_en": "WHA Industrial Park",
                    "location_zh_hans": "WHA工业园",
                    "location_ko": "WHA 산업단지",
                    "province_vi": "Nghệ An",
                    "province_en": "Nghe An",
                    "province_zh_hans": "乂安省",
                    "province_ko": "응에안성",
                },
                {
                    "name_vi": "NHÀ XƯỞNG XÂY SẴN VÀ VĂN PHÒNG CHO THUÊ SOILBUILD NGHỆ AN",
                    "name_en": "SOILBUILD NGHE AN READY-BUILT FACTORY AND OFFICE FOR LEASE",
                    "name_zh_hans": "SOILBUILD乂安预制厂房及租赁办公室",
                    "name_ko": "소일빌드 응에안 임대형 공장 및 사무실",
                    "location_vi": "KCN WHA",
                    "location_en": "WHA Industrial Park",
                    "location_zh_hans": "WHA工业园",
                    "location_ko": "WHA 산업단지",
                    "province_vi": "Nghệ An",
                    "province_en": "Nghe An",
                    "province_zh_hans": "乂安省",
                    "province_ko": "응에안성",
                },
                {
                    "name_vi": "NHÀ MÁY SOLEX HIGH-TECH INDUSTRIES (VIỆT NAM)",
                    "name_en": "SOLEX HIGH-TECH INDUSTRIES VIETNAM FACTORY",
                    "name_zh_hans": "SOLEX越南高科技工业工厂",
                    "name_ko": "소렉스 하이테크 인더스트리즈 베트남 공장",
                    "location_vi": "KCN Bắc Tiền Phong",
                    "location_en": "Bac Tien Phong Industrial Park",
                    "location_zh_hans": "北先锋工业园",
                    "location_ko": "박띠엔퐁 산업단지",
                    "province_vi": "Quảng Ninh",
                    "province_en": "Quang Ninh",
                    "province_zh_hans": "广宁省",
                    "province_ko": "꽝닌성",
                },
                {
                    "name_vi": "NHÀ MÁY HW ENERGY",
                    "name_en": "HW ENERGY FACTORY",
                    "name_zh_hans": "HW能源工厂",
                    "name_ko": "HW 에너지 공장",
                    "location_vi": "KCN DEEP C2B",
                    "location_en": "DEEP C2B Industrial Park",
                    "location_zh_hans": "DEEP C2B工业园",
                    "location_ko": "DEEP C2B 산업단지",
                    "province_vi": "Hải Phòng",
                    "province_en": "Hai Phong",
                    "province_zh_hans": "海防市",
                    "province_ko": "하이퐁시",
                },
                {
                    "name_vi": "NHÀ MÁY LUXSHARE-ICT (NGHỆ AN) 2",
                    "name_en": "LUXSHARE-ICT NGHE AN 2 FACTORY",
                    "name_zh_hans": "立讯精密乂安二厂",
                    "name_ko": "럭스쉐어-ICT 응에안 2공장",
                    "location_vi": "KCN VSIP",
                    "location_en": "VSIP Industrial Park",
                    "location_zh_hans": "VSIP工业园",
                    "location_ko": "VSIP 산업단지",
                    "province_vi": "Nghệ An",
                    "province_en": "Nghe An",
                    "province_zh_hans": "乂安省",
                    "province_ko": "응에안성",
                },
                {
                    "name_vi": "NHÀ MÁY CÔNG TY TNHH CÔNG NGHỆ THÔNG MINH GOERTEK VINA",
                    "name_en": "GOERTEK VINA SMART TECHNOLOGY FACTORY",
                    "name_zh_hans": "歌尔泰克Vina智能科技工厂",
                    "name_ko": "고어텍 비나 스마트 테크놀로지 공장",
                    "location_vi": "KCN Nam Sơn - Hạp Lĩnh",
                    "location_en": "Nam Son - Hap Linh Industrial Park",
                    "location_zh_hans": "南山-合岭工业园",
                    "location_ko": "남선-합린 산업단지",
                    "province_vi": "Bắc Ninh",
                    "province_en": "Bac Ninh",
                    "province_zh_hans": "北宁省",
                    "province_ko": "박닌성",
                },
                {
                    "name_vi": "NHÀ MÁY ĐIỆN TỬ BYD (VIỆT NAM)",
                    "name_en": "BYD ELECTRONICS VIETNAM FACTORY",
                    "name_zh_hans": "比亚迪电子越南工厂",
                    "name_ko": "BYD 전자 베트남 공장",
                    "location_vi": "KCN Phú Hà",
                    "location_en": "Phu Ha Industrial Park",
                    "location_zh_hans": "富河工业园",
                    "location_ko": "푸하 산업단지",
                    "province_vi": "Phú Thọ",
                    "province_en": "Phu Tho",
                    "province_zh_hans": "富寿省",
                    "province_ko": "푸토성",
                },
                {
                    "name_vi": "NHÀ MÁY DESAY BATTERY VINA",
                    "name_en": "DESAY BATTERY VINA FACTORY",
                    "name_zh_hans": "德赛电池Vina工厂",
                    "name_ko": "데사이 배터리 비나 공장",
                    "location_vi": "KCN Song Khê Nội Hoàng",
                    "location_en": "Song Khe - Noi Hoang Industrial Park",
                    "location_zh_hans": "双溪-内黄工业园",
                    "location_ko": "송케-노이호앙 산업단지",
                    "province_vi": "Bắc Giang",
                    "province_en": "Bac Giang",
                    "province_zh_hans": "北江省",
                    "province_ko": "박장성",
                },
                {
                    "name_vi": "NHÀ MÁY INNOVATION PRECISION VIỆT NAM",
                    "name_en": "INNOVATION PRECISION VIETNAM FACTORY",
                    "name_zh_hans": "创新精密越南工厂",
                    "name_ko": "이노베이션 프리시전 베트남 공장",
                    "location_vi": "KCN VSIP",
                    "location_en": "VSIP Industrial Park",
                    "location_zh_hans": "VSIP工业园",
                    "location_ko": "VSIP 산업단지",
                    "province_vi": "Nghệ An",
                    "province_en": "Nghe An",
                    "province_zh_hans": "乂安省",
                    "province_ko": "응에안성",
                },
                {
                    "name_vi": "NHÀ MÁY COT VIỆT NAM",
                    "name_en": "COT VIETNAM FACTORY",
                    "name_zh_hans": "COT越南工厂",
                    "name_ko": "COT 베트남 공장",
                    "location_vi": "KCN Thăng Long 2",
                    "location_en": "Thang Long II Industrial Park",
                    "location_zh_hans": "升龙二号工业园",
                    "location_ko": "탕롱 II 산업단지",
                    "province_vi": "Hưng Yên",
                    "province_en": "Hung Yen",
                    "province_zh_hans": "兴安省",
                    "province_ko": "흥옌성",
                },
                {
                    "name_vi": "NHÀ MÁY SUNNY AUTOMOTIVE QUANG HỌC VIỆT NAM",
                    "name_en": "SUNNY AUTOMOTIVE OPTICS VIETNAM FACTORY",
                    "name_zh_hans": "舜宇汽车光学越南工厂",
                    "name_ko": "써니 오토모티브 광학 베트남 공장",
                    "location_vi": "KCN WHA",
                    "location_en": "WHA Industrial Park",
                    "location_zh_hans": "WHA工业园",
                    "location_ko": "WHA 산업단지",
                    "province_vi": "Nghệ An",
                    "province_en": "Nghe An",
                    "province_zh_hans": "乂安省",
                    "province_ko": "응에안성",
                },
                {
                    "name_vi": "NHÀ MÁY SẢN XUẤT LINH KIỆN ĐIỆN TỬ VÀ PHỤ TÙNG Ô TÔ JUTENG",
                    "name_en": "JUTENG ELECTRONIC COMPONENTS AND AUTO PARTS FACTORY",
                    "name_zh_hans": "巨腾电子零部件及汽车配件工厂",
                    "name_ko": "주텅 전자부품 및 자동차 부품 공장",
                    "location_vi": "KCN Hoàng Mai I",
                    "location_en": "Hoang Mai I Industrial Park",
                    "location_zh_hans": "黄梅一号工业园",
                    "location_ko": "호앙마이 I 산업단지",
                    "province_vi": "Nghệ An",
                    "province_en": "Nghe An",
                    "province_zh_hans": "乂安省",
                    "province_ko": "응에안성",
                },
                {
                    "name_vi": "SLP BẮC NINH LOGISTIC",
                    "name_en": "SLP BAC NINH LOGISTICS",
                    "name_zh_hans": "SLP北宁物流",
                    "name_ko": "SLP 박닌 물류",
                    "location_vi": "KCN Thuận Thành II",
                    "location_en": "Thuan Thanh II Industrial Park",
                    "location_zh_hans": "顺成二号工业园",
                    "location_ko": "투언타인 II 산업단지",
                    "province_vi": "Bắc Ninh",
                    "province_en": "Bac Ninh",
                    "province_zh_hans": "北宁省",
                    "province_ko": "박닌성",
                },
                {
                    "name_vi": "NHÀ MÁY SÔNG HỒNG - XUÂN TRƯỜNG II",
                    "name_en": "SONG HONG - XUAN TRUONG II FACTORY",
                    "name_zh_hans": "红河-春长II工厂",
                    "name_ko": "송홍 - 쑤언쯔엉 II 공장",
                    "location_vi": "Huyện Xuân Trường",
                    "location_en": "Xuan Truong District",
                    "location_zh_hans": "春长县",
                    "location_ko": "쑤언쯔엉현",
                    "province_vi": "Nam Định",
                    "province_en": "Nam Dinh",
                    "province_zh_hans": "南定省",
                    "province_ko": "남딘성",
                },
                {
                    "name_vi": "NHÀ MÁY SẢN XUẤT, LẮP RÁP Ô TÔ VIỆT NHẬT",
                    "name_en": "VIET NHAT AUTOMOBILE MANUFACTURING AND ASSEMBLY FACTORY",
                    "name_zh_hans": "越日汽车制造及装配工厂",
                    "name_ko": "비엣낫 자동차 제조 및 조립 공장",
                    "location_vi": "Cụm CN Tân Tiến",
                    "location_en": "Tan Tien Industrial Cluster",
                    "location_zh_hans": "新进工业集群",
                    "location_ko": "떤띠엔 산업클러스터",
                    "province_vi": "Hưng Yên",
                    "province_en": "Hung Yen",
                    "province_zh_hans": "兴安省",
                    "province_ko": "흥옌성",
                },
                {
                    "name_vi": "NHÀ MÁY SẢN XUẤT MDF MEKONG",
                    "name_en": "MEKONG MDF MANUFACTURING FACTORY",
                    "name_zh_hans": "湄公河MDF制造工厂",
                    "name_ko": "메콩 MDF 제조 공장",
                    "location_vi": "KCN Cẩm Khê",
                    "location_en": "Cam Khe Industrial Park",
                    "location_zh_hans": "锦溪工业园",
                    "location_ko": "껌케 산업단지",
                    "province_vi": "Phú Thọ",
                    "province_en": "Phu Tho",
                    "province_zh_hans": "富寿省",
                    "province_ko": "푸토성",
                },
                {
                    "name_vi": "NHÀ MÁY CÔNG NGHIỆP CHÍNH XÁC GOERTEK VINA",
                    "name_en": "GOERTEK VINA PRECISION INDUSTRY FACTORY",
                    "name_zh_hans": "歌尔泰克Vina精密工业工厂",
                    "name_ko": "고어텍 비나 정밀산업 공장",
                    "location_vi": "KCN WHA Industrial Zone 1",
                    "location_en": "WHA Industrial Zone 1",
                    "location_zh_hans": "WHA一号工业区",
                    "location_ko": "WHA 산업단지 1구역",
                    "province_vi": "Nghệ An",
                    "province_en": "Nghe An",
                    "province_zh_hans": "乂安省",
                    "province_ko": "응에안성",
                },
                {
                    "name_vi": "NHÀ MÁY DBG TECHNOLOGY VIỆT NAM",
                    "name_en": "DBG TECHNOLOGY VIETNAM FACTORY",
                    "name_zh_hans": "DBG科技越南工厂",
                    "name_ko": "DBG 테크놀로지 베트남 공장",
                    "location_vi": "KCN Yên Bình",
                    "location_en": "Yen Binh Industrial Park",
                    "location_zh_hans": "安平工业园",
                    "location_ko": "옌빈 산업단지",
                    "province_vi": "Thái Nguyên",
                    "province_en": "Thai Nguyen",
                    "province_zh_hans": "太原省",
                    "province_ko": "타이응우옌성",
                },
                {
                    "name_vi": "NHÀ MÁY LUXSHARE-ICT (NGHỆ AN)",
                    "name_en": "LUXSHARE-ICT NGHE AN FACTORY",
                    "name_zh_hans": "立讯精密乂安工厂",
                    "name_ko": "럭스쉐어-ICT 응에안 공장",
                    "location_vi": "KCN VSIP",
                    "location_en": "VSIP Industrial Park",
                    "location_zh_hans": "VSIP工业园",
                    "location_ko": "VSIP 산업단지",
                    "province_vi": "Nghệ An",
                    "province_en": "Nghe An",
                    "province_zh_hans": "乂安省",
                    "province_ko": "응에안성",
                },
                {
                    "name_vi": "NHÀ MÁY KHOA HỌC KỸ THUẬT KIM LOẠI TÂN VIỆT",
                    "name_en": "TAN VIET METAL SCIENCE AND TECHNOLOGY FACTORY",
                    "name_zh_hans": "新越金属科技工厂",
                    "name_ko": "떤비엣 금속 과학기술 공장",
                    "location_vi": "KCN WHA",
                    "location_en": "WHA Industrial Park",
                    "location_zh_hans": "WHA工业园",
                    "location_ko": "WHA 산업단지",
                    "province_vi": "Nghệ An",
                    "province_en": "Nghe An",
                    "province_zh_hans": "乂安省",
                    "province_ko": "응에안성",
                },
                {
                    "name_vi": "NHÀ MÁY CAYI TECHNOLOGY VIỆT NAM",
                    "name_en": "CAYI TECHNOLOGY VIETNAM FACTORY",
                    "name_zh_hans": "CAYI科技越南工厂",
                    "name_ko": "CAYI 테크놀로지 베트남 공장",
                    "location_vi": "KCN Yên Phong II-C",
                    "location_en": "Yen Phong II-C Industrial Park",
                    "location_zh_hans": "安丰II-C工业园",
                    "location_ko": "옌퐁 II-C 산업단지",
                    "province_vi": "Bắc Ninh",
                    "province_en": "Bac Ninh",
                    "province_zh_hans": "北宁省",
                    "province_ko": "박닌성",
                },
                {
                    "name_vi": "NHÀ MÁY BE BRIGHT",
                    "name_en": "BE BRIGHT FACTORY",
                    "name_zh_hans": "BE BRIGHT工厂",
                    "name_ko": "비 브라이트 공장",
                    "location_vi": "KCN Tiền Hải",
                    "location_en": "Tien Hai Industrial Park",
                    "location_zh_hans": "前海工业园",
                    "location_ko": "띠엔하이 산업단지",
                    "province_vi": "Thái Bình",
                    "province_en": "Thai Binh",
                    "province_zh_hans": "太平省",
                    "province_ko": "타이빈성",
                },
                {
                    "name_vi": "KHU NHÀ Ở CÁN BỘ, CÔNG NHÂN NHIỆT ĐIỆN VŨNG ÁNG 2",
                    "name_en": "VUNG ANG 2 THERMAL POWER STAFF AND WORKER HOUSING AREA",
                    "name_zh_hans": "永昂2号热电厂员工及工人住宅区",
                    "name_ko": "붕앙 2 화력발전소 직원 및 근로자 주거단지",
                    "location_vi": "Khu kinh tế Vũng Áng",
                    "location_en": "Vung Ang Economic Zone",
                    "location_zh_hans": "永昂经济区",
                    "location_ko": "붕앙 경제구역",
                    "province_vi": "Hà Tĩnh",
                    "province_en": "Ha Tinh",
                    "province_zh_hans": "河静省",
                    "province_ko": "하띤성",
                },
            ]
            for i, data in enumerate(projects):
                ResourceProject.objects.create(
                    name=data["name_vi"],
                    location=data["location_vi"],
                    province=data["province_vi"],
                    order=i,
                    **data,
                )
            self.stdout.write(self.style.SUCCESS(f"Created {len(projects)} resource projects (4 langs)"))

        self.stdout.write(self.style.SUCCESS("Resources seed complete! Upload images via Django Admin."))
