/*
 * ThemeToggle Component
 *
 * WHAT: A button that switches between dark and light themes.
 * WHY:  Accessibility and user preference. Some users prefer light mode.
 * HOW:  Dispatches the toggleTheme Redux action which:
 *       1. Flips the state in Redux
 *       2. Persists to localStorage
 *       3. Adds/removes 'dark' class on <html>
 *       4. Tailwind reads the class and applies dark: variant styles
 */

import { Moon, Sun } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { toggleTheme } from "../../app/themeSlice";

export default function ThemeToggle() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  return (
    <button
      id="theme-toggle"
      onClick={() => dispatch(toggleTheme())}
      className="relative flex items-center justify-center w-10 h-10 rounded-button
                 bg-surface hover:bg-surface-hover border border-border-secondary
                 transition-all duration-normal hover:border-border-accent
                 hover:shadow-glow-sm group"
      aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
    >
      {mode === "dark" ? (
        <Sun
          size={18}
          className="text-content-secondary group-hover:text-accent
                     transition-colors duration-normal"
        />
      ) : (
        <Moon
          size={18}
          className="text-content-secondary group-hover:text-accent
                     transition-colors duration-normal"
        />
      )}
    </button>
  );
}
