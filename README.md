<!--
 * @Descripttion: 
 * @version: 
 * @Author: Do not edit
 * @Date: 2020-09-04 10:49:50
 * @LastEditors: yb
 * @LastEditTime: 2020-10-19 12:44:27
-->
# anyentry

## Project setup
```
npm install
// install后要改一下一个文件的源码
AutoWebPlugin.js
179行
改
filename: `${htmlOutputFilename}.html`,
为
filename: `${htmlOutputFilename}/${htmlOutputFilename}.html`,
```

### Compiles and minifies for production
```
// 开发和打包都用这个命令就行啦
npm run build

```
### 配置
 - 自己配置打包目录
 ```
 // 修改vue.config.js的outputDir
  outputDir: 'dist',
 ```
 - 这里我配置的less,如果需要scss，只需要下载sass-loader,详细请百度配置

### 切记这里的文件都是只有引入才会被编译

### 文件目录
 - pages页面就是要编译的文件，所以请按照home文件夹的写法进行代码写
#### home文件夹有什么呢
   - home.json 
     1.这个文件就是以前的mvvm.json啦，请按照以前的mvvn.json格式配置好html(就是以前的jsp)和js文件即可。
     2.记得这个文件名字要和文件夹名字一致。
   - index.js
     1. 这个文件直接复制就行了
     2. 也可以用来引入js,不过去index.vue 里面引入更好
   - index.vue 
     1. 这个就是我们要写的页面啦
### 未来畅想
这个还是有很多未完善的东西，加油
#### 配置axios
#### 配置跨域连接开发环境
#### 配置mock
#### 分文件打包，只打包自己开发的那个文件不全部打包
#### 打包时间计时
#### 代码去console.log
等等


   





