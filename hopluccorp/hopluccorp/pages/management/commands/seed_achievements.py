"""
Seed achievements page — awards & gallery in 4 languages.
Run: python manage.py seed_achievements
Run (reset): python manage.py seed_achievements --reset
"""
from django.core.management.base import BaseCommand

from hopluccorp.pages.models import AchievementGalleryItem, Award


AWARDS = [
    # ── 2025 ──────────────────────────────────────────────────────────────────
    {
        "year": "2025",
        "title_vi": "Top 500 Doanh nghiệp lớn nhất Việt Nam (VNR500)",
        "title_en": "Top 500 Largest Enterprises in Vietnam (VNR500)",
        "title_zh_hans": "越南500强企业（VNR500）",
        "title_ko": "베트남 500대 기업 (VNR500)",
        "organization_vi": "Vietnam Report",
        "organization_en": "Vietnam Report",
        "organization_zh_hans": "越南报告",
        "organization_ko": "베트남 리포트",
        "description_vi": "Hợp Lực tiếp tục được vinh danh trong danh sách Top 500 Doanh nghiệp lớn nhất Việt Nam năm 2025, khẳng định vị thế hàng đầu trong ngành xây dựng công nghiệp.",
        "description_en": "Hợp Lực continues to be honored in the Top 500 Largest Enterprises in Vietnam 2025, affirming its leading position in the industrial construction sector.",
        "description_zh_hans": "合力集团再次荣登2025年越南500强企业榜单，进一步巩固其在工业建筑领域的领先地位。",
        "description_ko": "합력은 2025년 베트남 500대 기업 목록에 계속 선정되어 산업 건설 분야의 선도적 위치를 재확인했습니다.",
    },
    {
        "year": "2025",
        "title_vi": "Top 2 Doanh nghiệp Xây dựng tư nhân lớn nhất Việt Nam",
        "title_en": "Top 2 Largest Private Construction Companies in Vietnam",
        "title_zh_hans": "越南最大私营建筑企业前2名",
        "title_ko": "베트남 민간 건설기업 2위",
        "organization_vi": "Vietnam Report",
        "organization_en": "Vietnam Report",
        "organization_zh_hans": "越南报告",
        "organization_ko": "베트남 리포트",
        "description_vi": "Trong lĩnh vực xây dựng tư nhân, Hợp Lực vươn lên vị trí Top 2, ghi nhận sự tăng trưởng vượt bậc so với các năm trước.",
        "description_en": "In the private construction sector, Hợp Lực rose to Top 2, marking outstanding growth compared to previous years.",
        "description_zh_hans": "在私营建筑领域，合力集团跃升至前2名，显示出相较往年的卓越增长。",
        "description_ko": "민간 건설 분야에서 합력은 2위로 도약하여 전년 대비 뛰어난 성장을 기록했습니다.",
    },
    # ── 2024 ──────────────────────────────────────────────────────────────────
    {
        "year": "2024",
        "title_vi": "Top 500 Doanh nghiệp lớn nhất Việt Nam (VNR500)",
        "title_en": "Top 500 Largest Enterprises in Vietnam (VNR500)",
        "title_zh_hans": "越南500强企业（VNR500）",
        "title_ko": "베트남 500대 기업 (VNR500)",
        "organization_vi": "Vietnam Report",
        "organization_en": "Vietnam Report",
        "organization_zh_hans": "越南报告",
        "organization_ko": "베트남 리포트",
        "description_vi": "Hợp Lực lọt Top 500 Doanh nghiệp lớn nhất Việt Nam năm 2024, tiếp tục khẳng định quy mô và tầm ảnh hưởng trong ngành xây dựng.",
        "description_en": "Hợp Lực entered the Top 500 Largest Enterprises in Vietnam 2024, continuing to affirm its scale and influence in the construction industry.",
        "description_zh_hans": "合力集团入选2024年越南500强，持续彰显其在建筑行业的规模与影响力。",
        "description_ko": "합력은 2024년 베트남 500대 기업에 선정되어 건설 업계에서의 규모와 영향력을 지속적으로 확인했습니다.",
    },
    {
        "year": "2024",
        "title_vi": "Top 13 Doanh nghiệp Xây dựng lớn nhất Việt Nam",
        "title_en": "Top 13 Largest Construction Enterprises in Vietnam",
        "title_zh_hans": "越南最大建筑企业前13名",
        "title_ko": "베트남 건설기업 13위",
        "organization_vi": "Vietnam Report",
        "organization_en": "Vietnam Report",
        "organization_zh_hans": "越南报告",
        "organization_ko": "베트남 리포트",
        "description_vi": "Trong bảng xếp hạng doanh nghiệp xây dựng, Hợp Lực đứng ở vị trí số 13, thể hiện năng lực thi công và quản lý dự án vượt trội.",
        "description_en": "In the construction company ranking, Hợp Lực stands at position 13, demonstrating outstanding construction and project management capabilities.",
        "description_zh_hans": "在建筑企业排名中，合力集团位列第13名，展现了卓越的施工与项目管理能力。",
        "description_ko": "건설 기업 순위에서 합력은 13위에 올라 탁월한 시공 및 프로젝트 관리 역량을 입증했습니다.",
    },
    {
        "year": "2024",
        "title_vi": "Top 10 Doanh nghiệp Xây dựng tư nhân lớn nhất Việt Nam",
        "title_en": "Top 10 Largest Private Construction Companies in Vietnam",
        "title_zh_hans": "越南10大私营建筑企业",
        "title_ko": "베트남 10대 민간 건설기업",
        "organization_vi": "Vietnam Report",
        "organization_en": "Vietnam Report",
        "organization_zh_hans": "越南报告",
        "organization_ko": "베트남 리포트",
        "description_vi": "Trong nhóm các doanh nghiệp xây dựng tư nhân, Hợp Lực đứng trong Top 10, là minh chứng cho sự phát triển bền vững của doanh nghiệp tư nhân Việt Nam trong lĩnh vực xây dựng.",
        "description_en": "Among private construction companies, Hợp Lực ranks in the Top 10, a testament to the sustainable development of Vietnamese private enterprises in construction.",
        "description_zh_hans": "在私营建筑企业中，合力集团跻身前10名，彰显越南私营企业在建筑领域的可持续发展。",
        "description_ko": "민간 건설기업 중 합력은 10위 안에 들어 베트남 민간 기업의 지속 가능한 발전을 증명했습니다.",
    },
    # ── 2023 ──────────────────────────────────────────────────────────────────
    {
        "year": "2023",
        "title_vi": "Top 500 Doanh nghiệp lớn nhất Việt Nam (VNR500)",
        "title_en": "Top 500 Largest Enterprises in Vietnam (VNR500)",
        "title_zh_hans": "越南500强企业（VNR500）",
        "title_ko": "베트남 500대 기업 (VNR500)",
        "organization_vi": "Vietnam Report",
        "organization_en": "Vietnam Report",
        "organization_zh_hans": "越南报告",
        "organization_ko": "베트남 리포트",
        "description_vi": "Năm 2023, Hợp Lực tiếp tục có mặt trong danh sách VNR500 — bảng xếp hạng uy tín nhất về doanh nghiệp tại Việt Nam.",
        "description_en": "In 2023, Hợp Lực continues to appear in the VNR500 list — the most prestigious enterprise ranking in Vietnam.",
        "description_zh_hans": "2023年，合力集团继续入围VNR500榜单——越南最权威的企业排行榜。",
        "description_ko": "2023년, 합력은 베트남에서 가장 권위 있는 기업 순위인 VNR500 목록에 계속 이름을 올렸습니다.",
    },
    {
        "year": "2023",
        "title_vi": "Nhà thầu Xây dựng Uy tín — Top 10",
        "title_en": "Reputable Construction Contractor — Top 10",
        "title_zh_hans": "信誉建筑承包商——前10名",
        "title_ko": "신뢰할 수 있는 건설 시공업체 — 10위 안",
        "organization_vi": "Hiệp hội Nhà thầu Xây dựng Việt Nam (VACC)",
        "organization_en": "Vietnam Association of Construction Contractors (VACC)",
        "organization_zh_hans": "越南建筑承包商协会（VACC）",
        "organization_ko": "베트남 건설 도급업체 협회 (VACC)",
        "description_vi": "Hợp Lực được vinh danh là một trong 10 Nhà thầu Xây dựng Uy tín nhất Việt Nam bởi Hiệp hội Nhà thầu Xây dựng Việt Nam.",
        "description_en": "Hợp Lực was honored as one of the 10 most reputable construction contractors in Vietnam by the Vietnam Association of Construction Contractors.",
        "description_zh_hans": "合力集团被越南建筑承包商协会评为越南最具信誉的10家建筑承包商之一。",
        "description_ko": "합력은 베트남 건설 도급업체 협회로부터 베트남에서 가장 신뢰할 수 있는 건설 업체 10개 중 하나로 선정되었습니다.",
    },
    # ── Chứng chỉ ISO ─────────────────────────────────────────────────────────
    {
        "year": "2022",
        "title_vi": "Chứng chỉ ISO 9001:2015 — Hệ thống quản lý chất lượng",
        "title_en": "ISO 9001:2015 Certification — Quality Management System",
        "title_zh_hans": "ISO 9001:2015认证——质量管理体系",
        "title_ko": "ISO 9001:2015 인증 — 품질 경영 시스템",
        "organization_vi": "Bureau Veritas",
        "organization_en": "Bureau Veritas",
        "organization_zh_hans": "必维国际检验集团",
        "organization_ko": "뷰로 베리타스",
        "description_vi": "Hợp Lực đạt chứng nhận ISO 9001:2015 cho hệ thống quản lý chất lượng, đảm bảo mọi quy trình thi công đều đáp ứng tiêu chuẩn quốc tế cao nhất.",
        "description_en": "Hợp Lực achieved ISO 9001:2015 certification for its quality management system, ensuring all construction processes meet the highest international standards.",
        "description_zh_hans": "合力集团获得ISO 9001:2015质量管理体系认证，确保所有施工流程均符合最高国际标准。",
        "description_ko": "합력은 품질 경영 시스템 ISO 9001:2015 인증을 획득하여 모든 시공 과정이 최고 국제 기준을 충족함을 보장합니다.",
    },
    {
        "year": "2022",
        "title_vi": "Chứng chỉ ISO 14001:2015 — Hệ thống quản lý môi trường",
        "title_en": "ISO 14001:2015 Certification — Environmental Management System",
        "title_zh_hans": "ISO 14001:2015认证——环境管理体系",
        "title_ko": "ISO 14001:2015 인증 — 환경 경영 시스템",
        "organization_vi": "Bureau Veritas",
        "organization_en": "Bureau Veritas",
        "organization_zh_hans": "必维国际检验集团",
        "organization_ko": "뷰로 베리타스",
        "description_vi": "Chứng nhận ISO 14001:2015 thể hiện cam kết của Hợp Lực trong việc bảo vệ môi trường và xây dựng bền vững tại mọi công trình.",
        "description_en": "The ISO 14001:2015 certification demonstrates Hợp Lực's commitment to environmental protection and sustainable construction at every project.",
        "description_zh_hans": "ISO 14001:2015认证体现了合力集团对每个项目环境保护和可持续建设的承诺。",
        "description_ko": "ISO 14001:2015 인증은 모든 프로젝트에서 환경 보호와 지속 가능한 건설에 대한 합력의 헌신을 보여줍니다.",
    },
    {
        "year": "2022",
        "title_vi": "Chứng chỉ ISO 45001:2018 — Hệ thống quản lý an toàn & sức khỏe nghề nghiệp",
        "title_en": "ISO 45001:2018 Certification — Occupational Health & Safety Management System",
        "title_zh_hans": "ISO 45001:2018认证——职业健康与安全管理体系",
        "title_ko": "ISO 45001:2018 인증 — 직업 보건 및 안전 경영 시스템",
        "organization_vi": "Bureau Veritas",
        "organization_en": "Bureau Veritas",
        "organization_zh_hans": "必维国际检验集团",
        "organization_ko": "뷰로 베리타스",
        "description_vi": "ISO 45001:2018 là minh chứng cho văn hóa an toàn lao động của Hợp Lực — bảo vệ sức khỏe và sự an toàn của hơn 1.500 cán bộ, kỹ sư trên các công trường.",
        "description_en": "ISO 45001:2018 is a testament to Hợp Lực's workplace safety culture — protecting the health and safety of over 1,500 staff and engineers across construction sites.",
        "description_zh_hans": "ISO 45001:2018是合力集团安全生产文化的有力证明，保障了1500余名员工和工程师在施工现场的健康与安全。",
        "description_ko": "ISO 45001:2018은 합력의 산업 안전 문화를 증명하며, 건설 현장의 1,500명 이상의 직원과 엔지니어의 건강과 안전을 보호합니다.",
    },
    # ── 2021 ──────────────────────────────────────────────────────────────────
    {
        "year": "2021",
        "title_vi": "Doanh nghiệp tiêu biểu ngành Xây dựng",
        "title_en": "Outstanding Enterprise in the Construction Sector",
        "title_zh_hans": "建筑行业优秀企业",
        "title_ko": "건설 분야 우수 기업",
        "organization_vi": "Bộ Xây dựng Việt Nam",
        "organization_en": "Ministry of Construction of Vietnam",
        "organization_zh_hans": "越南建设部",
        "organization_ko": "베트남 건설부",
        "description_vi": "Bộ Xây dựng trao tặng danh hiệu Doanh nghiệp tiêu biểu cho Hợp Lực nhờ những đóng góp xuất sắc trong phát triển hạ tầng công nghiệp quốc gia.",
        "description_en": "The Ministry of Construction awarded Hợp Lực the Outstanding Enterprise title for excellent contributions to the development of national industrial infrastructure.",
        "description_zh_hans": "建设部授予合力集团「优秀企业」称号，以表彰其在国家工业基础设施发展中的卓越贡献。",
        "description_ko": "건설부는 국가 산업 인프라 개발에 대한 탁월한 기여를 인정하여 합력에 우수 기업 칭호를 수여했습니다.",
    },
    {
        "year": "2021",
        "title_vi": "Top 500 Doanh nghiệp lớn nhất Việt Nam (VNR500)",
        "title_en": "Top 500 Largest Enterprises in Vietnam (VNR500)",
        "title_zh_hans": "越南500强企业（VNR500）",
        "title_ko": "베트남 500대 기업 (VNR500)",
        "organization_vi": "Vietnam Report",
        "organization_en": "Vietnam Report",
        "organization_zh_hans": "越南报告",
        "organization_ko": "베트남 리포트",
        "description_vi": "Hợp Lực tiếp tục duy trì vị trí trong VNR500 năm 2021, thể hiện sự ổn định và tăng trưởng liên tục qua nhiều năm.",
        "description_en": "Hợp Lực continues to maintain its position in VNR500 in 2021, showing consistent stability and growth over the years.",
        "description_zh_hans": "合力集团在2021年继续保持VNR500地位，展现多年来持续的稳定性与增长。",
        "description_ko": "합력은 2021년에도 VNR500 위치를 유지하며 수년간의 지속적인 안정성과 성장을 보여주었습니다.",
    },
    # ── 2020 ──────────────────────────────────────────────────────────────────
    {
        "year": "2020",
        "title_vi": "Thương hiệu Xây dựng Uy tín & Chất lượng",
        "title_en": "Reputable & Quality Construction Brand",
        "title_zh_hans": "信誉与品质建筑品牌",
        "title_ko": "신뢰할 수 있고 품질 높은 건설 브랜드",
        "organization_vi": "Phòng Thương mại & Công nghiệp Việt Nam (VCCI)",
        "organization_en": "Vietnam Chamber of Commerce and Industry (VCCI)",
        "organization_zh_hans": "越南工商会（VCCI）",
        "organization_ko": "베트남 상공회의소 (VCCI)",
        "description_vi": "VCCI trao tặng danh hiệu Thương hiệu Xây dựng Uy tín & Chất lượng cho Hợp Lực, ghi nhận uy tín thương hiệu và chất lượng thi công vượt trội trong ngành.",
        "description_en": "VCCI awarded Hợp Lực the Reputable & Quality Construction Brand title, recognizing superior brand reputation and construction quality in the industry.",
        "description_zh_hans": "越南工商会授予合力集团「信誉与品质建筑品牌」称号，认可其在行业中卓越的品牌信誉和施工质量。",
        "description_ko": "VCCI는 합력에 신뢰할 수 있고 품질 높은 건설 브랜드 칭호를 수여하여 업계에서의 우수한 브랜드 명성과 시공 품질을 인정했습니다.",
    },
]

GALLERY_IMAGES = [
    {
        "alt_vi": "Lễ trao giải VNR500 — Hợp Lực",
        "alt_en": "VNR500 Award Ceremony — Hợp Lực",
        "alt_zh_hans": "VNR500颁奖典礼——合力",
        "alt_ko": "VNR500 시상식 — 합력",
        "image_url": "https://hopluccorp.vn/wp-content/uploads/2025/11/578961066_1421614496637014_1068712368396805996_n-scaled.jpg",
    },
    {
        "alt_vi": "Hợp Lực nhận giải Top 10 Nhà thầu uy tín",
        "alt_en": "Hợp Lực receives Top 10 Reputable Contractor award",
        "alt_zh_hans": "合力荣获十大信誉承包商奖",
        "alt_ko": "합력, 10대 신뢰 도급업체 수상",
        "image_url": "https://hopluccorp.vn/wp-content/uploads/2025/09/WEB-MEP-11.png",
    },
    {
        "alt_vi": "Đại diện Hợp Lực nhận chứng chỉ ISO",
        "alt_en": "Hợp Lực representative receives ISO certification",
        "alt_zh_hans": "合力代表接受ISO认证",
        "alt_ko": "합력 대표 ISO 인증 수령",
        "image_url": "https://hopluccorp.vn/wp-content/uploads/2025/09/WEB-CAP-13.png",
    },
    {
        "alt_vi": "Hội nghị tổng kết và trao thưởng thường niên",
        "alt_en": "Annual review conference and award ceremony",
        "alt_zh_hans": "年度总结大会暨颁奖典礼",
        "alt_ko": "연간 결산 회의 및 시상식",
        "image_url": "https://hopluccorp.vn/wp-content/uploads/2025/09/WEB-HL-09.png",
    },
    {
        "alt_vi": "Lễ ký kết và ra mắt dự án lớn",
        "alt_en": "Major project signing and launch ceremony",
        "alt_zh_hans": "重大项目签约与启动仪式",
        "alt_ko": "대형 프로젝트 서명 및 출범식",
        "image_url": "https://hopluccorp.vn/wp-content/uploads/2025/11/581676107_1423275879804209_6194982369161778281_n.jpg",
    },
    {
        "alt_vi": "Ban lãnh đạo Hợp Lực tại lễ nhận giải thưởng",
        "alt_en": "Hợp Lực leadership at award ceremony",
        "alt_zh_hans": "合力领导层出席颁奖典礼",
        "alt_ko": "합력 리더십 팀의 시상식 참석",
        "image_url": "https://hopluccorp.vn/wp-content/uploads/2025/11/580525988_1420641133401017_87799570226200566_n.jpg",
    },
    {
        "alt_vi": "Khởi công dự án tiêu biểu — Luxshare-ICT",
        "alt_en": "Groundbreaking of flagship project — Luxshare-ICT",
        "alt_zh_hans": "旗舰项目奠基典礼——Luxshare-ICT",
        "alt_ko": "대표 프로젝트 착공식 — Luxshare-ICT",
        "image_url": "https://hopluccorp.vn/wp-content/uploads/2025/09/WEB-HL-10.png",
    },
    {
        "alt_vi": "Trao học bổng cho sinh viên xuất sắc",
        "alt_en": "Scholarship presentation to outstanding students",
        "alt_zh_hans": "向优秀学生颁发奖学金",
        "alt_ko": "우수 학생 장학금 수여",
        "image_url": "https://hopluccorp.vn/wp-content/uploads/2025/10/558159510_1103063515338322_8721221127502661801_n.jpg",
    },
    {
        "alt_vi": "Hợp Lực tại Triển lãm VRT&CONS 2025",
        "alt_en": "Hợp Lực at VRT&CONS 2025 Exhibition",
        "alt_zh_hans": "合力参加VRT&CONS 2025展览会",
        "alt_ko": "합력, VRT&CONS 2025 전시회 참가",
        "image_url": "https://hopluccorp.vn/wp-content/uploads/2025/10/561351110_1404989371632860_4363488763888569511_n.jpg",
    },
]


class Command(BaseCommand):
    help = "Seed achievements page: awards & gallery in 4 languages."

    def add_arguments(self, parser):
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Delete all existing data before seeding",
        )

    def handle(self, *args, **options):
        if options["reset"]:
            deleted_awards = Award.objects.all().delete()[0]
            deleted_gallery = AchievementGalleryItem.objects.all().delete()[0]
            if deleted_awards:
                self.stdout.write(self.style.WARNING(f"  Deleted {deleted_awards} awards"))
            if deleted_gallery:
                self.stdout.write(self.style.WARNING(f"  Deleted {deleted_gallery} gallery items"))

        self._seed_awards()
        self._seed_gallery()
        self.stdout.write(self.style.SUCCESS("\nAchievements page seed complete (4 languages)!"))

    def _seed_awards(self):
        count = 0
        for data in AWARDS:
            Award.objects.create(
                year=data["year"],
                title_vi=data["title_vi"],
                title_en=data["title_en"],
                title_zh_hans=data["title_zh_hans"],
                title_ko=data["title_ko"],
                organization_vi=data["organization_vi"],
                organization_en=data["organization_en"],
                organization_zh_hans=data["organization_zh_hans"],
                organization_ko=data["organization_ko"],
                description_vi=data["description_vi"],
                description_en=data["description_en"],
                description_zh_hans=data["description_zh_hans"],
                description_ko=data["description_ko"],
                is_active=True,
            )
            count += 1
        self.stdout.write(f"  Created {count} awards")

    def _seed_gallery(self):
        count = 0
        for data in GALLERY_IMAGES:
            # image left blank — upload via Django admin or Cloudinary.
            # Frontend falls back to achievementpage.ts hardcoded URLs when image is empty.
            AchievementGalleryItem.objects.create(
                alt_vi=data["alt_vi"],
                alt_en=data["alt_en"],
                alt_zh_hans=data["alt_zh_hans"],
                alt_ko=data["alt_ko"],
                is_active=True,
            )
            count += 1
        self.stdout.write(f"  Created {count} gallery items (images to be uploaded via admin)")
