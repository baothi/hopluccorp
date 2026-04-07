from django.core.management.base import BaseCommand
from django.utils import timezone

from hopluccorp.pages.models import (
    AboutBlock,
    AboutSection,
    BannerSlide,
    BusinessCategory,
    NewsArticle,
    Partner,
    SiteConfig,
    StatItem,
    VideoSection,
)


class Command(BaseCommand):
    help = "Seed homepage data with 4 languages (VI, EN, ZH, KO)"

    def add_arguments(self, parser):
        parser.add_argument("--reset", action="store_true", help="Delete existing data before seeding")

    def handle(self, *args, **options):
        if options["reset"]:
            for model in [
                SiteConfig, BannerSlide, AboutBlock, AboutSection,
                VideoSection, StatItem, BusinessCategory, NewsArticle, Partner,
            ]:
                model.objects.all().delete()
            self.stdout.write(self.style.WARNING("Deleted all homepage data"))

        self._seed_site_config()
        self._seed_banners()
        self._seed_about()
        self._seed_video()
        self._seed_stats()
        self._seed_categories()
        self._seed_news()
        self._seed_partners()

        self.stdout.write(self.style.SUCCESS(
            "\nHomepage seed complete (4 languages)! Upload images via Django Admin."
            "\nXem hướng dẫn: docs/homepage.md"
        ))

    # ==================== SITE CONFIG ====================
    def _seed_site_config(self):
        if not SiteConfig.objects.exists():
            SiteConfig.objects.create(
                # VI
                address_hn_vi="Tầng 10 Tòa nhà Lotus Building, số 2 P. Duy Tân, P. Cầu Giấy, TP. Hà Nội, Việt Nam",
                address_hcm_vi="290/22 Nam Kỳ Khởi Nghĩa, P. Xuân Hòa, TP. Hồ Chí Minh",
                # EN
                address_hn_en="10th Floor, Lotus Building, No.2 Duy Tan St., Cau Giay Dist., Hanoi, Vietnam",
                address_hcm_en="290/22 Nam Ky Khoi Nghia, Xuan Hoa Ward, Ho Chi Minh City",
                # ZH
                address_hn_zh_hans="越南河内市纸桥郡维新街2号莲花大厦10楼",
                address_hcm_zh_hans="胡志明市春和坊南圻起义路290/22号",
                # KO
                address_hn_ko="베트남 하노이시 꺼우저이군 두이떤길 2번지 로터스빌딩 10층",
                address_hcm_ko="호찌민시 쑤언호아동 남끼커이응이아 290/22",
                # Shared (no translation)
                phone="(+84) 3795 7658",
                email="contact@hopluccorp.vn",
                facebook_url="https://www.facebook.com/hopluccorp.vn",
                youtube_url="https://www.youtube.com/channel/UCzHlh6lHzszauNw0UCU-Ypw?view_as=subscriber",
                linkedin_url="https://www.linkedin.com/company/hop-luc-construction-joint-stock-company/",
            )
            self.stdout.write(self.style.SUCCESS("Created site config (4 langs)"))

    # ==================== BANNERS ====================
    def _seed_banners(self):
        if not BannerSlide.objects.exists():
            banners = [
                {
                    "title_vi": "Hợp Lực Banner", "title_en": "Hop Luc Banner",
                    "title_zh_hans": "合力横幅", "title_ko": "합력 배너",
                    "alt_vi": "Hợp Lực Banner", "alt_en": "Hop Luc Banner",
                    "alt_zh_hans": "合力横幅", "alt_ko": "합력 배너",
                },
                {
                    "title_vi": "TOP 50 Vietnam The Best 2025", "title_en": "TOP 50 Vietnam The Best 2025",
                    "title_zh_hans": "2025年越南50强企业", "title_ko": "2025 베트남 TOP 50",
                    "alt_vi": "TOP 50 Vietnam The Best 2025", "alt_en": "TOP 50 Vietnam The Best 2025",
                    "alt_zh_hans": "2025年越南50强企业", "alt_ko": "2025 베트남 TOP 50",
                },
            ]
            for i, data in enumerate(banners):
                BannerSlide.objects.create(**data, order=i)
            self.stdout.write(self.style.SUCCESS("Created 2 banner slides (4 langs)"))

    # ==================== ABOUT ====================
    def _seed_about(self):
        if not AboutSection.objects.exists():
            AboutSection.objects.create(
                # VI
                label_vi="Giới thiệu", title_vi="Hợp lực",
                description_vi=(
                    "<p>Khởi nguồn từ lĩnh vực xây dựng thuần túy, sau hơn 16 năm hình thành và phát triển, "
                    "Công ty cổ phần Xây dựng Hợp Lực đã vươn mình trở thành tổng thầu EPC hàng đầu Việt Nam "
                    "trong lĩnh vực xây dựng công nghiệp, đồng thời không ngừng mở rộng hoạt động, phát triển "
                    "hệ sinh thái đa ngành gồm 6 công ty, hoạt động trong các lĩnh vực: xây dựng, cơ điện, "
                    "hoàn thiện nội thất, vật liệu xây dựng và công nghiệp phụ trợ.</p>"
                    "<p>Mang sứ mệnh kiến tạo những công trình bền vững, đồng hành cùng tiến trình công nghiệp hóa, "
                    "hiện đại hóa đất nước, Hợp Lực đã và đang khẳng định vị thế là đối tác chiến lược, "
                    "đáng tin cậy của nhiều tập đoàn và chủ đầu tư hàng đầu trong nước cũng như quốc tế.</p>"
                ),
                cta_text_vi="Tìm hiểu thêm",
                # EN
                label_en="About", title_en="Hop Luc",
                description_en=(
                    "<p>Originating from pure construction, after more than 16 years of establishment and development, "
                    "Hop Luc Construction JSC has grown to become a leading EPC general contractor in Vietnam "
                    "in the field of industrial construction, while continuously expanding its operations, developing "
                    "a multi-industry ecosystem of 6 companies operating in: construction, M&E, "
                    "interior finishing, construction materials and supporting industries.</p>"
                    "<p>With the mission of creating sustainable works, accompanying the industrialization and "
                    "modernization of the country, Hop Luc has been affirming its position as a strategic partner, "
                    "trusted by many leading domestic and international corporations and investors.</p>"
                ),
                cta_text_en="Learn more",
                # ZH
                label_zh_hans="关于我们", title_zh_hans="合力",
                description_zh_hans=(
                    "<p>起源于纯建筑领域，经过16年的发展，合力建设股份公司已成长为越南工业建筑领域领先的EPC总承包商，"
                    "同时不断拓展业务，发展由6家公司组成的多行业生态系统，"
                    "涵盖建筑、机电、室内装修、建材和配套工业等领域。</p>"
                    "<p>肩负着创造可持续工程的使命，合力已确立了其作为国内外众多领先集团和投资者"
                    "值得信赖的战略合作伙伴地位。</p>"
                ),
                cta_text_zh_hans="了解更多",
                # KO
                label_ko="소개", title_ko="합력",
                description_ko=(
                    "<p>순수 건설 분야에서 출발하여 16년 이상의 발전을 거쳐, "
                    "합력건설 주식회사는 베트남 산업건설 분야 최고의 EPC 종합건설사로 성장했으며, "
                    "건설, 기전, 인테리어, 건자재, 부대산업 등 6개 회사로 구성된 다업종 생태계를 구축했습니다.</p>"
                    "<p>지속 가능한 건축물을 만들겠다는 사명을 가지고, 합력은 국내외 많은 선도 그룹과 투자자들의 "
                    "신뢰받는 전략적 파트너로서의 입지를 확고히 하고 있습니다.</p>"
                ),
                cta_text_ko="자세히 보기",
                # Shared
                cta_link="/gioi-thieu",
            )
            self.stdout.write(self.style.SUCCESS("Created about section (4 langs)"))

        if not AboutBlock.objects.exists():
            blocks = [
                {
                    "title_vi": "Lịch sử", "title_en": "History", "title_zh_hans": "历史", "title_ko": "역사",
                    "subtitle_vi": "hình thành", "subtitle_en": "establishment", "subtitle_zh_hans": "形成", "subtitle_ko": "설립",
                    "link": "/gioi-thieu#page3",
                },
                {
                    "title_vi": "Tầm nhìn", "title_en": "Vision", "title_zh_hans": "愿景", "title_ko": "비전",
                    "subtitle_vi": "sứ mệnh", "subtitle_en": "mission", "subtitle_zh_hans": "使命", "subtitle_ko": "사명",
                    "link": "/gioi-thieu#page5",
                },
                {
                    "title_vi": "Giá trị", "title_en": "Core", "title_zh_hans": "核心", "title_ko": "핵심",
                    "subtitle_vi": "cốt lõi", "subtitle_en": "values", "subtitle_zh_hans": "价值", "subtitle_ko": "가치",
                    "link": "/gioi-thieu#page4",
                },
            ]
            for i, data in enumerate(blocks):
                AboutBlock.objects.create(**data, order=i)
            self.stdout.write(self.style.SUCCESS("Created 3 about blocks (4 langs)"))

    # ==================== VIDEO ====================
    def _seed_video(self):
        if not VideoSection.objects.exists():
            VideoSection.objects.create(
                title_vi="VIDEO NỔI BẬT", title_en="FEATURED VIDEO",
                title_zh_hans="精选视频", title_ko="추천 영상",
                subtitle_vi="CLIP TỔNG KẾT NĂM 2024 CỦA HỆ SINH THÁI HỢP LỰC",
                subtitle_en="HOP LUC ECOSYSTEM YEAR 2024 RECAP",
                subtitle_zh_hans="合力生态系统2024年度回顾",
                subtitle_ko="합력 생태계 2024년 하이라이트",
                youtube_id_vi="Cc2oTROOqqg",
                youtube_id_en="Cc2oTROOqqg",
                youtube_id_zh_hans="Cc2oTROOqqg",
                youtube_id_ko="Cc2oTROOqqg",
            )
            self.stdout.write(self.style.SUCCESS("Created video section (4 langs)"))

    # ==================== STATS ====================
    def _seed_stats(self):
        if not StatItem.objects.exists():
            stats = [
                {
                    "number": 16,
                    "label_vi": "Năm hoạt động", "label_en": "Years of operation",
                    "label_zh_hans": "运营年限", "label_ko": "운영 연수",
                },
                {
                    "number": 200,
                    "label_vi": "Dự án", "label_en": "Projects",
                    "label_zh_hans": "项目", "label_ko": "프로젝트",
                },
                {
                    "number": 15000,
                    "label_vi": "Sản lượng hợp nhất năm 2024", "label_en": "Consolidated output 2024",
                    "label_zh_hans": "2024年综合产量", "label_ko": "2024년 통합 생산량",
                },
                {
                    "number": 1500,
                    "label_vi": "Nhân sự", "label_en": "Employees",
                    "label_zh_hans": "员工", "label_ko": "직원",
                },
            ]
            for i, data in enumerate(stats):
                StatItem.objects.create(**data, order=i)
            self.stdout.write(self.style.SUCCESS("Created 4 stat items (4 langs)"))

    # ==================== CATEGORIES ====================
    def _seed_categories(self):
        if not BusinessCategory.objects.exists():
            categories = [
                {
                    "title_vi": "xây dựng", "title_en": "Construction", "title_zh_hans": "建筑", "title_ko": "건설",
                    "subtitle_vi": "Tổng thầu", "subtitle_en": "General Contractor", "subtitle_zh_hans": "总承包", "subtitle_ko": "종합건설",
                    "link": "/trang-tong-thau-xay-dung",
                },
                {
                    "title_vi": "cơ điện", "title_en": "M&E", "title_zh_hans": "机电", "title_ko": "기전",
                    "subtitle_vi": "Tổng thầu", "subtitle_en": "General Contractor", "subtitle_zh_hans": "总承包", "subtitle_ko": "종합건설",
                    "link": "/trang-tong-thau-co-dien",
                },
                {
                    "title_vi": "nội thất", "title_en": "Interior", "title_zh_hans": "室内装修", "title_ko": "인테리어",
                    "subtitle_vi": "Hoàn thiện", "subtitle_en": "Finishing", "subtitle_zh_hans": "精装修", "subtitle_ko": "마감",
                    "link": "/hoan-thien-noi-that",
                },
                {
                    "title_vi": "xây dựng", "title_en": "Materials", "title_zh_hans": "建材", "title_ko": "건자재",
                    "subtitle_vi": "Vật liệu", "subtitle_en": "Construction", "subtitle_zh_hans": "建筑", "subtitle_ko": "건설",
                    "link": "/vat-lieu-xay-dung",
                },
                {
                    "title_vi": "phụ trợ", "title_en": "Support", "title_zh_hans": "配套", "title_ko": "부대",
                    "subtitle_vi": "Công nghiệp", "subtitle_en": "Industrial", "subtitle_zh_hans": "工业", "subtitle_ko": "산업",
                    "link": "/cong-nghiep-phu-tro",
                },
            ]
            for i, data in enumerate(categories):
                BusinessCategory.objects.create(**data, order=i)
            self.stdout.write(self.style.SUCCESS("Created 5 business categories (4 langs)"))

    # ==================== NEWS ====================
    def _seed_news(self):
        if not NewsArticle.objects.exists():
            now = timezone.now()
            articles = [
                {
                    "title_vi": "Hợp Lực vinh dự đón Phó Thủ Tướng và Bộ Trưởng Bộ Xây Dựng, "
                                "Bộ Giáo Dục & Đào Tạo tại gian hàng triển lãm Trường Đại Học Giao Thông Vận Tải",
                    "title_en": "Hop Luc honored to welcome Deputy Prime Minister and Ministers "
                                "at the University of Transport and Communications Exhibition",
                    "title_zh_hans": "合力荣幸迎接副总理和建设部长、教育培训部长莅临交通运输大学展览区",
                    "title_ko": "합력, 부총리 및 건설부 장관, 교육훈련부 장관을 교통운수대학교 전시부스에서 영접",
                    "excerpt_vi": (
                        "Hợp Lực đón Phó Thủ tướng & Bộ trưởng tại triển lãm GTVT. "
                        "Hợp Lực vinh dự đón Phó Thủ tướng và Bộ trưởng tại triển lãm GTVT, "
                        "giới thiệu công nghệ đường sắt, hạ tầng thông minh và giải pháp AI – IoE "
                        "thuộc hệ sinh thái Hợp Lực."
                    ),
                    "excerpt_en": (
                        "Hop Luc welcomed the Deputy PM & Ministers at the Transport Exhibition. "
                        "Introducing railway technology, smart infrastructure and AI-IoE solutions "
                        "from the Hop Luc ecosystem."
                    ),
                    "excerpt_zh_hans": "合力在交通展览会上迎接副总理和部长，介绍铁路技术、智能基础设施和AI-IoE解决方案。",
                    "excerpt_ko": "합력이 교통전시회에서 부총리와 장관을 영접하고 철도기술, 스마트 인프라, AI-IoE 솔루션을 소개했습니다.",
                    "is_featured": True,
                    "published_at": now,
                },
                {
                    "title_vi": "Hệ sinh thái Hợp Lực khẳng định vị thế với hai công ty ghi danh "
                                "top 500 doanh nghiệp lớn nhất Việt Nam 2025",
                    "title_en": "Hop Luc ecosystem affirms its position with two companies in the "
                                "Top 500 Largest Enterprises in Vietnam 2025",
                    "title_zh_hans": "合力生态系统以两家公司入选2025年越南500强企业彰显实力",
                    "title_ko": "합력 생태계, 2025년 베트남 500대 기업에 2개 회사 선정으로 위상 확인",
                    "excerpt_vi": (
                        "Hai công ty thuộc hệ sinh thái Hợp Lực vào Top 500 Doanh nghiệp lớn nhất "
                        "Việt Nam 2025, khẳng định uy tín – năng lực – tầm vóc doanh nghiệp hàng đầu "
                        "ngành xây dựng."
                    ),
                    "excerpt_en": (
                        "Two companies in the Hop Luc ecosystem entered the Top 500 Largest Enterprises "
                        "in Vietnam 2025, affirming credibility, capability and leading stature "
                        "in the construction industry."
                    ),
                    "excerpt_zh_hans": "合力生态系统两家公司入选2025年越南500强企业，彰显建筑行业领先地位。",
                    "excerpt_ko": "합력 생태계의 2개 회사가 2025년 베트남 500대 기업에 선정되어 건설업계 선두 지위를 확인했습니다.",
                    "is_featured": False,
                    "published_at": now,
                },
                {
                    "title_vi": "Hợp Lực tham dự Triển lãm & Hội nghị VRT&CONS 2025",
                    "title_en": "Hop Luc participates in VRT&CONS 2025 Exhibition & Conference",
                    "title_zh_hans": "合力参加VRT&CONS 2025展览会暨会议",
                    "title_ko": "합력, VRT&CONS 2025 전시회 및 컨퍼런스 참가",
                    "excerpt_vi": (
                        "Hợp Lực tham dự VRT&CONS 2025 - Triển lãm quốc tế công nghệ đường sắt và hạ tầng, "
                        "giới thiệu giải pháp xanh, thông minh, công nghệ cao tại Việt Nam."
                    ),
                    "excerpt_en": (
                        "Hop Luc participates in VRT&CONS 2025 - International Railway Technology "
                        "and Infrastructure Exhibition, presenting green, smart and hi-tech solutions in Vietnam."
                    ),
                    "excerpt_zh_hans": "合力参加VRT&CONS 2025国际铁路技术与基础设施展览会，展示绿色、智能、高科技解决方案。",
                    "excerpt_ko": "합력이 VRT&CONS 2025 국제 철도기술 인프라 전시회에 참가하여 친환경·스마트·첨단기술 솔루션을 선보였습니다.",
                    "is_featured": False,
                    "published_at": now,
                },
            ]
            for data in articles:
                NewsArticle.objects.create(**data)
            self.stdout.write(self.style.SUCCESS("Created 3 news articles (4 langs)"))

    # ==================== PARTNERS ====================
    def _seed_partners(self):
        if not Partner.objects.exists():
            for i in range(1, 9):
                Partner.objects.create(
                    name_vi=f"Đối tác {i}",
                    name_en=f"Partner {i}",
                    name_zh_hans=f"合作伙伴 {i}",
                    name_ko=f"파트너 {i}",
                    order=i - 1,
                )
            self.stdout.write(self.style.SUCCESS("Created 8 partners (4 langs)"))
