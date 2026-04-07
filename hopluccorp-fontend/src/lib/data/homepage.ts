import {
  BannerSlide,
  AboutBlock,
  StatItem,
  Category,
  NewsArticle,
  Partner,
  NavigationItem,
  Language
} from '@/types/homepage';

// ========== BANNERS ==========
export const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    image: 'https://hopluccorp.vn/wp-content/uploads/2024/08/Banner-viet.png',
    alt: 'Hợp Lực Banner 1'
  },
  {
    id: 2,
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/11/VNR-04.png',
    alt: 'TOP 50 Vietnam The Best 2025'
  }
];

// ========== ABOUT SECTION ==========
export const aboutBlocks: AboutBlock[] = [
  {
    id: 1,
    title: 'Lịch sử',
    subtitle: 'hình thành',
    image: 'https://hopluccorp.vn/wp-content/uploads/2023/02/z4126696902867_15b0b973a0727dd76400d18ea98cee57.jpg',
    icon: 'https://hopluccorp.vn/wp-content/uploads/2022/10/icon1.png',
    link: '/gioi-thieu#page3'
  },
  {
    id: 2,
    title: 'Tầm nhìn',
    subtitle: 'sứ mệnh',
    image: 'https://hopluccorp.vn/wp-content/uploads/2022/10/Layer-78-1.png',
    icon: 'https://hopluccorp.vn/wp-content/uploads/2022/10/icon2.png',
    link: '/gioi-thieu#page5'
  },
  {
    id: 3,
    title: 'Giá trị',
    subtitle: 'cốt lõi',
    image: 'https://hopluccorp.vn/wp-content/uploads/2023/02/z4126696891812_0b22c9acfb362d4d34454530a25ceb0e.jpg',
    icon: 'https://hopluccorp.vn/wp-content/uploads/2022/10/icon3.png',
    link: '/gioi-thieu#page4'
  }
];

// ========== STATISTICS ==========
export const stats: StatItem[] = [
  {
    id: 1,
    icon: 'https://hopluccorp.vn/wp-content/uploads/2023/02/web-hop-luc-09.png',
    number: 16,
    label: 'Năm hoạt động',
    delay: 0.5
  },
  {
    id: 2,
    icon: 'https://hopluccorp.vn/wp-content/uploads/2023/02/web-hop-luc-10.png',
    number: 200,
    label: 'Dự án',
    delay: 0.7
  },
  {
    id: 3,
    icon: 'https://hopluccorp.vn/wp-content/uploads/2023/02/web-hop-luc-11.png',
    number: 15000,
    label: 'Sản lượng hợp nhất năm 2024',
    delay: 0.9
  },
  {
    id: 4,
    icon: 'https://hopluccorp.vn/wp-content/uploads/2023/02/web-hop-luc-12.png',
    number: 1500,
    label: 'Nhân sự',
    delay: 1.1
  }
];

// ========== CATEGORIES ==========
export const categories: Category[] = [
  {
    id: 1,
    title: 'xây dựng',
    subtitle: 'Tổng thầu',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/09/tong-thau-xay-dung.png',
    link: '/trang-tong-thau-xay-dung'
  },
  {
    id: 2,
    title: 'cơ điện',
    subtitle: 'Tổng thầu',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/09/tong-thau-co-dien.png',
    link: '/trang-tong-thau-co-dien'
  },
  {
    id: 3,
    title: 'nội thất',
    subtitle: 'Hoàn thiện',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/09/hoan-thien-noi-that.png',
    link: '/hoan-thien-noi-that'
  },
  {
    id: 4,
    title: 'xây dựng',
    subtitle: 'Vật liệu',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/09/vat-lieu-xay-dung.png',
    link: '/vat-lieu-xay-dung'
  },
  {
    id: 5,
    title: 'phụ trợ',
    subtitle: 'Công nghiệp',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/09/cong-nghiep-phu-tro.png',
    link: '/cong-nghiep-phu-tro'
  }
];

// ========== NEWS ==========
export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: 'Hợp Lực vinh dự đón Phó Thủ Tướng và Bộ Trưởng Bộ Xây Dựng, Bộ Giáo Dục & Đào Tạo tại gian hàng triển lãm Trường Đại Học Giao Thông Vận Tải',
    excerpt: 'Hợp Lực đón Phó Thủ tướng & Bộ trưởng tại triển lãm GTVT. Hợp Lực vinh dự đón Phó Thủ tướng và Bộ trưởng tại triển lãm GTVT, giới thiệu công nghệ đường sắt, hạ tầng thông minh và giải pháp AI – IoE thuộc hệ sinh thái Hợp Lực.',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/11/581676107_1423275879804209_6194982369161778281_n.jpg',
    link: '/tin-tuc/hop-luc-vinh-du-don-pho-thu-tuong',
    featured: true
  },
  {
    id: 2,
    title: 'Hệ sinh thái Hợp Lực khẳng định vị thế với hai công ty ghi danh top 500 doanh nghiệp lớn nhất Việt Nam 2025',
    excerpt: 'Hệ sinh thái Hợp Lực ghi danh Top 500 Doanh nghiệp lớn nhất Việt Nam 2025. Hai công ty thuộc hệ sinh thái Hợp Lực vào Top 500 Doanh nghiệp lớn nhất Việt Nam 2025, khẳng định uy tín – năng lực – tầm vóc doanh nghiệp hàng đầu ngành xây dựng.',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/11/578961066_1421614496637014_1068712368396805996_n-scaled.jpg',
    link: '/tin-tuc/he-sinh-thai-hop-luc-top-500',
    featured: false
  },
  {
    id: 3,
    title: 'Hợp Lực tham dự Triển lãm & Hội nghị VRT&CONS 2025',
    excerpt: 'Hợp Lực tham dự VRT&CONS 2025 - Triển lãm quốc tế công nghệ đường sắt và hạ tầng, giới thiệu giải pháp xanh, thông minh, công nghệ cao tại Việt Nam.',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/11/580525988_1420641133401017_87799570226200566_n.jpg',
    link: '/tin-tuc/hop-luc-tham-du-vrtcons-2025',
    featured: false
  }
];

// ========== PARTNERS ==========
export const partners: Partner[] = [
  { id: 1, name: 'Partner 1', logo: 'https://hopluccorp.vn/wp-content/uploads/2023/03/LOGO-TRANG-CHU-01.jpg' },
  { id: 2, name: 'Partner 2', logo: 'https://hopluccorp.vn/wp-content/uploads/2023/03/LOGO-TRANG-CHU-02.jpg' },
  { id: 3, name: 'Partner 3', logo: 'https://hopluccorp.vn/wp-content/uploads/2023/03/LOGO-TRANG-CHU-03.jpg' },
  { id: 4, name: 'Partner 4', logo: 'https://hopluccorp.vn/wp-content/uploads/2023/03/LOGO-TRANG-CHU-04.jpg' },
  { id: 5, name: 'Partner 5', logo: 'https://hopluccorp.vn/wp-content/uploads/2023/03/LOGO-TRANG-CHU-05.jpg' },
  { id: 6, name: 'Partner 6', logo: 'https://hopluccorp.vn/wp-content/uploads/2023/03/LOGO-TRANG-CHU-06.jpg' },
  { id: 7, name: 'Partner 7', logo: 'https://hopluccorp.vn/wp-content/uploads/2023/03/LOGO-TRANG-CHU-07.jpg' },
  { id: 8, name: 'Partner 8', logo: 'https://hopluccorp.vn/wp-content/uploads/2023/03/LOGO-TRANG-CHU-08.jpg' },
];

// ========== NAVIGATION ==========
export const navigationItems: NavigationItem[] = [
  { id: 1, label: 'Giới thiệu', href: '/gioi-thieu' },
  { id: 2, label: 'Cơ cấu tổ chức', href: '/co-cau-to-chuc' },
  { id: 3, label: 'Nguồn lực', href: '/nguon-luc' },
  { id: 4, label: 'Dự án', href: '/duan' },
  {
    id: 5,
    label: 'Lĩnh vực hoạt động',
    href: '#',
    children: [
      { id: 51, label: 'Tổng thầu Xây dựng', href: '/trang-tong-thau-xay-dung' },
      { id: 52, label: 'Tổng thầu cơ điện', href: '/trang-tong-thau-co-dien' },
      { id: 53, label: 'Hoàn thiện nội thất', href: '/hoan-thien-noi-that' },
      { id: 54, label: 'Vật liệu xây dựng', href: '/vat-lieu-xay-dung' },
      { id: 55, label: 'Công nghiệp phụ trợ', href: '/cong-nghiep-phu-tro' },
    ]
  },
  { id: 6, label: 'Tin tức', href: '/tin-tuc' },
  { id: 7, label: 'Đối tác', href: '/doi-tac' },
  { id: 8, label: 'Thành tựu', href: '/thanh-tuu' },
  { id: 9, label: 'Tuyển dụng', href: '/tuyen-dung' },
  { id: 10, label: 'Liên hệ', href: '/trang-lien-he' },
];

// ========== LANGUAGES ==========
export const languages: Language[] = [
  { code: 'vi', label: 'VIE', flag: 'https://hopluccorp.vn/wp-content/themes/theme/dist/images/vi.png' },
  { code: 'en', label: 'EN', flag: 'https://hopluccorp.vn/wp-content/themes/theme/dist/images/en.png' },
  { code: 'zh', label: 'CN', flag: 'https://hopluccorp.vn/wp-content/themes/theme/dist/images/zh.png' },
  { code: 'ko', label: 'KR', flag: 'https://hopluccorp.vn/wp-content/uploads/2025/11/ko.png' },
];

// ========== LOGOS & ASSETS ==========
export const logos = {
  header: 'https://hopluccorp.vn/wp-content/uploads/2025/09/logo-hl.png',
  footer: 'https://hopluccorp.vn/wp-content/uploads/2025/04/Asset-1-02-e1744971127642.png',
  favicon: 'https://hopluccorp.vn/wp-content/uploads/2025/04/Hop-Luc@2x-1-e1744971739402.png',
  qrCode: 'https://hopluccorp.vn/wp-content/uploads/2022/11/MA-QR-GONGZHONGHAO.jpg'
};

// ========== BACKGROUND IMAGES ==========
export const backgroundImages = {
  stats: 'https://hopluccorp.vn/wp-content/themes/theme/dist/images/bg-number.png',
  footer: 'https://hopluccorp.vn/wp-content/themes/theme/dist/images/bg-footer.png',
  video: 'https://hopluccorp.vn/wp-content/uploads/2024/04/Untitled-3ssss-01-02.jpg',
  statsImage: 'https://hopluccorp.vn/wp-content/uploads/2023/03/HopL77777uc_16-1.png'
};

// ========== VIDEO ==========
export const videoData = {
  thumbnail: 'https://hopluccorp.vn/wp-content/uploads/2024/04/Untitled-3ssss-01-02.jpg',
  youtubeId: 'Cc2oTROOqqg',
  title: 'VIDEO NỔI BẬT',
  subtitle: 'CLIP TỔNG KẾT NĂM 2024 CỦA HỆ SINH THÁI HỢP LỰC'
};

// ========== CONTACT INFO ==========
export const contactInfo = {
  address: 'Tầng 10 Tòa nhà Lotus Building, số 2 P. Duy Tân, P. Cầu Giấy, TP. Hà Nội, Việt Nam',
  addressHCM: '290/22 Nam Kỳ Khởi Nghĩa, P. Xuân Hòa, TP. Hồ Chí Minh',
  phone: '(+84) 3795 7658',
  email: 'contact@hopluccorp.vn',
  facebook: 'https://www.facebook.com/hopluccorp.vn',
  youtube: 'https://www.youtube.com/channel/UCzHlh6lHzszauNw0UCU-Ypw?view_as=subscriber',
  linkedin: 'https://www.linkedin.com/company/hop-luc-construction-joint-stock-company/'
};
