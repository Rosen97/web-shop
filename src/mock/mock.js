// 使用mock模拟首页数据
const Mock = require('mockjs')

let homeData = {
    status: 0,
    data: {
        headList: [
            {
                imgUrl: 'https://i1.mifile.cn/a4/xmad_15411417211918_EUHLt.jpg',
                categoryId: 100010
            },
            {
                imgUrl: 'https://i1.mifile.cn/a4/xmad_15413178186011_hyJGI.jpg',
                categoryId: 100011
            },
            {
                imgUrl: 'https://i1.mifile.cn/a4/xmad_15414198595656_ShROo.jpg 2x',
                categoryId: 100011
            }
        ]
    }
}
Mock.mock('/home/data', 'post', homeData)
