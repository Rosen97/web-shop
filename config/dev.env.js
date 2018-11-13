'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_HOST: '"/api/"' // 加上这个开发环境就直接去调用代理了
})
