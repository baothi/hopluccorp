import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from '@/store/StoreProvider';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://hopluccorp.vn'),
  title: 'Hợp Lực - Phát triển bền vững là kim chỉ nam cho mọi hoạt động',
  description: 'Công ty cổ phần Xây dựng Hợp Lực - Tổng thầu EPC hàng đầu Việt Nam trong lĩnh vực xây dựng công nghiệp',
  keywords: 'xây dựng, tổng thầu, EPC, cơ điện, nội thất, vật liệu xây dựng, Hợp Lực',
  openGraph: {
    title: 'Hợp Lực - Phát triển bền vững là kim chỉ nam cho mọi hoạt động',
    description: 'Công ty cổ phần Xây dựng Hợp Lực - Tổng thầu EPC hàng đầu Việt Nam',
    images: ['/images/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
