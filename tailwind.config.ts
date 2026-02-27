import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#DC2626",
          "red-dark": "#B91C1C",
          "red-light": "#EF4444",
          black: "#111111",
          "dark-gray": "#1A1A1A",
          "medium-gray": "#2D2D2D",
          "light-gray": "#F3F4F6",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
