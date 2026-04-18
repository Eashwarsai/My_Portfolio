/** @type {import('tailwindcss').Config} */

/*
 * ============================================================
 * DESIGN TOKEN ARCHITECTURE
 * ============================================================
 *
 * WHAT: Maps semantic token names to CSS custom properties.
 *       Uses rgb() with <alpha-value> so Tailwind's opacity modifiers 
 *       (like bg-surface/80) work perfectly.
 */

function withOpacity(variableName) {
  return `rgb(var(${variableName}) / <alpha-value>)`;
}

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        bg: {
          primary: withOpacity("--color-bg-primary"),
          secondary: withOpacity("--color-bg-secondary"),
          tertiary: withOpacity("--color-bg-tertiary"),
        },
        surface: {
          DEFAULT: withOpacity("--color-surface"),
          hover: withOpacity("--color-surface-hover"),
          active: withOpacity("--color-surface-active"),
        },
        content: {
          primary: withOpacity("--color-text-primary"),
          secondary: withOpacity("--color-text-secondary"),
          tertiary: withOpacity("--color-text-tertiary"),
          inverse: withOpacity("--color-text-inverse"),
        },
        accent: {
          DEFAULT: withOpacity("--color-accent-primary"),
          secondary: withOpacity("--color-accent-secondary"),
          tertiary: withOpacity("--color-accent-tertiary"),
          muted: withOpacity("--color-accent-muted"),
        },
        border: {
          DEFAULT: withOpacity("--color-border-primary"),
          secondary: withOpacity("--color-border-secondary"),
          accent: withOpacity("--color-border-accent"),
        },
        status: {
          success: withOpacity("--color-status-success"),
          warning: withOpacity("--color-status-warning"),
          error: withOpacity("--color-status-error"),
          info: withOpacity("--color-status-info"),
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["var(--text-display-lg)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display": ["var(--text-display)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-sm": ["var(--text-display-sm)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "section": "var(--spacing-section)",
        "section-sm": "var(--spacing-section-sm)",
        "container": "var(--spacing-container)",
        "card": "var(--spacing-card)",
        "card-sm": "var(--spacing-card-sm)",
      },
      borderRadius: {
        "card": "var(--radius-card)",
        "button": "var(--radius-button)",
        "input": "var(--radius-input)",
        "badge": "var(--radius-badge)",
        "full": "9999px",
      },
      boxShadow: {
        "card": "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        "button": "var(--shadow-button)",
        "glow": "var(--shadow-glow)",
        "glow-sm": "var(--shadow-glow-sm)",
      },
      transitionDuration: {
        "fast": "var(--duration-fast)",
        "normal": "var(--duration-normal)",
        "slow": "var(--duration-slow)",
      },
      maxWidth: {
        "content": "var(--max-width-content)",
        "narrow": "var(--max-width-narrow)",
      },
      keyframes: {
        "fade-in": { "0%": { opacity: "0", transform: "translateY(10px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "fade-in-up": { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "pulse-glow": { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.7" } },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.content.primary"),
            a: {
              color: theme("colors.accent.DEFAULT"),
              "&:hover": { color: theme("colors.accent.secondary") },
            },
            "h1, h2, h3, h4, h5, h6": {
              color: theme("colors.content.primary"),
              fontFamily: theme("fontFamily.display").join(", "),
            },
            strong: { color: theme("colors.content.primary") },
            code: { color: theme("colors.accent.DEFAULT") },
            blockquote: {
              borderLeftColor: theme("colors.accent.DEFAULT"),
              color: theme("colors.content.secondary"),
            },
            pre: {
              backgroundColor: theme("colors.surface.DEFAULT"),
              border: `1px solid ${theme("colors.border.secondary")}`,
            },
            hr: { borderColor: theme("colors.border.secondary") },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
