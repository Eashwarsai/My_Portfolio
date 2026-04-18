/*
 * Root Layout Component
 *
 * WHAT: The persistent shell that wraps all pages: Sidebar + Content + Footer.
 * WHY:  Layout components ensure consistent structure across routes.
 *       React Router's <Outlet /> renders the matched child route's component
 *       inside this layout.
 */

import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function RootLayout() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="flex flex-col min-h-screen relative">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />

      {/* Main content — grows to fill space, pushes footer down */}
      {/* pt-16 accounts for mobile fixed header height */}
      <main 
        className={`flex-1 transition-all duration-normal
                   pt-16 md:pt-0
                   ${isSidebarExpanded ? "md:ml-64" : "md:ml-16"}`}
      >
        <Outlet />
      </main>

      <div className={`transition-all duration-normal ${isSidebarExpanded ? "md:ml-64" : "md:ml-16"}`}>
         <Footer />
      </div>
    </div>
  );
}
