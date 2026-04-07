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
    help = "Seed resources page data (text only — upload images via Django Admin)"

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
            ResourcesBanner.objects.create(alt="Nguồn lực Hợp Lực")
            self.stdout.write(self.style.SUCCESS("Created resources banner"))

        # Human Resources (singleton)
        if not HumanResources.objects.exists():
            HumanResources.objects.create(
                title="NGUỒN NHÂN LỰC",
                description=(
                    "Ở Hợp Lực, chúng tôi tin rằng nhân lực là yếu tố cốt lõi, quyết định sự thành bại "
                    "của mỗi doanh nghiệp. Với nguồn nhân lực dồi dào và chuyên môn vững chắc, sự tin tưởng "
                    "tuyệt đối từ khách hàng vừa là thách thức, vừa là động lực để đội ngũ nhân sự của "
                    "Hợp Lực không ngừng trau dồi, học hỏi và sáng tạo, nhằm thích ứng kịp thời với "
                    "những biến đổi của thị trường hiện nay."
                ),
                total_staff=">1500",
            )
            self.stdout.write(self.style.SUCCESS("Created human resources section"))

        # Staff Breakdown
        if not StaffBreakdown.objects.exists():
            for i, data in enumerate([
                {"role": "Giám đốc dự án", "count": 35},
                {"role": "Nhân viên Thiết kế", "count": 80},
                {"role": "Nhân viên Văn phòng", "count": 400},
                {"role": "Kỹ sư & Giám sát", "count": 985},
                {"role": "Công nhân", "count": 15000},
            ]):
                StaffBreakdown.objects.create(**data, order=i)
            self.stdout.write(self.style.SUCCESS("Created 5 staff breakdown items"))

        # Management System (singleton)
        if not ManagementSystem.objects.exists():
            ManagementSystem.objects.create(
                title="HỆ THỐNG QUẢN LÝ",
                description=(
                    "Chất lượng luôn được xem là yếu tố làm tăng khả năng cạnh tranh cho doanh nghiệp. "
                    "Nhận thức rõ tầm quan trọng này, Hợp Lực không ngừng cải tiến và áp dụng những "
                    "quy chuẩn, hệ thống quản lý tiên tiến nhất, nhằm đáp ứng tối đa yêu cầu khắt khe "
                    "từ khách hàng và tăng cường sức mạnh nội tại của công ty. Các hệ thống quản lý nổi bật "
                    "mà Hợp Lực triển khai có thể kể đến như: hệ thống quản lý chất lượng ISO 9001:2015, "
                    "hệ thống quản lý môi trường ISO 14001:2015 và hệ thống quản lý an toàn sức khoẻ "
                    "nghề nghiệp ISO 45001:2018."
                ),
                slogan=(
                    'Với phương châm "Trao chất lượng, Nhận niềm tin", Hợp Lực luôn đặt sự hài lòng '
                    "của khách hàng làm tôn chỉ cao nhất. Mọi sản phẩm và dịch vụ của chúng tôi đều được "
                    "thực hiện dựa trên hệ thống quản lý hiện đại, ứng dụng nền tảng công nghệ 4.0, "
                    "đảm bảo chuẩn mực chất lượng vượt trội và hiệu quả bền vững."
                ),
            )
            self.stdout.write(self.style.SUCCESS("Created management system section"))

        # Certificates
        if not Certificate.objects.exists():
            for i, data in enumerate([
                {"name": "ISO 14001:2015", "title": "Quản lý môi trường"},
                {"name": "ISO 9001:2015", "title": "Quản lý chất lượng"},
                {"name": "ISO 45001:2018", "title": "Quản lý sức khỏe nghề nghiệp"},
            ]):
                Certificate.objects.create(**data, order=i)
            self.stdout.write(self.style.SUCCESS("Created 3 certificates"))

        # Resource Project Section (singleton)
        if not ResourceProjectSection.objects.exists():
            ResourceProjectSection.objects.create(
                title="Dự án",
                total_projects="500 dự án",
            )
            self.stdout.write(self.style.SUCCESS("Created projects section config"))

        # Resource Projects
        if not ResourceProject.objects.exists():
            projects = [
                ("NHÀ MÁY SẢN XUẤT VĂN PHÒNG PHẨM TẬP ĐOÀN DELI VIỆT NAM", "KCN Đại An mở rộng", "Hải Dương"),
                ("NHÀ MÁY FOXCONN NGHỆ AN", "KCN WHA", "Nghệ An"),
                ("NHÀ XƯỞNG XÂY SẴN VÀ VĂN PHÒNG CHO THUÊ SOILBUILD NGHỆ AN", "KCN WHA", "Nghệ An"),
                ("NHÀ MÁY SOLEX HIGH–TECH INDUSTRIES (VIỆT NAM)", "KCN Bắc Tiền Phong", "Quảng Ninh"),
                ("NHÀ MÁY HW ENERGY", "KCN DEEP C2B", "Hải Phòng"),
                ("NHÀ MÁY LUXSHARE-ICT (NGHỆ AN) 2", "KCN VSIP", "Nghệ An"),
                ("NHÀ MÁY CÔNG TY TNHH CÔNG NGHỆ THÔNG MINH GOERTEK VINA", "KCN Nam Sơn – Hạp Lĩnh", "Bắc Ninh"),
                ("NHÀ MÁY ĐIỆN TỬ BYD (VIỆT NAM)", "KCN Phú Hà", "Phú Thọ"),
                ("NHÀ MÁY DESAY BATTERY VINA", "KCN Song Khê Nội Hoàng", "Bắc Giang"),
                ("NHÀ MÁY INNOVATION PRECISION VIỆT NAM", "KCN VSIP", "Nghệ An"),
                ("NHÀ MÁY COT VIỆT NAM", "KCN Thăng Long 2", "Hưng Yên"),
                ("NHÀ MÁY SUNNY AUTOMOTIVE QUANG HỌC VIỆT NAM", "KCN WHA", "Nghệ An"),
                ("NHÀ MÁY SẢN XUẤT LINH KIỆN ĐIỆN TỬ VÀ PHỤ TÙNG Ô TÔ JUTENG", "KCN Hoàng Mai I", "Nghệ An"),
                ("SLP BẮC NINH LOGISTIC", "KCN Thuận Thành II", "Bắc Ninh"),
                ("NHÀ MÁY SÔNG HỒNG - XUÂN TRƯỜNG II", "Huyện Xuân Trường", "Nam Định"),
                ("NHÀ MÁY SẢN XUẤT, LẮP RÁP Ô TÔ VIỆT NHẬT", "Cụm CN Tân Tiến", "Hưng Yên"),
                ("NHÀ MÁY SẢN XUẤT MDF MEKONG", "KCN Cẩm Khê", "Phú Thọ"),
                ("NHÀ MÁY CÔNG NGHIỆP CHÍNH XÁC GOERTEK VINA", "KCN WHA Industrial Zone 1", "Nghệ An"),
                ("NHÀ MÁY DBG TECHNOLOGY VIỆT NAM", "KCN Yên Bình", "Thái Nguyên"),
                ("NHÀ MÁY LUXSHARE-ICT (NGHỆ AN)", "KCN VSIP", "Nghệ An"),
                ("NHÀ MÁY KHOA HỌC KỸ THUẬT KIM LOẠI TÂN VIỆT", "KCN WHA", "Nghệ An"),
                ("NHÀ MÁY CAYI TECHNOLOGY VIỆT NAM", "KCN Yên Phong II-C", "Bắc Ninh"),
                ("NHÀ MÁY BE BRIGHT", "KCN Tiền Hải", "Thái Bình"),
                ("KHU NHÀ Ở CÁN BỘ, CÔNG NHÂN NHIỆT ĐIỆN VŨNG ÁNG 2", "Khu kinh tế Vũng Áng", "Hà Tĩnh"),
            ]
            for i, (name, location, province) in enumerate(projects):
                ResourceProject.objects.create(name=name, location=location, province=province, order=i)
            self.stdout.write(self.style.SUCCESS(f"Created {len(projects)} resource projects"))

        self.stdout.write(self.style.SUCCESS("Resources seed complete! Upload images via Django Admin."))
