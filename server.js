/*
  Run this file with `node server.js`, and the webpack-dev-server
  will server staticfiles for Django
*/
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.dev')

// tell webpack to request files from this url
config.output.publicPath = 'http://localhost:8050/build/';

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
)

// Hot module replacement
Object.keys(config.entry).forEach((key) => {
  // if entry[key] is an array, it needs hot reloading
  if (Array.isArray(config.entry[key])) {
    config.entry[key].unshift(
      'webpack-dev-server/client?http://0.0.0.0:8050',
      'webpack/hot/only-dev-server'
    );
  }
});




new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  historyApiFallback: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  }
}).listen(8050, '0.0.0.0', function (err, result) {
  if (err) {
    console.log(err)
  }

  console.log('Listening at 0.0.0.0:8050')
})