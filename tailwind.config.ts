import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        "Geist Sans": ["var(--font-geist-sans)"],
        "Geist Mono": ["var(--font-geist-mono)"],
        "Bungee Shade": ["var(--font-bungee-shade)"],
        "Nabla": ["var(--font-nabla)"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
} satisfies Config;
