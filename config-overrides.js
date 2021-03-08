const {override,fixBabelImports} = require('customize-cra')
module.exports = override(
  fixBabelImports('import',{
    libraryName:'antd',
    libraryDirectory:'es',
    style:'css'
  }),
  (config)=>{
    const paths = require('react-scripts/config/paths');

    // 修改public path to github cdn
    paths.publicUrl = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'
    config.output.publicPath = 'https://cdn.jsdelivr.net/gh/wrrwrr111/pretty-derby/public/'
    return config
  }
)
