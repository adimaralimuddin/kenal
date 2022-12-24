/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "back-dark": "#0D1115",
        "box-dark": "#161C24",
        d1: "#1E2630",
        d2: "#252D38",
        d3: "#293340",
        d4: "#2F3A48",
        d5: "#394453",
        d6: "#475364",
      },
      animation: {
        expand: "expand 0.3s ease-out",
        pop: "pop 0.25s ",
      },
      keyframes: {
        expand: {
          "0%": { width: "0px" },
          "100%": { width: "" },
        },
        pop: {
          "0%": { opacity: "0%", scale: "0.1" },
          "70%": { opacity: "70%", scale: "1.1" },
          "100%": { opacity: "100%", scale: "1" },
        },
      },
    },
  },
  plugins: [],
};
