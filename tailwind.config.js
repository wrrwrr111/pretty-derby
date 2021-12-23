module.exports = {
  // mode: "jit",
  // important: true,
  purge: ["./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        unset: "unset",
      },
      height: {
        '80vh': '80vh'
      },
      maxWidth: {
        '1/3': '33.333%',
        '1/4': '25%',
        'screen': '100vw'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
