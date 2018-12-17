// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import 'lib-flexible'   //rem布局
import http from './service/ajax'
import fastclick from 'fastclick'
import VueScroller from 'vue-scroller'

Vue.use(VueScroller)
fastclick.attach(document.body) //解决移动端点击300ms延时
Vue.config.productionTip = false

// 引入mockjs
require('./mock/mock.js')


Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
        // 聚焦元素
        el.focus()
    }
})


Vue.prototype.$http = http
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
