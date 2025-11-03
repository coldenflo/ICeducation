/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0c96a5',
        secondary: '#f49555',
        thirdly: '#0910e8',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};