/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
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
}
