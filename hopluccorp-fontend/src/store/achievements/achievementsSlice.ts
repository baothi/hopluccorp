import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

// ========== Types ==========
export interface AwardData {
  id: number;
  year: string;
  title: string;
  organization: string;
  description: string;
  image: string | null;
}

export interface AchievementGalleryItemData {
  id: number;
  image: string | null;
  alt: string;
}

export interface AchievementsPageState {
  awards: AwardData[];
  gallery: AchievementGalleryItemData[];
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
export const fetchAchievementsPage = createAsyncThunk(
  'achievements/fetchAchievementsPage',
  async (locale: string = 'vi', { rejectWithValue }) => {
    const lang = LOCALE_MAP[locale] || 'vi';
    try {
      const res = await axiosInstance.get(`/api/pages/achievements/?lang=${lang}`);
      return res.data;
    } catch {
      if (locale !== 'vi') {
        try {
          const fallback = await axiosInstance.get('/api/pages/achievements/?lang=vi');
          return fallback.data;
        } catch {
          return rejectWithValue('Failed to fetch achievements page data');
        }
      }
      return rejectWithValue('Failed to fetch achievements page data');
    }
  }
);

// ========== Slice ==========
const initialState: AchievementsPageState = {
  awards: [],
  gallery: [],
  loading: false,
  error: null,
};

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAchievementsPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAchievementsPage.fulfilled, (state, action) => {
        state.loading = false;
        state.awards = action.payload.awards || [];
        state.gallery = action.payload.gallery || [];
      })
      .addCase(fetchAchievementsPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default achievementsSlice.reducer;
