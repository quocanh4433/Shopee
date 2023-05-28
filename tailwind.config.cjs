const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        orange: '#fb5533'
      }
    },
    container: {
      center: true
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          paddingLeft: theme('spacing.2'),
          paddingRight: theme('spacing.2'),
          marginLeft: 'auto',
          marginRight: 'auto',
          '@screen sm': {
            maxWidth: '640px'
          },
          '@screen md': {
            maxWidth: '768px'
          },
          '@screen lg': {
            maxWidth: '960px'
          },
          '@screen xl': {
            maxWidth: '1200px'
          }
        }
      });
    }),
    require('@tailwindcss/line-clamp')
  ]
};
