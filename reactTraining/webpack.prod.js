/**
 * 生产模式
 * @type {path.PlatformPath | path}
 */

const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        filename: "[hash:8].js",
        path: path.resolve(__dirname, 'dist')
    },
    mode: "production",
    devtool: 'source-map',
    module: {
        rules: [
            {test: /\.js$/, use: 'babel-loader'},
            {
                test: /\.(css|less)$/,
                // include: [path.resolve(__dirname,"src/styles"),/node_modules/],
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            // 增加字体和图像和处理配置
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ["file-loader"]
            }, {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                loader: "url-loader",
                options: {
                    limit: 10000
                }
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Github热⻔项⽬',
            favicon: 'public/favicon.png',
            template: "./public/index.html",
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        // 包体分析工具
        new BundleAnalyzerPlugin()
        // v5.0.0版本已不支持这样
        // optimization.namedModules removed (NamedModulesPlugin too)
        // webpack5.x
        // 在webpack5.x中，webpack.NamedModulesPlugin的功能已经内置
        // new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin()
    ],


    // 配置 webpack-dev-server
    devServer: {
        port: 8888,
        open: true,
        hot: true,
        openPage: '#/popular',
        // overlay: true
    },

    resolve: {
        alias: {
            '@': path.resolve('src')
        }

    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new OptimizeCSSAssetsPlugin()
        ],
    },
};
