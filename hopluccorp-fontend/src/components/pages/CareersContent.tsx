'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchCareersPage } from '@/store/careers/careersSlice';
import { t } from '@/lib/i18n';
import * as fallback from '@/lib/data/careerspage';
import { safeImg } from '@/lib/utils/safeImg';

import FadeIn from '@/components/animations/FadeIn';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import BannerSection from '@/components/sections/BannerSection';
import VerticalPagination from '@/components/ui/VerticalPagination';

interface Props {
  locale: string;
}

export default function CareersContent({ locale }: Props) {
  const dispatch = useAppDispatch();
  const api = useAppSelector((state) => state.careers);

  // Filter state
  const [keyword, setKeyword] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // Fix #2: track the specific job to apply, null = modal đóng
  const [applyJob, setApplyJob] = useState<{ id: number; title: string } | null>(null);

  const doFetch = useCallback(
    (page = 1, kw = keyword, province = selectedProvince, company = selectedCompany) => {
      dispatch(
        fetchCareersPage({
          locale,
          keyword: kw,
          province,
          company,
          page,
        })
      );
    },
    [dispatch, locale, keyword, selectedProvince, selectedCompany]
  );

  useEffect(() => {
    doFetch(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    doFetch(1);
  };

  const handleReset = () => {
    setKeyword('');
    setSelectedProvince('');
    setSelectedCompany('');
    setCurrentPage(1);
    dispatch(fetchCareersPage({ locale, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    doFetch(page);
    document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- Build data with fallback ---
  // Fix #1: chỉ dùng fallback khi chưa fetch thành công (api.loaded = false).
  // Sau khi loaded = true thì dùng đúng api.jobs, kể cả khi = [] (empty state hợp lệ).
  const apiReady = api.loaded && !api.loading;
  const jobs = apiReady ? api.jobs : fallback.fallbackJobs;
  const totalPages = apiReady ? api.total_pages : 1;
  const totalCount = apiReady ? api.total_count : fallback.fallbackJobs.length;

  // Config data (companies/provinces/benefits): fallback khi API chưa trả dữ liệu
  const companies = api.companies.length ? api.companies : fallback.fallbackCompanies;
  const provinces = api.provinces.length ? api.provinces : fallback.fallbackProvinces;
  const benefits = api.benefits.length ? api.benefits : fallback.workBenefits;

  const hasCulturePhotos = api.culture_photos.some((p) => !!p.image);
  const culturePhotos = hasCulturePhotos
    ? api.culture_photos.filter((p) => !!p.image).map((p) => ({ image: safeImg(p.image), alt: p.alt }))
    : fallback.careersCulturePhotos.map((img, i) => ({ image: img, alt: `Culture ${i + 1}` }));

  // Fix #4: dùng banner từ API nếu có, fallback nếu không
  const bannerImg =
    api.page_config?.banner_image ? safeImg(api.page_config.banner_image) : fallback.careersBanner;
  const banners = [{ id: 1, image: bannerImg, alt: t(locale, 'careers.banner') }];

  const cultureTitle = api.page_config?.culture_title || t(locale, 'careers.culture.title');
  const cultureSubtitle = api.page_config?.culture_subtitle || t(locale, 'careers.culture.subtitle');
  const cultureVideo = api.page_config?.culture_video_url || fallback.careersCultureVideo;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <VerticalPagination totalSections={5} />

      <main className="relative">
        {/* Section 1: Banner */}
        <BannerSection banners={banners} />

        {/* Section 2: Văn hóa */}
        <CultureSection
          title={cultureTitle}
          subtitle={cultureSubtitle}
          videoUrl={cultureVideo}
          photos={culturePhotos}
          locale={locale}
        />

        {/* Section 3: Phúc lợi */}
        <BenefitsSection benefits={benefits} locale={locale} />

        {/* Section 4: Danh sách Jobs */}
        <section id="jobs-section" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            {/* Heading */}
            <FadeIn direction="up" delay={0.1}>
              <div className="text-center mb-12">
                <p className="text-red-600 font-semibold text-sm uppercase tracking-widest mb-2">
                  {t(locale, 'careers.jobs.title')}
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {t(locale, 'careers.jobs.titleHighlight')}
                </h2>
                <div className="w-16 h-1 bg-red-600 mx-auto mt-4" />
              </div>
            </FadeIn>

            {/* Filter form */}
            <FadeIn direction="up" delay={0.15}>
              <form
                onSubmit={handleSearch}
                className="bg-white rounded-2xl shadow-md p-6 mb-10 grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder={t(locale, 'careers.jobs.keywordPlaceholder')}
                  className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 col-span-1 md:col-span-1"
                />
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">{t(locale, 'careers.jobs.allProvinces')}</option>
                  {provinces.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <select
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">{t(locale, 'careers.jobs.allCompanies')}</option>
                  {companies.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 text-white rounded-lg px-4 py-2.5 text-sm font-semibold hover:bg-red-700 transition-colors"
                  >
                    {t(locale, 'careers.jobs.search')}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2.5 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {t(locale, 'careers.jobs.reset')}
                  </button>
                </div>
              </form>
            </FadeIn>

            {/* Loading */}
            {api.loading && (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {/* Job list */}
            {!api.loading && (
              <>
                {/* Fix #1: empty state chỉ hiện khi đã fetch xong (apiReady) và thực sự không có kết quả */}
                {apiReady && jobs.length === 0 ? (
                  <p className="text-center text-gray-500 py-12">{t(locale, 'careers.jobs.noResults')}</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {jobs.map((job, i) => (
                      <FadeIn key={job.id} direction="up" delay={0.1 + i * 0.05}>
                        {/* Fix #2: truyền job context vào onApply */}
                        <JobCard
                          job={job}
                          locale={locale}
                          onApply={() => setApplyJob({ id: job.id, title: job.title })}
                        />
                      </FadeIn>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-40 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => handlePageChange(p)}
                        className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
                          p === currentPage
                            ? 'bg-red-600 text-white'
                            : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-40 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Total count */}
                <p className="text-center text-sm text-gray-400 mt-4">
                  {totalCount} {t(locale, 'careers.jobs.quantity')}
                </p>
              </>
            )}
          </div>
        </section>

        {/* Section 5: Footer placeholder */}
        <section className="h-20 bg-white" />
      </main>

      <Footer locale={locale} />

      {/* Fix #2: mount modal chỉ khi có job cụ thể, truyền đúng jobTitle + jobId */}
      {applyJob !== null && (
        <ApplyModal
          locale={locale}
          jobTitle={applyJob.title}
          jobId={applyJob.id > 0 ? applyJob.id : undefined}
          onClose={() => setApplyJob(null)}
        />
      )}
    </div>
  );
}

// ========== CULTURE SECTION ==========
function CultureSection({
  title,
  subtitle,
  videoUrl,
  photos,
  locale,
}: {
  title: string;
  subtitle: string;
  videoUrl: string;
  photos: { image: string; alt: string }[];
  locale: string;
}) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <FadeIn direction="up" delay={0.1}>
          <div className="text-center mb-12">
            <p className="text-red-600 font-semibold text-sm uppercase tracking-widest mb-2">
              {t(locale, 'careers.banner')}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-gray-500 mt-4 max-w-2xl mx-auto">{subtitle}</p>}
            <div className="w-16 h-1 bg-red-600 mx-auto mt-4" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Video */}
          <FadeIn direction="left" delay={0.2}>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={videoUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </FadeIn>

          {/* Photos grid */}
          <FadeIn direction="right" delay={0.2}>
            <div className="grid grid-cols-2 gap-3">
              {photos.slice(0, 4).map((photo, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md">
                  <Image
                    src={photo.image}
                    alt={photo.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ========== BENEFITS SECTION ==========
interface BenefitItem {
  id: number;
  icon_type: 'text' | 'image';
  icon_text: string;
  icon_image?: string | null;
  title: string;
  description: string;
}

function BenefitsSection({ benefits, locale }: { benefits: BenefitItem[]; locale: string }) {
  return (
    <section className="py-20 bg-red-600">
      <div className="container mx-auto px-6">
        <FadeIn direction="up" delay={0.1}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              {t(locale, 'careers.benefits.title')}
            </h2>
            <div className="w-16 h-1 bg-white mx-auto mt-4" />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((item, i) => (
            <FadeIn key={item.id} direction="up" delay={0.1 + i * 0.1}>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center text-white hover:bg-white/20 transition-colors">
                {/* Icon */}
                <div className="flex items-center justify-center mb-5">
                  {item.icon_type === 'image' && item.icon_image ? (
                    <Image
                      src={item.icon_image}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-contain"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                      {item.icon_text}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========== JOB CARD ==========
interface JobCardProps {
  job: {
    id: number;
    title: string;
    slug: string;
    quantity: number;
    province: string;
    location_display: string;
    level: string;
    industry: string;
    company: { id: number; name: string; slug: string; logo: string | null } | null;
    published_at: string | null;
  };
  locale: string;
  onApply: (job: { id: number; title: string }) => void;
}

function JobCard({ job, locale, onApply }: JobCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2 flex-1">
          {job.title}
        </h3>
        <span className="flex-shrink-0 bg-red-50 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
          {job.quantity} {t(locale, 'careers.jobs.quantity')}
        </span>
      </div>

      {/* Meta */}
      <div className="space-y-1.5 text-sm text-gray-500">
        {job.company && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="line-clamp-1">{job.company.name}</span>
          </div>
        )}
        {job.location_display && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">{job.location_display}</span>
          </div>
        )}
        {job.level && (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span>{job.level}</span>
          </div>
        )}
        {job.published_at && (
          <p className="text-xs text-gray-400">
            {t(locale, 'careers.jobs.publishedAt')} {job.published_at}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-2">
        <Link
          href={`/${locale}/tuyen-dung/${job.slug}`}
          className="flex-1 text-center text-sm font-semibold text-red-600 border border-red-200 rounded-lg py-2 hover:bg-red-50 transition-colors"
        >
          {t(locale, 'careers.jobs.viewDetail')}
        </Link>
        <button
          onClick={() => onApply({ id: job.id, title: job.title })}
          className="flex-1 text-center text-sm font-semibold text-white bg-red-600 rounded-lg py-2 hover:bg-red-700 transition-colors"
        >
          {t(locale, 'careers.jobs.apply')}
        </button>
      </div>
    </div>
  );
}

// ========== APPLY MODAL ==========
interface ApplyModalProps {
  locale: string;
  jobTitle: string;
  jobId?: number;
  onClose: () => void;
}

export function ApplyModal({ locale, jobTitle, jobId, onClose }: ApplyModalProps) {
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    phone: '',
    birthday: '',
    sex: '',
    nationality: 'Việt Nam',
    address: '',
    position: jobTitle,
    cv_file: null as File | null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm((prev) => ({ ...prev, cv_file: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const { default: axiosInstance } = await import('@/lib/axios');
      const formData = new FormData();
      formData.append('fullname', form.fullname);
      formData.append('email', form.email);
      if (form.phone) formData.append('phone', form.phone);
      if (form.birthday) formData.append('birthday', form.birthday);
      if (form.sex) formData.append('sex', form.sex);
      if (form.nationality) formData.append('nationality', form.nationality);
      if (form.address) formData.append('address', form.address);
      if (form.position) formData.append('position', form.position);
      if (jobId) formData.append('job', String(jobId));
      if (form.cv_file) formData.append('cv_file', form.cv_file);

      await axiosInstance.post('/api/pages/careers/apply/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess(true);
    } catch {
      setError(t(locale, 'careers.form.error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 z-[80] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-red-600 rounded-t-2xl px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-bold text-lg">{t(locale, 'careers.form.title')}</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-700 font-medium">{t(locale, 'careers.form.success')}</p>
              <button
                onClick={onClose}
                className="mt-6 px-8 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                OK
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Fullname */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t(locale, 'careers.form.fullname')}
                  </label>
                  <input
                    name="fullname" required value={form.fullname} onChange={handleChange}
                    placeholder={t(locale, 'careers.form.fullnamePlaceholder')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t(locale, 'careers.form.email')}
                  </label>
                  <input
                    name="email" type="email" required value={form.email} onChange={handleChange}
                    placeholder={t(locale, 'careers.form.emailPlaceholder')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t(locale, 'careers.form.phone')}
                  </label>
                  <input
                    name="phone" value={form.phone} onChange={handleChange}
                    placeholder={t(locale, 'careers.form.phonePlaceholder')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                {/* Birthday */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t(locale, 'careers.form.birthday')}
                  </label>
                  <input
                    name="birthday" type="date" value={form.birthday} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                {/* Sex */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t(locale, 'careers.form.sex')}
                  </label>
                  <select
                    name="sex" value={form.sex} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">—</option>
                    <option value="male">{t(locale, 'careers.form.sexMale')}</option>
                    <option value="female">{t(locale, 'careers.form.sexFemale')}</option>
                    <option value="other">{t(locale, 'careers.form.sexOther')}</option>
                  </select>
                </div>
                {/* Nationality */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t(locale, 'careers.form.nationality')}
                  </label>
                  <input
                    name="nationality" value={form.nationality} onChange={handleChange}
                    placeholder={t(locale, 'careers.form.nationalityPlaceholder')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t(locale, 'careers.form.address')}
                </label>
                <input
                  name="address" value={form.address} onChange={handleChange}
                  placeholder={t(locale, 'careers.form.addressPlaceholder')}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t(locale, 'careers.form.position')}
                </label>
                <input
                  name="position" value={form.position} onChange={handleChange}
                  placeholder={t(locale, 'careers.form.positionPlaceholder')}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* CV */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t(locale, 'careers.form.cv')}
                </label>
                <input
                  type="file" accept=".pdf,.doc,.docx" onChange={handleFile}
                  className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-600 hover:file:bg-red-100 cursor-pointer"
                />
                <p className="text-xs text-gray-400 mt-1">{t(locale, 'careers.form.cvHelp')}</p>
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-red-600 text-white rounded-lg py-3 font-semibold hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                {submitting ? t(locale, 'careers.form.submitting') : t(locale, 'careers.form.submit')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
