module.exports = {
  important: false,
  prefix: 'tw-',
  mode: 'layers',
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#19f',
        crimson: 'hsl(6, 73%, 48%)',
      },
    },
  },
  variants: {},
  plugins: [],
};
