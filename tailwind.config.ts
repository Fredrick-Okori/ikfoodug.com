import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  "#f5f6f6",
          100: "#e8eaeb",
          200: "#d0d4d6",
          300: "#a8b0b4",
          400: "#7c878d",
          500: "#5c6569",
          600: "#464d51",
          700: "#383e41",
          800: "#2d3235",
          900: "#252a2d",
          950: "#191d1f",
        },
        vanilla: {
          50:  "#fdf9f0",
          100: "#faf1db",
          200: "#f3e0b0",
          300: "#e9c87d",
          400: "#dcaa49",
          500: "#c9902a",
          600: "#b07620",
          700: "#8f5c1a",
          800: "#754a18",
          900: "#5f3d17",
        },
        gold: {
          300: "#c4f266",
          400: "#9ce800",
          500: "#7dba00",
          600: "#629200",
        },
        cream: "#faf6ee",
        parchment: "#f5edd8",
      },
      fontFamily: {
        sans:    ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        heading: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
