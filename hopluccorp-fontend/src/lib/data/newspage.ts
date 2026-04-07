// ========== NEWS PAGE DATA ==========

// Tabs danh mục tin tức
export const newsCategories = [
  {
    id: 'all',
    name: 'Tất cả',
    slug: 'tin-tuc',
    active: true
  },
  {
    id: 'internal',
    name: 'Nội san',
    slug: 'tin-tuc/noi-san',
    active: false
  },
  {
    id: 'company',
    name: 'Tin tức doanh nghiệp',
    slug: 'tin-tuc/tin-tuc-doanh-nghiep',
    active: false
  },
  {
    id: 'project',
    name: 'Tin tức dự án',
    slug: 'tin-tuc/tin-tuc-du-an',
    active: false
  }
];

// Danh sách tin tức
export const newsItems = [
  {
    id: 1,
    title: 'Hợp Lực vinh dự đón Phó Thủ Tướng và Bộ Trưởng Bộ Xây Dựng, Bộ Giáo Dục & Đào Tạo tại gian hàng triển lãm Trường Đại Học Giao Thông Vận Tải',
    slug: 'hop-luc-vinh-du-don-pho-thu-tuong',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/11/581676107_1423275879804209_6194982369161778281_n.jpg',
    category: 'company',
    date: '2025-11-20',
    excerpt: 'Hợp Lực vinh dự đón Phó Thủ Tướng và các Bộ Trưởng tại gian hàng triển lãm...'
  },
  {
    id: 2,
    title: 'Hệ sinh thái Hợp Lực khẳng định vị thế với hai công ty ghi danh top 500 doanh nghiệp lớn nhất Việt Nam 2025',
    slug: 'he-sinh-thai-hop-luc-top-500',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/11/578961066_1421614496637014_1068712368396805996_n-scaled.jpg',
    category: 'company',
    date: '2025-11-18',
    excerpt: 'Hai công ty trong hệ sinh thái Hợp Lực đã ghi danh top 500 doanh nghiệp lớn nhất Việt Nam...'
  },
  {
    id: 3,
    title: 'Hợp Lực tham dự Triển lãm & Hội nghị VRT&CONS 2025',
    slug: 'hop-luc-tham-du-vrtcons-2025',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/11/580525988_1420641133401017_87799570226200566_n.jpg',
    category: 'company',
    date: '2025-11-15',
    excerpt: 'Hợp Lực tham dự Triển lãm & Hội nghị VRT&CONS 2025...'
  },
  {
    id: 4,
    title: 'Hợp Lực ký kết và khởi công gói thầu xây dựng – lắp đặt thiết bị giai đoạn 1 dự án tổng trạm An Khánh (data center)',
    slug: 'hop-luc-khoi-cong-data-center-an-khanh',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/10/561351110_1404989371632860_4363488763888569511_n.jpg',
    category: 'project',
    date: '2025-10-25',
    excerpt: 'Dấu mốc mới trong lĩnh vực hạ tầng công nghệ cao...'
  },
  {
    id: 5,
    title: 'Giọt Máu Hồng 2025 – Hợp Lực Lan Tỏa Hành Trình Nhân Ái Tại Hà Nội',
    slug: 'giot-mau-hong-2025',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/10/558159510_1103063515338322_8721221127502661801_n.jpg',
    category: 'internal',
    date: '2025-10-20',
    excerpt: 'Hợp Lực lan tỏa hành trình nhân ái tại Hà Nội...'
  },
  {
    id: 6,
    title: 'Hợp Lực tổ chức Hội nghị Tổng kết năm 2024',
    slug: 'hoi-nghi-tong-ket-2024',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/09/WEB-HL-09.png',
    category: 'company',
    date: '2025-01-15',
    excerpt: 'Nhìn lại một năm thành công với nhiều dự án lớn...'
  },
  {
    id: 7,
    title: 'Khởi công dự án nhà máy Luxshare-ICT giai đoạn 2',
    slug: 'khoi-cong-luxshare-ict-giai-doan-2',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/09/WEB-HL-10.png',
    category: 'project',
    date: '2024-12-10',
    excerpt: 'Dự án nhà máy Luxshare-ICT với quy mô hơn 1 triệu m²...'
  },
  {
    id: 8,
    title: 'Hợp Lực đón nhận giải thưởng Top 10 nhà thầu xây dựng uy tín',
    slug: 'top-10-nha-thau-uy-tin',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/09/WEB-MEP-11.png',
    category: 'company',
    date: '2024-11-20',
    excerpt: 'Vinh dự được công nhận là một trong những nhà thầu xây dựng uy tín hàng đầu...'
  },
  {
    id: 9,
    title: 'Nội san Hợp Lực số 25 - Quý 4/2024',
    slug: 'noi-san-so-25-quy-4-2024',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/09/WEB-CAP-13.png',
    category: 'internal',
    date: '2024-10-01',
    excerpt: 'Những hoạt động nổi bật trong quý 4 năm 2024...'
  },
  {
    id: 10,
    title: 'Lễ ký kết hợp tác chiến lược với đối tác Hàn Quốc',
    slug: 'ky-ket-hop-tac-han-quoc',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/11/580525988_1420641133401017_87799570226200566_n.jpg',
    category: 'company',
    date: '2024-09-15',
    excerpt: 'Mở rộng hợp tác quốc tế với các đối tác Hàn Quốc...'
  },
  {
    id: 11,
    title: 'Hoàn thành dự án nhà máy Goertek Vina giai đoạn 1',
    slug: 'hoan-thanh-goertek-vina-gd1',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/10/561351110_1404989371632860_4363488763888569511_n.jpg',
    category: 'project',
    date: '2024-08-20',
    excerpt: 'Bàn giao thành công dự án nhà máy Goertek Vina...'
  },
  {
    id: 12,
    title: 'Team Building 2024 - Gắn kết & Vươn xa',
    slug: 'team-building-2024',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/10/558159510_1103063515338322_8721221127502661801_n.jpg',
    category: 'internal',
    date: '2024-07-10',
    excerpt: 'Hoạt động team building gắn kết tập thể...'
  }
];

// Banner
export const newsBanner = {
  image: 'https://hopluccorp.vn/wp-content/uploads/2023/03/z4184116522479_0a0ee4baa66b45f096b5d8ed5ed59133-scaled.jpg'
};
