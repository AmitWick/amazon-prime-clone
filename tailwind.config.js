/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg_color: "#030303f5",
        text_color: "#ffffff",
      },
      fontFamily: {
        sans_serif: "Rubik, sans-serif",
      },
    },
    screens: {
      sm: { max: "640px" }, // Small screens (max-width)
      md: { max: "768px" }, // Medium screens (max-width)
      lg: { max: "1024px" }, // Large screens (max-width)
      xl: { max: "1280px" }, // Extra large screens (max-width)
    },
  },
  plugins: [],
};
