import type { Metadata } from 'next';
import ResourcesContent from '@/components/pages/ResourcesContent';
import { getPageSEO } from '@/lib/api';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('resources', locale);

  const title = seo?.title || 'Nguồn lực - Hợp Lực Corp';
  const description = seo?.description || 'Nguồn nhân lực, hệ thống quản lý và dự án tiêu biểu của Hợp Lực';

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

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  return <ResourcesContent locale={locale} />;
}
