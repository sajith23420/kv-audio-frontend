/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D5E9F7",
        secondary: "#E8F9FF",
        accent: "#3674B5"
      }
    },
  },
  plugins: [],
}