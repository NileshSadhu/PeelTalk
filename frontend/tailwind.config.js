/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "450px",
        // sm: "50px",
      },
      colors: {
        'brown': {
          800: '#4B2E1E',
        }
      },
      fontFamily: {
        'balsamiq': ['"Balsamiq Sans"', 'cursive'],
      },
    },
  },
  plugins: [],
} 