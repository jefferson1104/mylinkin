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
        'light-background': 'rgb(248 250 252)',
        'light-title': 'rgb(9 9 11)',
        'light-text': 'rgb(113 113 122)',
        'light-border': 'rgb(229 231 235)',
        'light-placeholder': 'rgb(161 161 170)',

        // dark theme colors
        'dark-background': 'rgb(24 24 27)',
        'dark-title': 'rgb(226 232 240)',
        'dark-text': 'rgb(203 213 225)',
        'dark-border': 'rgb(63 63 70)',
        'dark-placeholder': 'rgb(82 82 91)',
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
