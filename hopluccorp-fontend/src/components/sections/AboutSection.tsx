'use client';

import FadeIn from '@/components/animations/FadeIn';
import Image from 'next/image';
import Link from 'next/link';

interface AboutSectionData {
  label: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

interface AboutBlockData {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  icon: string;
  link: string;
}

interface Props {
  aboutSection: AboutSectionData;
  aboutBlocks: AboutBlockData[];
}

export default function AboutSection({ aboutSection, aboutBlocks }: Props) {
  return (
    <div className="site-about relative overflow-hidden py-20">
      <div className="container mx-auto h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full items-center gap-8">
          {/* Left Content */}
          <div className="content px-6 lg:px-12">
            <FadeIn direction="left" delay={0.2}>
              <div className="title-main mb-6">
                <span className="text-red-600 text-sm font-medium uppercase tracking-wider">
                  {aboutSection.label}
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-2">
                  {aboutSection.title}
                </h2>
              </div>
            </FadeIn>

            {aboutSection.description && (
              <FadeIn direction="left" delay={0.3}>
                <div className="border-left-custom border-l-4 border-red-600 pl-6 mb-6">
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: aboutSection.description }}
                  />
                </div>
              </FadeIn>
            )}

            <FadeIn direction="left" delay={0.5}>
              <Link
                href={aboutSection.ctaLink}
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors group"
              >
                {aboutSection.ctaText}
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </FadeIn>
          </div>

          {/* Right Blocks */}
          <div className="grid grid-cols-3 gap-0 h-full">
            {aboutBlocks.map((block, index) => (
              <FadeIn key={block.id} direction="down" delay={0.3 + index * 0.1}>
                <Link
                  href={block.link}
                  className="items group relative h-full overflow-hidden block"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={block.image}
                      alt={`${block.title} ${block.subtitle}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>

                  {/* Content Overlay */}
                  <div className="content absolute inset-0 flex items-center justify-center p-6">
                    <div className="text-center">
                      <Image
                        src={block.icon}
                        alt=""
                        width={48}
                        height={48}
                        className="mx-auto mb-4 group-hover:scale-110 transition-transform"
                      />
                      <h3 className="text-white text-lg font-bold leading-tight">
                        {block.title}
                        <br />
                        {block.subtitle}
                      </h3>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/20 transition-colors duration-300" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
