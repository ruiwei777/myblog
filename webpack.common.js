/*This is a sample Webpack 3 configuration.
Just run webpack and it will produce unminified output with sourcemaps.
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
        // vendor: Object.keys(json.dependencies),
        vendor: ['react','react-dom','redux', 'react-redux', 'react-router-dom'],
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
                exclude: /(node_modules|bower_components)/,
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


