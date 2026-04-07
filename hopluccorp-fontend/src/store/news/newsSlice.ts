import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

// ========== Types ==========
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

export interface NewsDetailData extends NewsArticleData {
  content: string;
  created_at: string;
}

export interface NewsState {
  articles: NewsArticleData[];
  detail: NewsDetailData | null;
  loading: boolean;
  detailLoading: boolean;
  error: string | null;
}

// ========== Locale map ==========
const LOCALE_MAP: Record<string, string> = {
  vi: 'vi',
  en: 'en',
  zh: 'zh-hans',
  ko: 'ko',
};

// ========== Async thunks ==========
export const fetchNewsList = createAsyncThunk(
  'news/fetchNewsList',
  async (locale: string = 'vi', { rejectWithValue }) => {
    const lang = LOCALE_MAP[locale] || 'vi';

    try {
      const res = await axiosInstance.get(`/api/pages/news/?lang=${lang}`);
      return res.data;
    } catch {
      if (locale !== 'vi') {
        try {
          const fallback = await axiosInstance.get('/api/pages/news/?lang=vi');
          return fallback.data;
        } catch {
          try {
            const fallbackEn = await axiosInstance.get('/api/pages/news/?lang=en');
            return fallbackEn.data;
          } catch {
            return rejectWithValue('Failed to fetch news list');
          }
        }
      }
      return rejectWithValue('Failed to fetch news list');
    }
  }
);

export const fetchNewsDetail = createAsyncThunk(
  'news/fetchNewsDetail',
  async ({ slug, locale }: { slug: string; locale: string }, { rejectWithValue }) => {
    const lang = LOCALE_MAP[locale] || 'vi';

    try {
      const res = await axiosInstance.get(`/api/pages/news/${slug}/?lang=${lang}`);
      return res.data;
    } catch {
      if (locale !== 'vi') {
        try {
          const fallback = await axiosInstance.get(`/api/pages/news/${slug}/?lang=vi`);
          return fallback.data;
        } catch {
          return rejectWithValue('Failed to fetch news detail');
        }
      }
      return rejectWithValue('Failed to fetch news detail');
    }
  }
);

// ========== Slice ==========
const initialState: NewsState = {
  articles: [],
  detail: null,
  loading: false,
  detailLoading: false,
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearNewsDetail: (state) => {
      state.detail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // List
      .addCase(fetchNewsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsList.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload || [];
      })
      .addCase(fetchNewsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Detail
      .addCase(fetchNewsDetail.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchNewsDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.detail = action.payload;
      })
      .addCase(fetchNewsDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearNewsDetail } = newsSlice.actions;
export default newsSlice.reducer;
