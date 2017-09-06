const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeSass = require('node-sass');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'app/main.jsx'),
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
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
      test: /\.less$/,
      loader: 'style!css!less',
    },
    {
      test: /\.sass|.scss$/,
      loaders: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]
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
};
