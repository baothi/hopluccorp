import type { Metadata } from 'next';
import AboutContent from '@/components/pages/AboutContent';
import { getPageSEO } from '@/lib/api';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('about', locale);

  const title = seo?.title || 'Giới thiệu - Hợp Lực Corp';
  const description = seo?.description || 'Tìm hiểu về Hợp Lực - Tổng thầu EPC hàng đầu Việt Nam';

  return {
    title,
    description,
    keywords: seo?.keywords || '',
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

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  return <AboutContent locale={locale} />;
}
