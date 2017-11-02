// This config file is no longer in use, just for reference purpose.
// Now the config is separated into .common, .dev and .prod.
// Check those three files and package.json -> scripts for more details.



const webpack = require('webpack');
const path = require('path');


const SRC_PATH = path.resolve('./src');
const ASSETS_BUILD_PATH = path.resolve('./build');
const ASSETS_PUBLIC_PATH = '/static/';


const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin("css/[name]-[contenthash].css");
const extractSASS = new ExtractTextPlugin("css/[name]-[contenthash].css");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


const pathToClean = ["build"];
const cleanOptions = {
  root: __dirname,  // must be full path
  verbose: true,
  watch: false  // do not clean on watch
};

const cleanWebpackPlugin = new CleanWebpackPlugin(pathToClean, cleanOptions);


// Plugins used in both DEV and PRODUCTION mode.
const basePlugins = [
  cleanWebpackPlugin,
  new HtmlWebpackPlugin({
    template: "./static/templates/post_home.html",
    favicon: "./static/images/nodejs.png",
    filename: "../build/templates/post_home.html"
  }),
  extractCSS,
  extractSASS
];




module.exports = function () {
  var debug = !env.production
  var debugText = debug ? "Debug" : "Production"
  console.log('\033[33m', "Running under", debugText, "mode...", '\033[0m')
  return {
    context: SRC_PATH,
    devtool: debug ? "inline-source-map" : "source-map",
    entry: ["./static/js/posts.js"],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ['react', ['env', { "modules": false }], 'stage-0'],
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: extractCSS.extract(["css-loader"])
        },
        {
          test: /\.s[ac]ss$/,
          use: extractSASS.extract(["css-loader", "sass-loader"])
        },
        {
          test: /\.html$/,
          use: [{
            loader: "html-loader",
            options: {
              minimize: true
            }
          }]
        }
      ]
    },
    output: {
      path: ASSETS_BUILD_PATH,
      publicPath: ASSETS_PUBLIC_PATH,
      filename: "js/bundle.js"
    },
    plugins: basePlugins.concat(debug ? [] :
      [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        }),
        new UglifyJSPlugin({
          sourceMap: true
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
      ]
    )
  }
};