// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/apiSlice';
import cartReducer from './features/cartSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

