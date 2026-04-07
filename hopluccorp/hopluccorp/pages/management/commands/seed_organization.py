from django.core.management.base import BaseCommand

from hopluccorp.pages.models import (
    OrganizationChart,
    OrganizationGalleryItem,
    OrganizationOverview,
)


class Command(BaseCommand):
    help = "Seed organization page data with 4 languages (VI, EN, ZH, KO). Always reset before seeding."

    def handle(self, *args, **options):
        for model in [OrganizationOverview, OrganizationChart, OrganizationGalleryItem]:
            count = model.objects.count()
            model.objects.all().delete()
            if count:
                self.stdout.write(self.style.WARNING(f"  Deleted {count} {model.__name__}"))

        self._seed_overview()
        self._seed_chart()
        self._seed_gallery()

        self.stdout.write(self.style.SUCCESS("\nOrganization page seed complete (4 languages)!"))

    def _seed_overview(self):
        OrganizationOverview.objects.create(
            # Vietnamese
            title_vi="TỔNG QUAN",
            description_vi=(
                "Thành lập năm 2009, Công ty Cổ phần Xây dựng Hợp Lực đã từng bước vươn mình "
                "trở thành một trong những Tổng thầu EPC hàng đầu Việt Nam trong lĩnh vực Xây dựng Công nghiệp.\n\n"
                "Trải qua hơn 16 năm hình thành và phát triển, Hợp Lực đã thành công gây dựng thương hiệu uy tín, "
                "lớn mạnh với hệ sinh thái gồm 6 công ty, quy tụ đội ngũ hơn 1,500 cán bộ, kỹ sư và kiến trúc sư tâm huyết.\n\n"
                "Với hơn 200 dự án trải dài khắp cả nước, Hợp Lực đã khẳng định vị thế của mình khi liên tục lọt "
                "Top 500 Doanh nghiệp lớn nhất Việt Nam, giữ vị trí 13 trong top Doanh nghiệp Xây Dựng lớn nhất "
                "Việt Nam năm 2024, Top 10 Doanh nghiệp Xây dựng tư nhân lớn nhất Việt Nam năm 2024.\n\n"
                "Hợp Lực cam kết sẽ tiếp tục đồng hành cùng các đối tác trong nước và quốc tế thực hiện sứ mệnh "
                "xây dựng nên những công trình bền vững, góp phần kiến tạo diện mạo hiện đại cho nền công nghiệp Việt Nam."
            ),
            download_text_vi="Tải tài liệu",
            download_link="https://hopluccorp.vn/wp-content/uploads/2025/04/PROFILE-V_A.pdf",
            # English
            title_en="OVERVIEW",
            description_en=(
                "Founded in 2009, Hop Luc Construction Joint Stock Company has gradually grown to become "
                "one of the leading EPC contractors in Vietnam in the field of Industrial Construction.\n\n"
                "Over 16 years of establishment and development, Hop Luc has successfully built a reputable brand, "
                "growing with an ecosystem of 6 companies, gathering a team of over 1,500 dedicated officers, "
                "engineers and architects.\n\n"
                "With more than 200 projects across the country, Hop Luc has affirmed its position by continuously "
                "ranking in the Top 500 Largest Enterprises in Vietnam, holding the 13th position among the largest "
                "construction enterprises in Vietnam in 2024, and Top 10 Largest Private Construction Enterprises "
                "in Vietnam in 2024.\n\n"
                "Hop Luc is committed to continuing to accompany domestic and international partners in the mission "
                "of building sustainable works, contributing to creating a modern appearance for Vietnam's industry."
            ),
            download_text_en="Download",
            # Chinese
            title_zh_hans="概述",
            description_zh_hans=(
                "合力建设股份有限公司成立于2009年，逐步发展成为越南工业建设领域领先的EPC总承包商之一。\n\n"
                "经过16年的建立和发展，合力已成功建立了信誉品牌，"
                "发展壮大为拥有6家公司的生态系统，汇聚了1,500多名敬业的干部、工程师和建筑师。\n\n"
                "凭借遍布全国的200多个项目，合力已确立了自己的地位，"
                "连续入选越南500强企业，2024年位列越南最大建筑企业第13位，"
                "2024年跻身越南十大最大私营建筑企业。\n\n"
                "合力承诺将继续与国内外合作伙伴携手，履行建设可持续工程的使命，"
                "为越南工业现代化做出贡献。"
            ),
            download_text_zh_hans="下载资料",
            # Korean
            title_ko="개요",
            description_ko=(
                "2009년 설립된 합력건설주식회사는 베트남 산업건설 분야에서 "
                "선도적인 EPC 종합건설사 중 하나로 성장했습니다.\n\n"
                "16년간의 설립과 발전을 거치며, 합력은 6개 회사로 구성된 생태계와 "
                "1,500명 이상의 헌신적인 간부, 엔지니어, 건축가 팀을 갖춘 "
                "신뢰받는 브랜드를 성공적으로 구축했습니다.\n\n"
                "전국에 걸쳐 200개 이상의 프로젝트를 수행하며, 합력은 베트남 500대 기업에 "
                "지속적으로 선정되었고, 2024년 베트남 최대 건설기업 13위, "
                "2024년 베트남 10대 민간 건설기업에 이름을 올렸습니다.\n\n"
                "합력은 국내외 파트너와 함께 지속 가능한 건축물을 짓는 사명을 이행하며, "
                "베트남 산업의 현대적 면모를 만들어가는 데 기여하겠습니다."
            ),
            download_text_ko="자료 다운로드",
        )
        self.stdout.write(self.style.SUCCESS("  Created OrganizationOverview (4 languages)"))

    def _seed_chart(self):
        OrganizationChart.objects.create(
            title_vi="SƠ ĐỒ TỔ CHỨC",
            title_en="ORGANIZATION CHART",
            title_zh_hans="组织架构图",
            title_ko="조직도",
        )
        self.stdout.write(self.style.SUCCESS("  Created OrganizationChart (4 languages)"))

    def _seed_gallery(self):
        gallery_data = [
            {"alt_vi": "Thư viện 1", "alt_en": "Gallery 1", "alt_zh_hans": "相册 1", "alt_ko": "갤러리 1"},
            {"alt_vi": "Thư viện 2", "alt_en": "Gallery 2", "alt_zh_hans": "相册 2", "alt_ko": "갤러리 2"},
            {"alt_vi": "Thư viện 3", "alt_en": "Gallery 3", "alt_zh_hans": "相册 3", "alt_ko": "갤러리 3"},
            {"alt_vi": "Thư viện 4", "alt_en": "Gallery 4", "alt_zh_hans": "相册 4", "alt_ko": "갤러리 4"},
            {"alt_vi": "Thư viện 5", "alt_en": "Gallery 5", "alt_zh_hans": "相册 5", "alt_ko": "갤러리 5"},
        ]
        for i, data in enumerate(gallery_data):
            OrganizationGalleryItem.objects.create(**data, order=i)

        self.stdout.write(self.style.SUCCESS("  Created 5 OrganizationGalleryItems (4 languages)"))
