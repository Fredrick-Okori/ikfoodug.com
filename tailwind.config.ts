import type { Config } from "tailwindcss";

const config: Config = {
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
        sans:    ["Google Sans Text", "Google Sans", "system-ui", "sans-serif"],
        heading: ["Google Sans Display", "Google Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem,7vw,6rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-xl":  ["clamp(2.5rem,5.5vw,4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-lg":  ["clamp(2rem,4vw,3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
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
      boxShadow: {
        "glow-green": "0 0 40px -8px rgba(156,232,0,0.4)",
        "glow-gold":  "0 0 40px -8px rgba(156,232,0,0.35)",
        "card-hover": "0 24px 48px -12px rgba(0,0,0,0.18)",
        "inner-top":  "inset 0 2px 0 rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        "marquee":    "marquee 30s linear infinite",
        "marquee2":   "marquee2 30s linear infinite",
        "reveal":     "reveal 0.75s cubic-bezier(0.16,1,0.3,1) forwards",
        "reveal-lr":  "revealLR 0.75s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-up":    "fadeUp 0.6s ease-out forwards",
        "shimmer":    "shimmer 2s linear infinite",
        "float":      "float 6s ease-in-out infinite",
        "spin-slow":  "spin 12s linear infinite",
      },
      keyframes: {
        marquee:  { "0%": { transform: "translateX(0)" },   "100%": { transform: "translateX(-50%)" } },
        marquee2: { "0%": { transform: "translateX(50%)" }, "100%": { transform: "translateX(0)" } },
        reveal:   { "0%": { opacity: "0", transform: "translateY(28px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        revealLR: { "0%": { opacity: "0", transform: "translateX(-28px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
        fadeUp:   { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        shimmer:  { "0%": { backgroundPosition: "-200% center" }, "100%": { backgroundPosition: "200% center" } },
        float:    { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
