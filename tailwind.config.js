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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        safar: {
          50: '#fcfaf8',
          100: '#f8f4ec',
          200: '#f1e7d5',
          300: '#e7d4b6',
          400: '#dbbe91',
          500: '#cfa268',
          600: '#c48946',
          700: '#a36d39', // Turmeric Amber
          800: '#855833',
          900: '#171614', // Warm Ink Background
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
};
