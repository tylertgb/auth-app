/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: 'rgb(68, 32, 188)', // base color
        light: '#e5e7eb',
      },
      backgroundImage: {
        'announcement-gradient':
          'linear-gradient(90deg, #440f14, #5e1219 15%, #000 35%, #000 45%, #5e1219 85%, #440f14)',
      },
    },
  },
  plugins: [],
};
