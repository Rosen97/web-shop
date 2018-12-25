# 技术栈

vue2 + vuex + vue-router + webpack + ES6/7 + axios + sass

框架：使用了vue全家桶进行开发，路由跳转使用的是vue-router，数据请求使用了官方推荐的axios插件,使用es6/7进行开发。

移动端适配： 由于是web-app，因此需要兼容不同设备的屏幕的大小，在这里使用的手淘推荐的[flexible方案](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)，通过动态的设置根元素的font-size大小，使用rem来进行移动端适配。在这里由于使用rem进行布局，而通常给我们的设计稿是640px,750px为标准的，在编写的时候把px大小转换为rem也比较麻烦，因此这里使用了postcss-px2rem，在编译的时候会将px自动转换为rem。

css预处理器：目前流行的css预处理主要是stylus，less，sass，个人感觉less和sass差别不大，stylus缩进式语法有点不太习惯，综上选择了sass进行样式的编写，通过预处理器可以以编程的方式书写css代码，添加变量，函数，样式继承等。

后台接口：在这里使用的是慕课网提供的接口：[接口文档](https://gitee.com/imooccode/happymmallwiki/wikis/Home)，相关的教程推荐：[电商项目实战](https://coding.imooc.com/class/109.html)

跨域处理：由于使用的外部接口，前端项目运行地址与接口访问地址不同，浏览器的同源策略使得我们不得不处理跨域，因此需要对跨域进行简单处理。
1. 开发模式下：需要在config下的index.js进行配置
```
proxyTable: {
     '/api': {  
         target: 'http://test.happymmall.com', //源地址
         changeOrigin: true, //改变源
         pathRewrite: {
             '^/api': '' //路径重写
         }
     }
 }
 ```
 
 在进行接口请求时在接口路径前加/api即可，编译后会将/api重写为线上的接口地址
 
 2. 生产模式下：在这里使用的是nignx，需要在远程服务器上安装nignx，然后在nginx.conf文件内配置location即可。

# 功能介绍

在这里主要用vue是把之前慕课网上电商项目进行了重构，做了个移动版本的，功能基本相同，主要是包括4个模块：

用户模块：登录，注册，个人信息修改，密码找回，更新密码。

商品模块：首页，分类，搜索商品，商品详情

购物车模块：购物车商品增加，删除，全选，单选，多选

订单模块：包括地址的管理，提交订单，订单列表，详情，取消订单等

在这里本来想做支付模块，发现接口返回的二维码失效支付不了，因此只到支付详情这块。
<br>

后续：

1. 在这里只是简单实现了基本功能，当然作为web-app，用户体验是第一位的，后续会持续的对项目进行性能优化
2. 数据请求这块使用的axios插件，后续会用原生fecth进行实现

#### 感觉不错的，反手就是一个赞👍，另外项目还要很多地方需要优化，欢迎大家issue！

# 项目演示

[查看demo请戳这里](http://www.rosenwang.xyz:8080/#/home)（请用chrome手机模式预览）

![](https://user-gold-cdn.xitu.io/2018/12/24/167df0e230722440?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![](https://github.com/Rosen97/web-shop/blob/master/src/assets/user.gif)
![](https://github.com/Rosen97/web-shop/blob/master/src/assets/user2.gif)
![](https://github.com/Rosen97/web-shop/blob/master/src/assets/product.gif)
![](https://github.com/Rosen97/web-shop/blob/master/src/assets/order.gif)

# 项目运行

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

