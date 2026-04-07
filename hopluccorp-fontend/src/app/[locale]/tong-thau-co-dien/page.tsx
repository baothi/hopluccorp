'use client';

import FadeIn from '@/components/animations/FadeIn';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import BannerSection from '@/components/sections/BannerSection';
import VerticalPagination from '@/components/ui/VerticalPagination';
import {
    mepGallery,
    mepIntro,
    mepServiceCategories,
    mepServices
} from '@/lib/data/meppage';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MEPPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header overlay trên banner */}
      <Header />
      <VerticalPagination totalSections={5} />

      <main className="relative">
        {/* Section 1: Banner Slider - dùng lại từ trang chủ */}
        <BannerSection />

        {/* Section 2: Tabs + Giới thiệu */}
        <IntroSection />

        {/* Section 3: Dịch vụ cung cấp */}
        <ServicesSection />

        {/* Section 4: Gallery */}
        <GallerySection />

        {/* Section 5: Footer placeholder */}
        <section className="h-20 bg-gray-50" />
      </main>

      <Footer />
    </div>
  );
}

// ========== SECTION COMPONENTS ==========

// Section 2: Tabs + Giới thiệu
function IntroSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Tabs lĩnh vực */}
        <FadeIn direction="down" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {mepServiceCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/vi/${cat.slug}`}
                className={`px-6 py-3 font-medium transition-all ${
                  cat.active
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </FadeIn>

        {/* Giới thiệu chung */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <FadeIn direction="left" delay={0.3}>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 uppercase">
                {mepIntro.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {mepIntro.description}
              </p>
            </div>
          </FadeIn>

          {/* Right: Image */}
          <FadeIn direction="right" delay={0.4}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={mepIntro.image}
                alt="Tổng thầu Cơ điện"
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

// Section 3: Dịch vụ cung cấp
function ServicesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <FadeIn direction="up" delay={0.2}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Dịch vụ cung cấp
            </h2>
          </div>
        </FadeIn>

        {/* Services Grid - 4 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mepServices.map((service, index) => (
            <FadeIn key={service.id} direction="up" delay={0.2 + index * 0.1}>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow h-full group">
                {/* Icon */}
                <div className="w-20 h-20 mb-6 relative">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform"
                  />
                </div>

                {/* Content */}
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

// Section 4: Gallery Slider
function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mepGallery.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Tạo mảng ảnh để hiển thị (3 ảnh visible)
  const getVisibleImages = () => {
    const images = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % mepGallery.length;
      images.push({ src: mepGallery[index], index });
    }
    return images;
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + mepGallery.length) % mepGallery.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mepGallery.length);
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        {/* Slider Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Images Grid - 3 visible */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getVisibleImages().map((image, idx) => (
              <FadeIn key={`${currentIndex}-${idx}`} direction="up" delay={0.1 * idx}>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden border-4 border-red-500 shadow-lg group">
                  <Image
                    src={image.src}
                    alt={`Gallery ${image.index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="w-12 h-12 border-2 border-red-500 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 border-2 border-red-500 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
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
