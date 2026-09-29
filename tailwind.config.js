/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1B1B2F',
          soft: '#4B5563',
          muted: '#6B7280',
          faint: '#6F7581', // ≥4.5:1 on white (WCAG AA)
        },
        brand: {
          DEFAULT: '#EC4899',
          strong: '#DB2777',
          soft: '#FCE7F3',
          tint: '#FFF5FA',
          line: '#F8D3E4',
        },
        nav: {
          DEFAULT: '#5046E5',
          light: '#A78BFA',
        },
        line: '#EEF0F4',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // Responsive type scale — every size is fluid via clamp()
      fontSize: {
        display: ['clamp(1.75rem, 1.3rem + 1.15vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        title: ['clamp(1.125rem, 1rem + 0.45vw, 1.5rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        heading: ['clamp(0.9375rem, 0.88rem + 0.2vw, 1.0625rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        body: ['clamp(0.875rem, 0.85rem + 0.12vw, 0.9375rem)', { lineHeight: '1.55' }],
        label: ['clamp(0.8125rem, 0.8rem + 0.06vw, 0.875rem)', { lineHeight: '1.4' }],
        caption: ['clamp(0.6875rem, 0.67rem + 0.08vw, 0.75rem)', { lineHeight: '1.4' }],
        // Dense UI only (date carousel, step ring) — shrinks further on phones to fit 7 dates in a row
        micro: ['clamp(0.5625rem, 0.45rem + 0.6vw, 0.75rem)', { lineHeight: '1.25' }],
        numeral: ['clamp(0.875rem, 0.78rem + 0.35vw, 1.0625rem)', { lineHeight: '1' }],
      },
      spacing: {
        gutter: 'var(--gutter)',
        grid: 'var(--grid-gap)',
        card: 'var(--card-pad)',
      },
      boxShadow: {
        card: '0 12px 32px -14px rgba(236, 72, 153, 0.16), 0 2px 6px rgba(17, 24, 39, 0.04)',
        soft: '0 6px 20px -10px rgba(17, 24, 39, 0.12)',
        pill: '0 2px 8px rgba(17, 24, 39, 0.06)',
        glow: '0 10px 24px -8px rgba(236, 72, 153, 0.55)',
      },
      borderRadius: {
        card: 'clamp(16px, 1.3vw, 22px)',
      },
    },
  },
  plugins: [],
};
