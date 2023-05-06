/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "offblack": "#202031",
        "offwhite": "#fafafa",
      },
    },
  },
  plugins: [],
};
