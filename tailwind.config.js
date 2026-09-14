/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#061a14',
          900: '#0a2a21',
          800: '#0E3B2E', // CD Primary
          700: '#144f3e',
          600: '#1b6953',
          500: '#268a6e',
          400: '#38ab8a',
        },
        graphite: {
          950: '#0e1211',
          900: '#131816',
          800: '#1E2522', // CD Dark
          700: '#27312d',
          600: '#35413c',
          500: '#4c5b55',
        },
        lime: {
          DEFAULT: '#C8F169', // CD Accent
          hover: '#d5f782',
          active: '#b8e850',
          dim: '#a2cb40',
        },
        offwhite: {
          DEFAULT: '#FAF1E8', // CD Off-White
          warm: '#F4ECE3',
          card: '#FCF7F2',
          muted: '#EAE0D5',
        },
        solar: {
          DEFAULT: '#FACC15',
          glow: '#FDE047',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'lime-glow': '0 0 25px -4px rgba(200, 241, 105, 0.45)',
        'lime-glow-lg': '0 0 45px -5px rgba(200, 241, 105, 0.55)',
        'forest-card': '0 10px 30px -10px rgba(6, 26, 20, 0.4)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flow': 'flowDash 2s linear infinite',
      },
      keyframes: {
        flowDash: {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        }
      }
    },
  },
  plugins: [],
}
