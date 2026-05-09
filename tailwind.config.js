/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ─── Design System: "The Foundation" Palette ─────────────────────
        primary: {
          DEFAULT: '#41484E',
          light: '#58626B',
          dark: '#2B3136',
        },
        accent: {
          DEFAULT: '#37A9D6',
          light: '#58B9DF',
          dark: '#1B95C4',
        },
        neutral: {
          DEFAULT: '#F3F7F9',
        },
        cta: {
          DEFAULT: '#2796C4',
          light: '#37A9D6',
          dark: '#1B78A0',
          hover: '#1F86B0',
        },
        // Dark mode surface colors
        dark: {
          bg: '#0F1418',
          card: '#1A2229',
          border: '#2F3A43',
          muted: '#95A3AE',
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
          'linear-gradient(rgba(55,169,214,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(55,169,214,0.09) 1px, transparent 1px)',
        'blueprint-grid-dark':
          'linear-gradient(rgba(55,169,214,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(55,169,214,0.14) 1px, transparent 1px)',
        'hero-gradient':
          'linear-gradient(135deg, #171C21 0%, #313940 60%, #4C5863 100%)',
        'card-overlay':
          'linear-gradient(180deg, transparent 30%, rgba(15,20,24,0.96) 100%)',
        'gold-shimmer':
          'linear-gradient(90deg, #37A9D6 0%, #58B9DF 50%, #37A9D6 100%)',
      },
      backgroundSize: {
        'grid-sm': '40px 40px',
        'grid-md': '60px 60px',
        'grid-lg': '80px 80px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(25,35,45,0.10)',
        'card-hover': '0 8px 40px rgba(25,35,45,0.20)',
        cta: '0 4px 20px rgba(39,150,196,0.40)',
        accent: '0 4px 20px rgba(55,169,214,0.30)',
        nav: '0 2px 20px rgba(15,20,24,0.18)',
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
