'use strict';
var ISDEV = process.env.NODE_ENV === 'development';
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
require('es6-promise').polyfill();

module.exports = {
    entry: './src/index.js',

    output: {
        publicPath: '/freecodecamp.pomodoro-timer/build/',
        path: path.join(__dirname, './build/'),
        filename: '[name].min.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].min.css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader!postcss!sass-loader?outputStyle=expanded'
                )
            },
            { test: /\.(ttf|eot|woff|svg)/,
                loader: 'file-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader!postcss!'
                )
            },
        ]
    },

    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],

    resolve: {
        alias: {
            jquery: path.join(__dirname, 'node_modules/jquery/dist/jquery.js'),
            $: 'jquery'
        },
        extensions: ['', '.js', '.es6']
    },

    // Create Sourcemaps for the bundle
    devtool: 'inline-source-map',
    watch: ISDEV,
};