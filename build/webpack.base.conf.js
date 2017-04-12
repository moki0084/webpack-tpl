var webpack = require('webpack');
var path = require('path');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
var dll = require('../dll/dll.json')

module.exports = {
  entry: {
    bundle: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(gif|png|jpg)$/,
        exclude: /node_modules/,
        use: 'url-loader?limit=10000&name=images/[name].[ext]?[hash:8]'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '../dll'),
      manifest: dll,
      name: dll.name
    }),
    new AddAssetHtmlPlugin({
      filepath: require.resolve('../dll/' + dll.name + '.js'),
      includeSourcemap: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'js/[name].[chunkhash].js',
      minChunks: 4,
    })
  ],
  output: {
    path: path.join(__dirname, '../dist')
  }
};
