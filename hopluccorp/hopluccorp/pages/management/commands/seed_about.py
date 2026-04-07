from django.core.management.base import BaseCommand

from hopluccorp.pages.models import (
    CoreValue,
    HistoryItem,
    LeaderMessage,
    LeadershipMember,
    VisionMission,
)


class Command(BaseCommand):
    help = "Seed about page data with 4 languages (VI, EN, ZH, KO). Always reset before seeding."

    def handle(self, *args, **options):
        # Always delete old data and recreate
        for model in [LeaderMessage, HistoryItem, CoreValue, VisionMission, LeadershipMember]:
            count = model.objects.count()
            model.objects.all().delete()
            if count:
                self.stdout.write(self.style.WARNING(f"  Deleted {count} {model.__name__}"))

        self._seed_leader_message()
        self._seed_history()
        self._seed_core_values()
        self._seed_vision_mission()
        self._seed_leadership()

        self.stdout.write(self.style.SUCCESS("\nAbout page seed complete (4 languages)!"))

    # ==================== LEADER MESSAGE ====================
    def _seed_leader_message(self):
        LeaderMessage.objects.create(
            # VI
            title_vi="Thông điệp",
            subtitle_vi="LÃNH ĐẠO",
            slogan_vi="PHÁT TRIỂN BỀN VỮNG LÀ KIM CHỈ NAM CHO MỌI HOẠT ĐỘNG",
            leader_name_vi="Ông Lê Anh Hùng",
            leader_position_vi="Chủ tịch HĐQT",
            content_vi=(
                "<p>Kính gửi: Quý Chủ đầu tư, Quý Đối tác</p>"
                "<p>Được thành lập từ năm 2009, khởi nguồn từ lĩnh vực xây dựng thuần túy, "
                "Hợp Lực đã trải qua hơn 16 năm hình thành và phát triển không ngừng nghỉ. "
                "Với chiến lược đúng đắn, nền tảng nội lực vững chắc cùng tinh thần đổi mới sáng tạo, "
                "đến nay, Hợp Lực đã vươn mình trở thành tổng thầu EPC hàng đầu Việt Nam "
                "trong lĩnh vực xây dựng công nghiệp. Đồng thời, chúng tôi đã phát triển "
                "hệ sinh thái đa ngành với 6 công ty hoạt động trong các lĩnh vực: "
                "xây dựng, cơ điện, hoàn thiện nội thất, vật liệu xây dựng và công nghiệp phụ trợ.</p>"
                "<p>Với hơn 200 dự án được triển khai thành công, trong đó có nhiều công trình FDI quy mô lớn, "
                "Hợp Lực tự hào đóng góp vào tiến trình công nghiệp hóa, hiện đại hóa đất nước. "
                "Năm 2024, tổng sản lượng hợp nhất toàn hệ thống đã vượt mốc 600 triệu USD – "
                "một dấu ấn thể hiện rõ năng lực, uy tín và vị thế ngày càng lớn mạnh "
                "của Hợp Lực trên thị trường trong nước và quốc tế.</p>"
                "<p>Trong bối cảnh nền kinh tế toàn cầu đang chuyển mình mạnh mẽ với nhiều cơ hội "
                "và thách thức đan xen, Hợp Lực xác định phát triển bền vững là kim chỉ nam cho mọi hoạt động. "
                "Chúng tôi cam kết tích hợp công nghệ tiên tiến, ứng dụng giải pháp xanh "
                "và thân thiện với môi trường, đồng thời tiếp tục mở rộng đa ngành, đa lĩnh vực "
                "một cách có chiến lược nhằm tạo dựng những giá trị thực tiễn, lâu dài "
                "cho khách hàng, đối tác và cộng đồng.</p>"
                "<p>Chúng tôi luôn trân trọng và biết ơn sự tin tưởng, hợp tác của Quý Chủ đầu tư, "
                "Quý Đối tác trong suốt chặng đường phát triển vừa qua. "
                "Rất mong sẽ tiếp tục nhận được sự đồng hành quý báu từ Quý vị "
                "để cùng nhau kiến tạo nên những giá trị bền vững, "
                "đóng góp thiết thực vào hành trình xây dựng một Việt Nam thịnh vượng, hùng cường.</p>"
                "<p>Trân trọng cảm ơn!</p>"
            ),
            # EN
            title_en="Message",
            subtitle_en="LEADERSHIP",
            slogan_en="SUSTAINABLE DEVELOPMENT IS THE GUIDING PRINCIPLE FOR ALL ACTIVITIES",
            leader_name_en="Mr. Le Anh Hung",
            leader_position_en="Chairman of the Board",
            content_en=(
                "<p>Dear Valued Investors and Partners,</p>"
                "<p>Established in 2009, originating from pure construction, "
                "Hop Luc has undergone more than 16 years of continuous growth. "
                "With the right strategy, a solid foundation and innovative spirit, "
                "Hop Luc has grown to become a leading EPC general contractor in Vietnam "
                "in industrial construction. We have also developed a multi-industry ecosystem "
                "of 6 companies operating in: construction, M&E, interior finishing, "
                "construction materials and supporting industries.</p>"
                "<p>With over 200 successfully implemented projects, including many large-scale FDI projects, "
                "Hop Luc is proud to contribute to the industrialization and modernization of the country. "
                "In 2024, the total consolidated output exceeded 600 million USD.</p>"
                "<p>In the context of a rapidly changing global economy, "
                "Hop Luc identifies sustainable development as the guiding principle. "
                "We are committed to integrating advanced technology, green solutions, "
                "and continuing to expand strategically across multiple sectors.</p>"
                "<p>We always appreciate the trust and cooperation of our valued investors and partners. "
                "We look forward to continuing this journey together.</p>"
                "<p>Sincerely,</p>"
            ),
            # ZH
            title_zh_hans="致辞",
            subtitle_zh_hans="领导",
            slogan_zh_hans="可持续发展是一切活动的指南针",
            leader_name_zh_hans="黎英雄先生",
            leader_position_zh_hans="董事会主席",
            content_zh_hans=(
                "<p>尊敬的投资者和合作伙伴：</p>"
                "<p>合力建设股份公司成立于2009年，起源于纯建筑领域，"
                "经过16年的不断发展，已成长为越南工业建筑领域领先的EPC总承包商，"
                "并发展了由6家公司组成的多行业生态系统。</p>"
                "<p>成功实施200多个项目，2024年综合产值突破6亿美元。</p>"
                "<p>合力确定可持续发展为一切活动的指南针，"
                "承诺整合先进技术和绿色解决方案。</p>"
                "<p>衷心感谢！</p>"
            ),
            # KO
            title_ko="메시지",
            subtitle_ko="리더십",
            slogan_ko="지속 가능한 발전은 모든 활동의 나침반입니다",
            leader_name_ko="레 안 훙 회장",
            leader_position_ko="이사회 의장",
            content_ko=(
                "<p>존경하는 투자자 및 파트너 여러분,</p>"
                "<p>2009년 설립된 합력건설은 16년간 지속적으로 성장하여 "
                "베트남 산업건설 분야 최고의 EPC 종합건설사로 자리매김했습니다. "
                "6개 회사로 구성된 다업종 생태계를 구축했습니다.</p>"
                "<p>200개 이상의 프로젝트를 성공적으로 수행했으며, "
                "2024년 통합 생산량은 6억 달러를 돌파했습니다.</p>"
                "<p>합력은 지속 가능한 발전을 모든 활동의 나침반으로 삼고 있습니다.</p>"
                "<p>감사합니다.</p>"
            ),
        )
        self.stdout.write(self.style.SUCCESS("  Created leader message (4 langs)"))

    # ==================== HISTORY ====================
    def _seed_history(self):
        items = [
            {
                "year": "2009",
                "description_vi": "Nhận thấy sự phát triển mạnh mẽ của thị trường Xây dựng Công nghiệp tại Việt Nam, Công ty Cổ phần Xây dựng Hợp Lực được thành lập chính thức vào năm 2009, đánh dấu bước đi đầu tiên trên con đường chinh phục và khẳng định bản lĩnh vượt qua khó khăn.",
                "description_en": "Recognizing the strong growth of the Industrial Construction market in Vietnam, Hop Luc Construction JSC was officially established in 2009, marking the first step on the journey of conquering challenges.",
                "description_zh_hans": "看到越南工业建筑市场的强劲增长，合力建设股份公司于2009年正式成立，标志着征服挑战的第一步。",
                "description_ko": "베트남 산업건설 시장의 강력한 성장을 인식하고, 합력건설 주식회사는 2009년 공식 설립되었습니다.",
            },
            {
                "year": "2010",
                "description_vi": "Dấu ấn tiếp theo trên hành trình phát triển của đơn vị chính là việc trở thành nhà thầu phụ cho dự án Samsung Electronics Việt Nam – một thương hiệu toàn cầu với những yêu cầu khắt khe về chuyên môn, kỹ thuật và công nghệ hiện đại.",
                "description_en": "The next milestone was becoming a subcontractor for Samsung Electronics Vietnam – a global brand with stringent requirements for expertise, technology and modern techniques.",
                "description_zh_hans": "下一个里程碑是成为三星电子越南项目的分包商——一个对专业技术有严格要求的全球品牌。",
                "description_ko": "다음 이정표는 삼성전자 베트남 프로젝트의 하도급업체가 된 것입니다.",
            },
            {
                "year": "2014",
                "description_vi": "Năm 2014, Hợp Lực chuyển đổi thành công sang vai trò mới \"Nhà thầu Thiết kế và Thi công\", đánh dấu bước tiến vững chắc trong hành trình phát triển.",
                "description_en": "In 2014, Hop Luc successfully transitioned to the role of \"Design and Build Contractor\", marking a solid step forward.",
                "description_zh_hans": "2014年，合力成功转型为「设计施工总承包商」，标志着发展历程中坚实的一步。",
                "description_ko": "2014년, 합력은 '설계시공 일괄도급업체'로 성공적으로 전환했습니다.",
            },
            {
                "year": "2016",
                "description_vi": "Năm 2016, Hợp Lực ghi dấu bước tiến nổi bật khi được lựa chọn làm Nhà thầu thiết kế và thi công cho Dự án Nhà máy điện tử Luxshare-ICT (Việt Nam).",
                "description_en": "In 2016, Hop Luc marked a notable milestone by being selected as the Design and Build Contractor for the Luxshare-ICT Electronics Factory project in Vietnam.",
                "description_zh_hans": "2016年，合力被选为立讯精密（越南）电子工厂项目的设计施工总承包商。",
                "description_ko": "2016년, 합력은 럭스쉐어-ICT 베트남 전자공장 프로젝트의 설계시공 도급업체로 선정되었습니다.",
            },
            {
                "year": "2019",
                "description_vi": "Cột mốc đầu tiên trong hành trình đột phá của 10 năm thành lập, Hợp Lực đánh dấu bằng việc chính thức nâng vốn điều lệ lên 300 tỷ đồng.",
                "description_en": "The first milestone in the breakthrough journey of 10 years, Hop Luc officially raised charter capital to 300 billion VND.",
                "description_zh_hans": "10年发展历程的第一个突破性里程碑，合力正式将注册资本提升至3000亿越南盾。",
                "description_ko": "10년 발전 여정의 첫 번째 돌파구로, 합력은 자본금을 3,000억 VND로 증자했습니다.",
            },
            {
                "year": "2020",
                "description_vi": "Năm 2020, Hợp Lực tăng trưởng mạnh mẽ với bước đi chiến lược thành lập Công ty Cổ phần Cơ điện Hợp Lực, mở đầu cho mô hình phát triển hệ sinh thái.",
                "description_en": "In 2020, Hop Luc grew strongly with the strategic establishment of Hop Luc M&E JSC, beginning the ecosystem development model.",
                "description_zh_hans": "2020年，合力通过战略性成立合力机电股份公司实现强劲增长，开启了生态系统发展模式。",
                "description_ko": "2020년, 합력은 합력기전 주식회사를 전략적으로 설립하여 생태계 발전 모델을 시작했습니다.",
            },
            {
                "year": "2021",
                "description_vi": "Năm 2021, Hợp Lực chính thức hoàn thành việc nâng vốn điều lệ lên 500 tỷ đồng. Hệ sinh thái Hợp Lực tiếp tục được mở rộng với sự gia nhập của ba đơn vị thành viên mới.",
                "description_en": "In 2021, Hop Luc completed raising charter capital to 500 billion VND. The ecosystem continued to expand with three new member companies.",
                "description_zh_hans": "2021年，合力完成注册资本提升至5000亿越南盾，生态系统继续扩展了三家新成员公司。",
                "description_ko": "2021년, 합력은 자본금을 5,000억 VND로 증자하고 3개의 새로운 계열사를 추가했습니다.",
            },
            {
                "year": "2022",
                "description_vi": "Hợp Lực vinh dự xếp hạng 173 trong \"Top 500 Doanh nghiệp tư nhân lớn nhất Việt Nam\" và xếp hạng 299 trong \"Top 500 Doanh nghiệp lớn nhất Việt Nam\".",
                "description_en": "Hop Luc was honored to rank 173rd in the \"Top 500 Largest Private Enterprises in Vietnam\" and 299th in the \"Top 500 Largest Enterprises in Vietnam\".",
                "description_zh_hans": "合力荣获「越南500强私营企业」第173位和「越南500强企业」第299位。",
                "description_ko": "합력은 '베트남 500대 민간기업' 173위, '베트남 500대 기업' 299위에 선정되었습니다.",
            },
            {
                "year": "2023",
                "description_vi": "Năm 2023, Hợp Lực tăng vốn điều lệ lên 750 tỷ đồng, sản lượng hợp nhất các công ty đạt 6.300 tỷ đồng.",
                "description_en": "In 2023, Hop Luc raised charter capital to 750 billion VND, with consolidated output reaching 6,300 billion VND.",
                "description_zh_hans": "2023年，合力将注册资本提升至7500亿越南盾，综合产值达到63000亿越南盾。",
                "description_ko": "2023년, 합력은 자본금을 7,500억 VND로 증자하고 통합 생산량 6,300억 VND를 달성했습니다.",
            },
            {
                "year": "2024",
                "description_vi": "Năm 2024, sản lượng hợp nhất vượt mốc 15.000 tỷ đồng, 30 dự án được thực hiện với tổng diện tích triển khai lên tới 4 triệu m² sàn, quy mô nhân sự vượt 1.500 người.",
                "description_en": "In 2024, consolidated output exceeded 15,000 billion VND, with 30 projects and a total floor area of 4 million m², surpassing 1,500 employees.",
                "description_zh_hans": "2024年，综合产值突破15000亿越南盾，实施30个项目，总面积达400万平方米，员工超过1500人。",
                "description_ko": "2024년, 통합 생산량 15,000억 VND 돌파, 30개 프로젝트, 총 면적 400만㎡, 직원 1,500명 이상을 달성했습니다.",
            },
            {
                "year": "2025",
                "description_vi": "Công ty Cổ phần Xây dựng Hợp Lực vinh dự đạt vị trí thứ 13 trong số các Doanh nghiệp Xây dựng lớn nhất Việt Nam năm 2024 và xếp hạng trong Top 10 Doanh nghiệp Xây dựng tư nhân lớn nhất Việt Nam.",
                "description_en": "Hop Luc Construction JSC was honored to rank 13th among the Largest Construction Enterprises in Vietnam 2024 and in the Top 10 Largest Private Construction Enterprises.",
                "description_zh_hans": "合力建设荣获2024年越南最大建筑企业第13位，并跻身越南十大民营建筑企业。",
                "description_ko": "합력건설은 2024년 베트남 최대 건설기업 13위, 민간 건설기업 TOP 10에 선정되었습니다.",
            },
        ]
        for i, data in enumerate(items):
            HistoryItem.objects.create(**data, order=i)
        self.stdout.write(self.style.SUCCESS(f"  Created {len(items)} history items (4 langs)"))

    # ==================== CORE VALUES ====================
    def _seed_core_values(self):
        values = [
            {
                "title_vi": "An toàn", "title_en": "Safety",
                "title_zh_hans": "安全", "title_ko": "안전",
            },
            {
                "title_vi": "Tận tâm", "title_en": "Dedication",
                "title_zh_hans": "尽心", "title_ko": "헌신",
            },
            {
                "title_vi": "Chất lượng", "title_en": "Quality",
                "title_zh_hans": "质量", "title_ko": "품질",
            },
            {
                "title_vi": "Cam kết", "title_en": "Commitment",
                "title_zh_hans": "承诺", "title_ko": "약속",
            },
            {
                "title_vi": "Trung thực", "title_en": "Integrity",
                "title_zh_hans": "诚信", "title_ko": "정직",
            },
        ]
        for i, data in enumerate(values):
            CoreValue.objects.create(**data, order=i)
        self.stdout.write(self.style.SUCCESS(f"  Created {len(values)} core values (4 langs)"))

    # ==================== VISION & MISSION ====================
    def _seed_vision_mission(self):
        VisionMission.objects.create(
            # VI
            vision_title_vi="Tầm nhìn",
            vision_content_vi="Trở thành Nhà thầu EPC chuyên nghiệp hàng đầu tại Việt Nam. Hướng tới phát triển đa ngành nghề, đa lĩnh vực, trong đó lấy lĩnh vực thi công xây dựng làm chủ lực, tạo đà phát triển bền vững cho toàn bộ hệ thống.",
            mission_title_vi="Sứ mệnh",
            mission_content_vi="Tại Hợp Lực, chúng tôi tin tưởng rằng, giá trị bền vững và chân chính nhất đều xuất phát từ nguồn nhân lực, lấy con người là trọng tâm, là xuất phát điểm cho mọi sự phát triển. Để từ đó xây dựng một môi trường làm việc chuyên nghiệp, sáng tạo, nhiệt huyết cho đội ngũ nhân lực. Song song với đó, chúng tôi kiến tạo nên những giá trị bền vững bằng cả TÂM – TRÍ – LỰC, mang đến cho quý khách hàng những sản phẩm ưu việt và là tổ chức luôn chia sẻ trách nhiệm xã hội vì cộng đồng.",
            # EN
            vision_title_en="Vision",
            vision_content_en="To become the leading professional EPC contractor in Vietnam. Aiming for multi-industry, multi-sector development, with construction as the core, creating momentum for sustainable development across the entire system.",
            mission_title_en="Mission",
            mission_content_en="At Hop Luc, we believe that the most sustainable and authentic values come from human resources. We put people at the center as the starting point for all development. From there, we build a professional, creative and passionate working environment. We create sustainable values with HEART – MIND – STRENGTH, delivering excellent products and always sharing social responsibility with the community.",
            # ZH
            vision_title_zh_hans="愿景",
            vision_content_zh_hans="成为越南领先的专业EPC总承包商。致力于多行业、多领域发展，以建筑施工为核心，为整个系统的可持续发展创造动力。",
            mission_title_zh_hans="使命",
            mission_content_zh_hans="在合力，我们相信最持久和真正的价值来自人力资源。我们以人为本，作为一切发展的出发点。以心·智·力创造可持续价值，为客户提供优质产品，始终承担社会责任。",
            # KO
            vision_title_ko="비전",
            vision_content_ko="베트남 최고의 전문 EPC 종합건설사가 되는 것입니다. 건설을 핵심으로 다업종, 다분야 발전을 목표로 전체 시스템의 지속 가능한 발전을 위한 동력을 만들어 갑니다.",
            mission_title_ko="사명",
            mission_content_ko="합력에서 우리는 가장 지속 가능하고 진정한 가치가 인적 자원에서 나온다고 믿습니다. 사람을 중심에 두고 모든 발전의 출발점으로 삼습니다. 마음·지혜·힘으로 지속 가능한 가치를 창조하며, 고객에게 우수한 제품을 제공하고 사회적 책임을 나누어 갑니다.",
        )
        self.stdout.write(self.style.SUCCESS("  Created vision & mission (4 langs)"))

    # ==================== LEADERSHIP ====================
    def _seed_leadership(self):
        members = [
            {
                "name_vi": "Ông Lê Anh Hùng", "name_en": "Mr. Le Anh Hung",
                "name_zh_hans": "黎英雄先生", "name_ko": "레 안 훙",
                "position_vi": "Chủ tịch HĐQT", "position_en": "Chairman of the Board",
                "position_zh_hans": "董事会主席", "position_ko": "이사회 의장",
            },
            {
                "name_vi": "Ông Trần Ngọc Tân", "name_en": "Mr. Tran Ngoc Tan",
                "name_zh_hans": "陈玉新先生", "name_ko": "쩐 응옥 떤",
                "position_vi": "Tổng Giám đốc", "position_en": "General Director",
                "position_zh_hans": "总经理", "position_ko": "대표이사",
            },
            {
                "name_vi": "Ông Lê Anh Dũng", "name_en": "Mr. Le Anh Dung",
                "name_zh_hans": "黎英勇先生", "name_ko": "레 안 둥",
                "position_vi": "Phó Chủ tịch HĐQT", "position_en": "Vice Chairman",
                "position_zh_hans": "副董事长", "position_ko": "부회장",
            },
            {
                "name_vi": "Ông Nguyễn Mạnh Hùng", "name_en": "Mr. Nguyen Manh Hung",
                "name_zh_hans": "阮孟雄先生", "name_ko": "응우옌 만 훙",
                "position_vi": "Phó Chủ tịch HĐQT", "position_en": "Vice Chairman",
                "position_zh_hans": "副董事长", "position_ko": "부회장",
            },
        ]
        for i, data in enumerate(members):
            LeadershipMember.objects.create(**data, order=i)
        self.stdout.write(self.style.SUCCESS(f"  Created {len(members)} leadership members (4 langs)"))
