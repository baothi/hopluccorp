'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchAchievementsPage } from '@/store/achievements/achievementsSlice';
import { safeImg } from '@/lib/utils/safeImg';
import { t } from '@/lib/i18n';
import * as fallback from '@/lib/data/achievementpage';

import FadeIn from '@/components/animations/FadeIn';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import BannerSection from '@/components/sections/BannerSection';
import VerticalPagination from '@/components/ui/VerticalPagination';
import Image from 'next/image';

interface Props {
  locale: string;
}

export default function AchievementsContent({ locale }: Props) {
  const dispatch = useAppDispatch();
  const api = useAppSelector((state) => state.achievements);

  useEffect(() => {
    dispatch(fetchAchievementsPage(locale));
  }, [dispatch, locale]);

  // Build data: API → fallback hardcoded
  const awards = api.awards.length
    ? api.awards
    : fallback.awards;

  // Only use API gallery if at least one item has a real image (not blank/null)
  const hasApiGalleryImages = api.gallery.some((item) => !!item.image);
  const galleryImages = hasApiGalleryImages
    ? api.gallery
        .filter((item) => !!item.image)
        .map((item) => ({
          image: safeImg(item.image),
          alt: item.alt || '',
        }))
    : fallback.achievementsGallery.map((img, i) => ({
        image: img,
        alt: `${t(locale, 'achievements.gallery')} ${i + 1}`,
      }));

  const fallbackBanners = [
    { id: 1, image: fallback.achievementsBanner.image, alt: 'Thành tựu Hợp Lực' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <VerticalPagination totalSections={4} />

      <main className="relative">
        {/* Section 1: Banner */}
        <BannerSection banners={fallbackBanners} />

        {/* Section 2: Tiêu đề + Awards */}
        <AwardsSection awards={awards} locale={locale} />

        {/* Section 3: Gallery */}
        <GallerySection images={galleryImages} locale={locale} />

        {/* Section 4: Footer placeholder */}
        <section className="h-20 bg-gray-50" />
      </main>

      <Footer locale={locale} />
    </div>
  );
}

// ========== AWARDS SECTION ==========

interface AwardItem {
  id?: number;
  year: string;
  title: string;
  organization: string;
  description: string;
  image?: string | null;
}

function AwardsSection({ awards, locale }: { awards: AwardItem[]; locale: string }) {
  // Group awards by year
  const grouped = awards.reduce<Record<string, AwardItem[]>>((acc, award) => {
    if (!acc[award.year]) acc[award.year] = [];
    acc[award.year].push(award);
    return acc;
  }, {});
  const sortedYears = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section heading */}
        <FadeIn direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <p className="text-red-600 font-semibold text-sm uppercase tracking-widest mb-2">
              {t(locale, 'achievements.title')}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {t(locale, 'achievements.titleHighlight')}
            </h2>
            <div className="w-16 h-1 bg-red-600 mx-auto mt-4" />
          </div>
        </FadeIn>

        {awards.length === 0 ? (
          <p className="text-center text-gray-500">{t(locale, 'achievements.noAwards')}</p>
        ) : (
          <div className="space-y-12">
            {sortedYears.map((year, yi) => (
              <FadeIn key={year} direction="up" delay={0.1 + yi * 0.05}>
                <div className="flex gap-6 items-start">
                  {/* Year badge */}
                  <div className="flex-shrink-0 w-20 text-center">
                    <div className="bg-red-600 text-white text-lg font-bold rounded-lg py-2 px-3 shadow-md">
                      {year}
                    </div>
                  </div>

                  {/* Awards for this year */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {grouped[year].map((award, ai) => (
                      <AwardCard key={award.id ?? ai} award={award} locale={locale} />
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function AwardCard({ award, locale }: { award: AwardItem; locale: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-5 flex gap-4 items-start">
      {/* Trophy icon */}
      <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
        {award.image ? (
          <Image
            src={award.image}
            alt={award.title}
            width={48}
            height={48}
            className="w-10 h-10 object-contain"
          />
        ) : (
          <svg className="w-7 h-7 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-3">
          {award.title}
        </h3>
        {award.organization && (
          <p className="text-xs text-red-600 mt-1.5 font-medium">
            {t(locale, 'achievements.issuedBy')} {award.organization}
          </p>
        )}
        {award.description && (
          <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
            {award.description}
          </p>
        )}
      </div>
    </div>
  );
}

// ========== GALLERY SECTION ==========

interface GalleryImage {
  image: string;
  alt: string;
}

function GallerySection({ images, locale }: { images: GalleryImage[]; locale: string }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <FadeIn direction="up" delay={0.2}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {t(locale, 'achievements.gallery')}
            </h2>
            <div className="w-16 h-1 bg-red-600 mx-auto mt-4" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((item, index) => (
            <FadeIn key={index} direction="up" delay={0.2 + index * 0.08}>
              <div
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={item.image}
                  alt={item.alt || `${t(locale, 'achievements.gallery')} ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-[70] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            className="absolute left-4 text-white hover:text-gray-300 transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
            }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="absolute right-4 text-white hover:text-gray-300 transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
            }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            className="relative max-w-5xl max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedImage].image}
              alt={images[selectedImage].alt || `${t(locale, 'achievements.gallery')} ${selectedImage + 1}`}
              width={1200}
              height={800}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedImage === index ? 'bg-white w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
