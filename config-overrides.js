const { override, fixBabelImports, addWebpackAlias } = require("customize-cra");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
module.exports = override(
  addWebpackAlias({
    ["@"]: path.resolve(__dirname, "src"),
  }),
  fixBabelImports("import", {
    libraryName: "antd-mobile",
    style: true,
  }),
  (config) => {
    // 在开发环境不修改 publicUrl
    // config.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 8919 }))
    if (process.env.NODE_ENV === "development") {
      return config;
    }
    const paths = require("react-scripts/config/paths");
    // 修改public path to github cdn
    paths.publicUrl = "https://fastly.jsdelivr.net/gh/wrrwrr111/pretty-derby@build2/build/";
    config.output.publicPath = "https://fastly.jsdelivr.net/gh/wrrwrr111/pretty-derby@build2/build/";
    return config;
  }
);
