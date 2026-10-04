import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#08080a",
        surface: {
          50: "#1a1a22",
          100: "#14141a",
          200: "#0f0f14",
          300: "#0a0a0d",
          400: "#08080a",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.06)",
          light: "rgba(255, 255, 255, 0.12)",
          bright: "rgba(255, 255, 255, 0.22)",
        },
        text: {
          primary: "#f4f4f6",
          secondary: "#9e9ea7",
          muted: "#5e5e6a",
        },
        accent: {
          silver: "#e8e8ed",
          gold: "#e2ded4",
          emerald: "#10b981",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        editorial: ["var(--font-editorial)", "sans-serif"],
      },
      fontSize: {
        "hero-clamp": "clamp(3.2rem, 7.5vw, 8.5rem)",
        "section-clamp": "clamp(2.5rem, 5vw, 5.5rem)",
      },
      transitionTimingFunction: {
        "cinematic": "cubic-bezier(0.16, 1, 0.3, 1)",
        "editorial": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "grid-fade": "gridFade 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        gridFade: {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "0.3" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
