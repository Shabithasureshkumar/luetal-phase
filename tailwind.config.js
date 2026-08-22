/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luteal: {
          bg: '#FFDEE9',
          card: '#FFEEF7',
          pink: '#FFEAF4',
          accent: '#B01163',
          darkText: '#66034D',
          purple: '#955BE3',
          subtext: '#6B6578',
          border: '#EBE6EC',
          tag: '#FFEAF2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        'soft-card': '0px 8px 24px rgba(173,149,178,0.08)',
        'pink-glow': '0px 4px 12px rgba(226,17,142,0.25)',
        'btn-shadow': '0px 2px 7.5px -2px rgba(195,38,119,0.25)',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
        '5xl': '48px',
      }
    },
  },
  plugins: [],
}
