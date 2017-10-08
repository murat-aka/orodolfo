const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const src = './src/client';

const config = {
  entry: [
    'react-hot-loader/patch',
    `${src}/js/index.js`,
  ],
  output: {
    path: path.resolve('public'),
    filename: 'js/app.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: ['transform-object-rest-spread', 'transform-class-properties'],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${src}/index.html`,
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      API_URL: process.env.NODE_ENV !== 'production' ? JSON.stringify('http://localhost:3000') : JSON.stringify('http://www.orodolfo.com'),
    }),
  ],
};

if (process.env.NODE_ENV !== 'production') {
  config.devtool = 'source-map';
  config.entry = [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    ...config.entry,
  ];
} else {
  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
    ...config.plugins,
  ];
}

module.exports = config;
