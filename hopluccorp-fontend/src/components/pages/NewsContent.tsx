'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchNewsList } from '@/store/news/newsSlice';
import { safeImg } from '@/lib/utils/safeImg';
import * as fallback from '@/lib/data/newspage';
import { t } from '@/lib/i18n';

import FadeIn from '@/components/animations/FadeIn';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import BannerSection from '@/components/sections/BannerSection';
import VerticalPagination from '@/components/ui/VerticalPagination';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  locale: string;
}

const DATE_LOCALES: Record<string, string> = {
  vi: 'vi-VN',
  en: 'en-US',
  zh: 'zh-CN',
  ko: 'ko-KR',
};

function formatDate(date: string, locale: string) {
  if (!date) return '';

  return new Date(date).toLocaleDateString(DATE_LOCALES[locale] || 'vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function NewsContent({ locale }: Props) {
  const dispatch = useAppDispatch();
  const api = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNewsList(locale));
  }, [dispatch, locale]);

  // Categories: always use static fallback (backend has no NewsCategory model)
  const categories = fallback.newsCategories;

  const newsItems = api.articles.length
    ? api.articles.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        image: safeImg(item.image),
        category: '',
        date: item.published_at || '',
        excerpt: item.excerpt,
      }))
    : fallback.newsItems;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <VerticalPagination totalSections={4} />

      <main className="relative">
        <BannerSection />
        <NewsListSection
          categories={categories}
          newsItems={newsItems}
          locale={locale}
        />
        <section className="h-20 bg-gray-50" />
      </main>

      <Footer locale={locale} />
    </div>
  );
}

// ========== SECTION COMPONENTS ==========

interface NewsListProps {
  categories: { id: string; name: string; slug: string }[];
  newsItems: {
    id: number;
    title: string;
    slug: string;
    image: string;
    category: string;
    date: string;
    excerpt: string;
  }[];
  locale: string;
}

function NewsListSection({ categories, newsItems, locale }: NewsListProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredNews = useMemo(() => {
    if (activeCategory === 'all') {
      return newsItems;
    }
    return newsItems.filter(item => item.category === activeCategory);
  }, [activeCategory, newsItems]);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Tabs danh mục */}
        <FadeIn direction="down" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-6 py-3 font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedNews.map((news, index) => (
            <FadeIn key={news.id} direction="up" delay={0.1 + index * 0.05}>
              <NewsCard news={news} locale={locale} />
            </FadeIn>
          ))}
        </div>

        {/* Empty State */}
        {paginatedNews.length === 0 && (
          <FadeIn direction="up" delay={0.2}>
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="text-gray-500">{t(locale, 'news.emptyCategory')}</p>
            </div>
          </FadeIn>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <FadeIn direction="up" delay={0.3}>
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-red-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return (
                    <span key={page} className="px-2 text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

// News Card Component
interface NewsCardProps {
  news: {
    id: number;
    title: string;
    slug: string;
    image: string;
    category: string;
    date: string;
    excerpt: string;
  };
  locale: string;
}

function NewsCard({ news, locale }: NewsCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
      <Link href={`/${locale}/tin-tuc/${news.slug}`} className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <div className="text-sm text-gray-400 mb-2">
          {formatDate(news.date, locale)}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-3 group-hover:text-red-600 transition-colors flex-1">
          <Link href={`/${locale}/tin-tuc/${news.slug}`}>
            {news.title}
          </Link>
        </h3>

        <Link
          href={`/${locale}/tin-tuc/${news.slug}`}
          className="inline-flex items-center text-red-600 font-medium hover:text-red-700 transition-colors"
        >
          {t(locale, 'news.readMore')}
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
