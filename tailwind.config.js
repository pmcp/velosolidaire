const colors = require('tailwindcss/colors')
module.exports = {
  plugins: [
    require(`@tailwindcss/typography`)
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      ...colors,
      green: {
        50: '#ebfffa',
        100: '#e5fff9',
        200: '#dbfff6',
        300: '#d1fff3',
        400: '#c7ffef',
        500: '#bdffeb',
        600: '#75ffd8',
        700: '#29ffc6',
        800: '#00e0a8',
        900: '#009471',
      },
      yellow: {
        50: '#fffef5',
        100: '#fffeeb',
        200: '#fffddb',
        300: '#fffcc7',
        400: '#fffbb8',
        500: '#fffba8',
        600: '#fff86b',
        700: '#fff52e',
        800: '#f0e400',
        900: '#b3aa00',
      },
      pink: {
        50: '#fef1f6',
        100: '#fde7f0',
        200: '#fbd0e2',
        300: '#f8afce',
        400: '#f584b3',
        500: '#f0478d',
        550: '#ee2a7b',
        600: '#d01160',
        700: '#a00d4a',
        800: '#890b3f',
        900: '#710935',
      },
      pink: {
        '50': '#faf7fc',
        '100': '#f6eef9',
        '200': '#ebdcf2',
        '300': '#ddc1e6',
        '400': '#c89bd7',
        '500': '#af73c2',
        '600': '#9354a5',
        '700': '#824891',
        '800': '#65396f',
        '900': '#55325d',
        '950': '#34183a',
      },
      green: {
        '50': '#f2fbf4',
        '100': '#e0f8e6',
        '200': '#c3efce',
        '300': '#94e1aa',
        '400': '#5eca7c',
        '500': '#38af5a',
        '600': '#299147',
        '700': '#23723b',
        '800': '#215a32',
        '900': '#1c4b2b',
        '950': '#0a2915',
      },
      yellow: {
      '50': '#fdfae9',
      '100': '#faf4c7',
      '200': '#f6e692',
      '300': '#f1d253',
      '400': '#eab818',
      '500': '#dba417',
      '600': '#bd7f11',
      '700': '#975b11',
      '800': '#7d4916',
      '900': '#6b3c18',
      '950': '#3e1f0a',
      },

    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '80ch', // add required value here
          }
        }
      }
    },

  },
}
