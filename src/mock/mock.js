// 使用mock模拟首页数据  haha
const Mock = require('mockjs');
let homeData = ['1','2','2','4']
Mock.mock('/home/data', 'post', homeData);
