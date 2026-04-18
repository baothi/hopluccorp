from django.core.management.base import BaseCommand

from hopluccorp.pages.models import PageSEO


SEO_DATA = [
    {
        "page_key": "homepage",
        "page_name": "Trang chủ",
        "title_vi": "Hợp Lực - Phát triển bền vững là kim chỉ nam cho mọi hoạt động",
        "title_en": "Hop Luc - Sustainable development guides all our activities",
        "title_zh_hans": "合力集团 - 可持续发展引领一切行动",
        "title_ko": "합력 - 지속 가능한 발전이 모든 활동의 지침",
        "description_vi": "Công ty cổ phần Xây dựng Hợp Lực - Tổng thầu EPC hàng đầu Việt Nam trong lĩnh vực xây dựng công nghiệp, cơ điện, nội thất và vật liệu xây dựng.",
        "description_en": "Hop Luc Construction JSC - Leading EPC contractor in Vietnam specializing in industrial construction, M&E, interior finishing and building materials.",
        "description_zh_hans": "合力建设股份公司 - 越南领先的EPC总承包商，专注于工业建设、机电、室内装修和建筑材料。",
        "description_ko": "합력건설주식회사 - 산업 건설, 기계전기, 인테리어, 건축자재 분야 베트남 선도 EPC 총괄 시공사.",
        "keywords_vi": "xây dựng, tổng thầu, EPC, cơ điện, nội thất, vật liệu xây dựng, Hợp Lực",
        "keywords_en": "construction, general contractor, EPC, M&E, interior, building materials, Hop Luc",
        "keywords_zh_hans": "建设, 总承包, EPC, 机电, 室内, 建筑材料, 合力",
        "keywords_ko": "건설, 종합건설, EPC, 기계전기, 인테리어, 건축자재, 합력",
    },
    {
        "page_key": "about",
        "page_name": "Giới thiệu",
        "title_vi": "Giới thiệu - Hợp Lực Corp | Tổng thầu EPC hàng đầu Việt Nam",
        "title_en": "About Us - Hop Luc Corp | Leading EPC Contractor in Vietnam",
        "title_zh_hans": "关于我们 - 合力集团 | 越南领先的EPC总承包商",
        "title_ko": "회사 소개 - 합력그룹 | 베트남 선도 EPC 총괄 시공사",
        "description_vi": "Tìm hiểu về Hợp Lực - 16 năm hoạt động, hơn 200 dự án, 1500 nhân sự. Lịch sử hình thành, tầm nhìn sứ mệnh, giá trị cốt lõi và ban lãnh đạo.",
        "description_en": "Learn about Hop Luc - 16 years of operation, over 200 projects, 1500 employees. History, vision & mission, core values and leadership.",
        "description_zh_hans": "了解合力集团 - 16年运营经验，200余个项目，1500名员工。发展历程、愿景使命、核心价值和领导团队。",
        "description_ko": "합력 소개 - 16년 운영, 200개 이상의 프로젝트, 1500명의 직원. 연혁, 비전과 미션, 핵심 가치 및 경영진.",
        "keywords_vi": "giới thiệu Hợp Lực, lịch sử, tầm nhìn, sứ mệnh, ban lãnh đạo",
        "keywords_en": "about Hop Luc, history, vision, mission, leadership",
        "keywords_zh_hans": "合力介绍, 历史, 愿景, 使命, 领导团队",
        "keywords_ko": "합력 소개, 연혁, 비전, 미션, 경영진",
    },
    {
        "page_key": "organization",
        "page_name": "Cơ cấu tổ chức",
        "title_vi": "Cơ cấu tổ chức - Hợp Lực Corp",
        "title_en": "Organization Structure - Hop Luc Corp",
        "title_zh_hans": "组织架构 - 合力集团",
        "title_ko": "조직 구조 - 합력그룹",
        "description_vi": "Cơ cấu tổ chức Hợp Lực - Hệ sinh thái 6 công ty, hơn 1500 nhân sự. Tổng quan, sơ đồ tổ chức và thư viện ảnh.",
        "description_en": "Hop Luc Organization - Ecosystem of 6 companies, over 1500 employees. Overview, organization chart and gallery.",
        "description_zh_hans": "合力组织架构 - 6家公司生态系统，1500多名员工。概述、组织架构图和相册。",
        "description_ko": "합력 조직 구조 - 6개 회사 생태계, 1500명 이상의 직원. 개요, 조직도 및 갤러리.",
        "keywords_vi": "cơ cấu tổ chức, sơ đồ tổ chức, Hợp Lực",
        "keywords_en": "organization structure, organization chart, Hop Luc",
        "keywords_zh_hans": "组织架构, 组织图, 合力",
        "keywords_ko": "조직 구조, 조직도, 합력",
    },
    {
        "page_key": "resources",
        "page_name": "Nguồn lực",
        "title_vi": "Nguồn lực - Hợp Lực Corp",
        "title_en": "Resources - Hop Luc Corp",
        "title_zh_hans": "资源 - 合力集团",
        "title_ko": "리소스 - 합력그룹",
        "description_vi": "Nguồn nhân lực, hệ thống quản lý và các dự án tiêu biểu của Hợp Lực.",
        "description_en": "Human resources, management systems, and featured projects of Hop Luc.",
        "description_zh_hans": "合力的人力资源、管理体系和代表性项目。",
        "description_ko": "합력의 인적 자원, 관리 시스템 및 대표 프로젝트.",
        "keywords_vi": "nguồn lực Hợp Lực, nhân sự, hệ thống quản lý, dự án tiêu biểu",
        "keywords_en": "Hop Luc resources, human resources, management system, featured projects",
        "keywords_zh_hans": "合力资源, 人力资源, 管理体系, 代表性项目",
        "keywords_ko": "합력 리소스, 인적 자원, 관리 시스템, 대표 프로젝트",
    },
    {
        "page_key": "projects",
        "page_name": "Dự án",
        "title_vi": "Dự án - Hợp Lực Corp",
        "title_en": "Projects - Hop Luc Corp",
        "title_zh_hans": "项目 - 合力集团",
        "title_ko": "프로젝트 - 합력그룹",
        "description_vi": "Danh sách các dự án công nghiệp, dân dụng và hạ tầng tiêu biểu do Hợp Lực triển khai.",
        "description_en": "Featured industrial, civil, and infrastructure projects delivered by Hop Luc.",
        "description_zh_hans": "合力实施的代表性工业、民用和基础设施项目。",
        "description_ko": "합력이 수행한 대표 산업, 민간 및 인프라 프로젝트.",
        "keywords_vi": "dự án Hợp Lực, dự án công nghiệp, tổng thầu EPC",
        "keywords_en": "Hop Luc projects, industrial projects, EPC contractor",
        "keywords_zh_hans": "合力项目, 工业项目, EPC总承包商",
        "keywords_ko": "합력 프로젝트, 산업 프로젝트, EPC 시공사",
    },
    {
        "page_key": "news",
        "page_name": "Tin tức",
        "title_vi": "Tin tức - Hợp Lực Corp",
        "title_en": "News - Hop Luc Corp",
        "title_zh_hans": "新闻 - 合力集团",
        "title_ko": "뉴스 - 합력그룹",
        "description_vi": "Tin tức, sự kiện và hoạt động mới nhất từ hệ sinh thái Hợp Lực.",
        "description_en": "Latest news, events, and activities from the Hop Luc ecosystem.",
        "description_zh_hans": "合力生态系统的最新新闻、活动和动态。",
        "description_ko": "합력 생태계의 최신 뉴스, 행사 및 활동.",
        "keywords_vi": "tin tức Hợp Lực, sự kiện, hoạt động doanh nghiệp",
        "keywords_en": "Hop Luc news, events, corporate activities",
        "keywords_zh_hans": "合力新闻, 活动, 企业动态",
        "keywords_ko": "합력 뉴스, 행사, 기업 활동",
    },
    {
        "page_key": "contact",
        "page_name": "Liên hệ",
        "title_vi": "Liên hệ - Hợp Lực Corp",
        "title_en": "Contact - Hop Luc Corp",
        "title_zh_hans": "联系我们 - 合力集团",
        "title_ko": "문의 - 합력그룹",
        "description_vi": "Thông tin liên hệ Công ty Cổ phần Xây dựng Hợp Lực.",
        "description_en": "Contact information for Hop Luc Construction Joint Stock Company.",
        "description_zh_hans": "合力建设股份公司的联系信息。",
        "description_ko": "합력건설주식회사의 연락처 정보.",
        "keywords_vi": "liên hệ Hợp Lực, địa chỉ Hợp Lực, số điện thoại Hợp Lực",
        "keywords_en": "contact Hop Luc, Hop Luc address, Hop Luc phone",
        "keywords_zh_hans": "联系合力, 合力地址, 合力电话",
        "keywords_ko": "합력 문의, 합력 주소, 합력 전화",
    },
]


class Command(BaseCommand):
    help = "Seed SEO metadata for public pages (4 languages)"

    def add_arguments(self, parser):
        parser.add_argument("--reset", action="store_true", help="Delete all SEO data before seeding")

    def handle(self, *args, **options):
        if options["reset"]:
            count = PageSEO.objects.count()
            PageSEO.objects.all().delete()
            self.stdout.write(self.style.WARNING(f"Deleted {count} SEO entries"))

        created_count = 0
        updated_count = 0

        for seo_item in SEO_DATA:
            seo_data = seo_item.copy()
            page_key = seo_data.pop("page_key")
            page_name = seo_data.pop("page_name")

            obj, created = PageSEO.objects.update_or_create(
                page_key=page_key,
                defaults={"page_name": page_name, **seo_data},
            )

            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f"  Created SEO: {page_key} ({page_name})"))
            else:
                updated_count += 1
                self.stdout.write(f"  Updated SEO: {page_key} ({page_name})")

        self.stdout.write(
            self.style.SUCCESS(f"\nDone! Created: {created_count}, Updated: {updated_count}")
        )
        self.stdout.write(
            self.style.NOTICE("Note: OG images need to be uploaded via Django Admin")
        )
