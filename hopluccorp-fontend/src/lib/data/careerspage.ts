/**
 * Fallback data for Careers page (used when API is unavailable or returns empty).
 */

export const careersBanner = '/images/banners/tuyen-dung.jpg';

export const careersCultureVideo = 'https://www.youtube.com/embed/dQw4w9WgXcQ';

export const careersCulturePhotos = [
  '/images/culture/culture-1.jpg',
  '/images/culture/culture-2.jpg',
  '/images/culture/culture-3.jpg',
  '/images/culture/culture-4.jpg',
];

export const workBenefits = [
  {
    id: 1,
    icon_type: 'text' as const,
    icon_text: '14+',
    title: 'Năm kinh nghiệm',
    description:
      'Hơn 14 năm hoạt động trong ngành xây dựng, chúng tôi mang đến môi trường làm việc chuyên nghiệp và ổn định.',
  },
  {
    id: 2,
    icon_type: 'text' as const,
    icon_text: '💰',
    title: 'Lương thưởng cạnh tranh',
    description:
      'Mức lương hấp dẫn, thưởng hiệu quả công việc, đánh giá tăng lương định kỳ và đầy đủ chế độ BHXH, BHYT.',
  },
  {
    id: 3,
    icon_type: 'text' as const,
    icon_text: '📈',
    title: 'Lộ trình thăng tiến rõ ràng',
    description:
      'Chúng tôi đầu tư vào sự phát triển của từng cá nhân với lộ trình thăng tiến minh bạch và các cơ hội đào tạo liên tục.',
  },
];

export const fallbackCompanies = [
  { id: 1, name: 'Tập đoàn Hợp Lực', slug: 'hop-luc-corp', logo: null },
  { id: 2, name: 'Hợp Lực Xây Dựng', slug: 'hop-luc-xay-dung', logo: null },
  { id: 3, name: 'Hợp Lực Nội Thất', slug: 'hop-luc-noi-that', logo: null },
  { id: 4, name: 'Hợp Lực M&E', slug: 'hop-luc-mep', logo: null },
];

export const fallbackProvinces = ['Hà Nội', 'TP. Hồ Chí Minh'];

export const fallbackJobs = [
  {
    id: 1,
    title: 'Kỹ sư Kết cấu',
    slug: 'ky-su-ket-cau',
    quantity: 3,
    province: 'Hà Nội',
    location_display: 'Hà Nội — Văn phòng Hợp Lực Xây Dựng',
    level: 'Kỹ sư / Chuyên viên',
    industry: 'Xây dựng — Kết cấu',
    company: { id: 2, name: 'Hợp Lực Xây Dựng', slug: 'hop-luc-xay-dung', logo: null },
    published_at: '2025-04-01',
  },
  {
    id: 2,
    title: 'Kỹ sư Cơ Điện (M&E)',
    slug: 'ky-su-co-dien-mep',
    quantity: 2,
    province: 'Hà Nội',
    location_display: 'Hà Nội — Văn phòng Hợp Lực M&E',
    level: 'Kỹ sư / Chuyên viên',
    industry: 'Cơ điện — M&E',
    company: { id: 4, name: 'Hợp Lực M&E', slug: 'hop-luc-mep', logo: null },
    published_at: '2025-04-05',
  },
  {
    id: 3,
    title: 'Kỹ sư Xây dựng (Giám sát công trình)',
    slug: 'ky-su-xay-dung-giam-sat',
    quantity: 4,
    province: 'TP. Hồ Chí Minh',
    location_display: 'TP. Hồ Chí Minh — Công trường khu vực miền Nam',
    level: 'Kỹ sư / Giám sát',
    industry: 'Xây dựng — Giám sát',
    company: { id: 2, name: 'Hợp Lực Xây Dựng', slug: 'hop-luc-xay-dung', logo: null },
    published_at: '2025-04-08',
  },
  {
    id: 4,
    title: 'Kiến trúc sư / Thiết kế Nội thất',
    slug: 'kien-truc-su-thiet-ke-noi-that',
    quantity: 2,
    province: 'Hà Nội',
    location_display: 'Hà Nội — Văn phòng Hợp Lực Nội Thất',
    level: 'Kiến trúc sư / Chuyên viên thiết kế',
    industry: 'Kiến trúc — Nội thất',
    company: { id: 3, name: 'Hợp Lực Nội Thất', slug: 'hop-luc-noi-that', logo: null },
    published_at: '2025-03-25',
  },
  {
    id: 5,
    title: 'Kế toán Tổng hợp',
    slug: 'ke-toan-tong-hop',
    quantity: 2,
    province: 'Hà Nội',
    location_display: 'Hà Nội — Trụ sở Tập đoàn Hợp Lực',
    level: 'Chuyên viên / Kế toán',
    industry: 'Tài chính — Kế toán',
    company: { id: 1, name: 'Tập đoàn Hợp Lực', slug: 'hop-luc-corp', logo: null },
    published_at: '2025-03-20',
  },
  {
    id: 6,
    title: 'Kỹ sư Dự toán Xây dựng',
    slug: 'ky-su-du-toan-xay-dung',
    quantity: 3,
    province: 'TP. Hồ Chí Minh',
    location_display: 'TP. Hồ Chí Minh / Hà Nội — Văn phòng Hợp Lực Xây Dựng',
    level: 'Kỹ sư / Chuyên viên',
    industry: 'Xây dựng — Dự toán',
    company: { id: 2, name: 'Hợp Lực Xây Dựng', slug: 'hop-luc-xay-dung', logo: null },
    published_at: '2025-04-10',
  },
];
