import type { Metadata } from 'next';
import ContactContent from '@/components/pages/ContactContent';
import { getPageSEO } from '@/lib/api';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('contact', locale);

  const title = seo?.title || 'Liên hệ - Hợp Lực Corp';
  const description = seo?.description || 'Thông tin liên hệ Công ty Cổ phần Xây dựng Hợp Lực';

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

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  return <ContactContent locale={locale} />;
}
