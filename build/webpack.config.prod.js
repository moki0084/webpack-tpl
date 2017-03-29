var webpackMerge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = webpackMerge(baseWebpackConfig, {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader?minimize'
        }),
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader?minimize!sass-loader'
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      DEVELOPMENT: JSON.stringify(false),
      PRODUCTION: JSON.stringify(true),
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
    new ExtractTextPlugin('css/[name].[chunkhash].css'),
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
  ],
  output: {
    publicPath:'', //输出资源的基本路径
    filename: 'js/[name].[chunkhash].min.js',
    chunkFilename: 'js/[id].[chunkhash].min.js'
  }
})
