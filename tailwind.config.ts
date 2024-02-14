/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          green: "#124D4D",
          orange: "#FF7941",
          white: "#FFFFFA",
        },
      },
    },
  },
  plugins: [],
};
