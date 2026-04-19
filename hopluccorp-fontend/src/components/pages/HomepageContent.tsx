'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchHomepage } from '@/store/homepage/homepageSlice';
import { safeImg } from '@/lib/utils/safeImg';
import * as fallback from '@/lib/data/homepage';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import AboutSection from '@/components/sections/AboutSection';
import BannerSection from '@/components/sections/BannerSection';
import CategorySection from '@/components/sections/CategorySection';
import NewsSection from '@/components/sections/NewsSection';
import PartnerSection from '@/components/sections/PartnerSection';
import StatsSection from '@/components/sections/StatsSection';
import VideoSection from '@/components/sections/VideoSection';
import VerticalPagination from '@/components/ui/VerticalPagination';

interface Props {
  locale: string;
}

function normalizePageLink(link: string, locale: string) {
  const fixedLink = link === '/trang-tong-thau-co-dien' ? '/tong-thau-co-dien' : link;

  if (!fixedLink.startsWith('/') || /^\/(vi|en|zh|ko)(\/|$)/.test(fixedLink)) {
    return fixedLink;
  }

  return `/${locale}${fixedLink}`;
}

export default function HomepageContent({ locale }: Props) {
  const dispatch = useAppDispatch();
  const api = useAppSelector((state) => state.homepage);

  useEffect(() => {
    dispatch(fetchHomepage(locale));
  }, [dispatch, locale]);

  // Build data: API → fallback hardcoded
  const banners = api.banners.length
    ? api.banners.map((b) => ({ id: b.id, image: safeImg(b.image), alt: b.alt }))
    : fallback.bannerSlides;

  const aboutSection = api.about_section
    ? {
        label: api.about_section.label,
        title: api.about_section.title,
        description: api.about_section.description,
        ctaText: api.about_section.cta_text,
        ctaLink: api.about_section.cta_link,
      }
    : {
        label: 'Giới thiệu',
        title: 'Hợp lực',
        description: '',
        ctaText: 'Tìm hiểu thêm',
        ctaLink: '/gioi-thieu',
      };

  const aboutBlocks = api.about_blocks.length
    ? api.about_blocks.map((b) => ({
        id: b.id,
        title: b.title,
        subtitle: b.subtitle,
        image: safeImg(b.image),
        icon: safeImg(b.icon),
        link: b.link,
      }))
    : fallback.aboutBlocks;

  const videoSection = api.video_section
    ? {
        title: api.video_section.title,
        subtitle: api.video_section.subtitle,
        youtubeId: api.video_section.youtube_id,
        thumbnail: safeImg(api.video_section.thumbnail),
      }
    : fallback.videoData;

  const stats = api.stats.length
    ? api.stats.map((s, i) => ({
        id: s.id,
        icon: safeImg(s.icon),
        number: s.number,
        suffix: s.suffix || '',
        label: s.label,
        delay: 0.5 + i * 0.2,
      }))
    : fallback.stats;

  const bgStats = api.site_config?.bg_stats || fallback.backgroundImages.stats;
  const bgStatsImage = api.site_config?.bg_stats_image || fallback.backgroundImages.statsImage;

  const categoriesSource = api.categories.length
    ? api.categories.map((c) => ({
        id: c.id,
        title: c.title,
        subtitle: c.subtitle,
        image: safeImg(c.image),
        link: c.link,
      }))
    : fallback.categories;
  const categories = categoriesSource.map((category) => ({
    ...category,
    link: normalizePageLink(category.link, locale),
  }));

  const news = api.news.length
    ? api.news.map((n) => ({
        id: n.id,
        title: n.title,
        excerpt: n.excerpt,
        image: safeImg(n.image),
        link: n.link,
        featured: n.featured,
      }))
    : fallback.newsArticles;

  const partners = api.partners.length
    ? api.partners.map((p) => ({
        id: p.id,
        name: p.name,
        logo: safeImg(p.logo),
      }))
    : fallback.partners;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <VerticalPagination totalSections={7} />

      <main className="relative">
        <section id="section-banner" className="relative h-screen">
          <BannerSection banners={banners} />
        </section>

        <section id="section-about" className="py-20 relative bg-white">
          <AboutSection aboutSection={aboutSection} aboutBlocks={aboutBlocks} />
        </section>

        <section id="section-video" className="py-20 relative bg-gray-50">
          <VideoSection video={videoSection} />
        </section>

        <section id="section-stats" className="py-20 relative">
          <StatsSection stats={stats} bgStats={bgStats} bgStatsImage={bgStatsImage} locale={locale} />
        </section>

        <section id="section-category" className="py-20 relative bg-gray-50">
          <CategorySection categories={categories} />
        </section>

        <section id="section-news" className="py-20 relative">
          <NewsSection news={news} locale={locale} />
        </section>

        <section id="section-partner" className="relative py-20 bg-gray-50">
          <PartnerSection partners={partners} locale={locale} />
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
