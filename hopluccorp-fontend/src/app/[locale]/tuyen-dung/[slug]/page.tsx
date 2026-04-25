import type { Metadata } from 'next';
import JobDetailContent from '@/components/pages/JobDetailContent';
import axiosInstance from '@/lib/axios';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  const LOCALE_MAP: Record<string, string> = {
    vi: 'vi', en: 'en', zh: 'zh-hans', ko: 'ko',
  };
  const lang = LOCALE_MAP[locale] || 'vi';

  let title = 'Tuyển dụng - Hợp Lực Corp';
  let description = 'Chi tiết vị trí tuyển dụng tại Tập đoàn Hợp Lực.';

  try {
    const res = await axiosInstance.get(`/api/pages/careers/${slug}/?lang=${lang}`);
    const job = res.data?.job;
    if (job) {
      title = `${job.title} - Hợp Lực Corp`;
      description = `${job.company?.name || 'Hợp Lực'} · ${job.location_display || job.province || ''} · ${job.quantity} vị trí`;
    }
  } catch {
    // fallback title/description
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : locale,
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  return <JobDetailContent locale={locale} slug={slug} />;
}
