'use client';

import Image from 'next/image';
import Link from 'next/link';
import { logos, backgroundImages, contactInfo } from '@/lib/data/homepage';
import { t } from '@/lib/i18n';

interface FooterProps {
  locale?: string;
}

export default function Footer({ locale = 'vi' }: FooterProps) {
  return (
    <footer
      className="footer relative bg-cover bg-center text-white py-12"
      style={{ backgroundImage: `url(${backgroundImages.footer})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 to-gray-900/98" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo + QR + Social */}
          <div className="footer_content">
            <div className="mb-6">
              <Link href="/" className="inline-block mb-4">
                <img
                  src={logos.footer}
                  alt="Hợp Lực"
                  className="h-16 w-auto"
                />
              </Link>

              <div className="qr mt-4">
                <img
                  src={logos.qrCode}
                  alt="QR Code"
                  className="w-24 h-24 rounded-lg"
                />
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <span className="block text-sm font-medium mb-3">{t(locale, 'footer.follow')}</span>
              <div className="flex gap-3">
                <Link
                  href={contactInfo.facebook}
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Link>
                <Link
                  href={contactInfo.youtube}
                  target="_blank"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-6 text-xs text-gray-400">
              Copyright by Hợp Lực 2022, all rights reserved
            </div>
          </div>

          {/* Column 2: Addresses */}
          <div className="footer_content">
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3 text-red-500">{t(locale, 'footer.headquarters')}</h4>
              <p className="text-sm text-gray-300">
                {contactInfo.address}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3 text-red-500">{t(locale, 'footer.hcmOffice')}</h4>
              <p className="text-sm text-gray-300">
                {contactInfo.addressHCM}
              </p>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div className="footer_content">
            <h4 className="text-lg font-semibold mb-4 text-red-500">{t(locale, 'footer.contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <svg
                  className="w-5 h-5 mt-1 flex-shrink-0 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <svg
                  className="w-5 h-5 flex-shrink-0 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{contactInfo.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <svg
                  className="w-5 h-5 flex-shrink-0 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{contactInfo.email}</span>
              </li>
              <li className="mt-4">
                <Link
                  href="/tuyen-dung"
                  className="inline-block px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  {t(locale, 'footer.recruitment')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
