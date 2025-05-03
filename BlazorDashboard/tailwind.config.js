/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{razor,html,cshtml}",
    "./Pages/**/*.{razor,html,cshtml}",
    "./Shared/**/*.{razor,html,cshtml}",
    "./Components/**/*.{razor,html,cshtml}"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'oklch(0.6 0.2 240)',
        secondary: 'oklch(0.8 0.2 160)'
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}
