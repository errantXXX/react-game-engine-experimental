/**
 * Created by tdzl2003 on 2017/3/14.
 */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env['WEBPACK_ENV'];
const __DEV__ = ENV === 'development';

const path = require('path');

module.exports = {
  entry: {
    index: './src/index',
  },
  output: {
    path: path.resolve(__dirname, `../build/${__DEV__ ? 'debug' : 'release'}/web`), // string
    filename: __DEV__ ? '[name].bundle.js' : '[name].[hash].js', // string
    publicPath: '/', // string
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        loader: 'babel-loader',
        query: {
          presets: [
            'stage-2',
          ],
          plugins: [
            'syntax-jsx',
            ['transform-react-jsx', {
              pragma: 'createJSX',
            }],
            'transform-decorators-legacy',
          ],
        },
      },
      {
        test: /.shader$/,
        loader: 'raw-loader',
      },
      {
        test: /\.png|\.jpg/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "../src/client/libs"),
    ],
    extensions: [".web.js", ".js", ".json", ".jsx", ".css"],
    alias: {},
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(__DEV__),
      __CLIENT__: "true",
      __SERVER__: "false",
      __WEBWORKER__: "false",
    }),
    new HtmlWebpackPlugin({
      title: 'SuperMarket',
      template: 'config/index.html.ejs',
    })
  ],
  performance: {
    hints: 'warning', // enum
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function(assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  devtool: 'source-map', // enum
  context: path.resolve(__dirname, '..'),
  target: 'web',
  stats: {
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true,
  },
};
