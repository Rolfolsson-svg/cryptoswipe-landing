/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#21C17A",
          dark: "#17A164"
        }
      },
      gradientColorStops: {
        'brand-start': '#1B5FFF',
        'brand-end': '#7B33FF'
      }
    },
  },
  plugins: [],
}
