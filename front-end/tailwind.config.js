/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#09090c',
          surface: '#121217',
          card: '#181820',
          hover: '#22222c',
          border: '#2a2b36',
          muted: '#71717a',
          text: '#f4f4f5',
          red: {
            DEFAULT: '#ef4444',
            hover: '#dc2626',
            glow: 'rgba(239, 68, 68, 0.35)',
            subtle: 'rgba(239, 68, 68, 0.12)'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'red-glow': '0 0 25px -5px rgba(239, 68, 68, 0.4)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
