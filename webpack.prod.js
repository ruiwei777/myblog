const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin("css/[name]-[contenthash]-css.css");
const extractSASS = new ExtractTextPlugin("css/[name]-[contenthash]-sass.css");



common.devtool = 'source-map';

common.module.rules.push(
    {
        test: /\.css$/,
        use: extractCSS.extract({
            use: [{ loader: 'css-loader', options: { sourceMap: true, minimize: true } }],
        }),
        exclude: /node_modules/
    },
    {
        test: /\.scss$/,
        use: extractSASS.extract({
            use: [
                { loader: 'css-loader', options: { sourceMap: true, minimize: true } },
                { loader: 'sass-loader', options: { sourceMap: true } }
            ]
        }),
        exclude: /node_modules/
    }
);

common.plugins.push(
    extractCSS,
    extractSASS,
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new UglifyJSPlugin({
        sourceMap: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
);

console.log("Production mode...");



module.exports = merge(common, {
});