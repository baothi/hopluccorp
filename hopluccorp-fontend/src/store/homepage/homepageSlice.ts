import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

// ========== Types ==========
export interface BannerData {
  id: number;
  title: string;
  image: string | null;
  alt: string;
}

export interface AboutSectionData {
  label: string;
  title: string;
  description: string;
  cta_text: string;
  cta_link: string;
}

export interface AboutBlockData {
  id: number;
  title: string;
  subtitle: string;
  image: string | null;
  icon: string | null;
  link: string;
}

export interface VideoSectionData {
  title: string;
  subtitle: string;
  youtube_id: string;
  thumbnail: string | null;
}

export interface StatItemData {
  id: number;
  icon: string | null;
  number: number;
  suffix: string;
  label: string;
}

export interface CategoryData {
  id: number;
  title: string;
  subtitle: string;
  image: string | null;
  link: string;
}

export interface NewsArticleData {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string | null;
  featured: boolean;
  published_at: string | null;
  link: string;
}

export interface PartnerData {
  id: number;
  name: string;
  logo: string | null;
}

export interface SiteConfigData {
  bg_stats: string | null;
  bg_stats_image: string | null;
}

export interface HomepageState {
  site_config: SiteConfigData | null;
  banners: BannerData[];
  about_section: AboutSectionData | null;
  about_blocks: AboutBlockData[];
  video_section: VideoSectionData | null;
  stats: StatItemData[];
  categories: CategoryData[];
  news: NewsArticleData[];
  partners: PartnerData[];
  loading: boolean;
  error: string | null;
}

// ========== Locale map ==========
const LOCALE_MAP: Record<string, string> = {
  vi: 'vi',
  en: 'en',
  zh: 'zh-hans',
  ko: 'ko',
};

// ========== Async thunk ==========
export const fetchHomepage = createAsyncThunk(
  'homepage/fetchHomepage',
  async (locale: string = 'vi', { rejectWithValue }) => {
    const lang = LOCALE_MAP[locale] || 'vi';

    try {
      const res = await axiosInstance.get(`/api/pages/homepage/?lang=${lang}`);
      return res.data;
    } catch {
      // Fallback: try Vietnamese
      if (locale !== 'vi') {
        try {
          const fallback = await axiosInstance.get('/api/pages/homepage/?lang=vi');
          return fallback.data;
        } catch {
          // Fallback: try English
          try {
            const fallbackEn = await axiosInstance.get('/api/pages/homepage/?lang=en');
            return fallbackEn.data;
          } catch {
            return rejectWithValue('Failed to fetch homepage data');
          }
        }
      }
      return rejectWithValue('Failed to fetch homepage data');
    }
  }
);

// ========== Slice ==========
const initialState: HomepageState = {
  site_config: null,
  banners: [],
  about_section: null,
  about_blocks: [],
  video_section: null,
  stats: [],
  categories: [],
  news: [],
  partners: [],
  loading: false,
  error: null,
};

const homepageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomepage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomepage.fulfilled, (state, action) => {
        state.loading = false;
        state.site_config = action.payload.site_config;
        state.banners = action.payload.banners || [];
        state.about_section = action.payload.about_section;
        state.about_blocks = action.payload.about_blocks || [];
        state.video_section = action.payload.video_section;
        state.stats = action.payload.stats || [];
        state.categories = action.payload.categories || [];
        state.news = action.payload.news || [];
        state.partners = action.payload.partners || [];
      })
      .addCase(fetchHomepage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default homepageSlice.reducer;
