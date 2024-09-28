/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: "var(--text-xs)",
      sm: "var(--text-sm)",
      base: "var(--text-base)",
    },
    fontFamily: {
      lato: ["Lato", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};

