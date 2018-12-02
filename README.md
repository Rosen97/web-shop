# 前言

学习vue也有大半年的时间了，由于最近工作不是太忙，就想用vue对之前的电商项目进行一个重构，写了一个移动端的版本，主要包括：用户模块 商品模块  购物车模块 订单模块。
# 技术栈

vue2 + vuex + vue-router + webpack + ES6/7 + axios + sass

框架：使用了vue全家桶进行开发，路由跳转使用的是vue-router，数据请求使用了官方推荐的axios插件,使用es6/7进行开发。

移动端适配： 由于是web-app，因此需要兼容不同设备的屏幕的大小，在这里使用的手淘推荐的![flexible方案](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)，通过动态的设置根元素的font-size大小，使用rem来进行移动端适配。在这里由于使用rem进行布局，而通常给我们的设计稿是640px,750px为标准的，在编写的时候把px大小转换为rem也比较麻烦，因此这里使用了postcss-px2rem，在编译的时候会将px自动转换为rem。

css预处理器：目前流行的css预处理主要是stylus，less，sass，个人感觉less和sass差别不大，stylus缩进式语法有点不太习惯，综上选择了sass进行样式的编写，通过预处理器可以以编程的方式书写css代码，添加变量，函数，样式继承等。

# 项目数据接口

在这里使用的是慕课网提供的接口：[接口文档](https://gitee.com/imooccode/happymmallwiki/wikis/Home)，相关的教程推荐：[电商项目实战](https://coding.imooc.com/class/109.html)

# 项目演示

[查看demo请戳这里](http://47.105.169.110:8080/#/home)（请用chrome手机模式预览）

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

