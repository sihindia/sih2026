/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f9',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#627d98',
          500: '#486581',
          600: '#334e68',
          700: '#243b53',
          800: '#102a43',
          900: '#0B192C',
          950: '#06101E',
        },
        brand: {
          50: '#f0f4f9',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#829ab1',
          400: '#486581',
          500: '#243b53',
          600: '#102a43',
          700: '#0B192C',
          800: '#081424',
          900: '#050d18',
          950: '#02060c',
        },
        sih: {
          orange: '#FF6B00',
          blue: '#0B192C',
          navy: '#0B192C',
          green: '#10B981',
          gold: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
