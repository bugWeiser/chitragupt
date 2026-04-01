/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
    './types/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ── Coffee & Burgundy Core Palette ── */
        burgundy: {
          DEFAULT: '#561C24',
          dark:    '#3D1219',
          light:   '#6D2932',
          50:      '#FAF0F1',
        },
        maroon:  '#6D2932',
        taupe:   '#C7B7A3',
        cream:   '#E8D8C4',
        ivory:   '#F5EDE3',
        surface: '#FAF6F1',
        ink:     '#2A1A1E',

        /* ── Semantic aliases ── */
        primary: {
          DEFAULT:    '#561C24',
          dark:       '#3D1219',
          light:      '#6D2932',
          foreground: '#F5EDE3',
        },
        muted: {
          DEFAULT:    '#F5EDE3',
          foreground: '#8B7B6B',
        },
        border: 'rgba(199,183,163,0.4)',

        /* ── State colors — stays in-family ── */
        error:   '#8B1A1A',
        success: '#4A6741',
        warning: '#A67B3D',

        /* ── Dark mode surfaces ── */
        dark: {
          bg:      '#1A1215',
          surface: '#2A1E20',
          elevated:'#3A2A2E',
          text:    '#E8D8C4',
          muted:   '#A69585',
          border:  'rgba(199,183,163,0.12)',
        },

        /* ── Legacy compat so existing pages don't break ── */
        navy: {
          DEFAULT: '#561C24',
          dark:    '#3D1219',
          light:   '#6D2932',
          50:      '#FAF0F1',
        },
        gold: {
          DEFAULT: '#A67B3D',
          dark:    '#8B6530',
          light:   '#C7B7A3',
        },
        parchment: { DEFAULT: '#E8D8C4' },
        sand:      { DEFAULT: '#F5EDE3', light: '#FAF6F1' },
        amber:     { DEFAULT: '#A67B3D', dark: '#8B6530' },
        crimson:   { DEFAULT: '#561C24', dark: '#3D1219', light: '#6D2932' },
        darkbrown: { DEFAULT: '#2A1A1E', light: '#3D2A2E' },
        sage:      '#8B7B6B',
        vermillion:{ DEFAULT: '#8B1A1A', light: '#A32020' },
      },

      fontFamily: {
        serif:  ['var(--font-serif)',  '"Instrument Serif"', '"Playfair Display"', 'serif'],
        sans:   ['var(--font-sans)',   '"DM Sans"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono:   ['var(--font-mono)',   '"JetBrains Mono"', 'monospace'],
        /* legacy */
        inter:  ['var(--font-sans)',   'sans-serif'],
        poppins:['var(--font-serif)',  'serif'],
      },

      borderRadius: {
        none: '0',
        sm:   '2px',
        DEFAULT:'4px',
        md:   '4px',
        lg:   '6px',
        xl:   '8px',
        /* NO larger radii in this design system */
        full: '9999px',
      },

      boxShadow: {
        /* Two shadow levels only */
        'resting': '0 1px 4px rgba(42,26,30,0.05)',
        'hover':   '0 4px 20px rgba(42,26,30,0.08)',
        'card':    '0 1px 4px rgba(42,26,30,0.04)',
        'card-hover':'0 4px 20px rgba(42,26,30,0.08)',
        'modal':   '0 8px 40px rgba(42,26,30,0.16)',
        'dark':    '0 2px 12px rgba(0,0,0,0.3)',
      },

      maxWidth: {
        content: '1200px',
        prose:   '65ch',
      },

      backgroundImage: {
        'hero':     'linear-gradient(135deg, #561C24, #6D2932)',
        'hero-alt': 'linear-gradient(135deg, #3D1219, #561C24)',
        'card-sheen': 'linear-gradient(180deg, #FFFFFF, #FAF6F1)',
        'accent-bar': 'linear-gradient(90deg, #561C24, #6D2932, #561C24)',
      },

      animation: {
        'fade-up':    'fadeUp 0.4s ease-out forwards',
        'fade-in':    'fadeIn 0.4s ease-out forwards',
        'shimmer':    'shimmer 1.8s ease infinite',
        'marquee':    'marqueeScroll var(--marquee-duration,30s) linear infinite',
        'marquee-rev':'marqueeScroll var(--marquee-duration,30s) linear infinite reverse',
      },
    },
  },
  plugins: [],
};
