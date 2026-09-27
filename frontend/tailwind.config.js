/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDFBF7',
          100: '#F7F2E8',
          200: '#EBDCBF',
          300: '#DFC696',
          400: '#D4AF37', // Classic wedding gold
          500: '#C5A059',
          600: '#A37E3A',
          700: '#7F5E24',
        },
        champagne: {
          DEFAULT: '#F4ECE1',
          light: '#FAF6F0',
          dark: '#E2D3BE',
        },
        sakura: {
          50: '#FFF7F9',
          100: '#FCEBF0',
          200: '#F7D6E0',
          300: '#EEB1C5',
          400: '#E28CA7',
        },
        ivory: '#FAF8F5',
        charcoal: '#2C2A29',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Outfit"', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(3deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
      }
    },
  },
  plugins: [],
}
