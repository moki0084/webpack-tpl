var webpack = require('webpack');
var path = require('path');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

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
        use: 'url-loader?limit=10000&name=images/[name].[ext]?[hash:10]'
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
      manifest: require('../dll/dll.json'),
      name: 'dll'
    }),
    new AddAssetHtmlPlugin({
      filepath: require.resolve('../dll/dll.js'),
      includeSourcemap: false
    })
  ],
  output: {
    path: path.join(__dirname, '../dist')
  }
};
