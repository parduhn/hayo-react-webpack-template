//https://christianalfoni.github.io/react-webpack-cookbook/Automatic-browser-refresh.html

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var node_modules_dir = path.resolve(__dirname, '../node_modules');

module.exports = {
    entry:  path.resolve(__dirname, '../src/app.jsx'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js'
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            title: 'Testing',
            template: '../src/index.html',
            hash: true,
            inject: 'body',
            favicon: ''
        })
    ],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,  //All .js and .jsx files //test: /\.jsx?$/,
                exclude: [node_modules_dir],
                loader: 'babel'//?optional=runtime' //=runtime is for Object.assign support (via babel-runtime)
            }
        ]
    }
};