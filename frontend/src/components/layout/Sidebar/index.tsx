import { NavLink } from "react-router-dom";
import { Menu, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import ThemeToggle from "../ThemeToggle";
import MobileHeader from "./MobileHeader";
import SidebarNav from "./SidebarNav";

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({ isExpanded, setIsExpanded }: SidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const expanded = isExpanded || isHovered || mobileMenuOpen;

  return (
    <>
      {/* Mobile Top Header */}
      <MobileHeader 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />

      {/* Desktop Floating Theme Toggle */}
      <div className="hidden md:block fixed top-4 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main Sidebar (Desktop fixed left, Mobile drawer) */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-0 bottom-0 left-0 z-40 bg-bg-primary/95 lg:bg-bg-primary 
          border-r border-border-secondary transition-all duration-normal flex flex-col 
          ${expanded ? "w-64" : "w-16"}
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          md:pt-0 pt-16`}
      >
        {/* Desktop Logo & Expand Toggle */}
        <div className="hidden md:flex h-16 items-center px-3 border-b border-border-secondary shrink-0">
          <div className={`flex items-center ${expanded ? "justify-between" : "justify-center"} w-full`}>
            {expanded && (
              <NavLink to="/" className="flex items-center gap-2 overflow-hidden animate-fade-in">
                 <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-button overflow-hidden bg-surface border border-accent/20">
                   <img src="https://github.com/eashwarsai.png" alt="Eashwar Sai" className="w-full h-full object-cover" />
                 </div>
                 <span className="font-display font-bold text-lg text-content-primary">ES</span>
              </NavLink>
            )}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-button text-content-secondary hover:bg-surface-hover hover:text-content-primary transition-colors"
              aria-label="Toggle sidebar anchor"
              title={isExpanded ? "Unpin sidebar" : "Pin sidebar"}
            >
              {isExpanded ? <ChevronLeft size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <SidebarNav 
          expanded={expanded} 
          setMobileMenuOpen={setMobileMenuOpen} 
          setIsHovered={setIsHovered} 
        />
      </aside>
      
      {/* Mobile scrim overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden animate-fade-in" onClick={() => setMobileMenuOpen(false)} />
      )}
    </>
  );
}
