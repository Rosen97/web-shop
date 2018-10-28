import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index/index'
import category from '@/pages/category/category'
import shopcart from '@/pages/shopcart/shopcart'
import user from '@/pages/user/user'
import userLogin from '@/pages/user/login'
import userRegister from '@/pages/user/register'

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
            meta: {
                navShow: true
            },
            component: user,
            children: [
                {
                    path: 'login',
                    name: 'userLogin',
                    meta: {
                        navShow: false
                    },
                    component: userLogin
                },
                {
                    path: 'register',
                    name: 'userRegister',
                    meta: {
                        navShow: false
                    },
                    component: userRegister
                }
            ]
        }
    ]
})
