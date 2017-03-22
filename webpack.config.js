var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

const plugins = PRODUCTION
  ? [
    new webpack.optimize.UglifyJsPlugin(),
    /* 抽取出chunk的css */
    new ExtractTextPlugin('css/[name].[chunkhash].css'),

    new HTMLWebpackPlugin({
      template: './src/index.html'
    })

  ]
  : [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
  ];

plugins.push(
  new webpack.DefinePlugin({
    DEVELOPMENT: JSON.stringify(DEVELOPMENT),
    PRODUCTION: JSON.stringify(PRODUCTION)
  })
);


const cssLoader = PRODUCTION
  ? ExtractTextPlugin.extract({
    loader: 'css-loader?minimize'
  })
  : ['style-loader', 'css-loader'];

const sassLoader = PRODUCTION
  ? ExtractTextPlugin.extract({
    loader: 'css-loader?minimize!sass-loader'
  })
  : ['style-loader', 'css-loader', 'sass-loader'];

const devtool = PRODUCTION ? '' : 'source-map';

module.exports = {
  entry: {
    bundle: './src/index.js'
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        loaders: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: 'babel-loader'
      },
      {
        test: /\.(gif|png|jpg)$/,
        exclude: /node_modules/,
        loaders: 'url-loader?limit=10000&name=images/[name].[ext]?[hash:10]'
      }, {
        test: /\.css$/,
        loaders: cssLoader,
        exclude: /node_modules/
      }, {
        test: /\.scss$/,
        loaders: sassLoader,
        exclude: /node_modules/
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: PRODUCTION ? '' : '/', //输出资源的基本路径
    filename: PRODUCTION ? 'js/[name].[chunkhash].min.js' : 'js/[name].js',
    chunkFilename: PRODUCTION ? 'js/[id].[chunkhash].js' : 'js/[id].js'
  },
  devtool
};
