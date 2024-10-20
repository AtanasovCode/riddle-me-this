/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#d0fafb',
        'background': '#021415',
        'primary': '#7ef1f5',
        'secondary': '#0d259d',
        'accent': '#441fed',
      },
      fontFamily: {
        'sans': "Arima",
      },
      screens: {
        'xs': "550px",
        'xl': "1250px",
      },
    },
  },
  plugins: [],
}