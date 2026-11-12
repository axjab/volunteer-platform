/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#07111F",
        panel: "#0E1A2B",
        card: "#101D31",
        primary: "#6D5EF7",
        secondary: "#19C2C9",
        accent: "#F97316",
        success: "#22C55E",
        warning: "#F59E0B",
        muted: "#94A3B8",
      },
      boxShadow: {
        glow: "0 10px 30px rgba(109, 94, 247, 0.25)",
        soft: "0 10px 30px rgba(2, 8, 23, 0.35)",
      },
      backgroundImage: {
        hero: "radial-gradient(circle at top left, rgba(109,94,247,0.24), transparent 30%), radial-gradient(circle at top right, rgba(25,194,201,0.16), transparent 28%), linear-gradient(180deg, #08111f 0%, #0b1525 100%)",
      },
    },
  },
  plugins: [],
};