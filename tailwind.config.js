/** @type {import('tailwindcss').Config} */
const token = (name) => `hsl(var(--${name}) / <alpha-value>)`;

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Minimum readable size is 12px; 2xs kept only for dense table meta.
        '2xs': ['11px', { lineHeight: '16px' }],
      },
      borderRadius: {
        DEFAULT: '6px',
      },
      boxShadow: {
        // Legacy names kept so un-migrated views keep compiling, but toned down.
        'subtle': '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        'card': '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        'card-hover': '0 2px 6px -1px rgb(0 0 0 / 0.08)',
        'glass': '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        'glow-blue': 'none',
        'glow-emerald': 'none',
        'pop': '0 8px 24px -6px rgb(0 0 0 / 0.16), 0 0 0 1px hsl(var(--line))',
      },
      colors: {
        // Semantic design tokens (see src/index.css)
        canvas: token('canvas'),
        surface: token('surface'),
        sunken: token('sunken'),
        line: token('line'),
        'line-strong': token('line-strong'),
        ink: token('ink'),
        muted: token('muted'),
        subtle: token('subtle'),
        accent: {
          DEFAULT: token('accent'),
          fg: token('accent-fg'),
          soft: token('accent-soft'),
        },
        ok: { DEFAULT: token('ok'), soft: token('ok-soft') },
        warn: { DEFAULT: token('warn'), soft: token('warn-soft') },
        danger: { DEFAULT: token('danger'), soft: token('danger-soft') },

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
