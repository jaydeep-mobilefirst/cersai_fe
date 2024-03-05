// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import commonReducer from "../redux/slices/commonSlice"
export const store = configureStore({
  reducer: {
    common : commonReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
