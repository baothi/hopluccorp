/**
 * API client for HopLucCorp Backend
 * Handles fetching data with language fallback: locale → vi → en
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Map Next.js locale to Django language code
const LOCALE_MAP: Record<string, string> = {
  vi: 'vi',
  en: 'en',
  zh: 'zh-hans',
  ko: 'ko',
};

async function fetchAPI<T>(endpoint: string, lang: string = 'vi'): Promise<T | null> {
  const djangoLang = LOCALE_MAP[lang] || 'vi';
  const url = `${API_BASE}${endpoint}${endpoint.includes('?') ? '&' : '?'}lang=${djangoLang}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    });

    if (!res.ok) {
      console.error(`API error: ${res.status} ${url}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`API fetch failed: ${url}`, error);
    return null;
  }
}

// ========== Types matching API response ==========
export interface APISiteConfig {
  logo_header: string | null;
  logo_footer: string | null;
  favicon: string | null;
  qr_code: string | null;
  address_hn: string;
  address_hcm: string;
  phone: string;
  email: string;
  facebook_url: string;
  youtube_url: string;
  linkedin_url: string;
  bg_stats: string | null;
  bg_footer: string | null;
  bg_stats_image: string | null;
}

export interface APIBanner {
  id: number;
  title: string;
  image: string | null;
  alt: string;
}

export interface APIAboutSection {
  label: string;
  title: string;
  description: string;
  cta_text: string;
  cta_link: string;
}

export interface APIAboutBlock {
  id: number;
  title: string;
  subtitle: string;
  image: string | null;
  icon: string | null;
  link: string;
}

export interface APIVideoSection {
  title: string;
  subtitle: string;
  youtube_id: string;
  thumbnail: string | null;
}

export interface APIStatItem {
  id: number;
  icon: string | null;
  number: number;
  suffix: string;
  label: string;
}

export interface APICategory {
  id: number;
  title: string;
  subtitle: string;
  image: string | null;
  link: string;
}

export interface APINewsArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string | null;
  featured: boolean;
  published_at: string | null;
  link: string;
}

export interface APIPartner {
  id: number;
  name: string;
  logo: string | null;
}

export interface APIHomepage {
  site_config: APISiteConfig | null;
  banners: APIBanner[];
  about_section: APIAboutSection | null;
  about_blocks: APIAboutBlock[];
  video_section: APIVideoSection | null;
  stats: APIStatItem[];
  categories: APICategory[];
  news: APINewsArticle[];
  partners: APIPartner[];
}

// ========== API Functions ==========

/**
 * Fetch homepage data with language fallback.
 * Try: requested locale → vi → en → null
 */
export async function getHomepage(locale: string = 'vi'): Promise<APIHomepage | null> {
  // Try requested language first
  let data = await fetchAPI<APIHomepage>('/api/pages/homepage/', locale);
  if (data) return data;

  // Fallback to Vietnamese
  if (locale !== 'vi') {
    data = await fetchAPI<APIHomepage>('/api/pages/homepage/', 'vi');
    if (data) return data;
  }

  // Fallback to English
  if (locale !== 'en') {
    data = await fetchAPI<APIHomepage>('/api/pages/homepage/', 'en');
    if (data) return data;
  }

  return null;
}

/**
 * Fetch news list
 */
export async function getNewsList(locale: string = 'vi') {
  return fetchAPI<APINewsArticle[]>('/api/pages/news/', locale);
}

/**
 * Fetch single news article by slug
 */
export async function getNewsDetail(slug: string, locale: string = 'vi') {
  return fetchAPI<APINewsArticle & { content: string }>(`/api/pages/news/${slug}/`, locale);
}

// ========== About Page Types ==========
export interface APILeaderMessage {
  title: string;
  subtitle: string;
  slogan: string;
  content: string;
  leader_image: string | null;
  leader_name: string;
  leader_position: string;
  signature_image: string | null;
}

export interface APIHistoryItem {
  id: number;
  year: string;
  image: string | null;
  description: string;
}

export interface APICoreValue {
  id: number;
  icon: string | null;
  title: string;
}

export interface APIVisionMission {
  vision_title: string;
  vision_content: string;
  vision_image: string | null;
  mission_title: string;
  mission_content: string;
  mission_image: string | null;
}

export interface APILeadershipMember {
  id: number;
  name: string;
  position: string;
  image: string | null;
}

export interface APIAboutPage {
  leader_message: APILeaderMessage | null;
  history: APIHistoryItem[];
  core_values: APICoreValue[];
  vision_mission: APIVisionMission | null;
  leadership: APILeadershipMember[];
}

/**
 * Fetch about page data with language fallback.
 */
export async function getAboutPage(locale: string = 'vi'): Promise<APIAboutPage | null> {
  let data = await fetchAPI<APIAboutPage>('/api/pages/about/', locale);
  if (data) return data;

  if (locale !== 'vi') {
    data = await fetchAPI<APIAboutPage>('/api/pages/about/', 'vi');
    if (data) return data;
  }

  if (locale !== 'en') {
    data = await fetchAPI<APIAboutPage>('/api/pages/about/', 'en');
    if (data) return data;
  }

  return null;
}

// ========== SEO Types ==========
export interface APIPageSEO {
  page_key: string;
  title: string;
  description: string;
  keywords: string;
  og_image: string | null;
}

/**
 * Fetch SEO metadata for a specific page.
 */
export async function getPageSEO(pageKey: string, locale: string = 'vi'): Promise<APIPageSEO | null> {
  return fetchAPI<APIPageSEO>(`/api/pages/seo/${pageKey}/`, locale);
}

// ========== Organization Page Types ==========
export interface APIOrganizationOverview {
  title: string;
  logo: string | null;
  description: string;
  image: string | null;
  download_link: string;
  download_text: string;
}

export interface APIOrganizationChart {
  title: string;
  image: string | null;
}

export interface APIOrganizationGalleryItem {
  id: number;
  image: string | null;
  alt: string;
}

export interface APIOrganizationPage {
  overview: APIOrganizationOverview | null;
  chart: APIOrganizationChart | null;
  gallery: APIOrganizationGalleryItem[];
}

/**
 * Fetch organization page data with language fallback.
 */
export async function getOrganizationPage(locale: string = 'vi'): Promise<APIOrganizationPage | null> {
  let data = await fetchAPI<APIOrganizationPage>('/api/pages/organization/', locale);
  if (data) return data;

  if (locale !== 'vi') {
    data = await fetchAPI<APIOrganizationPage>('/api/pages/organization/', 'vi');
    if (data) return data;
  }

  if (locale !== 'en') {
    data = await fetchAPI<APIOrganizationPage>('/api/pages/organization/', 'en');
    if (data) return data;
  }

  return null;
}

// ========== Resources Page Types ==========
export interface APIStaffBreakdown {
  id: number;
  role: string;
  count: number;
}

export interface APIHumanResources {
  title: string;
  description: string;
  image: string | null;
  total_staff: string;
  staff_breakdown: APIStaffBreakdown[];
}

export interface APICertificate {
  id: number;
  name: string;
  title: string;
  image: string | null;
}

export interface APIManagementSystem {
  title: string;
  description: string;
  slogan: string;
  certificates: APICertificate[];
}

export interface APIResourceProjectSection {
  title: string;
  total_projects: string;
  background_image: string | null;
}

export interface APIResourceProject {
  id: number;
  name: string;
  location: string;
  province: string;
}

export interface APIResourcesBanner {
  image: string | null;
  alt: string;
}

export interface APIResourcesPage {
  banner: APIResourcesBanner | null;
  human_resources: APIHumanResources | null;
  management_system: APIManagementSystem | null;
  projects_section: APIResourceProjectSection | null;
  projects: APIResourceProject[];
  provinces: string[];
}

/**
 * Fetch resources page data with language fallback.
 */
export async function getResourcesPage(locale: string = 'vi'): Promise<APIResourcesPage | null> {
  let data = await fetchAPI<APIResourcesPage>('/api/pages/resources/', locale);
  if (data) return data;

  if (locale !== 'vi') {
    data = await fetchAPI<APIResourcesPage>('/api/pages/resources/', 'vi');
    if (data) return data;
  }

  if (locale !== 'en') {
    data = await fetchAPI<APIResourcesPage>('/api/pages/resources/', 'en');
    if (data) return data;
  }

  return null;
}
