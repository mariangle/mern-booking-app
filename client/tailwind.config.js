/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#da435e",
        lightPrimary: "#8692ee",
        darkPrimary: "#3447D4",
        lightGrad: "#d43b48",
        darkGrad: "#a72727", 
        lightGrey: "#F7F6F9",
        regularGrey: "#D7D7D7",
        darkGrey: "#676767",
        darkBlack: "#030303"
      },
    },
  },
  plugins: [],
}

