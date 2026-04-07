import type { Metadata } from 'next';
import HomepageContent from '@/components/pages/HomepageContent';
import { getPageSEO } from '@/lib/api';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('homepage', locale);

  const title = seo?.title || 'Hợp Lực - Phát triển bền vững là kim chỉ nam cho mọi hoạt động';
  const description = seo?.description || 'Công ty cổ phần Xây dựng Hợp Lực - Tổng thầu EPC hàng đầu Việt Nam';

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

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  return <HomepageContent locale={locale} />;
}
