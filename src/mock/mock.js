// 使用mock模拟首页数据
const Mock = require('mockjs')

let homeData = {
    status: 0,
    data: {
        headList: [
            {
                imgUrl: 'https://i1.mifile.cn/a4/xmad_15411417211918_EUHLt.jpg',
                categoryId: 2577
            },
            {
                imgUrl: 'https://i1.mifile.cn/a4/xmad_15413178186011_hyJGI.jpg',
                categoryId: 2576
            },
            {
                imgUrl: 'https://i1.mifile.cn/a4/xmad_15414198595656_ShROo.jpg 2x',
                categoryId: 100
            }
        ],
        phoneList: [
          {
            name: '小米8 青春版 4GB+64GB',
            desc: '潮流镜面渐变色，2400万自拍旗舰',
            price: 1399,
            imgUrl: 'https://i1.mifile.cn/a1/pms_1537323963.1278763!220x220.jpg'
          },
          {
            name: '小米8 SE 4GB+64GB',
            desc: 'AI 超感光双摄，三星 AMOLED 屏幕',
            price: 1899,
            imgUrl: 'https://i1.mifile.cn/a1/pms_1527684990.93616987!220x220.jpg'
          },
          {
            name: '小米6X 4GB+32GB',
            desc: '全索尼相机，骁龙660 AIE处理器',
            price: 1199,
            imgUrl: 'https://i1.mifile.cn/a1/pms_1527144859.25489991!220x220.jpg'
          },
          {
            name: '小米MIX 2 全陶瓷尊享版',
            desc: '全面屏2.0，Unibody 全陶瓷',
            price: 2899,
            imgUrl: 'https://i1.mifile.cn/a1/pms_1509723483.31416776!220x220.jpg'
          }
        ],
        electricList: [
          {
            name: '小米电视4A 43英寸青春版',
            desc: '全高清屏 / 人工智能语音',
            price: 2899,
            delPrice: 3699,
            imgUrl: 'https://i1.mifile.cn/a1/pms_1524883847.49276938!220x220.jpg'
          },
          {
            name: '15.6"笔记本 i5 4G MX110',
            desc: '全高清屏 / 人工智能语音',
            price: 4199,
            delPrice: 0,
            imgUrl: 'https://i1.mifile.cn/a4/xmad_15350951136177_QUuVm.png'
          },
          {
            name: '米家空气净化器Pro',
            desc: 'OLED 显示屏幕 / 激光颗粒物传感器',
            price: 10199,
            delPrice: 11231,
            imgUrl: 'https://i1.mifile.cn/a4/xmad_14972549116226_tZpod.png'
          },
          {
            name: '米家电水壶',
            desc: '一杯水，是一家人的安心',
            price: 99,
            delPrice: 129,
            imgUrl: 'https://i1.mifile.cn/a1/pms_1504498936.11861982!220x220.jpg'
          }
        ],
        intelligentList: [
          {
            name: '米家飞利浦智睿台灯二代',
            desc: '感知环境光，主动优化场景照明',
            price: 199,
            delPrice: 229,
            imgUrl: 'https://i1.mifile.cn/a4/cf6660a3-d424-4248-889f-0eed1e99a342'
          },
          {
            name: '米家IH电饭煲 4L',
            desc: 'IH 电磁环绕加热 ',
            price: 399,
            delPrice: 429,
            imgUrl: 'https://i1.mifile.cn/a1/pms_1490770630.65576964!220x220.png'
          },
          {
            name: '小米米家行车记录仪1S',
            desc: '',
            price: 339,
            delPrice: 349,
            imgUrl: 'https://i1.mifile.cn/a1/pms_1539051273.95659582!220x220.jpg'
          },
          {
            name: '  1MORE 四单元圈铁耳机  ',
            desc: '感知环境光，主动优化场景照明',
            price: 1299,
            delPrice: 0,
            imgUrl: 'https://i1.mifile.cn/a1/pms_1508894595.80572640.jpg?width=150&height=150'
          }
        ]
    }
}
Mock.mock('/home/data', 'post', homeData)
