module.exports = {
  // mode: "jit",
  // important: true,
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
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
