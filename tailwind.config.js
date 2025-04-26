/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        furia: {
          black: "#18181b",
          white: "#ffffff",
          accent: "#EAEEF0",
          accent2: "#BFC8CC"
        }
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif']
      },
      borderRadius: {
        '3xl': '2rem',
        '4xl': '2.5rem',
        '5xl': '3rem'
      },
      boxShadow: {
        'furia': '0 8px 40px 0 rgba(0,0,0,0.25)'
      },
      backgroundImage: {
        'furia-hero': 'linear-gradient(120deg, #1a1a23 0%, #23232b 55%, #18181b 100%)'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s',
        'slide-up': 'slideUp 0.5s',
        'pulse-slow': 'pulse 2.5s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        }
      }
    }
  },
  plugins: [],
}
