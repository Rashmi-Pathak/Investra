import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./animations/**/*.{ts,tsx}",
    "./registry/**/*.{ts,tsx}",
    "../../packages/animations/**/*.{ts,tsx}",
    "../../packages/ui/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090909",
        secondaryBg: "#111111",
        surface: "var(--investra-surface, #181614)",
        elevated: "#211C19",
        bronze: {
          DEFAULT: "var(--investra-accent, #C98A4A)",
          secondary: "var(--investra-accent-secondary, #D8A56D)",
          warm: "#5A463E",
          deep: "#382B27",
          beige: "#F2D7B6",
        },
        textPrimary: "#FAF7F5",
        textSecondary: "#B9B4B1",
        textMuted: "#7A7471",
        success: "#3EDC81",
        loss: "#FF5C5C",
        warning: "#FFC857",
      },
      borderRadius: {
        btn: "14px",
        card: "20px",
        chart: "22px",
        input: "14px",
        dialog: "24px",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "bronze-glow": "0 0 36px -6px rgba(201, 138, 74, 0.25)",
        "bronze-glow-lg": "0 0 55px -8px rgba(201, 138, 74, 0.42)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        marquee: "marquee var(--duration, 25s) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration, 25s) linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
