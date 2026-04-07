'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import FadeIn from '@/components/animations/FadeIn';
import { t } from '@/lib/i18n';
import 'swiper/css';
import 'swiper/css/navigation';

interface PartnerData {
  id: number;
  name: string;
  logo: string;
}

interface Props {
  partners: PartnerData[];
  locale: string;
}

/**
 * Partners Section - Partner logos carousel
 * Displays company partners with auto-playing slider
 */
export default function PartnerSection({ partners, locale }: Props) {
  return (
    <section className="site-partners py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <FadeIn direction="up" delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t(locale, 'partner.title')} <span className="text-red-600">{t(locale, 'partner.highlight')}</span>
            </h2>
          </FadeIn>
        </div>

        {/* Partners Carousel */}
        <FadeIn direction="up" delay={0.3}>
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={2}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: '.partner-next',
              prevEl: '.partner-prev',
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
              1280: {
                slidesPerView: 6,
              },
            }}
            loop={true}
            className="partner-swiper"
          >
            {partners.map((partner, index) => (
              <SwiperSlide key={partner.id}>
                <div className="flex items-center justify-center h-20 bg-white rounded-lg p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-lg">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeIn>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button className="partner-prev w-12 h-12 rounded-full bg-gray-200 hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="partner-next w-12 h-12 rounded-full bg-gray-200 hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* View All Partners Button */}
        <div className="text-center mt-12">
          <FadeIn direction="up" delay={0.4}>
            <a
              href="/doi-tac"
              className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Xem tất cả
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </FadeIn>
        </div>
      </div>

      <style jsx>{`
        .partner-swiper .swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
}