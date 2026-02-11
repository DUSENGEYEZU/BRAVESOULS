// tailwind.config.js - Brave Souls Wellness brand colors
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Brave Souls brand: Deep Green (wellness, growth), Gold (excellence), Cream/Soft Black
        'brave-green': {
          DEFAULT: '#1a4d3e',
          light: '#2d6a5a',
          dark: '#0f3329',
        },
        'brave-gold': {
          DEFAULT: '#c9a227',
          light: '#d4b84a',
          dark: '#a68520',
        },
        'brave-cream': '#faf8f5',
        'brave-black': '#1a1a1a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
