// ========== PROJECTS PAGE DATA ==========

// Danh mục dự án
export const projectCategories = [
  { id: 'all', name: 'Tất cả', slug: 'tat-ca' },
  { id: 'industrial', name: 'Công nghiệp', slug: 'cong-nghiep' },
  { id: 'civil', name: 'Dân dụng', slug: 'dan-dung' },
  { id: 'infrastructure', name: 'Hạ tầng', slug: 'ha-tang' }
];

// Vị trí dự án
export const projectLocations = [
  'Tất cả',
  'Bắc Giang',
  'Bắc Ninh',
  'Bình Dương',
  'Hà Nam',
  'Hà Nội',
  'Hà Tĩnh',
  'Hải Dương',
  'Hải Phòng',
  'Hưng Yên',
  'Nam Định',
  'Nghệ An',
  'Phú Thọ',
  'Quảng Ninh',
  'Thái Bình',
  'Thái Nguyên',
  'Vĩnh Phúc'
];

// Năm thực hiện
export const projectYears = [
  'Tất cả',
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019'
];

// Tiến độ
export const projectProgress = [
  'Tất cả',
  'Đang thực hiện',
  'Hoàn thành'
];

// Interface dự án
export interface Project {
  id: number;
  name: string;
  slug: string;
  image: string;
  category: string;
  location: string;
  scale: string;
  progress: string;
  year: string;
  status: 'ongoing' | 'completed';
}

// Danh sách dự án
export const projectsList: Project[] = [
  {
    id: 0,
    name: 'NHÀ MÁY LUXSHARE-ICT (NGHỆ AN) 2',
    slug: 'nha-may-luxshare-ict-nghe-an-2',
    image: 'https://hopluccorp.vn/wp-content/uploads/2022/11/Untitled-2-17-1024x683.jpg',
    category: 'industrial',
    location: 'Nghệ An',
    scale: '1,114,060 m²',
    progress: '08/2023 ~ 10/2024\n07/2024 ~ 03/2025',
    year: '2023',
    status: 'ongoing'
  },
  {
    id: 1,
    name: 'NHÀ MÁY SẢN XUẤT VĂN PHÒNG PHẨM TẬP ĐOÀN DELI VIỆT NAM',
    slug: 'nha-may-san-xuat-van-phong-pham-tap-doan-deli-vet-nam',
    image: 'https://hopluccorp.vn/wp-content/uploads/2024/11/z5889312410423_a13d8a5528dc4f5724d3b53121893e24-1024x724.jpg',
    category: 'industrial',
    location: 'Hải Dương',
    scale: '144,152 m²',
    progress: '09/2024 ~ 03/2026',
    year: '2024',
    status: 'ongoing'
  },
  {
    id: 2,
    name: 'NHÀ MÁY FOXCONN NGHỆ AN',
    slug: 'nha-may-foxconn-nghe-an',
    image: 'https://hopluccorp.vn/wp-content/uploads/2024/10/z5644445050844_3bd212211d84d67419677eeeee06180c-1024x576.jpg',
    category: 'industrial',
    location: 'Nghệ An',
    scale: '68,541 m²',
    progress: '06/2024 ~ 12/2024',
    year: '2024',
    status: 'completed'
  },
  {
    id: 3,
    name: 'NHÀ XƯỞNG XÂY SẴN VÀ VĂN PHÒNG CHO THUÊ SOILBUILD NGHỆ AN',
    slug: 'nha-xuong-xay-san-va-van-phong-cho-thue-spectrum-nghe-an',
    image: 'https://hopluccorp.vn/wp-content/uploads/2024/10/06-Nha-xuong-tang-2-truc-dien-ngoai-nhin-vao--1024x576.jpg',
    category: 'industrial',
    location: 'Nghệ An',
    scale: '42,844 m²',
    progress: '07/2024 ~ 02/2025',
    year: '2024',
    status: 'ongoing'
  },
  {
    id: 4,
    name: 'NHÀ MÁY CÔNG TY TNHH CÔNG NGHỆ THÔNG MINH GOERTEK VINA',
    slug: 'nha-may-cong-ty-tnhh-cong-nghe-thong-minh-goertek-vina',
    image: 'https://hopluccorp.vn/wp-content/uploads/2023/10/z4329060482977_a3e6464fa93ce929ee9be74ba5846864-1024x385.jpg',
    category: 'industrial',
    location: 'Bắc Ninh',
    scale: '582,268 m²',
    progress: '05/2023 ~ 05/2025',
    year: '2023',
    status: 'ongoing'
  },
  {
    id: 5,
    name: 'NHÀ MÁY ĐIỆN TỬ BYD (VIỆT NAM)',
    slug: 'nha-may-dien-tu-byd-viet-nam',
    image: 'https://hopluccorp.vn/wp-content/uploads/2022/11/Untitled-2-11-1-1024x588.jpg',
    category: 'industrial',
    location: 'Phú Thọ',
    scale: '388,105 m²',
    progress: '10/2021 ~ 08/2025',
    year: '2021',
    status: 'ongoing'
  },
  {
    id: 6,
    name: 'NHÀ MÁY SOLEX HIGH-TECH INDUSTRIES (VIỆT NAM)',
    slug: 'nha-may-solex-high-tech-industries-viet-nam',
    image: 'https://hopluccorp.vn/wp-content/uploads/2024/10/z5927779287498_d5fd6a3a0dd00fcc8aa22d49f6b6df6e-1024x576.jpg',
    category: 'industrial',
    location: 'Quảng Ninh',
    scale: '46,517 m²',
    progress: '11/2023 ~ 10/2024',
    year: '2023',
    status: 'completed'
  },
  {
    id: 7,
    name: 'NHÀ MÁY DESAY BATTERY VINA',
    slug: 'nha-may-desay-battery-vina',
    image: 'https://hopluccorp.vn/wp-content/uploads/2022/11/59e8854be97e27207e6f-2-1024x682.jpg',
    category: 'industrial',
    location: 'Bắc Giang',
    scale: '27,738 m²',
    progress: '03/2022 ~ 04/2023',
    year: '2022',
    status: 'completed'
  },
  {
    id: 8,
    name: 'NHÀ MÁY INNOVATION PRECISION VIỆT NAM',
    slug: 'nha-may-innovation-precision-viet-nam',
    image: 'https://hopluccorp.vn/wp-content/uploads/2024/07/SHA.NGHE-AN-2-1024x768.jpg',
    category: 'industrial',
    location: 'Nghệ An',
    scale: '94,297 m²',
    progress: '09/2023 ~ 05/2024',
    year: '2023',
    status: 'completed'
  },
  {
    id: 9,
    name: 'NHÀ MÁY COT VIỆT NAM',
    slug: 'nha-may-cot-viet-nam',
    image: 'https://hopluccorp.vn/wp-content/uploads/2024/07/Ban-sao-cua-COT-1-1024x576.jpg',
    category: 'industrial',
    location: 'Hưng Yên',
    scale: '82,500 m²',
    progress: '12/2023 ~ 09/2024',
    year: '2023',
    status: 'completed'
  },
  {
    id: 10,
    name: 'NHÀ MÁY SUNNY AUTOMOTIVE QUANG HỌC VIỆT NAM',
    slug: 'nha-may-sunny-automotive-quang-hoc-viet-nam',
    image: 'https://hopluccorp.vn/wp-content/uploads/2024/07/SUNNY-2-1024x576.jpg',
    category: 'industrial',
    location: 'Nghệ An',
    scale: '120,000 m²',
    progress: '01/2024 ~ 12/2024',
    year: '2024',
    status: 'ongoing'
  },
  {
    id: 11,
    name: 'NHÀ MÁY LUXSHARE-ICT (NGHỆ AN)',
    slug: 'nha-may-luxshare-ict-nghe-an',
    image: 'https://hopluccorp.vn/wp-content/uploads/2022/11/Untitled-2-17-1024x683.jpg',
    category: 'industrial',
    location: 'Nghệ An',
    scale: '250,000 m²',
    progress: '2020 ~ 2023',
    year: '2020',
    status: 'completed'
  },
  {
    id: 12,
    name: 'NHÀ MÁY DBG TECHNOLOGY VIỆT NAM',
    slug: 'nha-may-dbg-technology-viet-nam',
    image: 'https://hopluccorp.vn/wp-content/uploads/2022/11/z4129133422135_afc96df2e97b25c3bcef2a5a0c6c8acb-1024x683.jpg',
    category: 'industrial',
    location: 'Thái Nguyên',
    scale: '150,000 m²',
    progress: '2022 ~ 2024',
    year: '2022',
    status: 'completed'
  },
  {
    id: 13,
    name: 'SLP BẮC NINH LOGISTIC',
    slug: 'slp-bac-ninh-logistic',
    image: 'https://hopluccorp.vn/wp-content/uploads/2024/07/SLP-1024x576.jpg',
    category: 'industrial',
    location: 'Bắc Ninh',
    scale: '95,000 m²',
    progress: '2023 ~ 2024',
    year: '2023',
    status: 'completed'
  },
  {
    id: 14,
    name: 'NHÀ MÁY CAYI TECHNOLOGY VIỆT NAM',
    slug: 'nha-may-cayi-technology-viet-nam',
    image: 'https://hopluccorp.vn/wp-content/uploads/2024/07/CAYI-1024x576.jpg',
    category: 'industrial',
    location: 'Bắc Ninh',
    scale: '85,000 m²',
    progress: '2023 ~ 2024',
    year: '2023',
    status: 'completed'
  },
  {
    id: 15,
    name: 'NHÀ MÁY SÔNG HỒNG - XUÂN TRƯỜNG II',
    slug: 'nha-may-song-hong-xuan-truong-ii',
    image: 'https://hopluccorp.vn/wp-content/uploads/2024/07/SONG-HONG-1024x576.jpg',
    category: 'industrial',
    location: 'Nam Định',
    scale: '75,000 m²',
    progress: '2023 ~ 2024',
    year: '2023',
    status: 'completed'
  },
  {
    id: 16,
    name: 'KHU NHÀ Ở CÁN BỘ NHIỆT ĐIỆN VŨNG ÁNG 2',
    slug: 'khu-nha-o-can-bo-nhiet-dien-vung-ang-2',
    image: 'https://hopluccorp.vn/wp-content/uploads/2022/11/z4130282568780_4cd93fcfb0edf89e3e9ade1bcf6ea6ca-1024x683.jpg',
    category: 'civil',
    location: 'Hà Tĩnh',
    scale: '35,000 m²',
    progress: '2022 ~ 2023',
    year: '2022',
    status: 'completed'
  },
  {
    id: 17,
    name: 'NHÀ MÁY SẢN XUẤT MDF MEKONG',
    slug: 'nha-may-san-xuat-mdf-mekong',
    image: 'https://hopluccorp.vn/wp-content/uploads/2022/11/z4129263174058_a2de1c8e09e7ac2e65c1d59ed2e9fa59-1024x768.jpg',
    category: 'industrial',
    location: 'Phú Thọ',
    scale: '65,000 m²',
    progress: '2021 ~ 2022',
    year: '2021',
    status: 'completed'
  },
  {
    id: 18,
    name: 'NHÀ MÁY HW ENERGY',
    slug: 'nha-may-hw-energy',
    image: 'https://hopluccorp.vn/wp-content/uploads/2024/10/z5927779287498_d5fd6a3a0dd00fcc8aa22d49f6b6df6e-1024x576.jpg',
    category: 'industrial',
    location: 'Hải Phòng',
    scale: '55,000 m²',
    progress: '2024 ~ 2025',
    year: '2024',
    status: 'ongoing'
  }
];

// Banner
export const projectsBanner = {
  image: 'https://hopluccorp.vn/wp-content/uploads/2023/03/Du-An1-scaled.jpg'
};
