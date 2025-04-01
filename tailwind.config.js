/** @type {import('tailwindcss').Config} */
const typography = require("@tailwindcss/typography");
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [typography],
};
