'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchJobDetail, clearJobDetail } from '@/store/careers/careersSlice';
import { t } from '@/lib/i18n';
import FadeIn from '@/components/animations/FadeIn';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { ApplyModal } from '@/components/pages/CareersContent';

interface Props {
  locale: string;
  slug: string;
}

export default function JobDetailContent({ locale, slug }: Props) {
  const dispatch = useAppDispatch();
  const { jobDetail, relatedJobs, detailLoading, detailError } = useAppSelector(
    (state) => state.careers
  );
  const [showApplyModal, setShowApplyModal] = useState(false);

  useEffect(() => {
    dispatch(fetchJobDetail({ slug, locale }));
    return () => {
      dispatch(clearJobDetail());
    };
  }, [dispatch, slug, locale]);

  if (detailLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer locale={locale} />
      </div>
    );
  }

  if (detailError || !jobDetail) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-6 py-24 text-center">
          <p className="text-gray-500 text-lg mb-6">{t(locale, 'careers.detail.notFound')}</p>
          <Link
            href={`/${locale}/tuyen-dung`}
            className="inline-flex items-center gap-2 text-red-600 font-semibold hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t(locale, 'careers.detail.backToList')}
          </Link>
        </div>
        <Footer locale={locale} />
      </div>
    );
  }

  const job = jobDetail;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero banner */}
      <div className="bg-gradient-to-r from-red-700 to-red-500 pt-24 pb-12">
        <div className="container mx-auto px-6">
          <FadeIn direction="up" delay={0.1}>
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-white/70 text-sm mb-4">
              <Link href={`/${locale}`} className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href={`/${locale}/tuyen-dung`} className="hover:text-white transition-colors">
                {t(locale, 'careers.banner')}
              </Link>
              <span>/</span>
              <span className="text-white line-clamp-1">{job.title}</span>
            </nav>

            <h1 className="text-2xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              {job.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-white/80 text-sm mb-6">
              {job.company && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {job.company.name}
                </span>
              )}
              {job.location_display && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location_display}
                </span>
              )}
              {job.quantity && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.quantity} {t(locale, 'careers.jobs.quantity')}
                </span>
              )}
            </div>

            <button
              onClick={() => setShowApplyModal(true)}
              className="inline-flex items-center gap-2 bg-white text-red-600 font-bold px-6 py-3 rounded-xl hover:bg-red-50 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              {t(locale, 'careers.applyNow')}
            </button>
          </FadeIn>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Job content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Benefits */}
            {job.benefits_content && (
              <ContentSection
                title={t(locale, 'careers.detail.benefits')}
                icon="gift"
                html={job.benefits_content}
              />
            )}
            {/* Job Description */}
            {job.job_description && (
              <ContentSection
                title={t(locale, 'careers.detail.description')}
                icon="briefcase"
                html={job.job_description}
              />
            )}
            {/* Requirements */}
            {job.requirements && (
              <ContentSection
                title={t(locale, 'careers.detail.requirements')}
                icon="clipboard"
                html={job.requirements}
              />
            )}
            {/* How to apply */}
            {job.how_to_apply && (
              <ContentSection
                title={t(locale, 'careers.detail.howToApply')}
                icon="paper-airplane"
                html={job.how_to_apply}
              />
            )}

            {/* Apply CTA */}
            <div className="bg-red-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{job.title}</p>
                {job.company && <p className="text-sm text-gray-500">{job.company.name}</p>}
              </div>
              <button
                onClick={() => setShowApplyModal(true)}
                className="flex-shrink-0 bg-red-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-red-700 transition-colors"
              >
                {t(locale, 'careers.applyNow')}
              </button>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Job info card */}
            <FadeIn direction="right" delay={0.2}>
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 text-base mb-4">
                  {t(locale, 'careers.detail.jobInfo')}
                </h3>
                <ul className="space-y-3 text-sm">
                  {job.published_at && (
                    <InfoRow label={t(locale, 'careers.detail.publishedAt')} value={job.published_at} />
                  )}
                  {job.quantity && (
                    <InfoRow
                      label={t(locale, 'careers.detail.quantity')}
                      value={`${job.quantity} ${t(locale, 'careers.jobs.quantity')}`}
                    />
                  )}
                  {job.level && (
                    <InfoRow label={t(locale, 'careers.detail.level')} value={job.level} />
                  )}
                  {job.industry && (
                    <InfoRow label={t(locale, 'careers.detail.industry')} value={job.industry} />
                  )}
                  {job.skills && (
                    <InfoRow label={t(locale, 'careers.detail.skills')} value={job.skills} />
                  )}
                  {job.resume_language && (
                    <InfoRow label={t(locale, 'careers.detail.resumeLanguage')} value={job.resume_language} />
                  )}
                  {job.location_display && (
                    <InfoRow label={t(locale, 'careers.detail.location')} value={job.location_display} />
                  )}
                  {job.company && (
                    <InfoRow label={t(locale, 'careers.detail.company')} value={job.company.name} />
                  )}
                </ul>
              </div>
            </FadeIn>

            {/* Back to list */}
            <Link
              href={`/${locale}/tuyen-dung`}
              className="flex items-center gap-2 text-sm text-red-600 font-semibold hover:underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t(locale, 'careers.detail.backToList')}
            </Link>

            {/* Related jobs */}
            {relatedJobs.length > 0 && (
              <FadeIn direction="right" delay={0.3}>
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                  <h3 className="font-bold text-gray-900 text-base mb-4">
                    {t(locale, 'careers.detail.related')}
                  </h3>
                  <ul className="space-y-3">
                    {relatedJobs.map((rj) => (
                      <li key={rj.id}>
                        <Link
                          href={`/${locale}/tuyen-dung/${rj.slug}`}
                          className="block group"
                        >
                          <p className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2">
                            {rj.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {rj.company?.name} · {rj.province}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </main>

      <Footer locale={locale} />

      {/* Apply modal */}
      {showApplyModal && (
        <ApplyModal
          locale={locale}
          jobTitle={job.title}
          jobId={job.id}
          onClose={() => setShowApplyModal(false)}
        />
      )}
    </div>
  );
}

// ========== HELPERS ==========

const ICON_PATHS: Record<string, string> = {
  gift: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4H5z',
  briefcase: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  clipboard: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  'paper-airplane': 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
};

function ContentSection({ title, icon, html }: { title: string; icon: string; html: string }) {
  return (
    <FadeIn direction="up" delay={0.1}>
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ICON_PATHS[icon] || ICON_PATHS.briefcase} />
            </svg>
          </div>
          <h2 className="font-bold text-gray-900 text-lg">{title}</h2>
        </div>
        <div
          className="prose prose-sm max-w-none text-gray-600 prose-li:my-0.5 prose-ul:my-2 prose-p:my-2"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </FadeIn>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex gap-2">
      <span className="text-gray-400 flex-shrink-0 min-w-[110px]">{label}</span>
      <span className="text-gray-700 font-medium">{value}</span>
    </li>
  );
}
