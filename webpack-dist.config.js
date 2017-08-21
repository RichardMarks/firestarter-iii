const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const uglifyConfig = {
  include: /\.min\.js$/,
  parallel: true,
  sourceMap: false,
  extractComments: false,
  uglifyOptions: {
    compress: true,
    ie8: false,
    ecma: 5,
    warnings: false
  },
  warningsFilter: _ => false
}

const config = {
  context: path.resolve('./src'),
  entry: {
    'f3.min': './f3.js'
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    library: 'F3',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new UglifyJSPlugin(uglifyConfig)
  ]
}

module.exports = config
