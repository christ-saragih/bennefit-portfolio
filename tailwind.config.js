/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["Space Mono", "ui-monospace", "monospace"],
      },
      colors: {
        // Neo-brutalist palette
        paper: "#FAF4E8", // warm cream — light background
        ink: "#1A1A18", // near-black — text & borders (light)
        night: "#16140F", // warm near-black — dark background
        chalk: "#F2EAD9", // warm off-white — text & borders (dark)
        accent: "#FF9EC4", // soft rose pink — primary
        coral: "#FF5E3A", // coral — secondary
        azure: "#4DA3FF", // blue — tertiary
        grass: "#9BE564", // green — quaternary
      },
      boxShadow: {
        // Hard, offset, no-blur brutalist shadows (light mode — ink)
        neo: "4px 4px 0 0 #1A1A18",
        "neo-sm": "2px 2px 0 0 #1A1A18",
        "neo-lg": "6px 6px 0 0 #1A1A18",
        "neo-xl": "8px 8px 0 0 #1A1A18",
        // Dark mode — chalk
        "neo-chalk": "4px 4px 0 0 #F2EAD9",
        "neo-chalk-sm": "2px 2px 0 0 #F2EAD9",
        "neo-chalk-lg": "6px 6px 0 0 #F2EAD9",
        "neo-chalk-xl": "8px 8px 0 0 #F2EAD9",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out both",
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
