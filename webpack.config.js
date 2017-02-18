"use strict";

require('dotenv').config()
const debug = process.env.NODE_ENV != 'production';
const { resolve } = require('path');
const webpack = require('webpack');
console.log("Debug? " + debug);

module.exports = {
  entry: [
    'whatwg-fetch',
    resolve(__dirname, 'src', 'app.js')
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'src', 'static', 'js'),
    publicPath: '/js/'
  },
  devtool: debug ? 'inline-sourcemap' : false,
  devServer: {
    port: 3333,
    contentBase: resolve(__dirname, 'src', 'static'),
    historyApiFallback: true,
    proxy: {
      '/urls': {
        target: 'http://localhost:3000/',
        secure: false
      },
      '/url': {
        target: 'http://localhost:3000/',
        secure: false
      }
    }
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
    new webpack.DefinePlugin({
      RIOT_API: process.env.RIOT_API
    })
  ] : [
    new webpack.DefinePlugin({
      RIOT_API: JSON.stringify(process.env.RIOT_API)
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
  ]
};
