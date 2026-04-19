import BusinessFieldContent from '@/components/pages/BusinessFieldContent';
import {
  mepBanner,
  mepGallery,
  mepIntro,
  mepServices,
} from '@/lib/data/meppage';

export default function MEPPage() {
  return (
    <BusinessFieldContent
      fieldSlug="tong-thau-co-dien"
      activeId="mep"
      fallback={{
        bannerImage: mepBanner.image,
        bannerAlt: 'Tổng thầu cơ điện',
        intro: mepIntro,
        services: mepServices,
        gallery: mepGallery,
      }}
    />
  );
}
