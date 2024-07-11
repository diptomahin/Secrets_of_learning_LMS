/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'prime':'#127957',
      'main': '#11998e',
      'second': '#38ef7d',
      'white' : 'white'
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

