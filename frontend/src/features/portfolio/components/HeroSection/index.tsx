/*
 * Portfolio Page — Hero Section
 *
 * WHAT: The first thing visitors see — name, title, and a brief intro.
 * WHY:  First impressions matter. The hero establishes who you are
 *       and what you do in under 3 seconds.
 * HOW:  Gradient text for the name, animated entrance, and a subtle
 *       background grid pattern for visual depth.
 */

import { ChevronDown, Download } from "lucide-react";
import type { SvgIconProps } from "../../../../types/svg-icon";

// Native SVG replacement for deprecated Lucide Brand property avoiding dependency bloat
const Github = (props: SvgIconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={props.size} height={props.size} className={props.className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center
                 overflow-hidden"
    >
      {/* ── Background grid pattern ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-accent-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-accent-primary) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Ambient glow orbs ── */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full
                   bg-accent/5 blur-[100px] pointer-events-none"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full
                   bg-accent-secondary/5 blur-[100px] pointer-events-none"
      />

      {/* ── Content ── */}
      <div className="section-container relative z-10 text-center">
        {/* ── Fancy Animated Avatar ── */}
        <div className="relative inline-flex items-center justify-center mb-8 animate-fade-in opacity-0">
          {/* Fuzzy ambient glow / orbs behind the image */}
          <div className="absolute inset-0 bg-accent/40 blur-3xl rounded-full scale-125 animate-pulse" />
          <div className="absolute -inset-4 bg-gradient-to-tr from-accent/50 to-accent-secondary/50 blur-2xl opacity-60 rounded-full animate-[spin_8s_linear_infinite] z-0" />

          {/* Main Avatar Container */}
          <div
            className="relative z-10 w-32 h-32 md:w-36 md:h-36 rounded-full p-[3px] 
                       bg-gradient-to-br from-accent to-accent-secondary
                       shadow-glow transition-transform duration-normal hover:scale-105
                       group cursor-pointer"
          >
            <img
              src="https://github.com/eashwarsai.png"
              alt="Eashwar Sai"
              className="w-full h-full object-cover rounded-full border-[4px] border-bg-primary bg-surface transition-all duration-normal"
            />
          </div>
        </div>

        {/* Name */}
        <h1
          className="animate-fade-in opacity-0 stagger-1
                     font-display font-bold text-display-sm md:text-display lg:text-display-lg
                     mb-4"
        >
          Hi, I'm{" "}
          <span className="gradient-text">Eashwar Sai</span>
        </h1>

        {/* Title */}
        <p
          className="animate-fade-in opacity-0 stagger-2
                     text-xl md:text-2xl text-content-secondary font-light mb-6
                     max-w-2xl mx-auto"
        >
          Software Development Engineer <span className="text-accent">@</span> BeautifulCode
        </p>

        {/* Description */}
        <p
          className="animate-fade-in opacity-0 stagger-3
                     text-base md:text-lg text-content-tertiary max-w-xl mx-auto mb-10
                     leading-relaxed"
        >
          SDE-2 specializing in high-scale React applications, GraphQL, and Python.
          Experience building enterprise solutions and internal platforms that drive 
          real business value.
        </p>

        {/* CTA Buttons */}
        <div
          className="animate-fade-in opacity-0 stagger-4
                     flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            id="hero-cta-view-resume"
            href="https://drive.google.com/file/d/1hxlljUVFo0J36j286TA2oD9M783B5S3S/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3
                       bg-accent hover:bg-accent-secondary text-content-inverse
                       font-medium rounded-button shadow-button
                       hover:shadow-glow transition-all duration-normal"
          >
            View Resume
          </a>

          <a
            id="hero-cta-download-resume"
            href="https://drive.google.com/uc?export=download&id=1hxlljUVFo0J36j286TA2oD9M783B5S3S"
            className="inline-flex items-center gap-2 px-6 py-3
                       bg-surface hover:bg-surface-hover text-content-primary
                       font-medium rounded-button border border-border-primary
                       hover:border-border-accent hover:shadow-glow-sm
                       transition-all duration-normal"
          >
            <Download size={18} />
            Download CV
          </a>

          <a
            id="hero-cta-github"
            href="https://github.com/eashwarsai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3
                       bg-surface hover:bg-surface-hover text-content-primary
                       font-medium rounded-button border border-border-primary
                       hover:border-border-accent hover:shadow-glow-sm
                       transition-all duration-normal p-3 min-w-0"
            aria-label="GitHub Profile"
          >
            <Github size={20} />
          </a>
        </div>

      </div>

      {/* Scroll indicator */}
      <div
        className="animate-fade-in opacity-0 stagger-5
                   absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <a
          href="#experience"
          className="text-content-tertiary hover:text-accent transition-colors duration-normal flex justify-center"
          aria-label="Scroll down"
        >
          <ChevronDown
            size={24}
            className="animate-bounce"
          />
        </a>
      </div>
    </section>
  );
}
