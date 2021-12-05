module.exports = {
  mode: "jit",
  purge: ["./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        unset: "unset",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
