/**
 * Webpack 3 config for both dev and prod.
 */
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const CleanWebpackPlugin = require('clean-webpack-plugin');

/* when using django-webpack-loader, HtmlWebpackPlugin is not needed */

module.exports = {
  entry: {
    accounts: "./react/entries/accounts/index.jsx",
    posts: "./react/entries/posts/index.tsx",
  },
  resolve: {
    alias: {
      root: path.resolve("./react")
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "react"),
        ],
        use: [{ loader: "babel-loader", }]
      },
      {
        test: /\.html$/,
        use: [{ loader: "html-loader" }]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
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
