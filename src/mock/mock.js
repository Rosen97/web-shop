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
let categoryData = {
    status: 0,
    data: [
        {
            name: '手机数码',
            mainImgUrl: '//img20.360buyimg.com/mcoss/jfs/t16273/143/46476745/45673/cba0840c/5a28ef10N82ab81d3.jpg',
            list:[
                {
                    title: '手机',
                    imgUrl: '//img10.360buyimg.com/focus/s140x140_jfs/t11503/241/2246064496/4783/cea2850e/5a169216N0701c7f1.jpg'
                },
                {
                    title: '全面屏手机',
                    imgUrl: '//img30.360buyimg.com/focus/s140x140_jfs/t18955/187/1309277884/11517/fe100782/5ac48d27N3f5bb821.jpg'
                },
                {
                    title: '游戏手机',
                    imgUrl: '//img11.360buyimg.com/focus/s140x140_jfs/t11470/45/2362968077/2689/fb36d9a0/5a169238Nc8f0882b.jpg'
                },
                {
                    title: '拍照手机',
                    imgUrl: '//img20.360buyimg.com/focus/s140x140_jfs/t12022/66/917351804/2257/7ddc58e5/5a169232Ndf76f53c.jpg'
                },
                {
                    title: '老手机',
                    imgUrl: '//img12.360buyimg.com/focus/s140x140_jfs/t11461/339/2354953633/8254/8c8c50d3/5a169217N5d1b842e.jpg'
                },
                {
                    title: '女性手机',
                    imgUrl: '//img12.360buyimg.com/focus/s140x140_jfs/t15790/6/2311892256/2742/5ed77924/5a9fa728Nbff29ad2.jpg'
                }

            ],
            desc: 'slide1'
        },
        {
            name: '电脑办公',
            mainImgUrl: '//img30.360buyimg.com/mcoss/jfs/t14743/292/279117506/48503/9b7d9f2c/5a28ea97N36cb4d16.jpg',
            list: [
                {
                    title: '轻薄本',
                    imgUrl: '//img13.360buyimg.com/focus/s140x140_jfs/t11071/195/2462134264/9117/cd0688bf/5a17ba79N18b9f3d4.png'
                },
                {
                    title: '游戏本',
                    imgUrl: '//img30.360buyimg.com/focus/s140x140_jfs/t11155/36/2330310765/10690/eb6754c3/5a17ba96N49561fea.png'
                },
                {
                    title: '机械键盘',
                    imgUrl: '//img12.360buyimg.com/focus/s140x140_jfs/t12304/245/965858782/6481/37cb5a9b/5a17ba5aN0406a1b5.jpg'
                },
                {
                    title: '组装电脑',
                    imgUrl: '//img10.360buyimg.com/focus/s140x140_jfs/t14101/325/978287093/8836/e142aa53/5a17ba73N07b12f0c.jpg'
                },
                {
                    title: '移动硬盘',
                    imgUrl: '//img12.360buyimg.com/focus/s140x140_jfs/t13228/333/989759736/4764/2a312c2e/5a17ba7fN0740c051.jpg'
                },
                {
                    title: '显卡',
                    imgUrl: '//img20.360buyimg.com/focus/s140x140_jfs/t12679/262/982342141/7023/d05a11e5/5a17ba57Nf179b4e4.jpg'
                },
                {
                    title: '游戏台式机',
                    imgUrl: '//img10.360buyimg.com/focus/s140x140_jfs/t12865/295/960489437/5723/4f38f11/5a17ba8bN911b7264.jpg'
                },
                {
                    title: '曲屏显示器',
                    imgUrl: '//img30.360buyimg.com/focus/s140x140_jfs/t13798/322/988648789/3644/1adc5615/5a17ba6dNafc95373.jpg'
                },
                {
                    title: '投影仪',
                    imgUrl: '//img20.360buyimg.com/focus/s140x140_jfs/t13492/261/938265048/5840/b5e4bdb6/5a17ba61N61a74bc3.jpg'
                }
            ]
        },
        {
            name: '家用电器',
            desc: 'slide3'
        },
        {
            name: '美妆护肤',
            desc: 'slide4'
        },
        {
            name: '男装男鞋',
            desc: 'slide1'
        },
        {
            name: '女装女鞋',
            desc: 'slide3'
        },
        {
            name: '母婴童装',
            desc: 'slide1'
        },
        {
            name: '图书音像',
            desc: 'slide2'
        },
        {
            name: '户外运动',
            desc: 'slide3'
        },
        {
            name: '食品生鲜',
            desc: 'slide4'
        }
    ]
}

Mock.mock('/home/data', 'post', homeData)
Mock.mock('/category/data', 'post', categoryData)
