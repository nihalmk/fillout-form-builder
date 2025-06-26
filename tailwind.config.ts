import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        100: "100",
        1000: "1000",
        max: "9999",
      },
      colors: {
        primary: "#1E40AF", // Custom primary color (blue-900)
        secondary: "#F59E0B", // Custom secondary color (amber-500)
        background: "#F3F4F6", // Light gray background
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
