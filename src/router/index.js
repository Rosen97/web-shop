import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index/index'
const category = resolve => require(['@/pages/category/category'], resolve)
const categoryDetail = resolve => require(['@/pages/category/category-detail'], resolve)
// const category = r => require.ensure([], () => r(require('@/pages/category/category')), 'category')
// const categoryDetail = r => require.ensure([], () => r(require('@/pages/category/category-detail')), 'categoryDetail')
import shopcart from '@/pages/shopcart/shopcart'
import user from '@/pages/user/user'
import userLogin from '@/pages/user/child/login'
import userRegister from '@/pages/user/child/register'
import userInfo from '@/pages/user/child/userInfo'
import shipping from '@/pages/user/child/shipping'
import resetPassword from '@/pages/user/child/reset-password'
// import categoryDetail from '@/pages/category/category-detail'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: index
        },{
            path: '/category',
            component: category,
            meta: {
                navShow: true,
            },
            children: [
                {
                    path: ':id',
                    meta: {
                        navShow: false,
                      keepAlive: true
                    },
                    component: categoryDetail
                }
            ]
        },{
            path: '/shopcart',
            component: shopcart
        },{
            path: '/user',
            meta: {
                navShow: true
            },
            component: user,
            children: [
                {
                    path: 'login',
                    meta: {
                        navShow: false,
                    },
                    component: userLogin
                },
                {
                    path: 'register',
                    meta: {
                        navShow: false
                    },
                    component: userRegister
                },
                {
                    path: 'userInfo',
                    meta: {
                        navShow: false
                    },
                    component: userInfo
                },
                {
                    path: 'shipping',
                    meta: {
                        navShow: false
                    },
                    component: shipping
                },{
                    path: 'reset-password',
                    meta: {
                        navShow: false
                    },
                    component: resetPassword
                }
            ]
        }
    ]
})
