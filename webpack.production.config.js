const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeSass = require('node-sass');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    order: path.join(__dirname, 'app/main.jsx'),
  },
  output: {
    filename: '../app/assets/javascripts/orders/dashboard/dist/[name].js',
  },
  module: {
    loaders: [{
      test: /\.js|jsx$/,
      exclude: /node_modules/,
      loader: 'babel',
    },
    {
      test: /\.json?$/,
      loader: 'json',
    },
    {
      test: /\.css$/,
      loader: 'style!css',
    },
    {
      test: /\.sass|.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!sass'),
    },
    {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
      loader: 'url-loader?limit=300000&name=[name]-[hash].[ext]!img?progressive=true',
    },
    ],
  },
  sassLoader: {
    functions: {
      'encode-base64($string)': ($string) => {
        const buffer = new Buffer($string.getValue());
        return nodeSass.types.String(buffer.toString('base64'));
      },
    },
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new CleanWebpackPlugin([
      path.resolve(__dirname, './dist'),
      path.resolve(__dirname, './dist'),
    ], {root: path.dirname(__dirname), verbose: true}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.BannerPlugin('jshint ignore: start'),
    new ExtractTextPlugin('../app/assets/stylesheets/orders/dashboard/dist/[name].css'),
  ],
};
