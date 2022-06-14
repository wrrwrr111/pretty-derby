const path = require("path");
const CracoAlias = require("craco-alias");
module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./",
        aliases: {
          "@": path.resolve(__dirname, "src"),
        },
        // see in examples section
      },
    },
  ],
};
