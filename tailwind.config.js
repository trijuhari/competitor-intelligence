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
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['11px', { lineHeight: '15px' }],
        'xs': ['12px', { lineHeight: '17px' }],
        'sm': ['13.5px', { lineHeight: '20px' }],
        'base': ['15px', { lineHeight: '22px' }],
      },
      borderRadius: {
        'sm': '6px',
        DEFAULT: '8px',
        'md': '10px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'card': '0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.08)',
        'card-hover': '0 8px 20px -4px rgba(15, 23, 42, 0.12), 0 4px 8px -2px rgba(15, 23, 42, 0.06)',
        'glass': '0 4px 16px 0 rgba(15, 23, 42, 0.1)',
        'glow-blue': '0 4px 14px -2px rgba(2, 132, 199, 0.25)',
        'glow-emerald': '0 4px 14px -2px rgba(16, 185, 129, 0.25)',
        'glow-amber': '0 4px 14px -2px rgba(245, 158, 11, 0.25)',
        'glow-purple': '0 4px 14px -2px rgba(168, 85, 247, 0.25)',
        'pop': '0 12px 28px -6px rgba(15, 23, 42, 0.2), 0 0 0 1px hsl(var(--line))',
      },
      colors: {
        // Semantic design tokens (see src/index.css)
        canvas: token('canvas'),
        surface: token('surface'),
        'surface-elevated': token('surface-elevated'),
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
          850: '#151E2E',
          925: '#0B1120',
          950: '#070C16',
        },
        bri: {
          blue: '#00529C',
          navy: '#002B49',
          orange: '#F58220',
          light: '#E6F0FA',
          glow: '#0284C7'
        },
        mandiri: {
          blue: '#0A3B74',
          gold: '#FDB813'
        },
        bca: {
          blue: '#003893',
          navy: '#002060',
          cyan: '#00A3E0'
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
