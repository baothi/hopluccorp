'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import FadeIn from '@/components/animations/FadeIn';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import BannerSection from '@/components/sections/BannerSection';
import VerticalPagination from '@/components/ui/VerticalPagination';
import { t } from '@/lib/i18n';
import { safeImg } from '@/lib/utils/safeImg';
import { clearBusinessField, fetchBusinessField } from '@/store/businessField/businessFieldSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

const FIELD_TABS = [
  { id: 'mep', labelKey: 'menu.sectors.mne', route: 'tong-thau-co-dien' },
  { id: 'construction', labelKey: 'menu.sectors.construction', route: 'trang-tong-thau-xay-dung' },
  { id: 'interior', labelKey: 'menu.sectors.interior', route: 'hoan-thien-noi-that' },
  { id: 'materials', labelKey: 'menu.sectors.materials', route: 'vat-lieu-xay-dung' },
  { id: 'supporting', labelKey: 'menu.sectors.industrial', route: 'cong-nghiep-phu-tro' },
];

const SERVICES_TITLE: Record<string, string> = {
  vi: 'Dịch vụ cung cấp',
  en: 'Services',
  zh: '服务内容',
  ko: '제공 서비스',
};

type FieldId = 'mep' | 'construction' | 'interior' | 'materials' | 'supporting';

type FallbackService = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

type BusinessFieldFallback = {
  bannerImage: string;
  bannerAlt: string;
  intro: {
    title: string;
    description: string;
    image: string;
  };
  services: FallbackService[];
  gallery: string[];
};

interface Props {
  fieldSlug: string;
  activeId: FieldId;
  fallback: BusinessFieldFallback;
}

type IntroData = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  isHtml: boolean;
};

type ServiceData = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

type GalleryData = {
  src: string;
  alt: string;
};

export default function BusinessFieldContent({ fieldSlug, activeId, fallback }: Props) {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale || 'vi';
  const dispatch = useAppDispatch();
  const api = useAppSelector((state) => state.businessField);

  useEffect(() => {
    dispatch(clearBusinessField());
    dispatch(fetchBusinessField({ slug: fieldSlug, locale }));
  }, [dispatch, fieldSlug, locale]);

  const field = api.data?.slug === fieldSlug ? api.data : null;

  const tabs = useMemo(
    () =>
      FIELD_TABS.map((tab) => ({
        ...tab,
        label: t(locale, tab.labelKey),
        active: tab.id === activeId,
      })),
    [activeId, locale],
  );

  const intro = useMemo<IntroData>(
    () => ({
      title: field?.intro_title || fallback.intro.title,
      description: field?.intro_description || fallback.intro.description,
      image: safeImg(field?.intro_image, fallback.intro.image),
      imageAlt: field?.name || fallback.bannerAlt,
      isHtml: Boolean(field?.intro_description),
    }),
    [fallback, field],
  );

  const services = useMemo<ServiceData[]>(() => {
    if (!field?.services?.length) {
      return fallback.services;
    }

    return field.services.map((service, index) => ({
      id: service.id,
      icon: safeImg(service.icon, fallback.services[index]?.icon || '/images/placeholder.svg'),
      title: service.title,
      description: service.description,
    }));
  }, [fallback.services, field]);

  const gallery = useMemo<GalleryData[]>(() => {
    const apiGallery = field?.gallery
      ?.filter((item) => item.image)
      .map((item, index) => ({
        src: safeImg(item.image, fallback.gallery[index] || fallback.intro.image),
        alt: item.alt || `${intro.imageAlt} ${index + 1}`,
      }));

    if (apiGallery?.length) {
      return apiGallery;
    }

    return (fallback.gallery.length ? fallback.gallery : [fallback.intro.image]).map((src, index) => ({
      src,
      alt: `${intro.imageAlt} ${index + 1}`,
    }));
  }, [fallback.gallery, fallback.intro.image, field, intro.imageAlt]);

  const bannerImage = safeImg(field?.banner_image, fallback.bannerImage);
  const bannerAlt = field?.banner_alt || field?.name || fallback.bannerAlt;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <VerticalPagination totalSections={5} />

      <main className="relative">
        <section className="relative w-full h-[280px] sm:h-[360px] md:h-[480px] lg:h-[650px]">
          <BannerSection banners={[{ id: 1, image: bannerImage, alt: bannerAlt }]} />
        </section>

        <IntroSection tabs={tabs} intro={intro} locale={locale} />
        <ServicesSection services={services} locale={locale} />
        <GallerySection gallery={gallery} />

        <section className="h-20 bg-gray-50" />
      </main>

      <Footer locale={locale} />
    </div>
  );
}

function IntroSection({
  tabs,
  intro,
  locale,
}: {
  tabs: Array<(typeof FIELD_TABS)[number] & { label: string; active: boolean }>;
  intro: IntroData;
  locale: string;
}) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <FadeIn direction="down" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                href={`/${locale}/${tab.route}`}
                className={`px-6 py-3 font-medium transition-all ${
                  tab.active
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left" delay={0.3}>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 uppercase">
                {intro.title}
              </h2>
              {intro.isHtml ? (
                <div
                  className="text-gray-600 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: intro.description }}
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  {intro.description}
                </p>
              )}
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.4}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={intro.image}
                alt={intro.imageAlt}
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

function ServicesSection({
  services,
  locale,
}: {
  services: ServiceData[];
  locale: string;
}) {
  const gridClass = services.length <= 2
    ? 'grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'
    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8';

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <FadeIn direction="up" delay={0.2}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {SERVICES_TITLE[locale] || SERVICES_TITLE.vi}
            </h2>
          </div>
        </FadeIn>

        <div className={gridClass}>
          {services.map((service, index) => (
            <FadeIn key={service.id} direction="up" delay={0.2 + index * 0.1}>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow h-full group">
                <div className="w-20 h-20 mb-6 relative">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform"
                  />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection({ gallery }: { gallery: GalleryData[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    setCurrentIndex(0);
  }, [gallery.length]);

  useEffect(() => {
    if (!isAutoPlaying || gallery.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gallery.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [gallery.length, isAutoPlaying]);

  if (gallery.length === 0) return null;

  const getVisibleImages = () => {
    const images = [];

    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % gallery.length;
      images.push({ ...gallery[index], index });
    }

    return images;
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % gallery.length);
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getVisibleImages().map((image, idx) => (
              <FadeIn key={`${currentIndex}-${idx}`} direction="up" delay={0.1 * idx}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden border-4 border-red-500 shadow-lg group">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-12 h-12 border-2 border-red-500 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 border-2 border-red-500 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
