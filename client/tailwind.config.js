/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink_1: "#EE119C",
      },
      fontFamily: {
        dancing: ["Dancing Script", "cursive"]
      },
      screens: {
        xs: "475px",
        mlg: "850px",
      }
    },
  },
  plugins: [],
}