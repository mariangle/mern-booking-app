/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#32449B",
        lightPrimary: "#8692ee",
        darkPrimary: "#3447D4",
        lightGrad: "#303F88",
        darkGrad: "#20253F",
        lightGrey: "#F7F6F9",
        regularGrey: "#D7D7D7",
        darkGrey: "#676767",
        darkBlack: "#030303"
      },
    },
  },
  plugins: [],
}

