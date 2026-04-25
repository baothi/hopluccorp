import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import homepageReducer from './homepage/homepageSlice';
import aboutReducer from './about/aboutSlice';
import organizationReducer from './organization/organizationSlice';
import resourcesReducer from './resources/resourcesSlice';
import newsReducer from './news/newsSlice';
import projectsReducer from './projects/projectsSlice';
import businessFieldReducer from './businessField/businessFieldSlice';
import contactReducer from './contact/contactSlice';
import achievementsReducer from './achievements/achievementsSlice';
import careersReducer from './careers/careersSlice';

export const store = configureStore({
  reducer: {
    homepage: homepageReducer,
    about: aboutReducer,
    organization: organizationReducer,
    resources: resourcesReducer,
    news: newsReducer,
    projects: projectsReducer,
    businessField: businessFieldReducer,
    contact: contactReducer,
    achievements: achievementsReducer,
    careers: careersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
