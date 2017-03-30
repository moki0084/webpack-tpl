var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
  entry: {
    dll: ['jquery']
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
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader?minimize'
        })
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
    new webpack.DllPlugin({
      path: path.join(__dirname, "../dll", "[name].json"),
      name: '[name][chunkhash]',
      context: path.resolve(__dirname, '../dll')
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
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    new ExtractTextPlugin('css/[name].css'),
  ],
  output: {
    path: path.join(__dirname, '../dll'),
    filename: '[name][chunkhash].js',
    library: '[name][chunkhash]',
  }
};
