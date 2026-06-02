/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './types/**/*.{js,ts}',
  ],
  safelist: [
    // Dynamic gradient classes from Hero.tsx colorMap
    'from-brand-500', 'to-brand-700',
    'from-dusk-500', 'to-dusk-700',
    'from-sand-400', 'to-sand-600',
    // Dynamic shadow classes
    'shadow-[0_0_20px_rgba(48,150,102,0.4)]',
    'shadow-[0_0_20px_rgba(139,92,246,0.4)]',
    'shadow-[0_0_20px_rgba(224,168,78,0.4)]',
    // Dynamic brand bg classes
    'bg-brand-600/20', 'bg-brand-900/5',
    'bg-dusk-600/20', 'bg-dusk-900/5',
    'bg-sand-600/15', 'bg-sand-900/5',
    'border-brand-500/20', 'border-dusk-500/20', 'border-sand-500/20',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-outfit)', 'Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#f0f9f4',
          100: '#dcf1e6',
          200: '#bbe3ce',
          300: '#8acead',
          400: '#54b285',
          500: '#309666',
          600: '#227850',
          700: '#1c6042',
          800: '#194d36',
          900: '#163f2e',
        },
        sand: {
          50:  '#fdf8f0',
          100: '#faefd9',
          200: '#f3dcb0',
          300: '#eac47e',
          400: '#e0a84e',
          500: '#d6912e',
          600: '#be7523',
          700: '#9d5a1f',
          800: '#7f481f',
          900: '#693c1e',
        },
        dusk: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        slate: {
          850: '#1a2235',
          950: '#0d1117',
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0d1117 0%, #1a2235 40%, #162a1e 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #e0a84e 0%, #be7523 100%)',
        'brand-gradient': 'linear-gradient(135deg, #309666 0%, #1c6042 100%)',
        'aurora': 'radial-gradient(ellipse at top left, rgba(48,150,102,0.15) 0%, transparent 60%), radial-gradient(ellipse at bottom right, rgba(139,92,246,0.1) 0%, transparent 60%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
        'glass-hover': '0 16px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        'glow-brand': '0 0 30px rgba(48,150,102,0.3)',
        'glow-gold': '0 0 30px rgba(224,168,78,0.25)',
        'card': '0 4px 24px rgba(0,0,0,0.25)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
