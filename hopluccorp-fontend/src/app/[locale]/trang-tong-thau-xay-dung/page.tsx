import BusinessFieldContent from '@/components/pages/BusinessFieldContent';
import {
  constructionBanner,
  constructionGallery,
  constructionIntro,
  constructionServices,
} from '@/lib/data/constructionpage';

export default function ConstructionPage() {
  return (
    <BusinessFieldContent
      fieldSlug="tong-thau-xay-dung"
      activeId="construction"
      fallback={{
        bannerImage: constructionBanner.image,
        bannerAlt: 'Tổng thầu xây dựng',
        intro: constructionIntro,
        services: constructionServices,
        gallery: constructionGallery,
      }}
    />
  );
}
