/**
 * Webpack 3 config for both dev and prod.
 */
const json = require('./package.json');
const path = require('path');
const webpack = require('webpack');

const BundleTracker = require('webpack-bundle-tracker');
const SRC_PATH = path.resolve('./src');
const ASSETS_BUILD_PATH = path.resolve('./build');
const ASSETS_PUBLIC_PATH = '/static/';

const CleanWebpackPlugin = require('clean-webpack-plugin');

const pathToClean = ["build"];
const cleanOptions = {
  root: __dirname,  // must be full path
  verbose: true,
  watch: false  // do not clean on watch
};


module.exports = {
  context: SRC_PATH,
  entry: {
    // relative to proj/src
    accounts: ["./static/react/entries/accounts/index.jsx"],
    posts: ["./static/react/entries/posts/index.jsx"],
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
        use: [{ loader: "html-loader", options: { minimize: true } }]
      }
    ]
  },
  output: {
    path: ASSETS_BUILD_PATH,
    publicPath: ASSETS_PUBLIC_PATH,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js', 
  },
  plugins: [
    new CleanWebpackPlugin(pathToClean, cleanOptions),
    new BundleTracker(
      { path: __dirname, filename: './build/webpack-stats.json', indent: 4 }
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
    new webpack.optimize.CommonsChunkPlugin('manifest')
    /* when combining Django with webpack-dev-server, HtmlWebpackPlugin is not needed */
    // new HtmlWebpackPlugin({
    //     // paths relative to proj/src
    //     template: "./static/templates/post_home.html",
    //     favicon: "./static/images/nodejs.png",
    //     filename: "../build/templates/post_home.html"
    // }),
  ]
}
