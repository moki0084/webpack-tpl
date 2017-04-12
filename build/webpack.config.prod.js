var webpackMerge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');
var path = require('path');
var dll = require('../dll/dll.json')

module.exports = webpackMerge(baseWebpackConfig, {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }, {
            loader: 'postcss-loader'
          }]
        })
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }, {
            loader: 'postcss-loader'
          }, {
            loader: 'sass-loader'
          }]
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
    }),
    new AssetsPlugin({
      filename: 'map.json',
      path: path.resolve(__dirname, '../dist'),
      metadata: {
        dll: dll.name + '.js'
      }
    })
  ],
  output: {
    publicPath: '', //输出资源的基本路径
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js'
  }
})
