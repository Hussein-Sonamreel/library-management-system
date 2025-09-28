/** @type {import('tailwindcss').Config} */
export default {
  // Instruct Tailwind to scan all React files for class usage
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Defining our high-end mint palette
        'deep-mint': '#66CDAA', // Primary brand color
        'spearmint': '#A1E3B3', // Accent color for buttons/highlights
        'pale-mint': '#F5FFFA', // Reserved for subtle backgrounds
      },
    },
  },
  plugins: [],
}