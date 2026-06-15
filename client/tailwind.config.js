/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A14',
        surface: '#12121F',
        accent: '#7B4FD4',
        'accent-light': '#A78BFA',
        'accent-dark': '#5B2FAF',
        'text-primary': '#FFFFFF',
        'text-secondary': '#9CA3AF',
        'card-border': 'rgba(123, 79, 212, 0.3)',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(123, 79, 212, 0.4)',
        'glow-lg': '0 0 40px rgba(123, 79, 212, 0.3)',
        'glow-sm': '0 0 10px rgba(123, 79, 212, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(123, 79, 212, 0.1)',
      },
      borderRadius: {
        'card': '16px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        'gradient': 'gradient 8s ease infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(123, 79, 212, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(123, 79, 212, 0.6)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      backgroundSize: {
        '400%': '400% 400%',
      },
    },
  },
  plugins: [],
};
