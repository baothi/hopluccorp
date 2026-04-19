import BusinessFieldContent from '@/components/pages/BusinessFieldContent';
import {
  interiorBanner,
  interiorGallery,
  interiorIntro,
  interiorServices,
} from '@/lib/data/interiorpage';

export default function InteriorPage() {
  return (
    <BusinessFieldContent
      fieldSlug="hoan-thien-noi-that"
      activeId="interior"
      fallback={{
        bannerImage: interiorBanner.image,
        bannerAlt: 'Hoàn thiện nội thất',
        intro: interiorIntro,
        services: interiorServices,
        gallery: interiorGallery,
      }}
    />
  );
}
