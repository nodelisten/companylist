'use strict';
let webpack = require('webpack');
module.exports = {
    context: __dirname,
    entry: "./js/app.js",
    output: {
        path: __dirname,
        filename: "build.js"
    },
    watch: true,
    devtool: 'source-map',

    module: {
        loaders: [
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            },
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel', // 'babel-loader' is also a legal name to reference
              query: {
                presets: ['es2015']
              }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}
console.log(__dirname);