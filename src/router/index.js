import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index/index'
const category = resolve => require(['@/pages/category/category'], resolve)
const categoryList = resolve => require(['@/pages/category/category-list'], resolve)
const categoryDetail = resolve => require(['@/pages/category/category-detail'], resolve)
const search = resolve => require(['@/pages/category/search'], resolve)
const order = resolve => require(['@/pages/shopcart/order'], resolve)
const payment = resolve => require(['@/pages/shopcart/payment'], resolve)
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
            component: category
        },{
            path: '/product/:id',
            component: categoryDetail
        },
        {
            path: '/category-list',
            component: categoryList
        },
        {
            path: '/shopcart',
            component: shopcart
        },{
            path: '/user',
            component: user
        },{
            path: '/userInfo',
            component: userInfo
        },{
            path: '/user/login',
            component: userLogin
        },{
            path: '/user/register',
            component: userRegister
        },{
            path: '/user/shipping',
            component: shipping
        },{
            path: '/user/reset-password',
            component: resetPassword
        },
        {
            path: '/order',
            component: order
        },
        {
            path: '/payment/:orderNo',
            component: payment
        },
        {
            path: '/search',
            component: search
        }
    ]
})
