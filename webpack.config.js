/**
 * Created by siyuanxu on 2/11/18.
 */
const webpack = require('webpack');

module.exports = {
    entry: './reactApp/app.js',
    output: {
        path: __dirname + '/reactApp/build',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /reactApp\/(.)*\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.(s?css|less)$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }

                ]
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './reactApp',
        hot: true,
        inline: true,
        open: true,
        hotOnly: true
    },
    devtool: "inline-sourcemap"
};