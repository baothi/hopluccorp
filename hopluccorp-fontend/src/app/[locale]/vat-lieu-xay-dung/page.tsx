import BusinessFieldContent from '@/components/pages/BusinessFieldContent';

const materialsImage = 'https://hopluccorp.vn/wp-content/uploads/2025/09/vat-lieu-xay-dung.png';

export default function MaterialsPage() {
  return (
    <BusinessFieldContent
      fieldSlug="vat-lieu-xay-dung"
      activeId="materials"
      fallback={{
        bannerImage: materialsImage,
        bannerAlt: 'Vật liệu xây dựng',
        intro: {
          title: 'Vật liệu xây dựng',
          description: 'Cung cấp vật liệu xây dựng chất lượng cao cho các công trình công nghiệp và dân dụng.',
          image: materialsImage,
        },
        services: [
          {
            id: 1,
            icon: '/images/placeholder.svg',
            title: 'Tấm Panel',
            description: 'Sản xuất và cung cấp các dòng panel phục vụ công trình công nghiệp.',
          },
          {
            id: 2,
            icon: '/images/placeholder.svg',
            title: 'Vật liệu cách nhiệt',
            description: 'Cung cấp vật liệu cách nhiệt, cách âm cho nhiều loại công trình.',
          },
        ],
        gallery: [materialsImage],
      }}
    />
  );
}
