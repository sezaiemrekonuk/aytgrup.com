/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ─── Design System: "The Foundation" Palette ─────────────────────
        
        primary: {
          DEFAULT: '#1A2B3C',
          light: '#243A52',
          dark: '#111E2A',
        },
        accent: {
          DEFAULT: '#C5A059',
          light: '#D4B47A',
          dark: '#A8893C',
        },
        neutral: {
          DEFAULT: '#F4F4F4',
        },
        cta: {
          DEFAULT: '#E67E22',
          light: '#F39C12',
          dark: '#D35400',
          hover: '#CF6D17',
        },
        // Dark mode surface colors
        dark: {
          bg: '#0D1B2A',
          card: '#162436',
          border: '#243A52',
          muted: '#8099B3',
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'Georgia', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
      },
      backgroundImage: {
        // Architectural blueprint grid lines
        'blueprint-grid':
          'linear-gradient(rgba(197,160,89,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.06) 1px, transparent 1px)',
        'blueprint-grid-dark':
          'linear-gradient(rgba(197,160,89,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.10) 1px, transparent 1px)',
        'hero-gradient':
          'linear-gradient(135deg, #0D1B2A 0%, #1A2B3C 60%, #243A52 100%)',
        'card-overlay':
          'linear-gradient(180deg, transparent 30%, rgba(13,27,42,0.96) 100%)',
        'gold-shimmer':
          'linear-gradient(90deg, #C5A059 0%, #D4B47A 50%, #C5A059 100%)',
      },
      backgroundSize: {
        'grid-sm': '40px 40px',
        'grid-md': '60px 60px',
        'grid-lg': '80px 80px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(26,43,60,0.10)',
        'card-hover': '0 8px 40px rgba(26,43,60,0.20)',
        cta: '0 4px 20px rgba(230,126,34,0.40)',
        accent: '0 4px 20px rgba(197,160,89,0.30)',
        nav: '0 2px 20px rgba(13,27,42,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.6s ease-out forwards',
        shimmer: 'shimmer 2s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
};
