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
        bri: {
          blue: '#00529C',
          navy: '#002B49',
          orange: '#F58220',
          light: '#E6F0FA'
        },
        mandiri: {
          blue: '#0A3B74',
          gold: '#FDB813'
        },
        bni: {
          teal: '#005E5D',
          orange: '#F15A24'
        },
        btn: {
          blue: '#003366',
          gold: '#C5A059'
        },
        bsi: {
          teal: '#00A39D',
          green: '#78BE20'
        }
      }
    },
  },
  plugins: [],
}
