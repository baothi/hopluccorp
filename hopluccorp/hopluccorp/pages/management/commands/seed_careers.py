"""
Seed careers page data:
  - CareersPage (singleton config)
  - CareerCompany (4 companies)
  - CulturePhoto (4 photos — images blank, alt in 4 languages)
  - WorkBenefitItem (3 cards)
  - JobPosting (6 job postings with content in 4 languages)
"""

from django.core.management.base import BaseCommand
from django.utils.text import slugify

from hopluccorp.pages.models import (
    CareerCompany,
    CareersPage,
    CulturePhoto,
    JobApplication,
    JobPosting,
    WorkBenefitItem,
)

# ==================== DATA ====================

COMPANIES = [
    {
        "slug": "hop-luc-corp",
        "name_vi": "Tập đoàn Hợp Lực",
        "name_en": "Hop Luc Corporation",
        "name_zh_hans": "合力集团",
        "name_ko": "합력 그룹",
    },
    {
        "slug": "hop-luc-xay-dung",
        "name_vi": "Hợp Lực Xây Dựng",
        "name_en": "Hop Luc Construction",
        "name_zh_hans": "合力建设",
        "name_ko": "합력 건설",
    },
    {
        "slug": "hop-luc-noi-that",
        "name_vi": "Hợp Lực Nội Thất",
        "name_en": "Hop Luc Interior",
        "name_zh_hans": "合力室内装饰",
        "name_ko": "합력 인테리어",
    },
    {
        "slug": "hop-luc-mep",
        "name_vi": "Hợp Lực M&E",
        "name_en": "Hop Luc M&E",
        "name_zh_hans": "合力机电",
        "name_ko": "합력 기계전기",
    },
]

CULTURE_PHOTOS = [
    {
        "alt_vi": "Đội ngũ kỹ sư Hợp Lực tại công trường",
        "alt_en": "Hop Luc engineers at the construction site",
        "alt_zh_hans": "合力工程师在施工现场",
        "alt_ko": "건설 현장의 합력 엔지니어",
    },
    {
        "alt_vi": "Hội thảo đào tạo kỹ thuật nội bộ",
        "alt_en": "Internal technical training workshop",
        "alt_zh_hans": "内部技术培训研讨会",
        "alt_ko": "내부 기술 교육 워크숍",
    },
    {
        "alt_vi": "Hoạt động team building Hợp Lực",
        "alt_en": "Hop Luc team building activities",
        "alt_zh_hans": "合力团队建设活动",
        "alt_ko": "합력 팀빌딩 활동",
    },
    {
        "alt_vi": "Lễ kỷ niệm ngày thành lập tập đoàn",
        "alt_en": "Group founding anniversary celebration",
        "alt_zh_hans": "集团成立周年纪念庆典",
        "alt_ko": "그룹 창립 기념일 행사",
    },
]

BENEFITS = [
    {
        "icon_type": "text",
        "icon_text": "14+",
        "title_vi": "Năm kinh nghiệm",
        "title_en": "Years of Experience",
        "title_zh_hans": "年的经验",
        "title_ko": "년의 경험",
        "description_vi": "Hơn 14 năm hoạt động trong ngành xây dựng, chúng tôi mang đến môi trường làm việc chuyên nghiệp và ổn định.",
        "description_en": "With over 14 years in construction, we offer a professional and stable work environment.",
        "description_zh_hans": "在建筑行业拥有超过14年的经验，我们提供专业稳定的工作环境。",
        "description_ko": "건설업 14년 이상의 경험으로 전문적이고 안정적인 근무 환경을 제공합니다.",
    },
    {
        "icon_type": "text",
        "icon_text": "💰",
        "title_vi": "Lương thưởng cạnh tranh",
        "title_en": "Competitive Salary",
        "title_zh_hans": "竞争性薪酬",
        "title_ko": "경쟁력 있는 급여",
        "description_vi": "Mức lương hấp dẫn, thưởng hiệu quả công việc, đánh giá tăng lương định kỳ và đầy đủ chế độ BHXH, BHYT.",
        "description_en": "Attractive salary, performance bonuses, periodic salary reviews, and full social & health insurance.",
        "description_zh_hans": "有竞争力的薪资、绩效奖金、定期薪资评审以及完善的社会保险和医疗保险。",
        "description_ko": "매력적인 급여, 성과 보너스, 정기 급여 검토 및 완전한 사회·의료 보험.",
    },
    {
        "icon_type": "text",
        "icon_text": "📈",
        "title_vi": "Lộ trình thăng tiến rõ ràng",
        "title_en": "Clear Career Path",
        "title_zh_hans": "清晰的晋升路径",
        "title_ko": "명확한 커리어 경로",
        "description_vi": "Chúng tôi đầu tư vào sự phát triển của từng cá nhân với lộ trình thăng tiến minh bạch và các cơ hội đào tạo liên tục.",
        "description_en": "We invest in every individual's growth with transparent promotion paths and continuous training opportunities.",
        "description_zh_hans": "我们投资于每个人的成长，提供透明的晋升路径和持续的培训机会。",
        "description_ko": "투명한 승진 경로와 지속적인 교육 기회를 통해 각 개인의 성장에 투자합니다.",
    },
]

JOBS = [
    {
        "company_slug": "hop-luc-xay-dung",
        "quantity": 3,
        "province": "Hà Nội",
        "published_at": "2025-04-01",
        "title_vi": "Kỹ sư Kết cấu",
        "title_en": "Structural Engineer",
        "title_zh_hans": "结构工程师",
        "title_ko": "구조 엔지니어",
        "location_display_vi": "Hà Nội — Văn phòng Hợp Lực Xây Dựng",
        "location_display_en": "Hanoi — Hop Luc Construction Office",
        "location_display_zh_hans": "河内 — 合力建设办公室",
        "location_display_ko": "하노이 — 합력 건설 사무소",
        "level_vi": "Kỹ sư / Chuyên viên",
        "level_en": "Engineer / Specialist",
        "level_zh_hans": "工程师/专员",
        "level_ko": "엔지니어/전문가",
        "industry_vi": "Xây dựng — Kết cấu",
        "industry_en": "Construction — Structural",
        "industry_zh_hans": "建筑 — 结构",
        "industry_ko": "건설 — 구조",
        "skills_vi": "AutoCAD, ETABS/SAP2000, đọc bản vẽ kết cấu",
        "skills_en": "AutoCAD, ETABS/SAP2000, structural drawing reading",
        "skills_zh_hans": "AutoCAD, ETABS/SAP2000, 结构图纸识读",
        "skills_ko": "AutoCAD, ETABS/SAP2000, 구조 도면 해독",
        "resume_language_vi": "Tiếng Việt",
        "resume_language_en": "English / Vietnamese",
        "resume_language_zh_hans": "中文/越南语",
        "resume_language_ko": "베트남어/영어",
        "benefits_content_vi": "<ul><li>Lương từ 12–20 triệu VNĐ tùy năng lực</li><li>Thưởng dự án, thưởng cuối năm</li><li>BHXH, BHYT, BHTN đầy đủ</li><li>Bảo hiểm sức khỏe cao cấp</li><li>Du lịch hàng năm, team building</li></ul>",
        "benefits_content_en": "<ul><li>Salary 12–20M VND based on experience</li><li>Project bonus, year-end bonus</li><li>Full social, health, unemployment insurance</li><li>Premium health insurance</li><li>Annual trip, team building</li></ul>",
        "job_description_vi": "<p>Chịu trách nhiệm thiết kế và kiểm tra kết cấu cho các công trình dân dụng và công nghiệp:</p><ul><li>Tính toán, thiết kế kết cấu bê tông cốt thép, kết cấu thép</li><li>Lập và kiểm tra hồ sơ thiết kế kết cấu</li><li>Phối hợp với các bộ môn kiến trúc, M&E</li><li>Theo dõi, giám sát thi công phần kết cấu</li></ul>",
        "job_description_en": "<p>Responsible for structural design and review for civil and industrial works:</p><ul><li>Calculate and design RC and steel structures</li><li>Prepare and review structural design documents</li><li>Coordinate with architecture and M&E disciplines</li><li>Monitor and supervise structural construction</li></ul>",
        "requirements_vi": "<ul><li>Tốt nghiệp Đại học chuyên ngành Xây dựng / Kết cấu</li><li>Có ít nhất 2 năm kinh nghiệm trong lĩnh vực kết cấu</li><li>Thành thạo AutoCAD, ETABS hoặc SAP2000</li><li>Chịu được áp lực công việc, có tinh thần trách nhiệm cao</li></ul>",
        "requirements_en": "<ul><li>Bachelor's degree in Civil/Structural Engineering</li><li>At least 2 years of structural engineering experience</li><li>Proficient in AutoCAD, ETABS or SAP2000</li><li>Able to work under pressure, highly responsible</li></ul>",
        "how_to_apply_vi": "<p>Ứng viên vui lòng nộp hồ sơ qua form ứng tuyển trên website hoặc gửi CV về email: <strong>tuyendung@hopluccorp.vn</strong></p><p>Tiêu đề email: [KỸ SƯ KẾT CẤU] - Họ tên</p>",
        "how_to_apply_en": "<p>Candidates please apply via the online form or send CV to: <strong>tuyendung@hopluccorp.vn</strong></p><p>Email subject: [STRUCTURAL ENGINEER] - Full Name</p>",
    },
    {
        "company_slug": "hop-luc-mep",
        "quantity": 2,
        "province": "Hà Nội",
        "published_at": "2025-04-05",
        "title_vi": "Kỹ sư Cơ Điện (M&E)",
        "title_en": "MEP Engineer",
        "title_zh_hans": "机电工程师",
        "title_ko": "기계전기 엔지니어",
        "location_display_vi": "Hà Nội — Văn phòng Hợp Lực M&E",
        "location_display_en": "Hanoi — Hop Luc M&E Office",
        "location_display_zh_hans": "河内 — 合力机电办公室",
        "location_display_ko": "하노이 — 합력 M&E 사무소",
        "level_vi": "Kỹ sư / Chuyên viên",
        "level_en": "Engineer / Specialist",
        "level_zh_hans": "工程师/专员",
        "level_ko": "엔지니어/전문가",
        "industry_vi": "Cơ điện — M&E",
        "industry_en": "Mechanical & Electrical",
        "industry_zh_hans": "机械与电气",
        "industry_ko": "기계 및 전기",
        "skills_vi": "AutoCAD MEP, Revit MEP, tiêu chuẩn PCCC, điện, nước",
        "skills_en": "AutoCAD MEP, Revit MEP, fire protection, electrical, plumbing",
        "skills_zh_hans": "AutoCAD MEP, Revit MEP, 消防, 电气, 给排水",
        "skills_ko": "AutoCAD MEP, Revit MEP, 소방, 전기, 배관",
        "resume_language_vi": "Tiếng Việt",
        "resume_language_en": "English / Vietnamese",
        "resume_language_zh_hans": "中文/越南语",
        "resume_language_ko": "베트남어/영어",
        "benefits_content_vi": "<ul><li>Lương thỏa thuận theo năng lực (15–25 triệu)</li><li>Phụ cấp công trường, đi lại</li><li>Đào tạo chuyên sâu hệ thống HVAC, PCCC</li><li>Bảo hiểm đầy đủ theo quy định</li></ul>",
        "benefits_content_en": "<ul><li>Negotiable salary based on experience (15–25M VND)</li><li>Site and travel allowances</li><li>Specialized training in HVAC and fire protection</li><li>Full insurance as required by law</li></ul>",
        "job_description_vi": "<p>Thiết kế và giám sát thi công hệ thống cơ điện công trình:</p><ul><li>Thiết kế hệ thống điện, nước, HVAC, PCCC</li><li>Lập bản vẽ thi công và dự toán MEP</li><li>Phối hợp với kỹ sư xây dựng và kiến trúc</li><li>Nghiệm thu và bàn giao hệ thống</li></ul>",
        "job_description_en": "<p>Design and supervise MEP systems installation:</p><ul><li>Design electrical, plumbing, HVAC, fire protection systems</li><li>Prepare construction drawings and MEP estimates</li><li>Coordinate with structural and architecture engineers</li><li>Inspect and hand over systems</li></ul>",
        "requirements_vi": "<ul><li>Tốt nghiệp Đại học ngành Điện, Cơ khí, Kỹ thuật công trình</li><li>Ít nhất 2 năm kinh nghiệm thiết kế M&E công trình</li><li>Thành thạo AutoCAD, có kiến thức về Revit MEP là lợi thế</li></ul>",
        "requirements_en": "<ul><li>Bachelor's in Electrical, Mechanical, or Building Services Engineering</li><li>At least 2 years of MEP design experience</li><li>Proficient in AutoCAD; Revit MEP knowledge is a plus</li></ul>",
        "how_to_apply_vi": "<p>Gửi CV về: <strong>tuyendung@hopluccorp.vn</strong> hoặc nộp qua form bên dưới.</p>",
        "how_to_apply_en": "<p>Send CV to: <strong>tuyendung@hopluccorp.vn</strong> or apply via the form below.</p>",
    },
    {
        "company_slug": "hop-luc-xay-dung",
        "quantity": 4,
        "province": "TP. Hồ Chí Minh",
        "published_at": "2025-04-08",
        "title_vi": "Kỹ sư Xây dựng (Giám sát công trình)",
        "title_en": "Civil Engineer (Site Supervisor)",
        "title_zh_hans": "土木工程师（现场监理）",
        "title_ko": "토목 엔지니어(현장 감독)",
        "location_display_vi": "TP. Hồ Chí Minh — Công trường khu vực miền Nam",
        "location_display_en": "Ho Chi Minh City — Southern Region Site",
        "location_display_zh_hans": "胡志明市 — 南部工地",
        "location_display_ko": "호찌민시 — 남부 공사 현장",
        "level_vi": "Kỹ sư / Giám sát",
        "level_en": "Engineer / Supervisor",
        "level_zh_hans": "工程师/监理",
        "level_ko": "엔지니어/감독",
        "industry_vi": "Xây dựng — Giám sát",
        "industry_en": "Construction — Supervision",
        "industry_zh_hans": "建筑 — 监理",
        "industry_ko": "건설 — 감독",
        "skills_vi": "Đọc bản vẽ, giám sát chất lượng, quản lý tiến độ thi công",
        "skills_en": "Blueprint reading, quality supervision, construction schedule management",
        "skills_zh_hans": "读图, 质量监督, 施工进度管理",
        "skills_ko": "도면 해독, 품질 감독, 공사 일정 관리",
        "resume_language_vi": "Tiếng Việt",
        "resume_language_en": "English / Vietnamese",
        "resume_language_zh_hans": "中文/越南语",
        "resume_language_ko": "베트남어",
        "benefits_content_vi": "<ul><li>Lương 10–18 triệu + phụ cấp công trường</li><li>Nhà ở cho cán bộ công trường xa nhà</li><li>Đào tạo nghiệp vụ giám sát định kỳ</li><li>Thưởng hoàn thành dự án đúng tiến độ</li></ul>",
        "benefits_content_en": "<ul><li>Salary 10–18M VND + site allowance</li><li>Accommodation for engineers on remote sites</li><li>Periodic supervision training</li><li>On-time project completion bonus</li></ul>",
        "job_description_vi": "<p>Giám sát thi công, kiểm tra chất lượng và tiến độ công trình:</p><ul><li>Theo dõi, giám sát các đội thi công thực hiện đúng bản vẽ và quy chuẩn</li><li>Lập báo cáo tiến độ hàng tuần</li><li>Phối hợp với tư vấn giám sát và chủ đầu tư</li><li>Xử lý các phát sinh kỹ thuật tại công trường</li></ul>",
        "job_description_en": "<p>Supervise construction, inspect quality and schedule:</p><ul><li>Monitor crews for compliance with drawings and standards</li><li>Prepare weekly progress reports</li><li>Coordinate with consultants and owners</li><li>Resolve on-site technical issues</li></ul>",
        "requirements_vi": "<ul><li>Tốt nghiệp Đại học ngành Xây dựng</li><li>Ít nhất 1 năm kinh nghiệm giám sát công trình</li><li>Chứng chỉ hành nghề giám sát là lợi thế</li><li>Sẵn sàng làm việc tại công trường, chịu được điều kiện ngoài trời</li></ul>",
        "requirements_en": "<ul><li>Bachelor's in Civil Engineering</li><li>At least 1 year of site supervision experience</li><li>Site supervision certificate is a plus</li><li>Willing to work on-site in outdoor conditions</li></ul>",
        "how_to_apply_vi": "<p>Nộp đơn trực tiếp qua website hoặc gửi hồ sơ đến: <strong>tuyendung@hopluccorp.vn</strong></p>",
        "how_to_apply_en": "<p>Apply directly on the website or send application to: <strong>tuyendung@hopluccorp.vn</strong></p>",
    },
    {
        "company_slug": "hop-luc-noi-that",
        "quantity": 2,
        "province": "Hà Nội",
        "published_at": "2025-03-25",
        "title_vi": "Kiến trúc sư / Thiết kế Nội thất",
        "title_en": "Architect / Interior Designer",
        "title_zh_hans": "建筑师/室内设计师",
        "title_ko": "건축사/인테리어 디자이너",
        "location_display_vi": "Hà Nội — Văn phòng Hợp Lực Nội Thất",
        "location_display_en": "Hanoi — Hop Luc Interior Office",
        "location_display_zh_hans": "河内 — 合力室内装饰办公室",
        "location_display_ko": "하노이 — 합력 인테리어 사무소",
        "level_vi": "Kiến trúc sư / Chuyên viên thiết kế",
        "level_en": "Architect / Design Specialist",
        "level_zh_hans": "建筑师/设计专员",
        "level_ko": "건축사/디자인 전문가",
        "industry_vi": "Kiến trúc — Nội thất",
        "industry_en": "Architecture — Interior Design",
        "industry_zh_hans": "建筑 — 室内设计",
        "industry_ko": "건축 — 인테리어 디자인",
        "skills_vi": "AutoCAD, SketchUp, 3ds Max, Photoshop, tư duy thẩm mỹ",
        "skills_en": "AutoCAD, SketchUp, 3ds Max, Photoshop, aesthetic sense",
        "skills_zh_hans": "AutoCAD, SketchUp, 3ds Max, Photoshop, 审美思维",
        "skills_ko": "AutoCAD, SketchUp, 3ds Max, Photoshop, 심미적 감각",
        "resume_language_vi": "Tiếng Việt",
        "resume_language_en": "English / Vietnamese",
        "resume_language_zh_hans": "中文/越南语",
        "resume_language_ko": "베트남어/영어",
        "benefits_content_vi": "<ul><li>Lương 12–22 triệu tùy năng lực</li><li>Môi trường sáng tạo, dự án đa dạng</li><li>Tham gia các dự án nội thất cao cấp</li><li>Phúc lợi đầy đủ theo quy định nhà nước</li></ul>",
        "benefits_content_en": "<ul><li>Salary 12–22M VND based on skills</li><li>Creative environment with diverse projects</li><li>Work on premium interior projects</li><li>Full benefits per state regulations</li></ul>",
        "job_description_vi": "<p>Thực hiện thiết kế nội thất cho các công trình dân dụng và thương mại:</p><ul><li>Phát triển concept và lập hồ sơ thiết kế nội thất</li><li>Tạo bản vẽ 2D và mô hình 3D</li><li>Chọn vật liệu, màu sắc, nội thất phù hợp</li><li>Theo dõi thi công và đảm bảo chất lượng hoàn thiện</li></ul>",
        "job_description_en": "<p>Perform interior design for residential and commercial projects:</p><ul><li>Develop concepts and prepare interior design documents</li><li>Create 2D drawings and 3D models</li><li>Select materials, colors, and furnishings</li><li>Supervise construction and ensure finishing quality</li></ul>",
        "requirements_vi": "<ul><li>Tốt nghiệp Đại học ngành Kiến trúc / Thiết kế nội thất</li><li>Kinh nghiệm từ 1–3 năm, có portfolio thực tế</li><li>Thành thạo AutoCAD, SketchUp; biết 3ds Max / Lumion là lợi thế</li><li>Có khiếu thẩm mỹ, tư duy sáng tạo</li></ul>",
        "requirements_en": "<ul><li>Bachelor's in Architecture / Interior Design</li><li>1–3 years experience with a real portfolio</li><li>Proficient in AutoCAD, SketchUp; 3ds Max/Lumion is a plus</li><li>Good aesthetic sense and creative thinking</li></ul>",
        "how_to_apply_vi": "<p>Nộp portfolio + CV qua email: <strong>tuyendung@hopluccorp.vn</strong> hoặc form dưới đây.</p>",
        "how_to_apply_en": "<p>Submit portfolio + CV to: <strong>tuyendung@hopluccorp.vn</strong> or via the form below.</p>",
    },
    {
        "company_slug": "hop-luc-corp",
        "quantity": 2,
        "province": "Hà Nội",
        "published_at": "2025-03-20",
        "title_vi": "Kế toán Tổng hợp",
        "title_en": "General Accountant",
        "title_zh_hans": "综合会计",
        "title_ko": "종합 회계사",
        "location_display_vi": "Hà Nội — Trụ sở Tập đoàn Hợp Lực",
        "location_display_en": "Hanoi — Hop Luc Group Headquarters",
        "location_display_zh_hans": "河内 — 合力集团总部",
        "location_display_ko": "하노이 — 합력 그룹 본사",
        "level_vi": "Chuyên viên / Kế toán",
        "level_en": "Specialist / Accountant",
        "level_zh_hans": "专员/会计",
        "level_ko": "전문가/회계사",
        "industry_vi": "Tài chính — Kế toán",
        "industry_en": "Finance — Accounting",
        "industry_zh_hans": "财务 — 会计",
        "industry_ko": "재무 — 회계",
        "skills_vi": "Kế toán tổng hợp, Excel, phần mềm MISA/Fast Accounting, thuế",
        "skills_en": "General accounting, Excel, MISA/Fast Accounting software, tax",
        "skills_zh_hans": "综合会计, Excel, MISA/Fast会计软件, 税务",
        "skills_ko": "종합 회계, Excel, MISA/Fast 회계 소프트웨어, 세무",
        "resume_language_vi": "Tiếng Việt",
        "resume_language_en": "Vietnamese",
        "resume_language_zh_hans": "越南语",
        "resume_language_ko": "베트남어",
        "benefits_content_vi": "<ul><li>Lương 10–16 triệu tùy kinh nghiệm</li><li>Thưởng tháng 13, thưởng hiệu quả công việc</li><li>Đào tạo nghiệp vụ kế toán xây dựng</li><li>Bảo hiểm đầy đủ</li></ul>",
        "benefits_content_en": "<ul><li>Salary 10–16M VND based on experience</li><li>13th-month pay, performance bonuses</li><li>Construction accounting training</li><li>Full insurance</li></ul>",
        "job_description_vi": "<p>Thực hiện công tác kế toán tổng hợp cho tập đoàn:</p><ul><li>Hạch toán kế toán các nghiệp vụ phát sinh hàng ngày</li><li>Lập báo cáo tài chính tháng, quý, năm</li><li>Kê khai và quyết toán thuế VAT, TNDN, TNCN</li><li>Phối hợp với kiểm toán nội bộ và bên ngoài</li></ul>",
        "job_description_en": "<p>Perform general accounting for the group:</p><ul><li>Record daily accounting transactions</li><li>Prepare monthly, quarterly and annual financial statements</li><li>Declare and finalize VAT, CIT, PIT</li><li>Coordinate with internal and external auditors</li></ul>",
        "requirements_vi": "<ul><li>Tốt nghiệp Đại học ngành Kế toán / Tài chính</li><li>Ít nhất 2 năm kinh nghiệm kế toán tổng hợp</li><li>Thành thạo MISA hoặc Fast Accounting</li><li>Hiểu biết luật thuế Việt Nam hiện hành</li></ul>",
        "requirements_en": "<ul><li>Bachelor's in Accounting / Finance</li><li>At least 2 years of general accounting experience</li><li>Proficient in MISA or Fast Accounting</li><li>Understanding of current Vietnamese tax law</li></ul>",
        "how_to_apply_vi": "<p>Gửi CV về: <strong>tuyendung@hopluccorp.vn</strong></p>",
        "how_to_apply_en": "<p>Send CV to: <strong>tuyendung@hopluccorp.vn</strong></p>",
    },
    {
        "company_slug": "hop-luc-xay-dung",
        "quantity": 3,
        "province": "TP. Hồ Chí Minh",
        "published_at": "2025-04-10",
        "title_vi": "Kỹ sư Dự toán Xây dựng",
        "title_en": "Quantity Surveyor / Cost Estimator",
        "title_zh_hans": "工程预算工程师",
        "title_ko": "건설 견적 엔지니어",
        "location_display_vi": "TP. Hồ Chí Minh / Hà Nội — Văn phòng Hợp Lực Xây Dựng",
        "location_display_en": "Ho Chi Minh City / Hanoi — Hop Luc Construction",
        "location_display_zh_hans": "胡志明市/河内 — 合力建设",
        "location_display_ko": "호찌민시/하노이 — 합력 건설",
        "level_vi": "Kỹ sư / Chuyên viên",
        "level_en": "Engineer / Specialist",
        "level_zh_hans": "工程师/专员",
        "level_ko": "엔지니어/전문가",
        "industry_vi": "Xây dựng — Dự toán",
        "industry_en": "Construction — Cost Estimation",
        "industry_zh_hans": "建筑 — 工程预算",
        "industry_ko": "건설 — 견적",
        "skills_vi": "Dự toán xây dựng, AutoCAD, phần mềm dự toán (Eta, DT4), đọc bản vẽ",
        "skills_en": "Construction estimation, AutoCAD, estimating software (Eta, DT4), blueprint reading",
        "skills_zh_hans": "工程预算, AutoCAD, 预算软件(Eta, DT4), 读图",
        "skills_ko": "건설 견적, AutoCAD, 견적 소프트웨어(Eta, DT4), 도면 해독",
        "resume_language_vi": "Tiếng Việt",
        "resume_language_en": "English / Vietnamese",
        "resume_language_zh_hans": "中文/越南语",
        "resume_language_ko": "베트남어",
        "benefits_content_vi": "<ul><li>Lương 12–20 triệu VNĐ</li><li>Thưởng dự án, thưởng cuối năm</li><li>Bảo hiểm đầy đủ</li><li>Đào tạo phần mềm dự toán mới</li></ul>",
        "benefits_content_en": "<ul><li>Salary 12–20M VND</li><li>Project and year-end bonuses</li><li>Full insurance</li><li>Training on new estimating software</li></ul>",
        "job_description_vi": "<p>Lập và quản lý dự toán cho các dự án xây dựng:</p><ul><li>Lập dự toán chi tiết theo bản vẽ thiết kế và đơn giá hiện hành</li><li>Theo dõi biến động giá vật liệu, cập nhật dự toán</li><li>Lập hồ sơ thanh quyết toán công trình</li><li>Phối hợp với bộ phận kỹ thuật và thi công</li></ul>",
        "job_description_en": "<p>Prepare and manage estimates for construction projects:</p><ul><li>Prepare detailed estimates based on design drawings and current unit prices</li><li>Track material price changes and update estimates</li><li>Prepare project settlement documents</li><li>Coordinate with technical and construction teams</li></ul>",
        "requirements_vi": "<ul><li>Tốt nghiệp Đại học ngành Xây dựng / Kinh tế Xây dựng</li><li>Ít nhất 2 năm kinh nghiệm dự toán công trình dân dụng / công nghiệp</li><li>Thành thạo phần mềm dự toán Eta hoặc DT4</li><li>Có chứng chỉ hành nghề dự toán là lợi thế</li></ul>",
        "requirements_en": "<ul><li>Bachelor's in Civil Engineering or Construction Economics</li><li>At least 2 years of estimation experience</li><li>Proficient in Eta or DT4 estimating software</li><li>Estimation practice certificate is a plus</li></ul>",
        "how_to_apply_vi": "<p>Nộp đơn qua form hoặc gửi CV về: <strong>tuyendung@hopluccorp.vn</strong></p>",
        "how_to_apply_en": "<p>Apply via form or send CV to: <strong>tuyendung@hopluccorp.vn</strong></p>",
    },
]


class Command(BaseCommand):
    help = "Seed careers page: companies, culture photos, benefits, job postings."

    def add_arguments(self, parser):
        parser.add_argument("--reset", action="store_true", help="Xóa dữ liệu cũ trước khi seed")

    def handle(self, *args, **options):
        if options["reset"]:
            self.stdout.write("  Resetting careers data...")
            JobApplication.objects.all().delete()
            JobPosting.objects.all().delete()
            WorkBenefitItem.objects.all().delete()
            CulturePhoto.objects.all().delete()
            CareersPage.objects.all().delete()
            CareerCompany.objects.all().delete()
            self.stdout.write(self.style.WARNING("  → Cleared."))

        self._seed_page_config()
        self._seed_companies()
        self._seed_culture_photos()
        self._seed_benefits()
        self._seed_jobs()

        self.stdout.write(self.style.SUCCESS("  ✓ Careers seeded successfully."))

    def _seed_page_config(self):
        CareersPage.objects.get_or_create(
            pk=1,
            defaults={
                "banner_title_vi": "TUYỂN DỤNG",
                "banner_title_en": "CAREERS",
                "banner_title_zh_hans": "招聘",
                "banner_title_ko": "채용",
                "culture_video_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
                "culture_title_vi": "Văn hóa Hợp Lực",
                "culture_title_en": "Hop Luc Culture",
                "culture_title_zh_hans": "合力文化",
                "culture_title_ko": "합력 문화",
                "culture_subtitle_vi": "Chúng tôi xây dựng không chỉ những công trình, mà còn xây dựng con người.",
                "culture_subtitle_en": "We build not only structures, but also people.",
                "culture_subtitle_zh_hans": "我们不仅建设建筑，更培养人才。",
                "culture_subtitle_ko": "우리는 건물뿐만 아니라 사람도 만들어 갑니다.",
            },
        )
        self.stdout.write("  ✓ CareersPage config seeded.")

    def _seed_companies(self):
        for i, data in enumerate(COMPANIES):
            CareerCompany.objects.get_or_create(
                slug=data["slug"],
                defaults={
                    "name_vi": data["name_vi"],
                    "name_en": data["name_en"],
                    "name_zh_hans": data["name_zh_hans"],
                    "name_ko": data["name_ko"],
                    "is_active": True,
                    "order": i,
                },
            )
        self.stdout.write(f"  ✓ {len(COMPANIES)} companies seeded.")

    def _seed_culture_photos(self):
        for i, data in enumerate(CULTURE_PHOTOS):
            CulturePhoto.objects.create(
                alt_vi=data["alt_vi"],
                alt_en=data["alt_en"],
                alt_zh_hans=data["alt_zh_hans"],
                alt_ko=data["alt_ko"],
                is_active=True,
                order=i,
            )
        self.stdout.write(f"  ✓ {len(CULTURE_PHOTOS)} culture photos seeded.")

    def _seed_benefits(self):
        for i, data in enumerate(BENEFITS):
            WorkBenefitItem.objects.create(
                icon_type=data["icon_type"],
                icon_text=data.get("icon_text", ""),
                title_vi=data["title_vi"],
                title_en=data["title_en"],
                title_zh_hans=data["title_zh_hans"],
                title_ko=data["title_ko"],
                description_vi=data["description_vi"],
                description_en=data["description_en"],
                description_zh_hans=data["description_zh_hans"],
                description_ko=data["description_ko"],
                is_active=True,
                order=i,
            )
        self.stdout.write(f"  ✓ {len(BENEFITS)} work benefits seeded.")

    def _seed_jobs(self):
        for data in JOBS:
            # Resolve company FK
            try:
                company = CareerCompany.objects.get(slug=data["company_slug"])
            except CareerCompany.DoesNotExist:
                company = None

            slug_base = slugify(data["title_vi"], allow_unicode=True)
            slug = slug_base
            counter = 1
            while JobPosting.objects.filter(slug=slug).exists():
                slug = f"{slug_base}-{counter}"
                counter += 1

            JobPosting.objects.create(
                company=company,
                slug=slug,
                quantity=data["quantity"],
                province=data["province"],
                published_at=data["published_at"],
                is_active=True,
                title_vi=data["title_vi"],
                title_en=data["title_en"],
                title_zh_hans=data["title_zh_hans"],
                title_ko=data["title_ko"],
                location_display_vi=data["location_display_vi"],
                location_display_en=data["location_display_en"],
                location_display_zh_hans=data["location_display_zh_hans"],
                location_display_ko=data["location_display_ko"],
                level_vi=data.get("level_vi", ""),
                level_en=data.get("level_en", ""),
                level_zh_hans=data.get("level_zh_hans", ""),
                level_ko=data.get("level_ko", ""),
                industry_vi=data.get("industry_vi", ""),
                industry_en=data.get("industry_en", ""),
                industry_zh_hans=data.get("industry_zh_hans", ""),
                industry_ko=data.get("industry_ko", ""),
                skills_vi=data.get("skills_vi", ""),
                skills_en=data.get("skills_en", ""),
                skills_zh_hans=data.get("skills_zh_hans", ""),
                skills_ko=data.get("skills_ko", ""),
                resume_language_vi=data.get("resume_language_vi", ""),
                resume_language_en=data.get("resume_language_en", ""),
                resume_language_zh_hans=data.get("resume_language_zh_hans", ""),
                resume_language_ko=data.get("resume_language_ko", ""),
                benefits_content_vi=data.get("benefits_content_vi", ""),
                benefits_content_en=data.get("benefits_content_en", ""),
                job_description_vi=data.get("job_description_vi", ""),
                job_description_en=data.get("job_description_en", ""),
                requirements_vi=data.get("requirements_vi", ""),
                requirements_en=data.get("requirements_en", ""),
                how_to_apply_vi=data.get("how_to_apply_vi", ""),
                how_to_apply_en=data.get("how_to_apply_en", ""),
            )
        self.stdout.write(f"  ✓ {len(JOBS)} job postings seeded.")
