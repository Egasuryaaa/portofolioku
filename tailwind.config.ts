import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        // ── Legacy aliases (keep for Tailwind var() compatibility) ──
        background: "var(--background)",
        foreground: "var(--foreground)",

        // ── Navy Design System Tokens ─────────────────────────────────
        // Use these semantic names in components, never hardcode hex.
        base:      "var(--color-base)",      // #0A0E17 — page background
        surface:   "var(--color-surface)",   // #131B2E — cards, navbar, panels
        primary:   "var(--color-primary)",   // #2563EB — CTAs, active links, logo
        secondary: "var(--color-secondary)", // #38BDF8 — glow, hover accents (use sparingly)
        fg:        "var(--color-fg)",        // #E8ECF4 — body text
        // Usage: bg-base, text-fg, border-primary/30, etc.
      },
    },
  },
  plugins: [],
};
export default config;
