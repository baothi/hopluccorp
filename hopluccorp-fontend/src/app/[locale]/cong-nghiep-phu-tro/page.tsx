import BusinessFieldContent from '@/components/pages/BusinessFieldContent';

const supportingImage = 'https://hopluccorp.vn/wp-content/uploads/2025/09/cong-nghiep-phu-tro.png';

export default function SupportingIndustryPage() {
  return (
    <BusinessFieldContent
      fieldSlug="cong-nghiep-phu-tro"
      activeId="supporting"
      fallback={{
        bannerImage: supportingImage,
        bannerAlt: 'Công nghiệp phụ trợ',
        intro: {
          title: 'Công nghiệp phụ trợ',
          description: 'Gia công cơ khí, sản xuất kết cấu thép và cung cấp giải pháp công nghiệp phụ trợ.',
          image: supportingImage,
        },
        services: [
          {
            id: 1,
            icon: '/images/placeholder.svg',
            title: 'Kết cấu thép',
            description: 'Sản xuất và lắp đặt kết cấu thép cho nhà xưởng, nhà máy.',
          },
          {
            id: 2,
            icon: '/images/placeholder.svg',
            title: 'Gia công cơ khí',
            description: 'Gia công chi tiết cơ khí chính xác cho các dự án sản xuất.',
          },
        ],
        gallery: [supportingImage],
      }}
    />
  );
}
