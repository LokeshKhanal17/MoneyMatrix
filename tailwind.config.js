/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#121212',
          card: '#1E1E1E',
          text: '#E5E7EB',
        },
      },
      backgroundColor: {
        dark: {
          primary: '#121212',
          secondary: '#1E1E1E',
          accent: '#2563EB',
        },
      },
      textColor: {
        dark: {
          primary: '#E5E7EB',
          secondary: '#9CA3AF',
          accent: '#60A5FA',
        },
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [],
}

