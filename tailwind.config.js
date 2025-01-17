/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)"],
      },
      colors: {
        "go-blue": {
          50: "#eff8ff",
          100: "#dbeefe",
          200: "#bee3ff",
          300: "#92d3fe",
          400: "#5eb9fc",
          500: "#3899f8", // button color :)
          600: "#237bed",
          700: "#1b65da",
          800: "#1c52b1",
          900: "#1d478b",
          950: "#162d55",
        },
      },
    },
  },
  plugins: [],
};
