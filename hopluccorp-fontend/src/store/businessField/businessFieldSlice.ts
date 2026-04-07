import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

// ========== Types ==========
export interface BusinessFieldServiceData {
  id: number;
  icon: string | null;
  title: string;
  description: string;
}

export interface BusinessFieldGalleryData {
  id: number;
  image: string | null;
  alt: string;
}

export interface BusinessFieldData {
  id: number;
  name: string;
  slug: string;
  banner_image: string | null;
  banner_alt: string;
  intro_title: string;
  intro_description: string;
  intro_image: string | null;
  services: BusinessFieldServiceData[];
  gallery: BusinessFieldGalleryData[];
}

export interface BusinessFieldState {
  data: BusinessFieldData | null;
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
export const fetchBusinessField = createAsyncThunk(
  'businessField/fetchBusinessField',
  async ({ slug, locale }: { slug: string; locale: string }, { rejectWithValue }) => {
    const lang = LOCALE_MAP[locale] || 'vi';

    try {
      const res = await axiosInstance.get(`/api/pages/business-fields/${slug}/?lang=${lang}`);
      return res.data;
    } catch {
      if (locale !== 'vi') {
        try {
          const fallback = await axiosInstance.get(`/api/pages/business-fields/${slug}/?lang=vi`);
          return fallback.data;
        } catch {
          return rejectWithValue('Failed to fetch business field');
        }
      }
      return rejectWithValue('Failed to fetch business field');
    }
  }
);

// ========== Slice ==========
const initialState: BusinessFieldState = {
  data: null,
  loading: false,
  error: null,
};

const businessFieldSlice = createSlice({
  name: 'businessField',
  initialState,
  reducers: {
    clearBusinessField: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinessField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBusinessField.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBusinessField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearBusinessField } = businessFieldSlice.actions;
export default businessFieldSlice.reducer;
