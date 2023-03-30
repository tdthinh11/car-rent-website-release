/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3563E9',
        second: '#596780',
        'color-bold': '#1A202C',
        'text-light': '#3D5278',
        grey: '#90A3BF',
        'grey-2': '#131313',
        like: '#ED3F3F',
        yellow: '#FBAD39',
      },
      backgroundColor: {
        bg: "#F6F7F9",
        primary: "#3563E9",
        secondary: "#54A6FF",
        'light-blue': "rgba(53, 99, 233, 0.3)",
        'light-blue-1': "rgba(92, 175, 252, 0.3)"
      },
      backgroundImage: {
        'shadow-1': 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);'
      },
      fontFamily: {
        jakarta: "'Plus Jakarta Sans', sans-serif"
      },
      borderColor: {
        light: 'rgba(195, 212, 233, 0.4)',
        grey: '1px solid #90A3BF'
      },
      screens: {
        s375: '375px',
        s1440: '1440px'
      },
      lineHeight: {
        '100': '100%',
        '120': '120%',
        '140' : '140%',
        '150': '150%',
        '160': '160%',
        '200': '200%'
      },
    },
  },
  plugins: [],
};
