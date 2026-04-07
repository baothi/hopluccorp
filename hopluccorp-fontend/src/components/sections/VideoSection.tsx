'use client';

import { useState } from 'react';
import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';

interface Props {
  video: {
    title: string;
    subtitle: string;
    youtubeId: string;
    thumbnail: string;
  };
}

export default function VideoSection({ video }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="site-video relative overflow-hidden py-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        {video.thumbnail ? (
          <Image
            src={video.thumbnail}
            alt="Video Background"
            fill
            className="object-cover"
            quality={90}
          />
        ) : (
          <Image
            src="/images/video-background.jpg"
            alt="Video Background"
            fill
            className="object-cover"
            quality={90}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <FadeIn direction="up" delay={0.3}>
            <h3 className="text-red-500 text-lg font-semibold uppercase tracking-wider mb-4">
              {video.title}
            </h3>
          </FadeIn>

          <FadeIn direction="up" delay={0.5}>
            <h2 className="text-white text-3xl lg:text-4xl font-bold mb-12">
              {video.subtitle}
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={0.7}>
            <button
              onClick={() => setIsPlaying(true)}
              className="group relative inline-block"
              aria-label="Play video"
            >
              <div className="relative w-24 h-24 lg:w-32 lg:h-32">
                <div className="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-25" />
                <div className="absolute inset-0 bg-red-600 rounded-full group-hover:bg-red-700 transition-colors flex items-center justify-center">
                  <svg
                    className="w-12 h-12 lg:w-16 lg:h-16 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>
          </FadeIn>
        </div>
      </div>

      {/* Video Modal */}
      {isPlaying && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsPlaying(false)}
        >
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative w-full max-w-6xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
              title="Hợp Lực Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
