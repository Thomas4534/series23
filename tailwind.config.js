/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        drawLine: 'drawLine 0.8s ease-out forwards',
        popIn: 'popIn 0.5s ease-out forwards',
        fadeIn: 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        drawLine: {
          '0%': { width: '0', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { width: 'var(--target-width, 100%)', opacity: '1' },
        },
        popIn: {
          '0%': { transform: 'translate(-50%, -50%) scale(0)', opacity: '0' },
          '70%': { transform: 'translate(-50%, -50%) scale(1.1)' },
          '100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translate(-50%, -50%) scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
}
