/*This is a sample Webpack configuration.
Just run webpack and it will produce unminified output with sourcemaps.
Run NODE_ENV=production webpack and it will minify the output and de-dupe all the unnecessary code.*/


var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
// debug = false;

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./static/js/client.js",
  module:{
    loaders:[
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query:{
          presets:['react', 'es2015', 'stage-0'],
          plugins:['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  output: {
    path: __dirname + "/src/static/js/",
    publicPath: "/js/",
    filename: "client.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};