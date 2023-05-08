/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#009688",
        lightPrimary: "#009688",
        darkPrimary: "#00796d",
        lightGrey: "#F7F6F9",
        regularGrey: "#D7D7D7",
        darkGrey: "#676767",
        darkBlack: "#030303"
      },
    },
  },
  plugins: [],
}

