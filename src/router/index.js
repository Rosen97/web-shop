import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index/index'
import category from '@/pages/category/category'
import shopcart from '@/pages/shopcart/shopcart'
import user from '@/pages/user/user'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/index',
            name: 'index',
            component: index
        },{
            path: '/category',
            name: 'category',
            component: category
        },{
            path: '/shopcart',
            name: 'shopcart',
            component: shopcart
        },{
            path: '/user',
            name: 'user',
            component: user
        }
    ]
})
