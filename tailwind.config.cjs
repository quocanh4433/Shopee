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
        orange: '#ee4d2d'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('column.7xl'),
          marginRight: 'auto',
          marginLeft: 'auto',
          paddingLeft: theme('spacing.5'),
          paddingRight: theme('spacing.5')
        }
      });
    })
  ]
};
