import type { Metadata } from 'next';
import ProjectsContent from '@/components/pages/ProjectsContent';
import { getPageSEO } from '@/lib/api';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getPageSEO('projects', locale);

  const title = seo?.title || 'Dự án - Hợp Lực Corp';
  const description = seo?.description || 'Các dự án tiêu biểu của Hợp Lực Corp';

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

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  return <ProjectsContent locale={locale} />;
}
