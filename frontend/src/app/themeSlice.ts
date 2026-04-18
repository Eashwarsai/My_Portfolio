/*
 * Theme Slice — Dark/Light Mode State
 *
 * WHAT: Redux slice that manages the theme (dark/light) state.
 * WHY:  Theme preference needs to persist across sessions (localStorage)
 *       and be accessible from any component without prop drilling.
 * HOW:  On app load, reads from localStorage. On toggle, updates both
 *       the Redux state AND the DOM (adds/removes 'dark' class on <html>).
 *       Tailwind's `darkMode: 'class'` strategy reads the class to apply styles.
 */

import { createSlice } from "@reduxjs/toolkit";

type ThemeMode = "dark" | "light";

interface ThemeState {
  mode: ThemeMode;
}

// Initialize theme: check localStorage → system preference → default to dark
function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";

  const stored = localStorage.getItem("theme") as ThemeMode | null;
  if (stored === "dark" || stored === "light") return stored;

  // Check system preference
  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    return "light";
  }

  return "dark"; // Default to dark (our primary theme)
}

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
      // Persist to localStorage
      localStorage.setItem("theme", state.mode);
      // Update DOM class for Tailwind
      document.documentElement.classList.toggle("dark", state.mode === "dark");
    },
    setTheme: (state, action: { payload: ThemeMode }) => {
      state.mode = action.payload;
      localStorage.setItem("theme", state.mode);
      document.documentElement.classList.toggle("dark", state.mode === "dark");
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
