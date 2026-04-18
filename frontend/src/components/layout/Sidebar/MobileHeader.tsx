import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../ThemeToggle";

interface MobileHeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function MobileHeader({ mobileMenuOpen, setMobileMenuOpen }: MobileHeaderProps) {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-bg-primary/95 backdrop-blur-lg border-b border-border-secondary z-50 flex items-center justify-between px-4">
      <NavLink to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
        <div className="flex items-center justify-center w-9 h-9 rounded-button overflow-hidden bg-surface border border-accent/20">
          <img src="https://github.com/eashwarsai.png" alt="Eashwar Sai" className="w-full h-full object-cover" />
        </div>
        <span className="font-display font-bold text-lg text-content-primary">ES</span>
      </NavLink>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
          {mobileMenuOpen ? <X size={24} className="text-content-secondary" /> : <Menu size={24} className="text-content-secondary" />}
        </button>
      </div>
    </div>
  );
}
