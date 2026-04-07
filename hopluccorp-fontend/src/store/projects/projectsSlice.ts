import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

// ========== Types ==========
export interface ProjectCategoryData {
  id: number;
  name: string;
  slug: string;
}

export interface ProjectItemData {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  category: string;
  location: string;
  scale: string;
  progress: string;
  year: string;
  status: string;
}

export interface ProjectsState {
  categories: ProjectCategoryData[];
  projects: ProjectItemData[];
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
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (locale: string = 'vi', { rejectWithValue }) => {
    const lang = LOCALE_MAP[locale] || 'vi';

    try {
      const res = await axiosInstance.get(`/api/pages/projects/?lang=${lang}`);
      return res.data;
    } catch {
      if (locale !== 'vi') {
        try {
          const fallback = await axiosInstance.get('/api/pages/projects/?lang=vi');
          return fallback.data;
        } catch {
          try {
            const fallbackEn = await axiosInstance.get('/api/pages/projects/?lang=en');
            return fallbackEn.data;
          } catch {
            return rejectWithValue('Failed to fetch projects');
          }
        }
      }
      return rejectWithValue('Failed to fetch projects');
    }
  }
);

// ========== Slice ==========
const initialState: ProjectsState = {
  categories: [],
  projects: [],
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories || [];
        state.projects = action.payload.projects || [];
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default projectsSlice.reducer;
