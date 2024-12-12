/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#f4f4f4",
        secondary: "#34d399",
        bgPrimary: "#313131",
        bgSecondary: "#1e1e1e",
      },
    },
  },
  plugins: [],
};