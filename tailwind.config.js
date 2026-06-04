/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-base)',
        foreground: 'var(--text-primary)',
        safar: {
          50: '#FFF8EB',
          100: '#FEECC0',
          200: '#FDD98E',
          300: '#F5BD5C',
          400: '#D48030',
          500: '#B56B26',
          600: '#8F5520',
          700: '#6B401A',
          800: '#855833',
          900: '#0C0A09',
          950: '#080705',
        },
        teal: {
          50: '#EFFEF5',
          100: '#C8FEDB',
          200: '#8BDDA6',
          300: '#4DB878',
          400: '#2D9B5E',
          500: '#1E7A48',
          600: '#166134',
          700: '#0F4A28',
          800: '#0A331C',
          900: '#061E10',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212,128,48,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(212,128,48,0.2)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
