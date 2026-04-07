import type { Metadata } from 'next';
import NewsContent from '@/components/pages/NewsContent';
import { getPageSEO } from '@/lib/api';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('news', locale);

  const title = seo?.title || 'Tin tức - Hợp Lực Corp';
  const description = seo?.description || 'Tin tức mới nhất từ Hợp Lực Corp';

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

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  return <NewsContent locale={locale} />;
}
