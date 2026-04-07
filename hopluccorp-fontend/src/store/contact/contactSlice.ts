import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

// ========== Types ==========
export interface ContactInfoData {
  address_hn: string;
  address_hcm: string;
  phone: string;
  email: string;
  facebook_url: string;
  youtube_url: string;
  linkedin_url: string;
}

export interface ContactState {
  info: ContactInfoData | null;
  loading: boolean;
  error: string | null;
  submitLoading: boolean;
  submitSuccess: boolean;
  submitError: string | null;
}

// ========== Locale map ==========
const LOCALE_MAP: Record<string, string> = {
  vi: 'vi',
  en: 'en',
  zh: 'zh-hans',
  ko: 'ko',
};

// ========== Async thunks ==========
export const fetchContactInfo = createAsyncThunk(
  'contact/fetchContactInfo',
  async (locale: string = 'vi', { rejectWithValue }) => {
    const lang = LOCALE_MAP[locale] || 'vi';

    try {
      const res = await axiosInstance.get(`/api/pages/contact/?lang=${lang}`);
      return res.data;
    } catch {
      if (locale !== 'vi') {
        try {
          const fallback = await axiosInstance.get('/api/pages/contact/?lang=vi');
          return fallback.data;
        } catch {
          return rejectWithValue('Failed to fetch contact info');
        }
      }
      return rejectWithValue('Failed to fetch contact info');
    }
  }
);

export const submitContactForm = createAsyncThunk(
  'contact/submitContactForm',
  async (
    data: { name: string; email: string; phone: string; message: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.post('/api/pages/contact/submit/', data);
      return res.data;
    } catch {
      return rejectWithValue('Failed to submit contact form');
    }
  }
);

// ========== Slice ==========
const initialState: ContactState = {
  info: null,
  loading: false,
  error: null,
  submitLoading: false,
  submitSuccess: false,
  submitError: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetSubmitState: (state) => {
      state.submitSuccess = false;
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload;
      })
      .addCase(fetchContactInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitContactForm.pending, (state) => {
        state.submitLoading = true;
        state.submitSuccess = false;
        state.submitError = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.submitLoading = false;
        state.submitSuccess = true;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.submitLoading = false;
        state.submitError = action.payload as string;
      });
  },
});

export const { resetSubmitState } = contactSlice.actions;
export default contactSlice.reducer;
