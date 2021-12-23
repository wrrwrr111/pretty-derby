module.exports = {
  mode: "jit",
  purge: ["./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        unset: "unset",
      },
      maxWidth: {
        '1/3': '33.333%',
        '1/4': '25%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
