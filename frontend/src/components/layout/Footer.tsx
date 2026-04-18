/*
 * Footer Component
 *
 * WHAT: Site-wide footer with social links and copyright.
 * WHY:  Professional portfolios need consistent branding and contact links.
 * HOW:  Uses semantic HTML <footer> tag, design token classes,
 *       and Lucide icons for consistent iconography.
 */

import { Mail, Heart } from "lucide-react";
import type { SvgIconProps } from "../../types/svg-icon";

// Lucide removed official support for third-party brands (Github/Linkedin) in a recent update.
// We embed pure SVGs natively so we don't have to import additional generic NPM libraries!
const Github = (props: SvgIconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={props.size} height={props.size} className={props.className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const Linkedin = (props: SvgIconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={props.size} height={props.size} className={props.className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/eashwarsai",
    label: "GitHub",
    id: "footer-github",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/eashwarsaiboini/",
    label: "LinkedIn",
    id: "footer-linkedin",
  },
  {
    icon: Mail,
    href: "mailto:eashwarsaiboini@gmail.com",
    label: "Email",
    id: "footer-email",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      className="border-t border-border-secondary bg-bg-secondary/50"
    >
      <div className="section-container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* ── Copyright ── */}
          <p 
            className="text-sm text-content-tertiary flex items-center gap-1 cursor-default select-none"
            onDoubleClick={() => {
              const token = prompt("Enter Admin API Key:");
              if (token) {
                localStorage.setItem("auth_token", token);
                window.dispatchEvent(new Event("auth-changed"));
                alert("Admin mode activated!");
              }
            }}
            title="Double-click to access admin mode"
          >
            © {currentYear} Eashwar Sai. Built with
            <Heart size={14} className="text-accent fill-accent" />
            and curiosity.
          </p>

          {/* ── Social Links ── */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                id={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9
                           rounded-button bg-surface hover:bg-surface-hover
                           border border-border-secondary hover:border-border-accent
                           hover:shadow-glow-sm
                           transition-all duration-normal group"
                aria-label={link.label}
                title={link.label}
              >
                <link.icon
                  size={16}
                  className="text-content-tertiary group-hover:text-accent
                             transition-colors duration-normal"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
