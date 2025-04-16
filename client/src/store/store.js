import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authAPI';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
