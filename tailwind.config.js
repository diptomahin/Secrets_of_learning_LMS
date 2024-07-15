/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'prime':'#f02d00',
      'main': '#161616',
      'white' : 'white',
      'black' : 'black',
      'red' : 'red'
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

