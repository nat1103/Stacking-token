/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  theme: {
    extend: {
      colors : {
        'primary' : '#5347DE',
        'secondary' : '#E2AD5E',
        'tertiary' : '#E2815E',
        'quaternary' : '#90BB94',
      },
    }
  },
}

