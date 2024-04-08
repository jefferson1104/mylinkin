import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // light theme colors
        'light-background': '#e2e8f0',
        'light-title': '#09090b',
        'light-text': '#717179',
        'light-border': '#cbd5e1',
        'light-placeholder': '#a1a1aa',

        // dark theme colors
        'dark-background': '#18181b',
        'dark-title': '#e2e8f0',
        'dark-text': '#cbd5e1',
        'dark-border': '#27272a',
        'dark-placeholder': '#52525b',
      },
      fontFamily: {
        display: ["var(--font-sf)", "system-ui", "sans-serif"],
      },
      animation: {
        // Fade up and down
        "fade-up": "fade-up 0.5s",
        "fade-down": "fade-down 0.5s",
      },
      keyframes: {
        // Fade up and down
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "80%": {
            opacity: "0.6",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
        },
        "fade-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "80%": {
            opacity: "0.6",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
