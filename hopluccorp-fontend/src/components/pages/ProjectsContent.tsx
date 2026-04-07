'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchProjects } from '@/store/projects/projectsSlice';
import { safeImg } from '@/lib/utils/safeImg';
import * as fallback from '@/lib/data/projectspage';
import type { Project } from '@/lib/data/projectspage';

import FadeIn from '@/components/animations/FadeIn';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import BannerSection from '@/components/sections/BannerSection';
import VerticalPagination from '@/components/ui/VerticalPagination';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  locale: string;
}

export default function ProjectsContent({ locale }: Props) {
  const dispatch = useAppDispatch();
  const api = useAppSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects(locale));
  }, [dispatch, locale]);

  // Build data: API → fallback
  const categories = api.categories.length
    ? [
        { id: 'all', name: 'Tất cả', slug: 'tat-ca' },
        ...api.categories.map((c) => ({ id: c.slug, name: c.name, slug: c.slug })),
      ]
    : fallback.projectCategories;

  const projectsList: Project[] = api.projects.length
    ? api.projects.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        image: safeImg(p.image),
        category: p.category || '',
        location: p.location,
        scale: p.scale,
        progress: p.progress,
        year: p.year,
        status: (p.status === 'completed' ? 'completed' : 'ongoing') as 'ongoing' | 'completed',
      }))
    : fallback.projectsList;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <VerticalPagination totalSections={3} />

      <main className="relative">
        <BannerSection />
        <ProjectsListSection
          categories={categories}
          projectsList={projectsList}
          locale={locale}
        />
        <section className="h-20 bg-gray-50" />
      </main>

      <Footer />
    </div>
  );
}

// ========== SECTION COMPONENTS ==========

interface ProjectsListProps {
  categories: { id: string; name: string; slug: string }[];
  projectsList: Project[];
  locale: string;
}

function ProjectsListSection({ categories, projectsList, locale }: ProjectsListProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Tất cả');
  const [selectedYear, setSelectedYear] = useState('Tất cả');
  const [selectedProgress, setSelectedProgress] = useState('Tất cả');
  const [visibleCount, setVisibleCount] = useState(9);

  // Extract unique locations and years from data
  const locations = useMemo(() => {
    const locs = new Set(projectsList.map((p) => p.location).filter(Boolean));
    return ['Tất cả', ...Array.from(locs).sort()];
  }, [projectsList]);

  const years = useMemo(() => {
    const yrs = new Set(projectsList.map((p) => p.year).filter(Boolean));
    return ['Tất cả', ...Array.from(yrs).sort((a, b) => b.localeCompare(a))];
  }, [projectsList]);

  const filteredProjects = useMemo(() => {
    return projectsList.filter((project) => {
      if (activeCategory !== 'all' && project.category !== activeCategory) return false;
      if (searchKeyword && !project.name.toLowerCase().includes(searchKeyword.toLowerCase())) return false;
      if (selectedLocation !== 'Tất cả' && project.location !== selectedLocation) return false;
      if (selectedYear !== 'Tất cả' && project.year !== selectedYear) return false;
      if (selectedProgress !== 'Tất cả') {
        if (selectedProgress === 'Đang thực hiện' && project.status !== 'ongoing') return false;
        if (selectedProgress === 'Hoàn thành' && project.status !== 'completed') return false;
      }
      return true;
    });
  }, [activeCategory, searchKeyword, selectedLocation, selectedYear, selectedProgress, projectsList]);

  const highlightProjects = filteredProjects.slice(0, 3);
  const remainingProjects = filteredProjects.slice(3, 3 + visibleCount);

  const resetFilters = () => {
    setActiveCategory('all');
    setSearchKeyword('');
    setSelectedLocation('Tất cả');
    setSelectedYear('Tất cả');
    setSelectedProgress('Tất cả');
    setVisibleCount(9);
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        {/* Category Tabs */}
        <FadeIn direction="down" delay={0.1}>
          <div className="flex flex-wrap gap-1 mb-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setVisibleCount(9);
                }}
                className={`px-6 py-3 font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Filter Bar */}
        <FadeIn direction="up" delay={0.2}>
          <div className="flex flex-wrap items-center gap-4 mb-8 bg-gray-800 p-2 rounded-sm">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Nhập tên dự án"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full px-4 py-3 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 bg-gray-700 text-white border-0 focus:outline-none focus:ring-2 focus:ring-red-500 min-w-[150px]"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc === 'Tất cả' ? 'Vị trí' : loc}</option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-3 bg-gray-700 text-white border-0 focus:outline-none focus:ring-2 focus:ring-red-500 min-w-[150px]"
            >
              {years.map((year) => (
                <option key={year} value={year}>{year === 'Tất cả' ? 'Thời gian' : year}</option>
              ))}
            </select>

            <select
              value={selectedProgress}
              onChange={(e) => setSelectedProgress(e.target.value)}
              className="px-4 py-3 bg-gray-700 text-white border-0 focus:outline-none focus:ring-2 focus:ring-red-500 min-w-[150px]"
            >
              {fallback.projectProgress.map((prog) => (
                <option key={prog} value={prog}>{prog === 'Tất cả' ? 'Tiến độ' : prog}</option>
              ))}
            </select>

            <button
              onClick={() => {}}
              className="px-8 py-3 bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
            >
              Tìm kiếm
            </button>
          </div>
        </FadeIn>

        {/* Highlight Projects */}
        {highlightProjects.length > 0 && (
          <FadeIn direction="up" delay={0.3}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
              <div className="lg:col-span-2">
                <ProjectCardHover project={highlightProjects[0]} size="large" locale={locale} />
              </div>
              {highlightProjects.length >= 2 && (
                <div className="flex flex-col gap-4">
                  <ProjectCardHover project={highlightProjects[1]} size="small" locale={locale} />
                  {highlightProjects[2] && (
                    <ProjectCardHover project={highlightProjects[2]} size="small" locale={locale} />
                  )}
                </div>
              )}
            </div>
          </FadeIn>
        )}

        {/* Remaining Projects Grid */}
        {remainingProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {remainingProjects.map((project, index) => (
              <FadeIn key={project.id} direction="up" delay={0.1 + (index % 6) * 0.05}>
                <ProjectCardHover project={project} size="medium" locale={locale} />
              </FadeIn>
            ))}
          </div>
        )}

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <FadeIn direction="up" delay={0.3}>
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 text-lg">Không tìm thấy dự án nào phù hợp</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                Xóa bộ lọc
              </button>
            </div>
          </FadeIn>
        )}

        {/* Load more */}
        {visibleCount + 3 < filteredProjects.length && (
          <FadeIn direction="up" delay={0.4}>
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleCount((prev) => prev + 9)}
                className="px-8 py-3 bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
              >
                Xem thêm ({filteredProjects.length - visibleCount - 3} dự án)
              </button>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

// Project Card with Hover Effect
function ProjectCardHover({
  project,
  size = 'medium',
  locale,
}: {
  project: Project;
  size?: 'large' | 'medium' | 'small';
  locale: string;
}) {
  const heightClass = size === 'large' ? 'h-[500px]' : size === 'small' ? 'h-[240px]' : 'h-[300px]';

  return (
    <Link
      href={`/${locale}/du-an/${project.slug}`}
      className={`group block relative overflow-hidden ${heightClass}`}
    >
      <Image
        src={project.image}
        alt={project.name}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-700"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:opacity-0 transition-opacity duration-500" />

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'linear-gradient(to top, rgba(220, 38, 38, 0.9) 0%, rgba(220, 38, 38, 0.5) 15%, rgba(220, 38, 38, 0.2) 28%, transparent 35%)',
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-[calc(100%-70px)] group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <h3
          className={`font-bold text-white mb-3 line-clamp-2 drop-shadow-lg ${size === 'large' ? 'text-xl' : 'text-base'}`}
        >
          {project.name}
        </h3>

        <div className="w-16 h-0.5 bg-white/60 mb-4" />

        <div className="flex flex-wrap gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-white drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div>
              <p className="text-white/80 text-xs font-medium">Quy mô</p>
              <p className="text-white font-semibold text-sm drop-shadow">{project.scale}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-white drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-white/80 text-xs font-medium">Tiến độ</p>
              <p className="text-white font-semibold text-sm whitespace-pre-line drop-shadow">{project.progress}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
