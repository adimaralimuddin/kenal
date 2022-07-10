/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        expand: "expand 0.3s ease-out",
      },
      keyframes: {
        expand: {
          "0%": { width: "0px" },
          "100%": { width: "" },
        },
      },
    },
  },
  plugins: [],
};
