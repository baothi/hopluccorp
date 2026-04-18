from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from hopluccorp.pages.models import NewsArticle, NewsCategory


NEWS_CATEGORIES = [
    {
        "slug": "internal",
        "name_vi": "Nội san",
        "name_en": "Internal News",
        "name_zh_hans": "内部刊物",
        "name_ko": "사내 소식",
    },
    {
        "slug": "company",
        "name_vi": "Tin tức doanh nghiệp",
        "name_en": "Corporate News",
        "name_zh_hans": "企业新闻",
        "name_ko": "기업 뉴스",
    },
    {
        "slug": "project",
        "name_vi": "Tin tức dự án",
        "name_en": "Project News",
        "name_zh_hans": "项目新闻",
        "name_ko": "프로젝트 뉴스",
    },
]

ARTICLE_CATEGORY_SLUGS = [
    "company",
    "company",
    "project",
    "internal",
    "company",
    "company",
    "internal",
    "project",
    "project",
    "project",
    "internal",
    "internal",
    "company",
    "project",
    "internal",
    "project",
    "company",
    "internal",
    "project",
    "company",
]


NEWS_ARTICLES = [
    {
        "title_vi": "Hợp Lực đẩy mạnh chuẩn hóa thi công công trình công nghiệp",
        "title_en": "Hop Luc strengthens standardized delivery for industrial projects",
        "title_zh_hans": "合力推进工业项目施工标准化",
        "title_ko": "합력, 산업 프로젝트 시공 표준화 강화",
        "excerpt_vi": "Hợp Lực tiếp tục hoàn thiện quy trình quản lý chất lượng, an toàn và tiến độ cho các dự án nhà máy quy mô lớn.",
        "excerpt_en": "Hop Luc continues to improve quality, safety, and schedule management processes for large-scale factory projects.",
        "excerpt_zh_hans": "合力持续完善大型工厂项目的质量、安全与进度管理流程。",
        "excerpt_ko": "합력은 대규모 공장 프로젝트의 품질, 안전, 일정 관리 프로세스를 지속적으로 개선하고 있습니다.",
        "is_featured": True,
    },
    {
        "title_vi": "Hợp Lực tham dự triển lãm công nghệ xây dựng và hạ tầng thông minh",
        "title_en": "Hop Luc joins construction technology and smart infrastructure exhibition",
        "title_zh_hans": "合力参加建筑科技与智慧基础设施展览会",
        "title_ko": "합력, 건설 기술 및 스마트 인프라 전시회 참가",
        "excerpt_vi": "Sự kiện là dịp để Hợp Lực giới thiệu năng lực tổng thầu, giải pháp thi công xanh và định hướng số hóa trong xây dựng.",
        "excerpt_en": "The event allowed Hop Luc to present its general contractor capability, green construction solutions, and digital transformation direction.",
        "excerpt_zh_hans": "本次活动为合力展示总承包能力、绿色施工方案及建筑数字化方向提供了机会。",
        "excerpt_ko": "이번 행사는 합력이 종합 시공 역량, 친환경 시공 솔루션, 건설 디지털화 방향을 소개하는 자리였습니다.",
        "is_featured": True,
    },
    {
        "title_vi": "Dự án nhà máy mới bước vào giai đoạn hoàn thiện kết cấu chính",
        "title_en": "New factory project enters main structure completion phase",
        "title_zh_hans": "新工厂项目进入主体结构收尾阶段",
        "title_ko": "신규 공장 프로젝트, 주요 구조 마감 단계 진입",
        "excerpt_vi": "Đội ngũ dự án đang phối hợp chặt chẽ để bảo đảm tiến độ, chất lượng và an toàn trước khi chuyển sang các hạng mục hoàn thiện.",
        "excerpt_en": "The project team is coordinating closely to ensure schedule, quality, and safety before moving into finishing works.",
        "excerpt_zh_hans": "项目团队正紧密协作，确保在进入装修收尾工程前满足进度、质量和安全要求。",
        "excerpt_ko": "프로젝트 팀은 마감 공정 전 일정, 품질, 안전을 확보하기 위해 긴밀히 협력하고 있습니다.",
        "is_featured": True,
    },
    {
        "title_vi": "Hợp Lực triển khai chương trình đào tạo an toàn lao động định kỳ",
        "title_en": "Hop Luc launches periodic occupational safety training program",
        "title_zh_hans": "合力开展定期职业安全培训计划",
        "title_ko": "합력, 정기 산업안전 교육 프로그램 실시",
        "excerpt_vi": "Chương trình tập trung vào nhận diện rủi ro, quy trình làm việc an toàn và văn hóa chủ động phòng ngừa tại công trường.",
        "excerpt_en": "The program focuses on risk identification, safe work procedures, and a proactive prevention culture on site.",
        "excerpt_zh_hans": "该计划重点关注风险识别、安全作业流程以及现场主动预防文化。",
        "excerpt_ko": "이 프로그램은 위험 식별, 안전 작업 절차, 현장의 선제적 예방 문화에 중점을 둡니다.",
        "is_featured": False,
    },
    {
        "title_vi": "Ứng dụng BIM hỗ trợ kiểm soát tiến độ và phối hợp thiết kế",
        "title_en": "BIM application supports schedule control and design coordination",
        "title_zh_hans": "BIM应用助力进度控制与设计协同",
        "title_ko": "BIM 적용으로 일정 관리와 설계 협업 지원",
        "excerpt_vi": "Việc ứng dụng BIM giúp các bộ phận thiết kế, thi công và quản lý dự án phối hợp minh bạch hơn trong từng giai đoạn.",
        "excerpt_en": "BIM adoption helps design, construction, and project management teams coordinate more transparently at every stage.",
        "excerpt_zh_hans": "BIM的应用帮助设计、施工和项目管理团队在各阶段实现更透明的协同。",
        "excerpt_ko": "BIM 도입은 설계, 시공, 프로젝트 관리 팀이 각 단계에서 더 투명하게 협업하도록 돕습니다.",
        "is_featured": False,
    },
    {
        "title_vi": "Hợp Lực tăng cường kiểm soát chất lượng vật tư đầu vào",
        "title_en": "Hop Luc enhances incoming material quality control",
        "title_zh_hans": "合力加强进场材料质量控制",
        "title_ko": "합력, 반입 자재 품질 관리 강화",
        "excerpt_vi": "Công tác kiểm tra vật tư được thực hiện đồng bộ nhằm bảo đảm tiêu chuẩn kỹ thuật và tính ổn định của công trình.",
        "excerpt_en": "Material inspection is carried out consistently to ensure technical standards and long-term project reliability.",
        "excerpt_zh_hans": "材料检验工作统一执行，以确保技术标准和工程长期稳定性。",
        "excerpt_ko": "자재 검사는 기술 기준과 장기적인 프로젝트 안정성을 보장하기 위해 일관되게 수행됩니다.",
        "is_featured": False,
    },
    {
        "title_vi": "Đội ngũ kỹ sư Hợp Lực hoàn thành khóa cập nhật tiêu chuẩn xây dựng",
        "title_en": "Hop Luc engineers complete updated construction standards course",
        "title_zh_hans": "合力工程师完成建筑标准更新培训",
        "title_ko": "합력 엔지니어, 최신 건설 기준 교육 수료",
        "excerpt_vi": "Khóa học giúp đội ngũ kỹ sư nắm bắt yêu cầu mới về kỹ thuật, nghiệm thu và quản lý hồ sơ chất lượng.",
        "excerpt_en": "The course helps engineers understand new requirements for technique, acceptance, and quality documentation management.",
        "excerpt_zh_hans": "培训帮助工程师掌握技术、验收和质量档案管理方面的新要求。",
        "excerpt_ko": "이번 교육은 엔지니어들이 기술, 검수, 품질 문서 관리의 새로운 요구사항을 이해하도록 돕습니다.",
        "is_featured": False,
    },
    {
        "title_vi": "Công trường áp dụng giải pháp quản lý tiến độ theo dữ liệu thời gian thực",
        "title_en": "Project site applies real-time data schedule management",
        "title_zh_hans": "项目现场应用实时数据进度管理方案",
        "title_ko": "현장, 실시간 데이터 기반 일정 관리 솔루션 적용",
        "excerpt_vi": "Dữ liệu từ hiện trường được cập nhật thường xuyên, hỗ trợ ban chỉ huy ra quyết định nhanh và chính xác hơn.",
        "excerpt_en": "Field data is updated regularly, helping site management make faster and more accurate decisions.",
        "excerpt_zh_hans": "现场数据定期更新，帮助项目管理团队更快速、准确地决策。",
        "excerpt_ko": "현장 데이터는 정기적으로 업데이트되어 현장 관리팀의 빠르고 정확한 의사결정을 지원합니다.",
        "is_featured": False,
    },
    {
        "title_vi": "Hợp Lực đồng hành cùng đối tác trong chuỗi dự án công nghiệp xanh",
        "title_en": "Hop Luc accompanies partners in green industrial project series",
        "title_zh_hans": "合力携手合作伙伴推进绿色工业项目",
        "title_ko": "합력, 친환경 산업 프로젝트에서 파트너와 동행",
        "excerpt_vi": "Các giải pháp tiết kiệm năng lượng, quản lý môi trường và tối ưu vận hành được tích hợp ngay từ giai đoạn thiết kế.",
        "excerpt_en": "Energy-saving, environmental management, and operation optimization solutions are integrated from the design stage.",
        "excerpt_zh_hans": "节能、环境管理和运营优化方案从设计阶段即被整合。",
        "excerpt_ko": "에너지 절감, 환경 관리, 운영 최적화 솔루션은 설계 단계부터 통합됩니다.",
        "is_featured": False,
    },
    {
        "title_vi": "Nhà máy tại miền Bắc hoàn thành mốc nghiệm thu quan trọng",
        "title_en": "Northern factory project completes key acceptance milestone",
        "title_zh_hans": "北部工厂项目完成重要验收节点",
        "title_ko": "북부 공장 프로젝트, 주요 검수 마일스톤 완료",
        "excerpt_vi": "Mốc nghiệm thu tạo nền tảng để dự án tiếp tục triển khai các hạng mục cơ điện, hoàn thiện và bàn giao.",
        "excerpt_en": "The acceptance milestone creates a foundation for mechanical, electrical, finishing, and handover works.",
        "excerpt_zh_hans": "该验收节点为机电、装修和交付工作继续推进奠定基础。",
        "excerpt_ko": "이번 검수 마일스톤은 기계전기, 마감, 인도 공정의 기반이 됩니다.",
        "is_featured": False,
    },
    {
        "title_vi": "Hợp Lực phát động tháng cao điểm về môi trường công trường",
        "title_en": "Hop Luc launches site environment focus month",
        "title_zh_hans": "合力启动施工现场环境专项月",
        "title_ko": "합력, 현장 환경 집중 관리의 달 시작",
        "excerpt_vi": "Hoạt động hướng đến kiểm soát bụi, tiếng ồn, phân loại rác thải và nâng cao ý thức bảo vệ môi trường tại công trường.",
        "excerpt_en": "The campaign focuses on dust, noise, waste sorting, and stronger environmental awareness on site.",
        "excerpt_zh_hans": "活动重点关注扬尘、噪声、垃圾分类以及现场环保意识提升。",
        "excerpt_ko": "이 캠페인은 분진, 소음, 폐기물 분리, 현장 환경 의식 향상에 중점을 둡니다.",
        "is_featured": False,
    },
    {
        "title_vi": "Ban chỉ huy dự án chia sẻ kinh nghiệm quản lý tổng thầu",
        "title_en": "Project management board shares general contractor management experience",
        "title_zh_hans": "项目指挥部分享总承包管理经验",
        "title_ko": "프로젝트 지휘부, 종합 시공 관리 경험 공유",
        "excerpt_vi": "Buổi chia sẻ tập trung vào phối hợp nhà thầu phụ, kiểm soát tiến độ và xử lý thay đổi trong quá trình thi công.",
        "excerpt_en": "The session focused on subcontractor coordination, schedule control, and change handling during construction.",
        "excerpt_zh_hans": "分享会聚焦分包协调、进度控制和施工过程中的变更处理。",
        "excerpt_ko": "이번 세션은 협력업체 조율, 일정 관리, 시공 중 변경 대응에 초점을 맞췄습니다.",
        "is_featured": False,
    },
    {
        "title_vi": "Hợp Lực cập nhật hệ thống quản lý hồ sơ dự án",
        "title_en": "Hop Luc updates project documentation management system",
        "title_zh_hans": "合力升级项目档案管理系统",
        "title_ko": "합력, 프로젝트 문서 관리 시스템 업데이트",
        "excerpt_vi": "Hệ thống mới giúp chuẩn hóa luồng phê duyệt, lưu trữ bản vẽ và truy xuất tài liệu kỹ thuật thuận tiện hơn.",
        "excerpt_en": "The updated system standardizes approval flows, drawing storage, and technical document retrieval.",
        "excerpt_zh_hans": "新系统有助于规范审批流程、图纸存储和技术资料检索。",
        "excerpt_ko": "새 시스템은 승인 흐름, 도면 보관, 기술 문서 조회를 표준화합니다.",
        "is_featured": False,
    },
    {
        "title_vi": "Dự án hạ tầng khu công nghiệp hoàn tất giai đoạn chuẩn bị mặt bằng",
        "title_en": "Industrial park infrastructure project completes site preparation phase",
        "title_zh_hans": "工业园区基础设施项目完成场地准备阶段",
        "title_ko": "산업단지 인프라 프로젝트, 부지 준비 단계 완료",
        "excerpt_vi": "Giai đoạn chuẩn bị mặt bằng được hoàn tất đúng kế hoạch, tạo điều kiện cho các hạng mục thi công chính khởi động.",
        "excerpt_en": "The site preparation phase was completed as planned, enabling main construction works to begin.",
        "excerpt_zh_hans": "场地准备阶段按计划完成，为主要施工工程启动创造条件。",
        "excerpt_ko": "부지 준비 단계가 계획대로 완료되어 주요 시공 공정 착수가 가능해졌습니다.",
        "is_featured": False,
    },
    {
        "title_vi": "Hợp Lực tổ chức chương trình giao lưu kỹ thuật nội bộ",
        "title_en": "Hop Luc organizes internal technical exchange program",
        "title_zh_hans": "合力举办内部技术交流活动",
        "title_ko": "합력, 내부 기술 교류 프로그램 개최",
        "excerpt_vi": "Chương trình khuyến khích các phòng ban chia sẻ bài học thực tế, giải pháp cải tiến và kinh nghiệm xử lý hiện trường.",
        "excerpt_en": "The program encourages departments to share practical lessons, improvement ideas, and field handling experience.",
        "excerpt_zh_hans": "活动鼓励各部门分享实践经验、改进方案和现场处理经验。",
        "excerpt_ko": "이 프로그램은 부서 간 실무 교훈, 개선 아이디어, 현장 대응 경험 공유를 장려합니다.",
        "is_featured": False,
    },
    {
        "title_vi": "Công tác cơ điện tại dự án nhà xưởng được triển khai đồng bộ",
        "title_en": "MEP works at factory project are deployed in coordination",
        "title_zh_hans": "厂房项目机电工程协同推进",
        "title_ko": "공장 프로젝트 MEP 공정, 통합적으로 진행",
        "excerpt_vi": "Các đội thi công cơ điện phối hợp với kết cấu và hoàn thiện để giảm xung đột kỹ thuật, tối ưu thời gian nghiệm thu.",
        "excerpt_en": "MEP teams coordinate with structure and finishing teams to reduce technical conflicts and optimize acceptance time.",
        "excerpt_zh_hans": "机电团队与结构和装修团队协作，减少技术冲突并优化验收时间。",
        "excerpt_ko": "MEP 팀은 구조 및 마감 팀과 협력해 기술 충돌을 줄이고 검수 시간을 최적화합니다.",
        "is_featured": False,
    },
    {
        "title_vi": "Hợp Lực tăng cường hợp tác với các nhà cung cấp chiến lược",
        "title_en": "Hop Luc strengthens cooperation with strategic suppliers",
        "title_zh_hans": "合力加强与战略供应商合作",
        "title_ko": "합력, 전략 공급업체와 협력 강화",
        "excerpt_vi": "Việc hợp tác dài hạn giúp bảo đảm nguồn vật tư ổn định, tiêu chuẩn chất lượng và khả năng đáp ứng tiến độ dự án.",
        "excerpt_en": "Long-term cooperation helps ensure stable material supply, quality standards, and project schedule responsiveness.",
        "excerpt_zh_hans": "长期合作有助于确保稳定供料、质量标准和项目进度响应能力。",
        "excerpt_ko": "장기 협력은 안정적인 자재 공급, 품질 기준, 프로젝트 일정 대응력을 보장하는 데 도움이 됩니다.",
        "is_featured": False,
    },
    {
        "title_vi": "Hoạt động cộng đồng lan tỏa văn hóa trách nhiệm của Hợp Lực",
        "title_en": "Community activities spread Hop Luc's culture of responsibility",
        "title_zh_hans": "公益活动传递合力责任文化",
        "title_ko": "사회공헌 활동으로 합력의 책임 문화 확산",
        "excerpt_vi": "Bên cạnh hoạt động sản xuất kinh doanh, Hợp Lực duy trì các chương trình cộng đồng hướng đến giá trị bền vững.",
        "excerpt_en": "Alongside business operations, Hop Luc maintains community programs that aim for sustainable value.",
        "excerpt_zh_hans": "在生产经营之外，合力持续开展面向可持续价值的公益项目。",
        "excerpt_ko": "합력은 사업 운영과 함께 지속가능한 가치를 지향하는 지역사회 프로그램을 이어가고 있습니다.",
        "is_featured": False,
    },
    {
        "title_vi": "Dự án mới áp dụng giải pháp thi công kết cấu thép tối ưu",
        "title_en": "New project applies optimized steel structure construction solution",
        "title_zh_hans": "新项目采用优化钢结构施工方案",
        "title_ko": "신규 프로젝트, 최적화된 철골 구조 시공 솔루션 적용",
        "excerpt_vi": "Giải pháp kết cấu thép được lựa chọn nhằm rút ngắn thời gian lắp dựng, bảo đảm độ chính xác và tính linh hoạt thi công.",
        "excerpt_en": "The steel structure solution was selected to shorten erection time, ensure accuracy, and improve construction flexibility.",
        "excerpt_zh_hans": "钢结构方案旨在缩短安装时间、确保精度并提升施工灵活性。",
        "excerpt_ko": "철골 구조 솔루션은 설치 시간을 단축하고 정확도와 시공 유연성을 높이기 위해 선택되었습니다.",
        "is_featured": False,
    },
    {
        "title_vi": "Hợp Lực tổng kết hoạt động dự án và định hướng nâng cao năng lực",
        "title_en": "Hop Luc reviews project activities and capability improvement direction",
        "title_zh_hans": "合力总结项目活动并规划能力提升方向",
        "title_ko": "합력, 프로젝트 활동 점검 및 역량 강화 방향 수립",
        "excerpt_vi": "Buổi tổng kết ghi nhận các kết quả đạt được, đồng thời xác định các ưu tiên về nhân sự, công nghệ và quản trị dự án.",
        "excerpt_en": "The review recognized achieved results and identified priorities in people, technology, and project governance.",
        "excerpt_zh_hans": "总结会肯定既有成果，并明确人才、技术和项目治理方面的重点方向。",
        "excerpt_ko": "이번 점검은 성과를 확인하고 인력, 기술, 프로젝트 거버넌스의 우선순위를 정리했습니다.",
        "is_featured": False,
    },
]


CONTENT_TEMPLATES = {
    "vi": [
        "{excerpt}",
        "Nội dung được chuẩn bị nhằm cung cấp thông tin tổng quan về hoạt động của Hợp Lực, nhấn mạnh tinh thần chuyên nghiệp, an toàn và cam kết chất lượng trong từng dự án.",
        "Trong thời gian tới, Hợp Lực tiếp tục phối hợp với khách hàng, đối tác và đội ngũ nội bộ để nâng cao hiệu quả triển khai, tối ưu nguồn lực và tạo ra giá trị bền vững.",
    ],
    "en": [
        "{excerpt}",
        "This article provides an overview of Hop Luc's activities, highlighting professionalism, safety, and a strong quality commitment across every project.",
        "In the coming period, Hop Luc will continue working with clients, partners, and internal teams to improve delivery efficiency, optimize resources, and create sustainable value.",
    ],
    "zh_hans": [
        "{excerpt}",
        "本文概述合力的相关活动，突出公司在每个项目中坚持的专业精神、安全意识和质量承诺。",
        "未来，合力将继续与客户、合作伙伴及内部团队协作，提升项目执行效率，优化资源配置，并创造可持续价值。",
    ],
    "ko": [
        "{excerpt}",
        "이 글은 합력의 주요 활동을 소개하며, 각 프로젝트에서 지켜 온 전문성, 안전 의식, 품질에 대한 약속을 강조합니다.",
        "앞으로도 합력은 고객, 파트너, 내부 팀과 협력하여 수행 효율을 높이고 자원을 최적화하며 지속가능한 가치를 만들어 가겠습니다.",
    ],
}


def build_content(article, lang):
    paragraphs = [
        template.format(excerpt=article[f"excerpt_{lang}"])
        for template in CONTENT_TEMPLATES[lang]
    ]
    return "\n".join(f"<p>{paragraph}</p>" for paragraph in paragraphs)


class Command(BaseCommand):
    help = "Seed news categories + 20 news articles with full i18n (vi/en/zh/ko)."

    def add_arguments(self, parser):
        parser.add_argument("--reset", action="store_true", help="Delete existing news before seeding")

    def handle(self, *args, **options):
        if options["reset"]:
            NewsArticle.objects.all().delete()
            NewsCategory.objects.all().delete()
            self.stdout.write(self.style.WARNING("Deleted all news articles and categories"))

        for index, category in enumerate(NEWS_CATEGORIES):
            obj, _ = NewsCategory.objects.update_or_create(
                slug=category["slug"],
                defaults={
                    "name": category["name_vi"],
                    "name_vi": category["name_vi"],
                    "name_en": category["name_en"],
                    "name_zh_hans": category["name_zh_hans"],
                    "name_ko": category["name_ko"],
                    "is_active": True,
                },
            )
            if obj.order != index:
                obj.order = index
                obj.save(update_fields=["order"])

        self.stdout.write(self.style.SUCCESS(f"Created/updated {len(NEWS_CATEGORIES)} news categories"))

        if NewsArticle.objects.exists():
            count = NewsArticle.objects.count()
            self.stdout.write(self.style.WARNING(f"News articles already exist ({count}); use --reset to recreate."))
            return

        now = timezone.now()
        created = 0
        category_map = {category.slug: category for category in NewsCategory.objects.all()}

        for index, article in enumerate(NEWS_ARTICLES):
            NewsArticle.objects.create(
                category=category_map[ARTICLE_CATEGORY_SLUGS[index]],
                title=article["title_vi"],
                title_vi=article["title_vi"],
                title_en=article["title_en"],
                title_zh_hans=article["title_zh_hans"],
                title_ko=article["title_ko"],
                excerpt=article["excerpt_vi"],
                excerpt_vi=article["excerpt_vi"],
                excerpt_en=article["excerpt_en"],
                excerpt_zh_hans=article["excerpt_zh_hans"],
                excerpt_ko=article["excerpt_ko"],
                content=build_content(article, "vi"),
                content_vi=build_content(article, "vi"),
                content_en=build_content(article, "en"),
                content_zh_hans=build_content(article, "zh_hans"),
                content_ko=build_content(article, "ko"),
                is_featured=article["is_featured"],
                is_active=True,
                published_at=now - timedelta(days=index * 5),
            )
            created += 1

        self.stdout.write(self.style.SUCCESS(f"Created {created} news articles with i18n"))
        self.stdout.write(self.style.SUCCESS("News seed complete! API pagination uses the project DRF settings."))
