import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

// ========== Types ==========
export interface OrganizationOverviewData {
  title: string;
  logo: string | null;
  description: string;
  image: string | null;
  download_link: string;
  download_text: string;
}

export interface OrganizationChartData {
  title: string;
  image: string | null;
}

export interface OrganizationGalleryItemData {
  id: number;
  image: string | null;
  alt: string;
}

export interface OrganizationPageState {
  overview: OrganizationOverviewData | null;
  chart: OrganizationChartData | null;
  gallery: OrganizationGalleryItemData[];
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
export const fetchOrganizationPage = createAsyncThunk(
  'organization/fetchOrganizationPage',
  async (locale: string = 'vi', { rejectWithValue }) => {
    const lang = LOCALE_MAP[locale] || 'vi';

    try {
      const res = await axiosInstance.get(`/api/pages/organization/?lang=${lang}`);
      return res.data;
    } catch {
      // Fallback: try Vietnamese
      if (locale !== 'vi') {
        try {
          const fallback = await axiosInstance.get('/api/pages/organization/?lang=vi');
          return fallback.data;
        } catch {
          try {
            const fallbackEn = await axiosInstance.get('/api/pages/organization/?lang=en');
            return fallbackEn.data;
          } catch {
            return rejectWithValue('Failed to fetch organization page data');
          }
        }
      }
      return rejectWithValue('Failed to fetch organization page data');
    }
  }
);

// ========== Slice ==========
const initialState: OrganizationPageState = {
  overview: null,
  chart: null,
  gallery: [],
  loading: false,
  error: null,
};

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizationPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizationPage.fulfilled, (state, action) => {
        state.loading = false;
        state.overview = action.payload.overview;
        state.chart = action.payload.chart;
        state.gallery = action.payload.gallery || [];
      })
      .addCase(fetchOrganizationPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default organizationSlice.reducer;
