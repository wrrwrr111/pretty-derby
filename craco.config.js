const path = require("path");
const CracoAlias = require("craco-alias");
module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      if (process.env.NODE_ENV === "development") {
        return webpackConfig;
      }
      webpackConfig.output = {
        ...webpackConfig.output,
        // publicPath: "https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby@master/build/",
        publicPath: "/",
      };
      return webpackConfig;
    },
  },
  babel: {
    plugins: [
      [
        "import",
        {
          libraryName: "antd-mobile",
          style: "css",
        },
      ],
    ],
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
