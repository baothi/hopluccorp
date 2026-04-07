'use client';

import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import { t } from '@/lib/i18n';

interface NewsArticleData {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  link: string;
  featured?: boolean;
}

interface Props {
  news: NewsArticleData[];
  locale: string;
}

export default function NewsSection({ news, locale }: Props) {
  const featuredArticle = news.find(article => article.featured);
  const sidebarArticles = news.filter(article => !article.featured);

  return (
    <div className="site-news py-20 relative overflow-hidden bg-white py-16">
      <div className="container mx-auto px-6 h-full flex flex-col">
        {/* Title */}
        <FadeIn direction="down" delay={0.2}>
          <div className="title text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold">
              {t(locale, 'news.title')} <span className="text-red-600">Hợp Lực</span>
            </h2>
          </div>
        </FadeIn>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
          {/* Featured Article - Left 2/3 */}
          <div className="lg:col-span-2">
            {featuredArticle && (
              <FadeIn direction="left" delay={0.4}>
                <Link
                  href={featuredArticle.link}
                  className="items-news-hl group block h-full bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                    {/* Image */}
                    <div className="relative h-64 md:h-full">
                      <Image
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 line-clamp-3 group-hover:text-red-600 transition-colors">
                        {featuredArticle.title}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 line-clamp-4">
                        {featuredArticle.excerpt}
                      </p>
                      <div className="details inline-flex items-center gap-2 text-red-600 font-medium group-hover:gap-4 transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            )}
          </div>

          {/* Sidebar Articles - Right 1/3 */}
          <div className="space-y-6 overflow-y-auto">
            {sidebarArticles.map((article, index) => (
              <FadeIn key={article.id} direction="right" delay={0.6 + index * 0.1}>
                <Link
                  href={article.link}
                  className="items group block bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
                >
                  <div className="grid grid-cols-3 gap-4">
                    {/* Thumbnail */}
                    <div className="relative h-24">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="col-span-2 py-2 pr-4">
                      <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                        {article.excerpt}
                      </p>
                      <span className="text-xs text-red-600 font-medium hover:underline">
                        {t(locale, 'news.readMore')}
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
