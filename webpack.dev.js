const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');


common.devtool = 'inline-source-map';

common.module.rules.push(
    // compile .css and .sass intoto javascript
    {
        test: /\.css$/,
        use: [
            { loader: 'style-loader', options: { sourceMap: true } },
            { loader: 'css-loader', options: { sourceMap: true } }
        ],
        exclude: /node_modules/
    },
    {
        test: /\.s[ac]ss$/,
        use: [
            { loader: 'style-loader', options: { sourceMap: true } },
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } }
        ],
        exclude: /node_modules/
    }
)

console.log("Development mode...");

module.exports = merge(common, {

});