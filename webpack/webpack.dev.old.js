//https://christianalfoni.github.io/react-webpack-cookbook/Automatic-browser-refresh.html

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path_to_react = path.resolve(__dirname, '../node_modules/react/dist/react.min.js');

var srcDir = path.join(__dirname, '../src');
var buildDir = path.join(__dirname, '../build');
var port = 8080;

module.exports = {
    context: srcDir,
    entry: [ './app.jsx' ],
    output: {
        path: buildDir,
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: srcDir + '/index.html',
            inject: 'body'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,  //All .js and .jsx files //test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel'//?optional=runtime' //=runtime is for Object.assign support (via babel-runtime)
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
        ],
        noParse: [path_to_react]
    }
};