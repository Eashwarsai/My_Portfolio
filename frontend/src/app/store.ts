/*
 * Redux Store Configuration
 * 
 * WHAT: The centralized state management store for the entire app.
 * WHY:  Single source of truth for app-wide state (auth, theme, cached API data).
 *       Components subscribe to specific slices, and Redux uses selectors for
 *       efficient re-renders (unlike Context API which re-renders all consumers).
 * HOW:  configureStore() from RTK sets up the store with:
 *       - Reducers (state logic)
 *       - Middleware (RTK Query's cache management middleware)
 *       - DevTools (automatically enabled in development)
 */

import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../features/api/baseApi";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    // RTK Query reducer — manages all API cache state automatically
    [baseApi.reducerPath]: baseApi.reducer,

    // Theme state (dark/light mode)
    theme: themeReducer,
  },

  // RTK Query middleware — handles caching, invalidation, polling, etc.
  // This is what makes RTK Query "magic" — it intercepts API actions
  // and manages the cache lifecycle automatically.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// TypeScript types for the store — used throughout the app
// These ensure type-safety when using useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
