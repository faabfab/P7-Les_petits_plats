/** @type {import('tailwindcss').Config} */
export const content = ['./**/*.{html,js}'];
export const theme = {
  screens: {
    '2xl': {'max': '1535px'},
    // => @media (max-width: 1535px) { ... }

    'xl': {'max': '1279px'},
    // => @media (max-width: 1279px) { ... }

    'lg': {'max': '1023px'},
    // => @media (max-width: 1023px) { ... }

    'md': {'max': '767px'},
    // => @media (max-width: 767px) { ... }

    'sm': {'max': '639px'},
    // => @media (max-width: 639px) { ... }
  },
  fontSize: {
    sm: '0.8rem',
    base: '1rem',
    xl: '1.25rem',
    '2xl': '1.563rem',
    '3xl': '1.953rem',
    '4xl': '3rem',
    '5xl': '3.052rem',
  },
  extend: {
    colors: {
      'yellow-200': '#FFD15B',
    },
    maxWidth: {
      '7xl': '1440px',
    },
    height: {
      // eslint-disable-next-line quote-props
      '667': '667px',
    },
  },
};
export const plugins = [];
