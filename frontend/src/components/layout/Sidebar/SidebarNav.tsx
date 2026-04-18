import { NavLink } from "react-router-dom";
import { User, Star, BookOpen, LockOpen, LogOut } from "lucide-react";
import { useAdmin } from "../../../hooks/useAdmin";

interface SidebarNavProps {
  expanded: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setIsHovered: (hovered: boolean) => void;
}

const navLinks = [
  { to: "/", label: "Profile", icon: User },
  { to: "/blog", label: "Deep Dives & Concepts", icon: Star },
  { to: "/learning-log", label: "What did I do today?", icon: BookOpen },
];

export default function SidebarNav({ expanded, setMobileMenuOpen, setIsHovered }: SidebarNavProps) {
  const { isAdmin, logout } = useAdmin();

  return (
    <>
      <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-2 px-2 scrollbar-none">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => {
                setMobileMenuOpen(false);
                setIsHovered(false);
              }}
              className={({ isActive }) => `
                flex items-center gap-3 px-2.5 py-2.5 rounded-button transition-all duration-normal group whitespace-nowrap
                ${isActive ? "bg-accent-muted text-accent" : "text-content-secondary hover:bg-surface-hover hover:text-content-primary"}
                ${!expanded ? "justify-center" : ""}
              `}
              title={!expanded ? link.label : undefined}
            >
              <div className="flex-shrink-0 flex items-center justify-center w-6">
                <Icon size={20} />
              </div>
              {expanded && (
                <span className="font-medium animate-fade-in overflow-hidden">
                  {link.label}
                </span>
              )}
            </NavLink>
          );
        })}

        {/* Admin mode active — show sign out pinned at bottom */}
        {isAdmin && (
          <div className="mt-auto pt-4 border-t border-border-secondary">
            <button
              onClick={() => logout()}
              title="Sign out of admin mode"
              className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-button transition-all duration-normal text-accent bg-accent-muted hover:bg-accent/20 ${!expanded ? "justify-center" : ""}`}
            >
              <div className="flex-shrink-0 flex items-center justify-center w-6">
                <LockOpen size={18} />
              </div>
              {expanded && (
                <span className="font-medium animate-fade-in overflow-hidden text-sm flex items-center gap-2 justify-between w-full">
                  Admin mode
                  <LogOut size={14} className="opacity-60" />
                </span>
              )}
            </button>
          </div>
        )}
     </nav>
    </>
  );
}
