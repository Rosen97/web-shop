import Vue from 'vue'
import Router from 'vue-router'

//  懒路由加载
const home = r => require.ensure([], () => r(require('@/pages/home/home')), 'home')
const category = r => require.ensure([], () => r(require('@/pages/category/category')), 'category')
const search = r => require.ensure([], () => r(require('@/pages/search/search')), 'search')
const productList = r => require.ensure([], () => r(require('@/pages/product-list/product-list')), 'productList')
const productDetail = r => require.ensure([], () => r(require('@/pages/product-detail/product-detail')), 'productDetail')
const user = r => require.ensure([], () => r(require('@/pages/user/user')), 'user')
const profile = r => require.ensure([], () => r(require('@/pages/profile/profile')), 'profile')
const profileProduct = r => require.ensure([], () => r(require('@/pages/profile-product/profile-product')), 'profile-product')
const login = r => require.ensure([], () => r(require('@/pages/login/login')), 'login')
const register = r => require.ensure([], () => r(require('@/pages/register/register')), 'register')
const forgetPassword = r => require.ensure([], () => r(require('@/pages/forget-password/forget-password')), 'forget-password')
const updatePassword = r => require.ensure([], () => r(require('@/pages/update-password/update-password')), 'update-password')
const updateInfo = r => require.ensure([], () => r(require('@/pages/update-info/update-info')), 'update-info')
const shopcart = r => require.ensure([], () => r(require('@/pages/shopcart/shopcart')), 'shopcart')
const order = r => require.ensure([], () => r(require('@/pages/order/order')), 'order')
const orderList = r => require.ensure([], () => r(require('@/pages/order-list/order-list')), 'order-list')
const orderDetail = r => require.ensure([], () => r(require('@/pages/order-detail/order-detail')), 'order-detail')
const payment = r => require.ensure([], () => r(require('@/pages/payment/payment')), 'payment')
const shipping = r => require.ensure([], () => r(require('@/pages/shipping/shipping')), 'shipping')
const frame = r => require.ensure([], () => r(require('@/components/common/frame')), 'frame')


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            meta: {
                index: 1
            },
            component: home
        }, {
            path: '/category',
            meta: {
                index: 1
            },
            component: category
        }, {
            path: '/search',
            meta: {
                index: 1
            },
            component: search
        }, {
            path: '/product-list',
            meta: {
                index: 3
            },
            component: productList
        }, {
            path: '/product/:id',
            meta: {
                index: 4
            },
            component: productDetail
        }, {
            path: '/user',
            meta: {
                index: 1
            },
            component: user
        }, {
            path: '/profile',
            meta: {
                index: 2
            },
            component: profile
        }, {
            path: '/profile-product',
            meta: {
                index: 3
            },
            component: profileProduct
        }, {
            path: '/login',
            meta: {
                index: 2
            },
            component: login
        }, {
            path: '/register',
            meta: {
                index: 3
            },
            component: register
        }, {
            path: '/forget-password',
            meta: {
                index: 3
            },
            component: forgetPassword
        }, {
            path: '/update-password',
            meta: {
                index: 3
            },
            component: updatePassword
        }, {
            path: '/update-info',
            meta: {
                index: 3
            },
            component: updateInfo
        }, {
            path: '/shopcart',
            meta: {
                index: 1
            },
            component: shopcart
        }, {
            path: '/order',
            meta: {
                index: 2
            },
            component: order
        }, {
            path: '/order-list',
            meta: {
                index: 3
            },
            component: orderList
        }, {
            path: '/order-detail',
            meta: {
                index: 4
            },
            component: orderDetail
        }, {
            path: '/payment',
            meta: {
                index: 5
            },
            component: payment
        },
        {
            path: '/shipping',
            meta: {
                index: 3
            },
            component: shipping
        },
        {
            path: '/frame',
            meta: {
                index: 3
            },
            component: frame
        }
    ]
})
