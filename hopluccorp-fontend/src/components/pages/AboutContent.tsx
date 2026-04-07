'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchAboutPage } from '@/store/about/aboutSlice';
import { safeImg } from '@/lib/utils/safeImg';
import { t } from '@/lib/i18n';
import * as fallback from '@/lib/data/aboutpage';

import FadeIn from '@/components/animations/FadeIn';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import BannerSection from '@/components/sections/BannerSection';
import VerticalPagination from '@/components/ui/VerticalPagination';
import Image from 'next/image';
import React, { useState } from 'react';

interface Props {
  locale: string;
}

export default function AboutContent({ locale }: Props) {
  const dispatch = useAppDispatch();
  const api = useAppSelector((state) => state.about);

  useEffect(() => {
    dispatch(fetchAboutPage(locale));
  }, [dispatch, locale]);

  // Build data: API → fallback hardcoded
  const leaderMessage = api.leader_message
    ? {
        title: api.leader_message.title,
        subtitle: api.leader_message.subtitle,
        slogan: api.leader_message.slogan,
        content: api.leader_message.content,
        leaderImage: safeImg(api.leader_message.leader_image),
        leaderName: api.leader_message.leader_name,
        leaderPosition: api.leader_message.leader_position,
        signatureImage: safeImg(api.leader_message.signature_image),
      }
    : {
        ...fallback.leaderMessage,
        content: fallback.leaderMessage.content.map((p) => `<p>${p}</p>`).join(''),
      };

  const historyTimeline = api.history_items.length
    ? api.history_items.map((item) => ({
        id: item.id,
        year: item.year,
        image: safeImg(item.image),
        description: item.description,
      }))
    : fallback.historyTimeline;

  const coreValues = api.core_values.length
    ? api.core_values.map((v) => ({
        id: v.id,
        icon: safeImg(v.icon),
        title: v.title,
      }))
    : fallback.coreValues;

  const visionMission = api.vision_mission
    ? {
        vision: {
          title: api.vision_mission.vision_title,
          content: api.vision_mission.vision_content,
          image: safeImg(api.vision_mission.vision_image),
        },
        mission: {
          title: api.vision_mission.mission_title,
          content: api.vision_mission.mission_content,
          image: safeImg(api.vision_mission.mission_image),
        },
      }
    : fallback.visionMission;

  const leadershipTeam = api.leadership_members.length
    ? api.leadership_members.map((m) => ({
        id: m.id,
        name: m.name,
        position: m.position,
        image: safeImg(m.image),
      }))
    : fallback.leadershipTeam;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <VerticalPagination totalSections={7} />

      <main className="relative">
        {/* Section 1: Banner Slider */}
        <BannerSection />

        {/* Section 2: Thông điệp lãnh đạo */}
        <LeaderMessageSection data={leaderMessage} />

        {/* Section 3: Lịch sử hình thành */}
        <HistorySection items={historyTimeline} locale={locale} />

        {/* Section 4: Giá trị cốt lõi */}
        <CoreValuesSection values={coreValues} locale={locale} />

        {/* Section 5: Tầm nhìn & Sứ mệnh */}
        <VisionMissionSection data={visionMission} />

        {/* Section 6: Ban lãnh đạo */}
        <LeadershipSection members={leadershipTeam} locale={locale} />

        {/* Section 7: Footer section placeholder */}
        <section className="h-20 bg-gray-50" />
      </main>

      <Footer locale={locale} />
    </div>
  );
}

// ========== SECTION COMPONENTS ==========

interface LeaderMessageProps {
  data: {
    title: string;
    subtitle: string;
    slogan: string;
    content: string; // HTML string
    leaderImage: string;
    leaderName: string;
    leaderPosition: string;
    signatureImage: string;
  };
}

function LeaderMessageSection({ data }: LeaderMessageProps) {
  return (
    <section className="min-h-screen relative bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Leader Image */}
          <FadeIn direction="left" delay={0.2}>
            <div className="relative">
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={data.leaderImage}
                  alt={data.leaderName}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white/80 text-sm">{data.leaderPosition}</p>
                  <h3 className="text-white text-xl font-bold">{data.leaderName}</h3>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: Content */}
          <div className="space-y-6">
            <FadeIn direction="right" delay={0.3}>
              <div className="title-main">
                <span className="text-red-600 text-sm font-medium uppercase tracking-wider">
                  {data.title}
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-2">
                  {data.subtitle}
                </h2>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.4}>
              <div className="border-l-4 border-red-600 pl-6">
                <p className="text-red-600 font-bold text-lg">
                  {data.slogan}
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.5}>
              <div className="relative mb-6">
                <img
                  src={data.signatureImage}
                  alt="Thư ngỏ"
                  className="max-w-[200px]"
                />
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.6}>
              <div
                className="space-y-4 text-gray-700 text-sm leading-relaxed max-h-[400px] overflow-y-auto pr-4 scrollbar-hide [&>p:first-child]:font-semibold"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
              <div className="pt-4">
                <p className="font-medium">{data.leaderName}</p>
                <p className="text-gray-500">{data.leaderPosition}</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

interface HistorySectionProps {
  items: { id: number; year: string; image: string; description: string }[];
  locale: string;
}

function HistorySection({ items, locale }: HistorySectionProps) {
  const [activeYear, setActiveYear] = useState(items[items.length - 2] || items[0]);

  // Sync activeYear khi items thay đổi (API load xong)
  useEffect(() => {
    if (items.length > 1) {
      setActiveYear(items[items.length - 2]);
    } else if (items.length > 0) {
      setActiveYear(items[0]);
    }
  }, [items]);

  if (!activeYear) return null;

  return (
    <section className="min-h-screen relative bg-white py-20">
      <div className="container mx-auto px-6">
        <FadeIn direction="down" delay={0.2}>
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">{t(locale, 'about.history')}</h2>
            <span className="text-red-600 text-lg font-semibold uppercase tracking-wider">
              {t(locale, 'about.historyHighlight')}
            </span>
          </div>
        </FadeIn>

        {/* Timeline Navigation */}
        <FadeIn direction="up" delay={0.3}>
          <div className="flex justify-center mb-12 overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-2 md:gap-4">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveYear(item)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeYear.id === item.id
                      ? 'bg-red-600 text-white shadow-lg scale-110'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {item.year}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <FadeIn direction="left" delay={0.4} key={activeYear.id}>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={activeYear.image}
                alt={`${t(locale, 'about.historyYear')} ${activeYear.year}`}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-2xl">
                {activeYear.year}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.5} key={`content-${activeYear.id}`}>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-red-600 mb-6">
                {t(locale, 'about.historyYear')} {activeYear.year}
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {activeYear.description}
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Timeline dots */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2">
            {items.map((item, index) => (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => setActiveYear(item)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeYear.id === item.id
                      ? 'bg-red-600 scale-150'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
                {index < items.length - 1 && (
                  <div className="w-8 h-0.5 bg-gray-200" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface CoreValuesSectionProps {
  values: { id: number; icon: string; title: string }[];
  locale: string;
}

function CoreValuesSection({ values, locale }: CoreValuesSectionProps) {
  return (
    <section className="min-h-screen relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={fallback.aboutBackgrounds.coreValues}
          alt="Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <FadeIn direction="down" delay={0.2}>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">
              {t(locale, 'about.coreValues')}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {values.map((value, index) => (
              <FadeIn key={value.id} direction="up" delay={0.3 + index * 0.1}>
                <div className="group text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                    <Image
                      src={value.icon}
                      alt={value.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-gray-900 font-semibold">
                    {value.title}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface VisionMissionSectionProps {
  data: {
    vision: { title: string; content: string; image: string };
    mission: { title: string; content: string; image: string };
  };
}

function VisionMissionSection({ data }: VisionMissionSectionProps) {
  return (
    <section className="min-h-screen relative">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full min-h-screen">
        {/* Vision */}
        <div
          className="relative min-h-[50vh] md:min-h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${data.vision.image})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 h-full flex items-center justify-center p-8 md:p-12">
            <FadeIn direction="left" delay={0.3}>
              <div className="max-w-lg text-white">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  {data.vision.title}
                </h2>
                <p className="text-lg leading-relaxed text-white/90">
                  {data.vision.content}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Mission */}
        <div
          className="relative min-h-[50vh] md:min-h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${data.mission.image})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 h-full flex items-center justify-center p-8 md:p-12">
            <FadeIn direction="right" delay={0.4}>
              <div className="max-w-lg text-white">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                  {data.mission.title}
                </h2>
                <p className="text-lg leading-relaxed text-white/90">
                  {data.mission.content}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

interface LeadershipSectionProps {
  members: { id: number; name: string; position: string; image: string }[];
  locale: string;
}

function LeadershipSection({ members, locale }: LeadershipSectionProps) {
  return (
    <section className="min-h-screen relative bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <FadeIn direction="down" delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              {t(locale, 'about.leadership')}
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {members.map((leader, index) => (
            <FadeIn key={leader.id} direction="up" delay={0.3 + index * 0.1}>
              <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-red-400 text-sm font-medium mb-1">
                      {leader.position}
                    </p>
                    <h3 className="text-xl font-bold">
                      {leader.name}
                    </h3>
                  </div>
                </div>
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-red-600 rounded-2xl transition-colors" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
