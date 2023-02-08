/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      maxxs: { max: "380px" },
      xs: "380px",
      sm: "640px",
      md: "767px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      maxmd: { max: "767px" },
    },
  },
  extend: {},
  plugins: [],
};
