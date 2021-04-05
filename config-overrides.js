const {override,fixBabelImports} = require('customize-cra')
module.exports = override(
  fixBabelImports('antd',{
    libraryName:'antd',
    libraryDirectory:'es',
    style:'css'
  }),
  fixBabelImports('import',{
    libraryName:'antd-mobile',
    style:true
  }),
  (config) => {
    // 在开发环境不修改 publicUrl
    if (process.env.NODE_ENV === "development") {
      return config;
    }
    const paths = require("react-scripts/config/paths");
    // 修改public path to github cdn
    paths.publicUrl = "https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/build/";
    config.output.publicPath = "https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/build/";
    return config;
  }
)
