import type { Metadata } from 'next';
import OrganizationContent from '@/components/pages/OrganizationContent';
import { getPageSEO } from '@/lib/api';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('organization', locale);

  const title = seo?.title || 'Cơ cấu tổ chức - Hợp Lực Corp';
  const description = seo?.description || 'Cơ cấu tổ chức Hợp Lực - Hệ sinh thái 6 công ty, hơn 1500 nhân sự';

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

export default async function OrganizationPage({ params }: Props) {
  const { locale } = await params;
  return <OrganizationContent locale={locale} />;
}
