/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        blood: "#D80000",
      },
      animation: {
        grow: "grow 0.2s ease-in-out forwards",
        rise: "rise .5s ease-in-out forwards",
      },
      keyframes: {
        grow: {
          "0%": { transform: "scale(0)", "transform-origin": "right" },
          "100%": { transform: "scale(1)", "transform-origin": "right" },
        },
        rise: {
          "0%": { transform: "scale(.3)", opacity: 0 },
          "50%": { transform: "scale(1.25)", opacity: 1 },
          "70%": { transform: "scale(.8)"},
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
