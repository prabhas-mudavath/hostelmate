/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",   // Blue (buttons, active tabs)
        background: "#F8FAFC", // App background
        card: "#FFFFFF",
        textPrimary: "#0F172A",
        textSecondary: "#475569",
        muted: "#64748B",
        border: "#E5E7EB",
        success: "#16A34A",
        warning: "#F59E0B",
      },
      borderRadius: {
        xl: "16px",
        lg: "12px",
      },
    },
  },
  plugins: [],
}
