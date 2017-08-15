/*This is a sample Webpack 3 configuration.
Just run webpack and it will produce unminified output with sourcemaps.
Run the webpack command with "--env.production" flag and it will minify the output.*/



const webpack = require('webpack');
const path = require('path');


const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin("css/[name]-[contenthash].css");
const extractSASS = new ExtractTextPlugin("sass/[name]-[contenthash].css");


const pathToClean = ["src/static/dist"];
const cleanOptions = {
  root: __dirname,
  verbose: true,
  watch: false
};
const cleanWebpackPlugin = new CleanWebpackPlugin(pathToClean, cleanOptions);


// Plugins used in both DEV and PRODUCTION mode.
const basePlugins = [
  cleanWebpackPlugin,
  new HtmlWebpackPlugin({
    template: "../templates/post_home.html",
    favicon: "../images/react-icon.png",
    filename: "./templates/post_home.html"
  }), 
  new webpack.optimize.ModuleConcatenationPlugin(),
  extractCSS,
  extractSASS
];



module.exports = function (env){
  var debug = !env.production
  var debugText = debug ? "debug" : "PRODUCTION"
  console.log('\033[33m', "Now running under", debugText, "mode...",'\033[0m')
  return {
    context: path.join(__dirname, "src/static/js"),
    devtool: debug ? "inline-source-map" : "source-map",
    entry: "./client.js",
    module:{
      rules:[
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use:[
            {
              loader:"babel-loader",
              options:{
                presets:['react', ['env', {"modules": false}], 'stage-0' ],
              }
            }
          ]
        },
        /*{
          test: /\.(s[ac])|css$/,
          use: extractCSS.extract(["css-loader", "sass-loader"])
          [
            {
              loader:"style-loader",
              options:{
                
              }
            },
            {
              loader:"css-loader",
              options:{
                
              }
            },
            {
              loader:"sass-loader",
              options:{
                
              }
            }
          ]
        },*/
        {
          test : /\.css$/,
          use: extractCSS.extract(["css-loader"])
        },
        {
          test : /\.s[ac]ss$/,
          use: extractSASS.extract(["css-loader", "sass-loader"])
        },
        {
          test: /\.html$/,
          use:[{
              loader:"html-loader",
              options: {
                minimize: true
              }
            }]
        }
      ]
    },
    output: {
      path: __dirname + "/src/static/dist/",
      publicPath: "/static/dist/",
      filename: "js/[chunkhash]-bundle.js"
    },
    plugins: basePlugins.concat(debug ? [] : [
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
          }),
          
        ])
  }
};