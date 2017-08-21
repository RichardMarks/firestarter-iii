const path = require('path')

const config = {
  context: path.resolve('./src'),
  entry: {
    f3: './f3.js'
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    library: 'F3',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    sourceMapFilename: '[file].map',
    devtoolModuleFilenameTemplate: 'webpack:///[resource-path]',
    devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]'
  },
  plugins: [],
  devtool: 'inline-source-map'
}

module.exports = config
