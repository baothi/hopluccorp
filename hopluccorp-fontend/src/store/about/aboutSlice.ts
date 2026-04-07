import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

// ========== Types ==========
export interface LeaderMessageData {
  title: string;
  subtitle: string;
  slogan: string;
  content: string; // HTML from CKEditor
  leader_image: string | null;
  leader_name: string;
  leader_position: string;
  signature_image: string | null;
}

export interface HistoryItemData {
  id: number;
  year: string;
  image: string | null;
  description: string;
}

export interface CoreValueData {
  id: number;
  icon: string | null;
  title: string;
}

export interface VisionMissionData {
  vision_title: string;
  vision_content: string;
  vision_image: string | null;
  mission_title: string;
  mission_content: string;
  mission_image: string | null;
}

export interface LeadershipMemberData {
  id: number;
  name: string;
  position: string;
  image: string | null;
}

export interface AboutPageState {
  leader_message: LeaderMessageData | null;
  history_items: HistoryItemData[];
  core_values: CoreValueData[];
  vision_mission: VisionMissionData | null;
  leadership_members: LeadershipMemberData[];
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
export const fetchAboutPage = createAsyncThunk(
  'about/fetchAboutPage',
  async (locale: string = 'vi', { rejectWithValue }) => {
    const lang = LOCALE_MAP[locale] || 'vi';

    try {
      const res = await axiosInstance.get(`/api/pages/about/?lang=${lang}`);
      return res.data;
    } catch {
      // Fallback: try Vietnamese
      if (locale !== 'vi') {
        try {
          const fallback = await axiosInstance.get('/api/pages/about/?lang=vi');
          return fallback.data;
        } catch {
          try {
            const fallbackEn = await axiosInstance.get('/api/pages/about/?lang=en');
            return fallbackEn.data;
          } catch {
            return rejectWithValue('Failed to fetch about page data');
          }
        }
      }
      return rejectWithValue('Failed to fetch about page data');
    }
  }
);

// ========== Slice ==========
const initialState: AboutPageState = {
  leader_message: null,
  history_items: [],
  core_values: [],
  vision_mission: null,
  leadership_members: [],
  loading: false,
  error: null,
};

const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAboutPage.fulfilled, (state, action) => {
        state.loading = false;
        state.leader_message = action.payload.leader_message;
        state.history_items = action.payload.history || action.payload.history_items || [];
        state.core_values = action.payload.core_values || [];
        state.vision_mission = action.payload.vision_mission;
        state.leadership_members = action.payload.leadership || action.payload.leadership_members || [];
      })
      .addCase(fetchAboutPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default aboutSlice.reducer;
