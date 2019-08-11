/**
 * Webpack 3 config for both dev and prod.
 */
const path = require('path');

const BundleTracker = require('webpack-bundle-tracker');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const pathToClean = ["build"];
const cleanOptions = {
  root: __dirname,  // must be full path
  verbose: true,
  watch: false  // do not clean on watch
};

/* when using django-webpack-loader, HtmlWebpackPlugin is not needed */

module.exports = {
  context: path.resolve('./src'),
  entry: {
    // relative to proj/src
    accounts: "./static/react/entries/accounts/index.jsx",
    posts: "./static/react/entries/posts/index.jsx",
  },
  resolve: {
    alias: {
      root: path.resolve("./src/static/react")
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "src/static/react"),
        ],
        use: [
          {
            loader: "babel-loader",
          }
        ]
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
    new CleanWebpackPlugin(pathToClean, cleanOptions),
    new BundleTracker(
      { path: __dirname, filename: './build/webpack-stats.json', indent: 4 }
    ),
  ]
}
