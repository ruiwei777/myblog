/*================================
    A  Webpack 3 configuration
  ================================*/
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

// console.log(Object.keys(json.dependencies))

module.exports = {
    context: SRC_PATH,
    entry: {
        // relative to proj/src
        vendor: Object.keys(json.dependencies),
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
                    path.resolve(__dirname, "node_modules/json-loader"),
                    path.resolve(__dirname, "src/static/react"),
                  ],
                use: [{ loader: "babel-loader" }]
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
        filename: "js/[name].[chunkhash:8].js"
    },
    plugins: [
        new CleanWebpackPlugin(pathToClean, cleanOptions),
        new BundleTracker(
            { path: __dirname, filename: './build/webpack-stats.json', indent: 4 }
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            filename: 'js/[name].[hash:8].js',
            minChunks: Infinity
        })
        /* when combining Django with webpack-dev-server, HtmlWebpackPlugin is not needed */
        // new HtmlWebpackPlugin({
        //     // paths relative to proj/src
        //     template: "./static/templates/post_home.html",
        //     favicon: "./static/images/nodejs.png",
        //     filename: "../build/templates/post_home.html"
        // }),
    ]

}

/**
 * Notes:
 * one tricky thing:
 * 1. Object.keys(json.dependencies) will include all js dependencies into vendor bundle
 * 2, Among those vendor dependencies, json-loader mixes es-5 module.exports with es 6 template literals,
 *    which will raise an error when passed to Uglify.js
 * 3, so I include json-loader into babel to transpile it, 
 *    with the plugin `transform-commonjs-es2015-modules`
 */
