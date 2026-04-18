'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchResourcesPage } from '@/store/resources/resourcesSlice';
import { safeImg } from '@/lib/utils/safeImg';
import * as fallback from '@/lib/data/resourcespage';
import { t } from '@/lib/i18n';

import FadeIn from '@/components/animations/FadeIn';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import BannerSection from '@/components/sections/BannerSection';
import VerticalPagination from '@/components/ui/VerticalPagination';
import Image from 'next/image';

interface Props {
  locale: string;
}

export default function ResourcesContent({ locale }: Props) {
  const dispatch = useAppDispatch();
  const api = useAppSelector((state) => state.resources);

  useEffect(() => {
    dispatch(fetchResourcesPage(locale));
  }, [dispatch, locale]);

  // Build data: API → fallback hardcoded
  const humanResources = api.human_resources
    ? {
        title: api.human_resources.title,
        description: api.human_resources.description,
        image: safeImg(api.human_resources.image),
        totalStaff: api.human_resources.total_staff,
        staffBreakdown: api.human_resources.staff_breakdown.map((s) => ({
          role: s.role,
          count: s.count,
        })),
      }
    : fallback.humanResources;

  const managementSystem = api.management_system
    ? {
        title: api.management_system.title,
        description: api.management_system.description,
        slogan: api.management_system.slogan,
        certificates: api.management_system.certificates.map((c) => ({
          id: c.id,
          name: c.name,
          title: c.title,
          image: safeImg(c.image),
        })),
      }
    : fallback.managementSystem;

  const projectsSectionData = api.projects_section
    ? {
        title: api.projects_section.title,
        totalProjects: api.projects_section.total_projects,
        backgroundImage: safeImg(api.projects_section.background_image),
      }
    : fallback.projectsSection;

  const projectsList = api.projects.length > 0
    ? api.projects.map((p) => ({
        id: p.id,
        name: p.name,
        location: p.location,
        province: p.province,
      }))
    : fallback.featuredProjects;

  const provincesList = api.provinces.length > 0 ? api.provinces : fallback.provinces;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <VerticalPagination totalSections={5} />

      <main className="relative">
        {/* Section 1: Banner */}
        <BannerSection />

        {/* Section 2: Nguồn nhân lực */}
        <HumanResourcesSection data={humanResources} />

        {/* Section 3: Hệ thống quản lý */}
        <ManagementSystemSection data={managementSystem} />

        {/* Section 4: Dự án */}
        <ProjectsSection
          section={projectsSectionData}
          projects={projectsList}
          provinces={provincesList}
          locale={locale}
        />

        <section className="h-20 bg-gray-50" />
      </main>

      <Footer locale={locale} />
    </div>
  );
}

// ========== SECTION COMPONENTS ==========

interface HumanResourcesProps {
  data: {
    title: string;
    description: string;
    image: string;
    totalStaff: string;
    staffBreakdown: { role: string; count: number }[];
  };
}

function HumanResourcesSection({ data }: HumanResourcesProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <FadeIn direction="left" delay={0.2}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={data.image}
                alt="Nguồn nhân lực"
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>

          {/* Right: Content */}
          <div className="space-y-8">
            <FadeIn direction="right" delay={0.3}>
              <h2 className="text-3xl lg:text-4xl font-bold text-red-600">
                {data.title}
              </h2>
              <p className="text-gray-700 leading-relaxed mt-4">
                {data.description}
              </p>
            </FadeIn>

            {/* Stats */}
            <FadeIn direction="right" delay={0.4}>
              <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-sm opacity-80">TỔNG NHÂN SỰ</span>
                    <h3 className="text-4xl font-bold">{data.totalStaff}</h3>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                </div>

                <div className="space-y-3">
                  {data.staffBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-white/90">{item.role}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">
                          {item.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </span>
                        <svg className="w-4 h-4 opacity-70" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ManagementSystemProps {
  data: {
    title: string;
    description: string;
    slogan: string;
    certificates: { id: number; name: string; title: string; image: string }[];
  };
}

function ManagementSystemSection({ data }: ManagementSystemProps) {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <FadeIn direction="up" delay={0.2}>
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {data.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {data.description}
            </p>
            <p className="text-gray-600 italic">
              {data.slogan}
            </p>
          </div>
        </FadeIn>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {data.certificates.map((cert, index) => (
            <FadeIn key={cert.id} direction="up" delay={0.3 + index * 0.1}>
              <div
                className="group cursor-pointer"
                onClick={() => setSelectedCert(index)}
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow">
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="font-bold">{cert.name}</p>
                    <p className="text-sm text-white/80">{cert.title}</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-bold text-gray-900">{cert.name}</h3>
                  <p className="text-sm text-gray-600">{cert.title}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedCert !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-[70] flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedCert(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation */}
          <button
            className="absolute left-4 text-white hover:text-gray-300 transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCert(selectedCert === 0 ? data.certificates.length - 1 : selectedCert - 1);
            }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            className="absolute right-4 text-white hover:text-gray-300 transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCert(selectedCert === data.certificates.length - 1 ? 0 : selectedCert + 1);
            }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            className="relative max-w-3xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={data.certificates[selectedCert].image}
              alt={data.certificates[selectedCert].name}
              width={800}
              height={1100}
              className="w-full h-auto object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-2 rounded-lg text-white text-center">
              <p className="font-bold">{data.certificates[selectedCert].name}</p>
              <p className="text-sm text-white/80">{data.certificates[selectedCert].title}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

interface ProjectsSectionProps {
  section: {
    title: string;
    totalProjects: string;
    backgroundImage: string;
  };
  projects: { id: number; name: string; location: string; province: string }[];
  provinces: string[];
  locale: string;
}

function ProjectsSection({ section, projects, provinces, locale }: ProjectsSectionProps) {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const allProvinceLabel = t(locale, 'resources.all');
  const allProvinceLabels = new Set(['Tất cả', 'All', '全部', '전체', allProvinceLabel]);
  const provinceOptions = Array.from(
    new Set(provinces.filter((province) => province && !allProvinceLabels.has(province.trim())))
  );
  const formatText = (key: string, values: Record<string, string | number>) =>
    Object.entries(values).reduce(
      (text, [name, value]) => text.replace(`{${name}}`, String(value)),
      t(locale, key)
    );

  const filteredProjects = selectedProvince === null
    ? projects
    : projects.filter(p => p.province === selectedProvince);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  return (
    <section className="py-20 relative">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={section.backgroundImage}
          alt="Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <FadeIn direction="left" delay={0.2}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
              <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-sm opacity-80">Số dự án</span>
                  <h3 className="text-2xl font-bold">{section.totalProjects}</h3>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Filter */}
          <FadeIn direction="up" delay={0.3}>
            <div className="lg:col-span-2">
              <h5 className="text-white font-medium mb-3">Lọc theo tỉnh thành</h5>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setSelectedProvince(null);
                    setVisibleCount(12);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedProvince === null
                      ? 'bg-red-600 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {allProvinceLabel}
                </button>

                {provinceOptions.map((province) => (
                  <button
                    key={province}
                    onClick={() => {
                      setSelectedProvince(province);
                      setVisibleCount(12);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedProvince === province
                        ? 'bg-red-600 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {province}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, index) => (
            <FadeIn key={project.id} direction="up" delay={0.1 + (index % 6) * 0.05}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-colors group cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/70 text-sm mb-1">
                      {project.location}, {project.province}
                    </p>
                    <h3 className="text-white font-medium text-sm leading-tight group-hover:text-red-400 transition-colors line-clamp-2">
                      {project.name}
                    </h3>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Load more */}
        {visibleCount < filteredProjects.length && (
          <FadeIn direction="up" delay={0.4}>
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleCount(prev => prev + 12)}
                className="px-8 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
              >
                {formatText('resources.loadMoreProjects', {
                  count: filteredProjects.length - visibleCount,
                })}
              </button>
            </div>
          </FadeIn>
        )}

        {/* No results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/70">
              {selectedProvince
                ? formatText('resources.noProjectsInProvince', { province: selectedProvince })
                : t(locale, 'resources.noProjects')}
            </p>
          </div>
        )}

        {/* Stats summary */}
        <FadeIn direction="up" delay={0.5}>
          <div className="mt-12 text-center text-white/60 text-sm">
            {formatText('resources.showingSummary', {
              visible: visibleProjects.length,
              total: filteredProjects.length,
            })}
            {selectedProvince && ` ${formatText('resources.inProvince', { province: selectedProvince })}`}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
