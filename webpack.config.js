/*This is a sample Webpack 2 configuration.
Just run webpack and it will produce unminified output with sourcemaps.
Run the webpack command with "--env.production" flag and it will minify the output and de-dupe all the unnecessary code.*/



var webpack = require('webpack');
var path = require('path');



module.exports = function (env){
  var debug = !env.production
  var debugText = debug ? "debug" : "PRODUCTION"
  console.log('\033[33m', "Now running under", debugText, "mode...",'\033[0m')
  return {
    context: path.join(__dirname, "src/static/js"),
    devtool: debug ? "eval" : "source-map",
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
        {
          test: /\.(s[ac])|css$/,
          use:[
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
        }
      ]
    },
    output: {
      path: __dirname + "/src/static/js/",
      publicPath: "/js/",
      filename: "bundle.js"
    },
    plugins: debug ? [] : [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
  }
};