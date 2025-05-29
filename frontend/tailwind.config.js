/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brown': {
          800: '#4B2E1E',
        },
      },
      animation: {
        'bounce-slow': 'bounce-slow 1.5s infinite alternate ease-in-out',
      },
      keyframes: {
        'bounce-slow': {
          '0%, 70%': {
            'background-size': '100% 40%, 8px 8px',
            'transform': 'scaleY(1)',
          },
          '85%': {
            'background-size': '100% 120%, 8px 8px',
            'transform': 'scaleY(1.2)',
          },
          '100%': {
            'background-size': '100% 40%, 8px 8px',
            'transform': 'scaleY(1)',
          },
        },
      },
      animationDelay: {
        '100': '100ms',
      }
    },
  },
  plugins: [],
};