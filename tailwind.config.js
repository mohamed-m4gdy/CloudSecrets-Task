/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Oxygen', 'sans-serif'],
      },
      colors: {
        primary: '#3B82F6',
        text: {
          DEFAULT: '#333',
          light: '#666',
        },
        background: '#f8f8f8',
      },
    },
  },
  plugins: [],
}
