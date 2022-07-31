module.exports = {
  // mode: "jit",
  // important: true,
  purge: ["./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: "#ffffff",
      "light-blue": {
        50: "#e1f5fe",
        100: "#b3e5fc",
        200: "#81d4fa",
        300: "#4fc3f7",
        400: "#29b6f6",
        500: "#03a9f4",
        600: "#039be5",
        700: "#0288d1",
        800: "#0277bd",
        900: "#01579b",
      },
    },
    extend: {
      width: {
        unset: "unset",
      },
      height: {
        "80vh": "80vh",
      },
      maxWidth: {
        "1/3": "33.333%",
        "1/4": "25%",
        screen: "100vw",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
