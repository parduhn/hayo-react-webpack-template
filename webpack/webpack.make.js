var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var pkg = require('../package.json');

var path_to_react = path.resolve(__dirname, '../node_modules/react/dist/react.min.js');
var srcDir = path.join(__dirname, '../src');
var buildDir = path.join(__dirname, '../build');
var port = 8080;

module.exports = function makeWebpackConfig(options) {

    var BUILD = !!options.BUILD;

    var config = {};

    config.context = srcDir;

    config.cache = true;

    config.entry = {
        app: [ './app.jsx']

    };

    config.output = {
        path: buildDir,
        publicPath: BUILD ? '/' : 'http://localhost:8080/',
        filename: BUILD ? '[name].[hash].js' : '[name].bundle.js',
        chunkFilename: BUILD ? '[name].[hash].js' : '[name].bundle.js',
        jsonpCallback: 'a'
    };

    if (BUILD) {
        config.devtool = 'source-map';
    } else {
        config.devtool = 'eval';
    }

    config.module = {
        noParse: [path_to_react],
        preLoaders: [],
        loaders: [
            {
                test: /\.(js|jsx)$/,  //All .js and .jsx files //test: /\.jsx?$/,
                loaders: [
                    'babel'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'url-loader?limit=10000',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false&verbose=false'
                ]
            },
            {
                test: /\.(scss|css)$/,
                loader: BUILD ? ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss!sass') : 'style!css-loader?sourceMap!postcss!sass'
            },
            {
                test: /\.(woff|woff2|ttf|eot|ico)$/,
                loader: 'file'
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.json(\?.*)?$/,
                loader: 'json'
            },
        ]
    };


    config.resolve = {
        root: [
            path.join(__dirname, '../src'),
            path.join(__dirname, '../node_modules')
        ],
        extensions: [
            '',
            '.js',
            '.html',
            '.css',
            '.scss'
        ]
    };

    config.resolveLoader = {
        root: path.join(__dirname, '../node_modules')
    };

    //noinspection JSUnresolvedFunction
    config.plugins = [
        new HtmlWebpackPlugin({
            title: pkg.description,
            template: './src/index.html',
            hash: true,
            inject: 'body'

        })
    ];

    if (BUILD) {
        config.entry.vendor = [
            'react',
            'react-dom'
        ];
    }

    config.devServer = {
        contentBase: buildDir,
        stats: {
            modules: true,
            cached: true,
            colors: true,
            chunk: true
        }
    };

    config.node = {
        __dirname: true
    };

    return config;
};
