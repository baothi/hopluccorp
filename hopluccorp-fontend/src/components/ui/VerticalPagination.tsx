'use client';

import { cn } from '@/lib/utils/cn';
import { useEffect, useState } from 'react';

interface VerticalPaginationProps {
  totalSections?: number;
  sectionIds?: string[];
}

/**
 * Vertical Pagination Component
 * Displays page numbers (01-07) on the right side of the screen
 * Tracks current section based on scroll position
 */
export default function VerticalPagination({
  totalSections = 7,
  sectionIds = ['banner', 'about', 'video', 'stats', 'category', 'news', 'partner']
}: VerticalPaginationProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate which section is currently in view
      const sections = document.querySelectorAll('main > section');
      let currentIndex = 0;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        // Check if section is in the middle of viewport
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          currentIndex = index;
        }
      });

      setActiveIndex(currentIndex);

      // Hide pagination when scrolled past last section (footer)
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        setIsVisible(footerRect.top > windowHeight / 2);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll('main > section');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Format number with leading zero
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <nav className="flex flex-col items-end gap-3">
        {Array.from({ length: totalSections }, (_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={cn(
              "group flex items-center gap-2 transition-all duration-300",
              activeIndex === index ? "text-red-600" : "text-gray-400 hover:text-gray-600"
            )}
            aria-label={`Go to section ${index + 1}`}
          >
            {/* Number */}
            <span
              className={cn(
                "text-lg font-medium transition-all duration-300",
                activeIndex === index ? "opacity-100" : "opacity-60 group-hover:opacity-100"
              )}
            >
              {formatNumber(index + 1)}
            </span>

            {/* Dot indicator */}
            <span
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                activeIndex === index
                  ? "bg-red-600 scale-125"
                  : "bg-gray-300 group-hover:bg-gray-500"
              )}
            />
          </button>
        ))}
      </nav>
    </div>
  );
}
