'use client';

import Counter from '@/components/ui/Counter';
import FadeIn from '@/components/animations/FadeIn';
import Image from 'next/image';
import { t } from '@/lib/i18n';

interface StatItemData {
  id: number;
  icon: string;
  number: number;
  suffix?: string;
  label: string;
  delay: number;
}

interface Props {
  stats: StatItemData[];
  bgStats: string;
  bgStatsImage: string;
  locale: string;
}

export default function StatsSection({ stats, bgStats, bgStatsImage, locale }: Props) {
  return (
    <div
      className="site-number relative overflow-hidden bg-cover bg-center py-20"
      style={{ backgroundImage: `url(${bgStats})` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/90 to-transparent" />

      <div className="container mx-auto h-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full items-center">
          {/* Left Content */}
          <div className="content px-6 lg:px-12">
            <FadeIn direction="left" delay={0.2}>
              <div className="title-main mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {t(locale, 'stats.title1')}
                </h2>
                <span className="text-red-500 text-lg font-semibold uppercase tracking-wider">
                  {t(locale, 'stats.title2')}
                </span>
              </div>
            </FadeIn>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat) => (
                <FadeIn key={stat.id} direction="left" delay={stat.delay}>
                  <div className="items text-center lg:text-left group">
                    <div className="mb-4">
                      <Image
                        src={stat.icon}
                        alt=""
                        width={60}
                        height={60}
                        className="mx-auto lg:mx-0 group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="number text-4xl lg:text-5xl font-bold text-red-500 mb-2">
                      <Counter end={stat.number} suffix={stat.suffix} duration={2.5} />
                    </div>
                    <p className="text-white text-sm lg:text-base">
                      {stat.label}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <FadeIn direction="right" delay={0.8} className="hidden lg:block">
            <div className="images relative h-full flex items-center justify-end">
              <div className="relative w-full h-[600px] max-w-xl">
                <Image
                  src={bgStatsImage || "/images/stats-image.png"}
                  alt="Hợp Lực Stats"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
