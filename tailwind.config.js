/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 12px 24px -6px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'glass': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'glow-blue': '0 0 20px -3px rgba(0, 82, 156, 0.2)',
        'glow-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.2)',
      },
      colors: {
        slate: {
          850: '#172033',
        },
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
