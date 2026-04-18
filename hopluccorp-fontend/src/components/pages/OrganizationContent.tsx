'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchOrganizationPage } from '@/store/organization/organizationSlice';
import { safeImg } from '@/lib/utils/safeImg';
import { t } from '@/lib/i18n';
import * as fallback from '@/lib/data/organizationpage';

import FadeIn from '@/components/animations/FadeIn';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import BannerSection from '@/components/sections/BannerSection';
import VerticalPagination from '@/components/ui/VerticalPagination';
import Image from 'next/image';

interface Props {
  locale: string;
}

export default function OrganizationContent({ locale }: Props) {
  const dispatch = useAppDispatch();
  const api = useAppSelector((state) => state.organization);

  useEffect(() => {
    dispatch(fetchOrganizationPage(locale));
  }, [dispatch, locale]);

  // Build data: API → fallback hardcoded
  const overview = api.overview
    ? {
        title: api.overview.title,
        logo: safeImg(api.overview.logo),
        description: api.overview.description,
        image: safeImg(api.overview.image),
        downloadLink: api.overview.download_link,
        downloadText: api.overview.download_text,
      }
    : {
        title: fallback.organizationOverview.title,
        logo: fallback.organizationOverview.logo,
        description: fallback.organizationOverview.description,
        image: fallback.organizationOverview.image,
        downloadLink: fallback.organizationOverview.downloadLink,
        downloadText: fallback.organizationOverview.downloadText,
      };

  const chart = api.chart
    ? {
        title: api.chart.title,
        image: safeImg(api.chart.image),
      }
    : {
        title: fallback.organizationChart.title,
        image: fallback.organizationChart.image,
      };

  const galleryImages = api.gallery.length
    ? api.gallery.map((item) => ({
        image: safeImg(item.image),
        alt: item.alt || '',
      }))
    : fallback.organizationGallery.images.map((img, i) => ({
        image: img,
        alt: `Thư viện ${i + 1}`,
      }));

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <VerticalPagination totalSections={5} />

      <main className="relative">
        {/* Section 1: Banner Slider */}
        <BannerSection />

        {/* Section 2: Tổng quan */}
        <OverviewSection data={overview} />

        {/* Section 3: Sơ đồ tổ chức */}
        <OrganizationChartSection data={chart} />

        {/* Section 4: Thư viện */}
        <GallerySection images={galleryImages} locale={locale} />

        {/* Section 5: Footer placeholder */}
        <section className="h-20 bg-gray-50" />
      </main>

      <Footer locale={locale} />
    </div>
  );
}

// ========== SECTION COMPONENTS ==========

interface OverviewData {
  title: string;
  logo: string;
  description: string;
  image: string;
  downloadLink: string;
  downloadText: string;
}

function OverviewSection({ data }: { data: OverviewData }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <FadeIn direction="left" delay={0.2}>
            <div className="space-y-6">
              {/* Title with logo */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
                  <Image
                    src={data.logo}
                    alt="Hợp Lực Logo"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-red-600">
                  {data.title}
                </h2>
              </div>

              {/* Description */}
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {data.description}
              </div>

              {/* Download button */}
              {data.downloadLink && (
                <a
                  href={data.downloadLink}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {data.downloadText}
                </a>
              )}
            </div>
          </FadeIn>

          {/* Right: Image */}
          <FadeIn direction="right" delay={0.4}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

interface ChartData {
  title: string;
  image: string;
}

function OrganizationChartSection({ data }: { data: ChartData }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <FadeIn direction="up" delay={0.2}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {data.title}
            </h2>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.4}>
          <div className="relative w-full overflow-x-auto">
            <div className="min-w-[800px]">
              <Image
                src={data.image}
                alt={data.title}
                width={1200}
                height={800}
                className="w-full h-auto mx-auto"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

interface GalleryImage {
  image: string;
  alt: string;
}

function GallerySection({ images, locale }: { images: GalleryImage[]; locale: string }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <FadeIn direction="up" delay={0.2}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {t(locale, 'organization.gallery')}
            </h2>
          </div>
        </FadeIn>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((item, index) => (
            <FadeIn key={index} direction="up" delay={0.3 + index * 0.1}>
              <div
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={item.image}
                  alt={item.alt || `Thư viện ${index + 1}`}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-[70] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation */}
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

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedImage].image}
              alt={images[selectedImage].alt || `Thư viện ${selectedImage + 1}`}
              width={1200}
              height={800}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>

          {/* Dots indicator */}
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
