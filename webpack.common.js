/*This is a sample Webpack 3 configuration.
Just run webpack and it will produce unminified output with sourcemaps.
*/
const path = require('path');

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
        posts: ["./static/js/posts.js"] // relative to PROJ/SRC
    },
    resolve: {
        alias: {
            Root: path.resolve("./src/static/js")
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ['env', {
                                    "modules": false,
                                    "targets": {
                                        // "browsers": ["last 2 versions", "ie >= 11"]
                                    },
                                    "useBuiltIns": "usage"
                                }],
                                'react'
                            ],
                            plugins: [
                                ["transform-object-rest-spread", { "useBuiltIns": true }],
                                "transform-function-bind",
                                "transform-class-properties"
                            ]
                        }
                    }
                ]
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
        filename: "js/[name]-[hash:7].js"
    },
    plugins: [
        new CleanWebpackPlugin(pathToClean, cleanOptions),
        new BundleTracker(
            { path: __dirname, filename: './build/webpack-stats.json', indent: 4 }
        )
        /* when combining Django with webpack-dev-server, HtmlWebpackPlugin is not needed */
        // new HtmlWebpackPlugin({
        //     // paths relative to proj/src
        //     template: "./static/templates/post_home.html",
        //     favicon: "./static/images/nodejs.png",
        //     filename: "../build/templates/post_home.html"
        // }),

    ]

}

