'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchContactInfo, submitContactForm, resetSubmitState } from '@/store/contact/contactSlice';
import { contactInfo as fallbackContact } from '@/lib/data/homepage';
import { t } from '@/lib/i18n';

import FadeIn from '@/components/animations/FadeIn';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import BannerSection from '@/components/sections/BannerSection';
import VerticalPagination from '@/components/ui/VerticalPagination';

interface Props {
  locale: string;
}

export default function ContactContent({ locale }: Props) {
  const dispatch = useAppDispatch();
  const { info, submitLoading, submitSuccess, submitError } = useAppSelector(
    (state) => state.contact
  );

  useEffect(() => {
    dispatch(fetchContactInfo(locale));
  }, [dispatch, locale]);

  // Build data: API → fallback
  const contactData = {
    address_hn: info?.address_hn || fallbackContact.address,
    address_hcm: info?.address_hcm || fallbackContact.addressHCM,
    phone: info?.phone || fallbackContact.phone,
    email: info?.email || fallbackContact.email,
    facebook_url: info?.facebook_url || fallbackContact.facebook,
    youtube_url: info?.youtube_url || fallbackContact.youtube,
    linkedin_url: info?.linkedin_url || fallbackContact.linkedin,
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <VerticalPagination totalSections={4} />

      <main className="relative">
        <BannerSection />

        <ContactInfoSection contactData={contactData} locale={locale} />

        <ContactFormSection
          locale={locale}
          submitLoading={submitLoading}
          submitSuccess={submitSuccess}
          submitError={submitError}
          onSubmit={(data) => dispatch(submitContactForm({ data, locale }))}
          onReset={() => dispatch(resetSubmitState())}
        />

        <MapSection />
      </main>

      <Footer locale={locale} />
    </div>
  );
}

// ========== CONTACT INFO SECTION ==========
interface ContactInfoProps {
  contactData: {
    address_hn: string;
    address_hcm: string;
    phone: string;
    email: string;
    facebook_url: string;
    youtube_url: string;
    linkedin_url: string;
  };
  locale: string;
}

function ContactInfoSection({ contactData, locale }: ContactInfoProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Title */}
        <FadeIn direction="down" delay={0.1}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {t(locale, 'contact.title')}{' '}
              <span className="text-red-600">{t(locale, 'contact.titleHighlight')}</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              {t(locale, 'contact.description')}
            </p>
          </div>
        </FadeIn>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Headquarters */}
          <FadeIn direction="up" delay={0.2}>
            <div className="bg-gray-50 rounded-xl p-6 h-full hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{t(locale, 'contact.headquarters')}</h3>
              <p className="text-gray-600 text-sm">{contactData.address_hn}</p>
            </div>
          </FadeIn>

          {/* HCM Office */}
          <FadeIn direction="up" delay={0.3}>
            <div className="bg-gray-50 rounded-xl p-6 h-full hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{t(locale, 'contact.hcmOffice')}</h3>
              <p className="text-gray-600 text-sm">{contactData.address_hcm}</p>
            </div>
          </FadeIn>

          {/* Phone */}
          <FadeIn direction="up" delay={0.4}>
            <div className="bg-gray-50 rounded-xl p-6 h-full hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{t(locale, 'contact.phone')}</h3>
              <p className="text-gray-600 text-sm">{contactData.phone}</p>
            </div>
          </FadeIn>

          {/* Email */}
          <FadeIn direction="up" delay={0.5}>
            <div className="bg-gray-50 rounded-xl p-6 h-full hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{t(locale, 'contact.email')}</h3>
              <p className="text-gray-600 text-sm">{contactData.email}</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ========== CONTACT FORM SECTION ==========
interface ContactFormProps {
  locale: string;
  submitLoading: boolean;
  submitSuccess: boolean;
  submitError: string | null;
  onSubmit: (data: { name: string; email: string; phone: string; message: string }) => void;
  onReset: () => void;
}

function ContactFormSection({
  locale,
  submitLoading,
  submitSuccess,
  submitError,
  onSubmit,
  onReset,
}: ContactFormProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  // Reset form after success
  useEffect(() => {
    if (submitSuccess) {
      setForm({ name: '', email: '', phone: '', message: '' });
      const timer = setTimeout(() => onReset(), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, onReset]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 max-w-3xl">
        <FadeIn direction="up" delay={0.1}>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              {t(locale, 'contact.formTitle')}
            </h2>
            <p className="mt-3 text-gray-600">
              {t(locale, 'contact.formDescription')}
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t(locale, 'contact.name')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t(locale, 'contact.namePlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t(locale, 'contact.email')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t(locale, 'contact.emailPlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t(locale, 'contact.phone')}
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder={t(locale, 'contact.phonePlaceholder')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t(locale, 'contact.message')} <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder={t(locale, 'contact.messagePlaceholder')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                disabled={submitLoading}
                className="px-10 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitLoading ? t(locale, 'contact.sending') : t(locale, 'contact.submit')}
              </button>
            </div>

            {/* Success/Error messages */}
            {submitSuccess && (
              <div className="text-center p-4 bg-green-50 text-green-700 rounded-lg">
                {t(locale, 'contact.success')}
              </div>
            )}
            {submitError && (
              <div className="text-center p-4 bg-red-50 text-red-700 rounded-lg">
                {t(locale, 'contact.error')}
              </div>
            )}
          </form>
        </FadeIn>
      </div>
    </section>
  );
}

// ========== MAP SECTION ==========
function MapSection() {
  return (
    <section className="h-[400px] w-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096949675635!2d105.78204027489062!3d21.028813080622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4cd376479b%3A0x55e1cd03b1e6e68!2zVMOyYSBuaMOgIExvdHVzIEJ1aWxkaW5n!5e0!3m2!1svi!2s!4v1700000000000"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Hợp Lực Corp - Lotus Building"
      />
    </section>
  );
}
