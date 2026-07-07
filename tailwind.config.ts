import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        muted: "#a4a4a4",
        hairline: "#6b6b6b",
      },
      fontFamily: {
        display: ["var(--font-inria-serif)", "serif"],
        body: ["var(--font-jeju-myeongjo)", "serif"],
        sans: ["var(--font-instrument-sans)", "sans-serif"],
        joan: ["var(--font-joan)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;