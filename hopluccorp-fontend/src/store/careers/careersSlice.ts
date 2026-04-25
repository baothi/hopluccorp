import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

// ========== Types ==========

export interface CareerCompanyData {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
}

export interface CulturePhotoData {
  id: number;
  image: string | null;
  alt: string;
}

export interface WorkBenefitData {
  id: number;
  icon_type: 'text' | 'image';
  icon_text: string;
  icon_image: string | null;
  title: string;
  description: string;
}

export interface JobListItemData {
  id: number;
  title: string;
  slug: string;
  quantity: number;
  province: string;
  location_display: string;
  level: string;
  industry: string;
  company: CareerCompanyData | null;
  published_at: string | null;
}

export interface JobDetailData extends JobListItemData {
  benefits_content: string;
  job_description: string;
  requirements: string;
  how_to_apply: string;
  skills: string;
  resume_language: string;
}

export interface CareersPageConfig {
  banner_image: string | null;
  banner_title: string;
  culture_video_url: string;
  culture_title: string;
  culture_subtitle: string;
}

export interface CareersPageState {
  // List page state
  page_config: CareersPageConfig | null;
  culture_photos: CulturePhotoData[];
  benefits: WorkBenefitData[];
  companies: CareerCompanyData[];
  jobs: JobListItemData[];
  total_count: number;
  page: number;
  page_size: number;
  total_pages: number;
  provinces: string[];
  loading: boolean;
  loaded: boolean; // true sau lần fetch thành công đầu tiên
  error: string | null;

  // Detail page state
  jobDetail: JobDetailData | null;
  relatedJobs: JobListItemData[];
  detailLoading: boolean;
  detailError: string | null;
}

// ========== Locale map ==========
const LOCALE_MAP: Record<string, string> = {
  vi: 'vi',
  en: 'en',
  zh: 'zh-hans',
  ko: 'ko',
};

// ========== Async thunks ==========

export interface FetchCareersListParams {
  locale: string;
  company?: string;
  province?: string;
  keyword?: string;
  page?: number;
}

export const fetchCareersPage = createAsyncThunk(
  'careers/fetchCareersPage',
  async (params: FetchCareersListParams, { rejectWithValue }) => {
    const lang = LOCALE_MAP[params.locale] || 'vi';
    const query = new URLSearchParams({ lang });
    if (params.company) query.set('company', params.company);
    if (params.province) query.set('province', params.province);
    if (params.keyword) query.set('keyword', params.keyword);
    if (params.page) query.set('page', String(params.page));

    try {
      const res = await axiosInstance.get(`/api/pages/careers/?${query.toString()}`);
      return res.data;
    } catch {
      if (params.locale !== 'vi') {
        try {
          // Giữ nguyên tất cả filter params, chỉ đổi lang → vi
          const fallbackQuery = new URLSearchParams({ lang: 'vi' });
          if (params.company) fallbackQuery.set('company', params.company);
          if (params.province) fallbackQuery.set('province', params.province);
          if (params.keyword) fallbackQuery.set('keyword', params.keyword);
          if (params.page) fallbackQuery.set('page', String(params.page));
          const fallback = await axiosInstance.get(`/api/pages/careers/?${fallbackQuery.toString()}`);
          return fallback.data;
        } catch {
          return rejectWithValue('Failed to fetch careers page data');
        }
      }
      return rejectWithValue('Failed to fetch careers page data');
    }
  }
);

export const fetchJobDetail = createAsyncThunk(
  'careers/fetchJobDetail',
  async ({ slug, locale }: { slug: string; locale: string }, { rejectWithValue }) => {
    const lang = LOCALE_MAP[locale] || 'vi';
    try {
      const res = await axiosInstance.get(`/api/pages/careers/${slug}/?lang=${lang}`);
      return res.data;
    } catch {
      if (locale !== 'vi') {
        try {
          const fallback = await axiosInstance.get(`/api/pages/careers/${slug}/?lang=vi`);
          return fallback.data;
        } catch {
          return rejectWithValue('Job not found');
        }
      }
      return rejectWithValue('Job not found');
    }
  }
);

// ========== Initial state ==========
const initialState: CareersPageState = {
  page_config: null,
  culture_photos: [],
  benefits: [],
  companies: [],
  jobs: [],
  total_count: 0,
  page: 1,
  page_size: 9,
  total_pages: 1,
  provinces: [],
  loading: false,
  loaded: false,
  error: null,

  jobDetail: null,
  relatedJobs: [],
  detailLoading: false,
  detailError: null,
};

// ========== Slice ==========
const careersSlice = createSlice({
  name: 'careers',
  initialState,
  reducers: {
    clearJobDetail(state) {
      state.jobDetail = null;
      state.relatedJobs = [];
      state.detailError = null;
    },
  },
  extraReducers: (builder) => {
    // --- List page ---
    builder
      .addCase(fetchCareersPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCareersPage.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.page_config = action.payload.page_config ?? null;
        state.culture_photos = action.payload.culture_photos || [];
        state.benefits = action.payload.benefits || [];
        state.companies = action.payload.companies || [];
        state.jobs = action.payload.jobs || [];
        state.total_count = action.payload.total_count ?? 0;
        state.page = action.payload.page ?? 1;
        state.page_size = action.payload.page_size ?? 9;
        state.total_pages = action.payload.total_pages ?? 1;
        state.provinces = action.payload.provinces || [];
      })
      .addCase(fetchCareersPage.rejected, (state, action) => {
        state.loading = false;
        // loaded giữ nguyên false — chưa có dữ liệu API, frontend dùng fallback
        state.error = action.payload as string;
      });

    // --- Detail page ---
    builder
      .addCase(fetchJobDetail.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchJobDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.jobDetail = action.payload.job ?? null;
        state.relatedJobs = action.payload.related_jobs || [];
      })
      .addCase(fetchJobDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload as string;
      });
  },
});

export const { clearJobDetail } = careersSlice.actions;
export default careersSlice.reducer;
