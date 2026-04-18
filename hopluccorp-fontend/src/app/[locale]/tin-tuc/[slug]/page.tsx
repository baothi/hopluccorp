import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getNewsDetail } from '@/lib/api';
import { newsItems } from '@/lib/data/newspage';
import { t } from '@/lib/i18n';
import { safeImg } from '@/lib/utils/safeImg';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

type NewsDetail = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string | null;
  published_at: string | null;
};

const DATE_LOCALES: Record<string, string> = {
  vi: 'vi-VN',
  en: 'en-US',
  zh: 'zh-CN',
  ko: 'ko-KR',
};

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function formatDate(date: string | null, locale: string) {
  if (!date) return '';

  return new Date(date).toLocaleDateString(DATE_LOCALES[locale] || 'vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function getFallbackArticle(slug: string): NewsDetail | null {
  const item = newsItems.find((news) => news.slug === slug);
  if (!item) return null;

  return {
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    content: `<p>${item.excerpt}</p>`,
    image: item.image,
    published_at: item.date,
  };
}

async function loadArticle(slug: string, locale: string): Promise<NewsDetail | null> {
  let article = await getNewsDetail(slug, locale);
  if (!article && locale !== 'vi') {
    article = await getNewsDetail(slug, 'vi');
  }

  if (article) {
    return {
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      image: article.image,
      published_at: article.published_at,
    };
  }

  return getFallbackArticle(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await loadArticle(slug, locale);

  if (!article) {
    return {
      title: t(locale, 'news.detailNotFound'),
    };
  }

  const description = stripHtml(article.excerpt || article.content).slice(0, 160);
  const image = safeImg(article.image);

  return {
    title: `${article.title} - Hợp Lực Corp`,
    description,
    openGraph: {
      title: article.title,
      description,
      images: image ? [image] : [],
      type: 'article',
      locale: locale === 'zh' ? 'zh_CN' : locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const article = await loadArticle(slug, locale);

  if (!article) {
    notFound();
  }

  const image = safeImg(article.image);
  const publishedDate = formatDate(article.published_at, locale);
  const content = article.content || `<p>${article.excerpt || t(locale, 'news.noContent')}</p>`;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="relative pt-[88px]">
        <article>
          <section className="relative bg-gray-950 text-white">
            <div className="absolute inset-0">
              <Image
                src={image}
                alt={article.title}
                fill
                priority
                className="object-cover opacity-45"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/55 to-black/80" />
            </div>

            <div className="container mx-auto px-6 relative z-10 min-h-[420px] flex items-end pb-14">
              <div className="max-w-4xl">
                <Link
                  href={`/${locale}/tin-tuc`}
                  className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors mb-6"
                >
                  <span className="mr-2">&larr;</span>
                  {t(locale, 'news.backToList')}
                </Link>

                {publishedDate && (
                  <p className="text-sm font-medium text-white/70 mb-4">
                    {t(locale, 'news.publishedAt')} {publishedDate}
                  </p>
                )}

                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                  {article.title}
                </h1>
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto">
                {article.excerpt && (
                  <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-medium mb-10">
                    {article.excerpt}
                  </p>
                )}

                <div
                  className="text-gray-700 leading-8 text-base md:text-lg [&_p]:mb-5 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_li]:mb-2 [&_img]:rounded-lg [&_img]:my-8"
                  dangerouslySetInnerHTML={{ __html: content }}
                />

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <Link
                    href={`/${locale}/tin-tuc`}
                    className="inline-flex items-center px-6 py-3 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                  >
                    <span className="mr-2">&larr;</span>
                    {t(locale, 'news.backToList')}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
