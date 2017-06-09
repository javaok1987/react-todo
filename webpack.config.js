const path = require('path');
const webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'public');


// 這邊使用 HtmlWebpackPlugin，將 bundle 好得 <script> 插入到 body
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: `${APP_PATH}/index.html`,
    filename: 'index.html',
    inject: 'body'
});

// 檔案起始點從 entry 進入，也可以是多個檔案。output 是放入產生出來的結果的相關參數。loaders 則是放欲使用的 loaders，在這邊是使用 babel-loader 將所有 .js（這邊用到正則式）相關檔案轉譯成瀏覽器可以閱讀的 JavaScript。devServer 則是 webpack-dev-server 設定。plugins 放置所使用的外掛
module.exports = {
    entry: [
        `${APP_PATH}/index.js`
    ],
    output: {
        path: BUILD_PATH,
        filename: './js/[name].bundle.js',
    },
    module: {
        loaders: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: APP_PATH
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    'style-loader', // 輸出 CSS 到 document 的 <style> 元素內.
                    'css-loader', // 解析 CSS 轉換成 Javascript 同時解析相依的資源.
                    'sass-loader' // 編譯 Sass 成為 CSS.
                ],
                include: [APP_PATH,path.resolve(ROOT_PATH, 'node_modules/bootstrap/scss/')]
            },
            {
                test: /\.(png|gif|jpg|svg)$/,
                use: 'url-loader?limit=20480&name=[name]-[hash].[ext]',
                include: APP_PATH
            }
        ]
    },
    devServer: {
        inline: true,
        port: 8080
    },
    plugins: [HTMLWebpackPluginConfig]
};
