import type { Metadata } from 'next';
import AchievementsContent from '@/components/pages/AchievementsContent';
import { getPageSEO } from '@/lib/api';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('achievements', locale);

  const title = seo?.title || 'Thành tựu - Hợp Lực Corp';
  const description =
    seo?.description ||
    'Những giải thưởng và thành tựu nổi bật của Hợp Lực — Top 500 doanh nghiệp lớn nhất Việt Nam, ISO 9001, ISO 14001, ISO 45001.';

  return {
    title,
    description,
    keywords: seo?.keywords || 'thành tựu, giải thưởng, chứng chỉ ISO, Hợp Lực, VNR500',
    openGraph: {
      title,
      description,
      images: seo?.og_image ? [seo.og_image] : [],
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : locale,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: seo?.og_image ? [seo.og_image] : [],
    },
  };
}

export default async function AchievementsPage({ params }: Props) {
  const { locale } = await params;
  return <AchievementsContent locale={locale} />;
}
