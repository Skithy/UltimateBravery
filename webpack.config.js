"use strict";

const debug = process.env.NODE_ENV != 'production';

const { resolve } = require('path');
const webpack = require('webpack');
console.log(debug);

module.exports = {
  entry: debug ? [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3333/',
    'webpack/hot/only-dev-server',
    'whatwg-fetch',
    resolve(__dirname, 'src', 'app.js')
  ] : [
    'whatwg-fetch',
    resolve(__dirname, 'src', 'app.js')
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'src', 'static', 'js'),
    publicPath: '/js/'
  },
  context: resolve(__dirname, 'src'),
  devtool: debug ? 'inline-sourcemap' : false,
  devServer: {
    hot: true,
    port: 3333,
    contentBase: resolve(__dirname, 'src', 'static'),
    historyApiFallback: true,
    publicPath: '/js/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: debug ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ] : [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
  ]
};
