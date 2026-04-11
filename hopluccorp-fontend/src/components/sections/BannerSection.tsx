'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';

interface Props {
  banners?: { id: number; image: string; alt: string }[];
}

export default function BannerSection({ banners = [] }: Props) {
  const validBanners = banners.filter((b) => b.image);

  if (validBanners.length === 0) return null;

  return (
    <div className="site-banner w-full h-full">
      <div className="slick-banner h-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: 'slick-dot',
            bulletActiveClass: 'slick-active',
          }}
          loop={validBanners.length > 1}
          className="h-full"
        >
          {validBanners.map((slide) => (
            <SwiperSlide key={slide.id} className="relative h-full">
              <div className="img relative h-full">
                <Image
                  src={slide.image}
                  alt={slide.alt || 'Banner'}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        :global(.slick-dot) {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          margin: 0 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        :global(.slick-dot.slick-active) {
          background: #dc2626;
          transform: scale(1.2);
        }

        :global(.swiper-pagination) {
          bottom: 30px !important;
          z-index: 10;
        }

        :global(.swiper-pagination-bullet) {
          width: 12px !important;
          height: 12px !important;
          background: rgba(255, 255, 255, 0.5) !important;
          margin: 0 6px !important;
          opacity: 1 !important;
        }

        :global(.swiper-pagination-bullet-active) {
          background: #dc2626 !important;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}