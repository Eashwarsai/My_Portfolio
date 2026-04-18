/*
 * App Component — Root of the React Application
 *
 * WHAT: Sets up providers (Redux, Router, Helmet) and defines routes.
 * WHY:  This is the composition root — every provider wraps the app here.
 *       Centralizing route definitions makes navigation discoverable.
 * HOW:  
 *       - <Provider> connects Redux store to React's component tree
 *       - <HelmetProvider> enables per-page <head> tag management  
 *       - <BrowserRouter> enables client-side routing (SPA)
 *       - React.lazy() + <Suspense> enables code splitting per route
 *
 * CODE SPLITTING EXPLAINED:
 *   React.lazy() tells the bundler (Vite/Rollup) to create a separate
 *   JavaScript chunk for each lazily-loaded component. These chunks are
 *   downloaded ONLY when the user navigates to that route.
 *   Result: Faster initial page load (smaller main bundle).
 */

import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { store } from "./store";
import RootLayout from "../components/layout/RootLayout";

// ── Lazy-loaded route components (code splitting) ──
// Each of these becomes a separate JS chunk in the production build.
// The browser downloads them on-demand when the user navigates to that route.
const PortfolioPage = React.lazy(
  () => import("../features/portfolio/index")
);
const BlogPage = React.lazy(() => import("../features/blog/index"));
const LearningLogPage = React.lazy(
  () => import("../features/learning-log/index")
);

const AdminLoginPage = React.lazy(() => import("../features/admin/AdminLoginPage"));

// ── Loading fallback for lazy-loaded routes ──
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-8 h-8 border-2 border-border-primary border-t-accent
                     rounded-full animate-spin"
        />
        <p className="text-sm text-content-tertiary">Loading...</p>
      </div>
    </div>
  );
}

// ── Theme Initializer ──
// Ensures the 'dark' class is on <html> before first render to avoid flash
function ThemeInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const theme = store.getState().theme.mode;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  return <>{children}</>;
}

export default function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <ThemeInitializer>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Admin login page - No Sidebar/Footer */}
                <Route path="/admin" element={<AdminLoginPage />} />

                {/* All other routes share the RootLayout (Header + Footer) */}
                <Route element={<RootLayout />}>
                  <Route path="/" element={<PortfolioPage />} />
                  <Route path="/blog/*" element={<BlogPage />} />
                  <Route path="/learning-log" element={<LearningLogPage />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ThemeInitializer>
      </HelmetProvider>
    </Provider>
  );
}
