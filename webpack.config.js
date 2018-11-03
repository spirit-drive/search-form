const
    styles            = require('./webpack/styles'),
    scripts           = require('./webpack/scripts'),
    img               = require('./webpack/img'),
    fonts             = require('./webpack/fonts'),
    path              = require('path'),
    Html              = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    Imagemin          = require('imagemin-webpack-plugin').default,
    Clean             = require("clean-webpack-plugin");

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: './index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].js',
    },
    devtool: 'source-map',
    devServer: {
        overlay: true,
        host: '192.168.1.71',
    },
    plugins: [
        new Html({
            template: 'index.html'
        }),
        new ExtractTextPlugin("css/[name].css"),
        new Clean([path.join(__dirname, 'dist')]),
        new Imagemin({
            test: /\.(png|gif|jpe?g|svg)$/i
        }),
    ],
    module: {
        rules: [
            styles(true),
            scripts(),
            img(),
            fonts()
        ]
    },
};
// const
//     styles            = require('./webpack/styles'),
//     scripts           = require('./webpack/scripts'),
//     img               = require('./webpack/img'),
//     fonts             = require('./webpack/fonts'),
//     path              = require('path'),
//     Html              = require('html-webpack-plugin'),
//     ExtractTextPlugin = require("extract-text-webpack-plugin"),
//     Imagemin          = require('imagemin-webpack-plugin').default,
//     Clean             = require("clean-webpack-plugin");
//
// module.exports = (env, options) => {
//     const isDevMode = options.mode === "development";
//     const dist = path.join(__dirname, 'dist');
//     const src = path.join(__dirname, 'src');
//
//     return {
//         context: src,
//         entry: './index.js',
//         output: {
//             path: dist,
//             filename: 'js/[name].js',
//         },
//         devtool: isDevMode && 'source-map',
//         devServer: {
//             overlay: true,
//             host: '192.168.1.71',
//         },
//         plugins: [
//             new Html({
//                 template: 'index.html'
//             }),
//             new ExtractTextPlugin("css/[name].css"),
//             new Clean([dist]),
//             new Imagemin({
//                 test: /\.(png|gif|jpe?g|svg)$/i
//             }),
//         ],
//         module: {
//             rules: [
//                 styles(isDevMode),
//                 scripts(),
//                 img(),
//                 fonts()
//             ]
//         },
//
//     }
// };