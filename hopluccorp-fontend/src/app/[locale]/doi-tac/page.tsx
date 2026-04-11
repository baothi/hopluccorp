'use client';

import FadeIn from '@/components/animations/FadeIn';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import BannerSection from '@/components/sections/BannerSection';
import VerticalPagination from '@/components/ui/VerticalPagination';
import {
    domesticPartners,
    internationalPartners
} from '@/lib/data/partnerspage';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header overlay trên banner */}
      <Header />
      <VerticalPagination totalSections={5} />

      <main className="relative">
        {/* Section 1: Banner Slider - dùng lại từ trang chủ */}
        <BannerSection banners={[]} />

        {/* Section 2: Đối tác quốc tế */}
        <PartnersSection
          title="ĐỐI TÁC QUỐC TẾ"
          partners={internationalPartners}
          bgColor="bg-white"
        />

        {/* Section 3: Đối tác trong nước */}
        <PartnersSection
          title="ĐỐI TÁC TRONG NƯỚC"
          partners={domesticPartners}
          bgColor="bg-gray-50"
        />

        {/* Section 4: Footer placeholder */}
        <section className="h-20 bg-gray-50" />
      </main>

      <Footer />
    </div>
  );
}

// ========== SECTION COMPONENTS ==========

interface PartnersSectionProps {
  title: string;
  partners: string[];
  bgColor: string;
}

function PartnersSection({ title, partners, bgColor }: PartnersSectionProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const itemsPerPage = 10; // 5 columns x 2 rows
    const totalPages = Math.ceil(partners.length / itemsPerPage);

    // Auto play
    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
        }, 4000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, totalPages]);

    // Get current page partners
    const currentPartners = partners.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handlePrev = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const handleNext = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    return (
        <section className={`py-16 ${bgColor}`}>
        <div className="container mx-auto px-6">
            {/* Title */}
            <FadeIn direction="up" delay={0.2}>
            <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {title}
                </h2>
                {/* Tab "TẤT CẢ" */}
                <div className="mt-4">
                <span className="inline-block px-6 py-2 bg-red-600 text-white font-medium">
                    TẤT CẢ
                </span>
                </div>
            </div>
            </FadeIn>

            {/* Partners Grid Slider */}
            <div
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            >
            {/* Grid 5 columns x 2 rows */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {currentPartners.map((logo, index) => (
                <FadeIn key={`${currentPage}-${index}`} direction="up" delay={0.05 * index}>
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 aspect-[3/2] flex items-center justify-center">
                    <div className="relative w-full h-full">
                        <Image
                        src={logo}
                        alt={`Partner ${currentPage * itemsPerPage + index + 1}`}
                        fill
                        className="object-contain"
                        />
                    </div>
                    </div>
                </FadeIn>
                ))}
            </div>

            {/* Navigation */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                {/* Previous button */}
                <button
                    onClick={handlePrev}
                    className="w-12 h-12 border-2 border-red-500 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`w-3 h-3 rounded-full transition-all ${
                        currentPage === i
                            ? 'bg-red-600 w-6'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                    />
                    ))}
                </div>

                {/* Next button */}
                <button
                    onClick={handleNext}
                    className="w-12 h-12 border-2 border-red-500 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
                </div>
            )}
            </div>
        </div>
        </section>
    );
}
