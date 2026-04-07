// ========== RESOURCES PAGE DATA ==========

// Nguồn nhân lực
export const humanResources = {
  title: 'NGUỒN NHÂN LỰC',
  description: 'Ở Hợp Lực, chúng tôi tin rằng nhân lực là yếu tố cốt lõi, quyết định sự thành bại của mỗi doanh nghiệp. Với nguồn nhân lực dồi dào và chuyên môn vững chắc, sự tin tưởng tuyệt đối từ khách hàng vừa là thách thức, vừa là động lực để đội ngũ nhân sự của Hợp Lực không ngừng trau dồi, học hỏi và sáng tạo, nhằm thích ứng kịp thời với những biến đổi của thị trường hiện nay.',
  image: 'https://hopluccorp.vn/wp-content/uploads/2023/02/z4128167607787_144f133e202186a3de2067f1e20ddf1b.jpg',
  totalStaff: '>1500',
  staffBreakdown: [
    { role: 'Giám đốc dự án', count: 35 },
    { role: 'Nhân viên Thiết kế', count: 80 },
    { role: 'Nhân viên Văn phòng', count: 400 },
    { role: 'Kỹ sư & Giám sát', count: 985 },
    { role: 'Công nhân', count: 15000 }
  ]
};

// Dự án
export const projectsSection = {
  title: 'Dự án',
  totalProjects: '500 dự án',
  backgroundImage: 'https://hopluccorp.vn/wp-content/uploads/2023/03/z4197349882031_fc3cc9a371424280c39ea59bb77e883f-scaled.jpg'
};

// Danh sách dự án tiêu biểu
export interface Project {
  id: number;
  name: string;
  location: string;
  province: string;
}

export const featuredProjects: Project[] = [
  {
    id: 1,
    name: 'NHÀ MÁY SẢN XUẤT VĂN PHÒNG PHẨM TẬP ĐOÀN DELI VIỆT NAM',
    location: 'KCN Đại An mở rộng',
    province: 'Hải Dương'
  },
  {
    id: 2,
    name: 'NHÀ MÁY FOXCONN NGHỆ AN',
    location: 'KCN WHA',
    province: 'Nghệ An'
  },
  {
    id: 3,
    name: 'NHÀ XƯỞNG XÂY SẴN VÀ VĂN PHÒNG CHO THUÊ SOILBUILD NGHỆ AN',
    location: 'KCN WHA',
    province: 'Nghệ An'
  },
  {
    id: 4,
    name: 'NHÀ MÁY SOLEX HIGH–TECH INDUSTRIES (VIỆT NAM)',
    location: 'KCN Bắc Tiền Phong',
    province: 'Quảng Ninh'
  },
  {
    id: 5,
    name: 'NHÀ MÁY HW ENERGY',
    location: 'KCN DEEP C2B',
    province: 'Hải Phòng'
  },
  {
    id: 6,
    name: 'NHÀ MÁY LUXSHARE-ICT (NGHỆ AN) 2',
    location: 'KCN VSIP',
    province: 'Nghệ An'
  },
  {
    id: 7,
    name: 'NHÀ MÁY CÔNG TY TNHH CÔNG NGHỆ THÔNG MINH GOERTEK VINA',
    location: 'KCN Nam Sơn – Hạp Lĩnh',
    province: 'Bắc Ninh'
  },
  {
    id: 8,
    name: 'NHÀ MÁY ĐIỆN TỬ BYD (VIỆT NAM)',
    location: 'KCN Phú Hà',
    province: 'Phú Thọ'
  },
  {
    id: 9,
    name: 'NHÀ MÁY DESAY BATTERY VINA',
    location: 'KCN Song Khê Nội Hoàng',
    province: 'Bắc Giang'
  },
  {
    id: 10,
    name: 'NHÀ MÁY INNOVATION PRECISION VIỆT NAM',
    location: 'KCN VSIP',
    province: 'Nghệ An'
  },
  {
    id: 11,
    name: 'NHÀ MÁY COT VIỆT NAM',
    location: 'KCN Thăng Long 2',
    province: 'Hưng Yên'
  },
  {
    id: 12,
    name: 'NHÀ MÁY SUNNY AUTOMOTIVE QUANG HỌC VIỆT NAM',
    location: 'KCN WHA',
    province: 'Nghệ An'
  },
  {
    id: 13,
    name: 'NHÀ MÁY SẢN XUẤT LINH KIỆN ĐIỆN TỬ VÀ PHỤ TÙNG Ô TÔ JUTENG',
    location: 'KCN Hoàng Mai I',
    province: 'Nghệ An'
  },
  {
    id: 14,
    name: 'SLP BẮC NINH LOGISTIC',
    location: 'KCN Thuận Thành II',
    province: 'Bắc Ninh'
  },
  {
    id: 15,
    name: 'NHÀ MÁY SÔNG HỒNG - XUÂN TRƯỜNG II',
    location: 'Huyện Xuân Trường',
    province: 'Nam Định'
  },
  {
    id: 16,
    name: 'NHÀ MÁY SẢN XUẤT, LẮP RÁP Ô TÔ VIỆT NHẬT',
    location: 'Cụm CN Tân Tiến',
    province: 'Hưng Yên'
  },
  {
    id: 17,
    name: 'NHÀ MÁY SẢN XUẤT MDF MEKONG',
    location: 'KCN Cẩm Khê',
    province: 'Phú Thọ'
  },
  {
    id: 18,
    name: 'NHÀ MÁY CÔNG NGHIỆP CHÍNH XÁC GOERTEK VINA',
    location: 'KCN WHA Industrial Zone 1',
    province: 'Nghệ An'
  },
  {
    id: 19,
    name: 'NHÀ MÁY DBG TECHNOLOGY VIỆT NAM',
    location: 'KCN Yên Bình',
    province: 'Thái Nguyên'
  },
  {
    id: 20,
    name: 'NHÀ MÁY LUXSHARE-ICT (NGHỆ AN)',
    location: 'KCN VSIP',
    province: 'Nghệ An'
  },
  {
    id: 21,
    name: 'NHÀ MÁY KHOA HỌC KỸ THUẬT KIM LOẠI TÂN VIỆT',
    location: 'KCN WHA',
    province: 'Nghệ An'
  },
  {
    id: 22,
    name: 'NHÀ MÁY CAYI TECHNOLOGY VIỆT NAM',
    location: 'KCN Yên Phong II-C',
    province: 'Bắc Ninh'
  },
  {
    id: 23,
    name: 'NHÀ MÁY BE BRIGHT',
    location: 'KCN Tiền Hải',
    province: 'Thái Bình'
  },
  {
    id: 24,
    name: 'KHU NHÀ Ở CÁN BỘ, CÔNG NHÂN NHIỆT ĐIỆN VŨNG ÁNG 2',
    location: 'Khu kinh tế Vũng Áng',
    province: 'Hà Tĩnh'
  }
];

// Danh sách tỉnh thành có dự án
export const provinces = [
  'Tất cả',
  'Nghệ An',
  'Bắc Ninh',
  'Hưng Yên',
  'Bắc Giang',
  'Hải Dương',
  'Hải Phòng',
  'Quảng Ninh',
  'Phú Thọ',
  'Thái Nguyên',
  'Nam Định',
  'Thái Bình',
  'Hà Tĩnh'
];

// Hệ thống quản lý
export const managementSystem = {
  title: 'HỆ THỐNG QUẢN LÝ',
  description: 'Chất lượng luôn được xem là yếu tố làm tăng khả năng cạnh tranh cho doanh nghiệp. Nhận thức rõ tầm quan trọng này, Hợp Lực không ngừng cải tiến và áp dụng những quy chuẩn, hệ thống quản lý tiên tiến nhất, nhằm đáp ứng tối đa yêu cầu khắt khe từ khách hàng và tăng cường sức mạnh nội tại của công ty. Các hệ thống quản lý nổi bật mà Hợp Lực triển khai có thể kể đến như: hệ thống quản lý chất lượng ISO 9001:2015, hệ thống quản lý môi trường ISO 14001:2015 và hệ thống quản lý an toàn sức khoẻ nghề nghiệp ISO 45001:2018.',
  slogan: 'Với phương châm "Trao chất lượng, Nhận niềm tin", Hợp Lực luôn đặt sự hài lòng của khách hàng làm tôn chỉ cao nhất. Mọi sản phẩm và dịch vụ của chúng tôi đều được thực hiện dựa trên hệ thống quản lý hiện đại, ứng dụng nền tảng công nghệ 4.0, đảm bảo chuẩn mực chất lượng vượt trội và hiệu quả bền vững.',
  certificates: [
    {
      id: 1,
      name: 'ISO 14001:2015',
      title: 'Quản lý môi trường',
      image: 'https://hopluccorp.vn/wp-content/uploads/2025/06/Quan-ly-moi-truong_page-0001-scaled.jpg'
    },
    {
      id: 2,
      name: 'ISO 9001:2015',
      title: 'Quản lý chất lượng',
      image: 'https://hopluccorp.vn/wp-content/uploads/2025/06/Quan-ly-chat-luong_page-0001-scaled.jpg'
    },
    {
      id: 3,
      name: 'ISO 45001:2018',
      title: 'Quản lý sức khỏe nghề nghiệp',
      image: 'https://hopluccorp.vn/wp-content/uploads/2025/06/Quan-ly-suc-khoe-nghe-nghiep_page-0001-scaled.jpg'
    }
  ]
};

// Banner
export const resourcesBanner = {
  image: 'https://hopluccorp.vn/wp-content/uploads/2023/03/z4184116586495_c6381bfd0508f8f0d609b3ea0ab891f2-1-scaled.jpg'
};
