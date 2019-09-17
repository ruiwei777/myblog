/**
 * Webpack 3 config for both dev and prod.
 */
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const CleanWebpackPlugin = require('clean-webpack-plugin');

/* when using django-webpack-loader, HtmlWebpackPlugin is not needed */

module.exports = {
  entry: ['./front-end/index.tsx'],
  resolve: {
    alias: {
      root: path.resolve("./front-end")
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "front-end"),
        ],
        use: [{ loader: "babel-loader", }]
      },
      {
        test: /\.html$/,
        use: [{ loader: "html-loader" }]
      }
    ]
  },
  output: {
    path: path.resolve('./build'),
    publicPath: '/static/',
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js',
  },
  plugins: [
    new CleanWebpackPlugin(["build"], {
      root: __dirname,
      verbose: true,
      watch: false  // do not clean on watch
    }),
    new BundleTracker(
      { path: __dirname, filename: './build/webpack-stats.json', indent: 4 }
    ),
  ]
}
