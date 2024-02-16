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
          purple: "#6b068a",
        },
      },
      keyframes: {
        anim: {
          "0%": { opacity: 0, transform: "translate-y-[40px]" },
          "100%": { opacity: 1, transform: "translate-y-[0px]" },
        },
      },
      animation: {
        "anim-1s-ease-out-forwards": "anim 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};
