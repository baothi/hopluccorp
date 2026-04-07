import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/lib/axios';

// ========== Types ==========
export interface StaffBreakdownData {
  id: number;
  role: string;
  count: number;
}

export interface HumanResourcesData {
  title: string;
  description: string;
  image: string | null;
  total_staff: string;
  staff_breakdown: StaffBreakdownData[];
}

export interface CertificateData {
  id: number;
  name: string;
  title: string;
  image: string | null;
}

export interface ManagementSystemData {
  title: string;
  description: string;
  slogan: string;
  certificates: CertificateData[];
}

export interface ResourceProjectData {
  id: number;
  name: string;
  location: string;
  province: string;
}

export interface ResourceProjectSectionData {
  title: string;
  total_projects: string;
  background_image: string | null;
}

export interface ResourcesBannerData {
  image: string | null;
  alt: string;
}

export interface ResourcesPageState {
  banner: ResourcesBannerData | null;
  human_resources: HumanResourcesData | null;
  management_system: ManagementSystemData | null;
  projects_section: ResourceProjectSectionData | null;
  projects: ResourceProjectData[];
  provinces: string[];
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
export const fetchResourcesPage = createAsyncThunk(
  'resources/fetchResourcesPage',
  async (locale: string = 'vi', { rejectWithValue }) => {
    const lang = LOCALE_MAP[locale] || 'vi';

    try {
      const res = await axiosInstance.get(`/api/pages/resources/?lang=${lang}`);
      return res.data;
    } catch {
      // Fallback: try Vietnamese
      if (locale !== 'vi') {
        try {
          const fallback = await axiosInstance.get('/api/pages/resources/?lang=vi');
          return fallback.data;
        } catch {
          try {
            const fallbackEn = await axiosInstance.get('/api/pages/resources/?lang=en');
            return fallbackEn.data;
          } catch {
            return rejectWithValue('Failed to fetch resources page data');
          }
        }
      }
      return rejectWithValue('Failed to fetch resources page data');
    }
  }
);

// ========== Slice ==========
const initialState: ResourcesPageState = {
  banner: null,
  human_resources: null,
  management_system: null,
  projects_section: null,
  projects: [],
  provinces: [],
  loading: false,
  error: null,
};

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResourcesPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResourcesPage.fulfilled, (state, action) => {
        state.loading = false;
        state.banner = action.payload.banner;
        state.human_resources = action.payload.human_resources;
        state.management_system = action.payload.management_system;
        state.projects_section = action.payload.projects_section;
        state.projects = action.payload.projects || [];
        state.provinces = action.payload.provinces || [];
      })
      .addCase(fetchResourcesPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default resourcesSlice.reducer;
