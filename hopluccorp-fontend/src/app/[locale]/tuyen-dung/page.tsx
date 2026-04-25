import type { Metadata } from 'next';
import CareersContent from '@/components/pages/CareersContent';
import { getPageSEO } from '@/lib/api';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('careers', locale);

  const title = seo?.title || 'Tuyển dụng - Hợp Lực Corp';
  const description =
    seo?.description ||
    'Cơ hội nghề nghiệp tại Tập đoàn Hợp Lực — môi trường làm việc chuyên nghiệp, lương thưởng cạnh tranh, lộ trình thăng tiến rõ ràng.';

  return {
    title,
    description,
    keywords: seo?.keywords || 'tuyển dụng, việc làm, kỹ sư xây dựng, Hợp Lực, careers',
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

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  return <CareersContent locale={locale} />;
}
