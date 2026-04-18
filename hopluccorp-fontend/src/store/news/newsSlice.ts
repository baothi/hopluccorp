import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

// ========== Types ==========
export interface NewsCategoryData {
  id: number;
  name: string;
  slug: string;
}

export interface NewsArticleData {
  id: number;
  category: NewsCategoryData | null;
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

export interface NewsListPagination {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface NewsState {
  articles: NewsArticleData[];
  detail: NewsDetailData | null;
  count: number;
  next: string | null;
  previous: string | null;
  limit: number;
  offset: number;
  loading: boolean;
  detailLoading: boolean;
  loaded: boolean;
  error: string | null;
}

interface PaginatedNewsResponse extends NewsListPagination {
  results: NewsArticleData[];
}

type NewsListResponse = NewsArticleData[] | PaginatedNewsResponse;

type FetchNewsListInput = string | {
  locale?: string;
  limit?: number;
  offset?: number;
  category?: string;
};

const DEFAULT_LIMIT = 6;

// ========== Locale map ==========
const LOCALE_MAP: Record<string, string> = {
  vi: 'vi',
  en: 'en',
  zh: 'zh-hans',
  ko: 'ko',
};

function normalizeFetchNewsArgs(input: FetchNewsListInput = 'vi') {
  if (typeof input === 'string') {
    return {
      locale: input,
      limit: DEFAULT_LIMIT,
      offset: 0,
      category: 'all',
    };
  }

  return {
    locale: input.locale || 'vi',
    limit: input.limit ?? DEFAULT_LIMIT,
    offset: input.offset ?? 0,
    category: input.category || 'all',
  };
}

function buildNewsListUrl(lang: string, limit: number, offset: number, category: string = 'all') {
  const params = new URLSearchParams({
    lang,
    limit: String(limit),
    offset: String(offset),
  });

  if (category && category !== 'all') {
    params.set('category', category);
  }

  return `/api/pages/news/?${params.toString()}`;
}

function encodePathSegment(value: string) {
  try {
    return encodeURIComponent(decodeURIComponent(value));
  } catch {
    return encodeURIComponent(value);
  }
}

// ========== Async thunks ==========
export const fetchNewsList = createAsyncThunk(
  'news/fetchNewsList',
  async (input: FetchNewsListInput = 'vi', { rejectWithValue }) => {
    const { locale, limit, offset, category } = normalizeFetchNewsArgs(input);
    const lang = LOCALE_MAP[locale] || 'vi';

    try {
      const res = await axiosInstance.get<NewsListResponse>(buildNewsListUrl(lang, limit, offset, category));
      return res.data;
    } catch {
      if (locale !== 'vi') {
        try {
          const fallback = await axiosInstance.get<NewsListResponse>(buildNewsListUrl('vi', limit, offset, category));
          return fallback.data;
        } catch {
          try {
            const fallbackEn = await axiosInstance.get<NewsListResponse>(buildNewsListUrl('en', limit, offset, category));
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
      const res = await axiosInstance.get(`/api/pages/news/${encodePathSegment(slug)}/?lang=${lang}`);
      return res.data;
    } catch {
      if (locale !== 'vi') {
        try {
          const fallback = await axiosInstance.get(`/api/pages/news/${encodePathSegment(slug)}/?lang=vi`);
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
  count: 0,
  next: null,
  previous: null,
  limit: DEFAULT_LIMIT,
  offset: 0,
  loading: false,
  detailLoading: false,
  loaded: false,
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
        const { limit, offset } = normalizeFetchNewsArgs(action.meta.arg);
        const payload = action.payload;

        state.loading = false;
        state.loaded = true;
        state.limit = limit;
        state.offset = offset;

        if (Array.isArray(payload)) {
          state.articles = payload;
          state.count = payload.length;
          state.next = null;
          state.previous = null;
          return;
        }

        state.articles = payload?.results || [];
        state.count = payload?.count || 0;
        state.next = payload?.next || null;
        state.previous = payload?.previous || null;
      })
      .addCase(fetchNewsList.rejected, (state, action) => {
        state.loading = false;
        state.loaded = false;
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
