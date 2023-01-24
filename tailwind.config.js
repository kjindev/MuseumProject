/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "767px",
      lg: "1024px",
      maxmd: { max: "767px" },
    },
  },
  extend: {},
  plugins: [],
};
