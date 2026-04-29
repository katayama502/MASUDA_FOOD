import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        akane: {
          DEFAULT: '#C8473C',
          deep:    '#9E2A1F',
          soft:    '#E8B5AE',
        },
        sumi: {
          DEFAULT: '#1F1B17',
          2:       '#3A332D',
          3:       '#6B6259',
          4:       '#9A8F84',
        },
        kinari: {
          DEFAULT: '#F5EFE4',
          2:       '#EDE5D5',
          3:       '#DCD0B8',
        },
        shiro: '#FBF8F1',
        wakana: {
          DEFAULT: '#6B8E4E',
          soft:    '#C5D2A8',
        },
        yamabuki: {
          DEFAULT: '#D9A441',
          soft:    '#F2DDB0',
        },
        line: '#06C755',
      },
      fontFamily: {
        display: ['"Shippori Mincho"', '"Noto Serif JP"', 'serif'],
        sans:    ['"Zen Kaku Gothic New"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        s:    '6px',
        m:    '12px',
        l:    '18px',
        pill: '999px',
      },
      boxShadow: {
        1: '0 1px 0 rgba(31,27,23,0.04), 0 1px 2px rgba(31,27,23,0.06)',
        2: '0 2px 4px rgba(31,27,23,0.05), 0 8px 18px rgba(31,27,23,0.08)',
        3: '0 12px 32px rgba(31,27,23,0.14)',
      },
      letterSpacing: {
        wider: '0.1em',
        widest: '0.2em',
        superwide: '0.3em',
      },
    },
  },
  plugins: [],
} satisfies Config;
