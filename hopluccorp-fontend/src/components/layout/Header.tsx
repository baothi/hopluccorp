'use client';

import { languages, logos, contactInfo } from '@/lib/data/homepage';
import { cn } from '@/lib/utils/cn';
import { t } from '@/lib/i18n';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Logo công ty thành viên
const memberCompanies = [
  { name: 'Hợp Lực', logo: 'https://hopluccorp.vn/wp-content/uploads/2023/02/LOGO-CONG-TY-THANH-VIEN-08.png' },
  { name: 'HL M&E', logo: 'https://hopluccorp.vn/wp-content/uploads/2023/02/LOGO-CONG-TY-THANH-VIEN-09.png' },
  { name: 'HL Interior', logo: 'https://hopluccorp.vn/wp-content/uploads/2023/02/LOGO-CONG-TY-THANH-VIEN-10.png' },
  { name: 'HL Platek', logo: 'https://hopluccorp.vn/wp-content/uploads/2023/02/LOGO-CONG-TY-THANH-VIEN-11.png' },
  { name: 'Phoenix', logo: 'https://hopluccorp.vn/wp-content/uploads/2023/02/LOGO-CONG-TY-THANH-VIEN-12.png' },
];

interface HeaderProps {
  /**
   * Header variant:
   * - 'transparent' (default): For pages with dark banner/slider (homepage) - white text
   * - 'solid': For pages with light background (about, news, etc.) - dark text
   */
  variant?: 'transparent' | 'solid';
}

export default function Header({ variant = 'transparent' }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Lấy locale hiện tại từ URL path
  const currentLang = pathname.split('/')[1] || 'vi';

  const currentLanguage = languages.find(lang => lang.code === currentLang);

  // Detect scroll to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if header should use dark text (for light backgrounds)
  const useDarkText = variant === 'solid' || isScrolled;

  return (
    <>
      <header
        className={cn(
          "header fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled || variant === 'solid'
            ? "bg-white/95 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="logo relative flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 pb-4">
          {/* Left: Language Switcher */}
          <div className="leng relative z-10">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md border transition-all",
                useDarkText
                  ? "border-gray-300 hover:bg-gray-100 text-gray-700"
                  : "border-white/50 hover:bg-white/10 text-white"
              )}
            >
              <span className="relative w-5 h-3.5 shrink-0">
                <Image
                  src={currentLanguage?.flag || '/flags/vi.png'}
                  alt={currentLanguage?.label || 'VIE'}
                  fill
                  sizes="20px"
                  className="object-cover"
                />
              </span>
              <span className="font-medium text-sm">
                {currentLanguage?.label}
              </span>
            </button>

            {/* Language Dropdown */}
            {isLangOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden min-w-[120px] z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      // Đổi URL: /vi/... → /en/...
                      const segments = pathname.split('/');
                      segments[1] = lang.code;
                      router.push(segments.join('/'));
                      setIsLangOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors",
                      currentLang === lang.code && "bg-gray-50"
                    )}
                  >
                    <span className="relative w-5 h-3.5 shrink-0">
                      <Image
                        src={lang.flag}
                        alt={lang.label}
                        fill
                        sizes="20px"
                        className="object-cover"
                      />
                    </span>
                    <span className="text-sm text-gray-900">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Center: Logo */}
          <Link
            href={`/${currentLang}`}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src={logos.header}
              alt="Hợp Lực"
              width={120}
              height={56}
              className="h-10 w-auto md:h-14"
              priority
            />
          </Link>

          {/* Right: Search + Menu */}
          <div className="flex items-center gap-2 z-10">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-md border transition-all",
                useDarkText
                  ? "border-gray-300 hover:bg-gray-100 text-gray-700"
                  : "border-white/50 hover:bg-white/10 text-white"
              )}
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-md border transition-all",
                useDarkText
                  ? "border-gray-300 hover:bg-gray-100 text-gray-700"
                  : "border-white/50 hover:bg-white/10 text-white"
              )}
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[60] flex items-start justify-center pt-20 p-4"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-xl w-full relative animate-fade-in shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-3 right-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <form className="flex gap-2">
              <input
                type="text"
                placeholder={t(currentLang, 'search.placeholder')}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                autoFocus
              />
              <button
                type="submit"
                className="px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Menu Overlay - Right Side Panel */}
      {isMenuOpen && (
        <MenuOverlay
          locale={currentLang}
          onClose={() => setIsMenuOpen(false)}
          onOpenSearch={() => {
            setIsMenuOpen(false);
            setIsSearchOpen(true);
          }}
        />
      )}

      {/* Close language dropdown when clicking outside */}
      {isLangOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsLangOpen(false)}
        />
      )}
    </>
  );
}

// Menu Overlay Component - Matches original design
function MenuOverlay({
  locale,
  onClose,
  onOpenSearch
}: {
  locale: string;
  onClose: () => void;
  onOpenSearch: () => void;
}) {
  const menuItems = [
    { label: t(locale, 'menu.about'), href: `/${locale}/gioi-thieu` },
    { label: t(locale, 'menu.structure'), href: `/${locale}/co-cau-to-chuc` },
    { label: t(locale, 'menu.resources'), href: `/${locale}/nguon-luc` },
    { label: t(locale, 'menu.projects'), href: `/${locale}/du-an` },
    {
      label: t(locale, 'menu.sectors'),
      children: [
        { label: t(locale, 'menu.sectors.construction'), href: `/${locale}/trang-tong-thau-xay-dung` },
        { label: t(locale, 'menu.sectors.mne'), href: `/${locale}/trang-tong-thau-co-dien` },
        { label: t(locale, 'menu.sectors.interior'), href: `/${locale}/hoan-thien-noi-that` },
        { label: t(locale, 'menu.sectors.materials'), href: `/${locale}/vat-lieu-xay-dung` },
        { label: t(locale, 'menu.sectors.industrial'), href: `/${locale}/cong-nghiep-phu-tro` },
      ]
    },
    { label: t(locale, 'menu.news'), href: `/${locale}/tin-tuc` },
    { label: t(locale, 'menu.partners'), href: `/${locale}/doi-tac` },
    { label: t(locale, 'menu.achievements'), href: `/${locale}/thanh-tuu` },
    { label: t(locale, 'menu.careers'), href: `/${locale}/tuyen-dung` },
    { label: t(locale, 'menu.contact'), href: `/${locale}/lien-he` },
  ];

  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop - Semi transparent */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />

      {/* Menu Panel - Right Side */}
      <div className="absolute right-0 top-0 h-full w-[320px] md:w-[380px] bg-white/95 backdrop-blur-md shadow-2xl animate-slide-in-right">
        {/* Header with Search & Close */}
        <div className="flex items-center justify-end gap-2 p-4 border-b border-gray-100">
          <button
            onClick={onOpenSearch}
            className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
            aria-label="Search"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Items - Right aligned */}
        <nav className="p-6 overflow-y-auto h-[calc(100%-200px)]">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
                      className="w-full flex items-center justify-end gap-2 py-2.5 text-gray-800 hover:text-red-600 transition-colors text-right"
                    >
                      <span className="font-medium text-sm tracking-wide">{item.label}</span>
                      <svg
                        className={cn(
                          "w-4 h-4 transition-transform",
                          expandedItem === item.label && "rotate-180"
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedItem === item.label && (
                      <ul className="mt-1 mb-2 space-y-1 border-r-2 border-red-500 pr-4 mr-2">
                        {item.children.map((child, childIndex) => (
                          <li key={childIndex}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="block py-1.5 text-gray-600 hover:text-red-600 transition-colors text-right text-sm"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-2.5 text-gray-800 font-medium hover:text-red-600 transition-colors text-right text-sm tracking-wide"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Icons */}
        <div className="px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-end gap-3">
            <Link
              href={contactInfo.facebook}
              target="_blank"
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </Link>
            <Link
              href={contactInfo.youtube}
              target="_blank"
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </Link>
            <Link
              href={contactInfo.linkedin}
              target="_blank"
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Member Companies */}
        <div className="px-6 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-right mb-3 font-medium tracking-wide">{t(locale, 'menu.memberCompanies')}</p>
          <div className="flex items-center justify-end gap-2 flex-wrap">
            {memberCompanies.map((company, index) => (
              <div
                key={index}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden hover:border-red-500 transition-colors"
                title={company.name}
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
