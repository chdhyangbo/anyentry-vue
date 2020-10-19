/*
 * @Descripttion: 
 * @version: 
 * @Author: Do not edit
 * @Date: 2020-09-05 13:21:32
 * @LastEditors: yb
 * @LastEditTime: 2020-10-19 12:47:06
 */
const path = require('path');
const {AutoWebPlugin } = require('web-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 使用AutoWebPlugin自动寻找pages目录下的所有目录，将每一个目录看成一个单页应用
const autoWebPlugin = new AutoWebPlugin('./src/pages/', {
    template: './src/template.html', // HTML模板文件所在的文件路径
    publicPath: './', 
    // postEntrys: ['./common.css'],// 所有的页面都依赖的共用的css样式文件
    // 提取所有页面的公共代码
    // commonsChunk: {
    //     name: 'common'// 提取出公共代码的Chunk名称
    // },
    requires: ['chunk-vendors']
});
const CopyPlugin = require('copy-webpack-plugin');
// console.log(autoWebPlugin)
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : './', //静态资源访问路径,
    outputDir: 'dist',
    assetsDir: '', //不这么配会导致丢失chunk-vendors
    productionSourceMap: true, // 映射成非打包压缩的样子，便于查找错误。
    // pages: {//配置多页面入口        
    //     common: {
    //         entry: 'src/pages/common/main.js',
    //         filename: 'common/common.html',
    //         title:"公共组件",
    //     },
    //     home: {
    //         entry: 'src/pages/home/index.vue',
    //         filename: 'home/home.html',
    //     },
    // },
    // AutoWebPlugin会为寻找到的所有单页应用生成对应的入口配置
    // autoWebPlugin.entry方法可以获取所有由autoWebPlugin生成的入口配置
    
    css: {
        // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
        // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
        extract: true,

        // 是否开启 CSS source map？
        sourceMap: true, // 一定要启动map

        // 为预处理器的 loader 传递自定义选项。比如传递给
        // sass-loader 时，使用 `{ sass: { ... } }`。
        // loaderOptions: {},

        // 为所有的 CSS 及其预处理文件开启 CSS Modules。
        // 这个选项不会影响 `*.vue` 文件。
        modules: true
    },
    // 配置 webpack-dev-server 行为。
    devServer: {
        open: process.platform === ' ',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
        proxy: {
            '/api': {
                target: 'http://localhost:8880',
                changeOrigin: true,
                secure: false,
                // ws: true,
                pathRewrite: {
                    '^/api': '/static/mock'   // 请求数据路径别名,这里是注意将static/mock放入public文件夹
                }
            }
        },
    },
    // 三方插件的选项
    pluginOptions: {
    
    },
    chainWebpack: config => {
        config.resolve.alias
            .set("@", path.join(__dirname, "src"))  
        // .set("assets", resolve("src/assets"))
        // .set("components", resolve("src/components"))
        // .set("base", resolve("baseConfig"))
        // .set("public", resolve("public"));
        config.plugin('extract-css').tap(options => {
            options[0].filename = '[name]/[name].css'
            return options
        })
    },
    configureWebpack: {
        entry: autoWebPlugin.entry({
        }),
        output: {
            filename: '[name]/[name].js',
            path: path.resolve(__dirname, 'dist'),
        },
        
        watch: true, // 在这里添加监听变化后实时打包 watch:true
        module: {
        },
        plugins: [
            // 所有页面的入口目录
            new MiniCssExtractPlugin({
                // 修改打包后css文件名
                filename: `[name]/[name].css`,
                // chunkFilename: `css/[name].css`
            }),
            new CopyPlugin({
                patterns: [
                    { from: './src/pages/**/*.json', to: '[name]/mvvn.[ext]' },
                ],
            }),
            autoWebPlugin,
           
        ]
    }
   
}
