import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#FFFFFF",
        k: {
          purple: { primary: "#9236E5", deep: "#6C17B7", soft: "#C390F0" },
          gray: { 900: "#0A0A0A", 800: "#141414", 700: "#1E1E1E" }
        }
      },
      borderColor: { DEFAULT: "#1E1E1E" }
    }
  },
  plugins: [],
};
export default config;
