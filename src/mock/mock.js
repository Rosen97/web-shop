// 使用mock模拟首页数据
const Mock = require('mockjs')

let homeData = {
    status: 0,
    data: {
        headList: [
            {
                imgUrl: '//m.360buyimg.com/mobilecms/s1125x690_jfs/t29188/301/133996293/200131/61f42a01/5be8eed6Nda6a18a5.jpg!cr_1125x549_0_72!q70.jpg.dpg',
                categoryId: 2577
            },
            {
                imgUrl: '//m.360buyimg.com/mobilecms/s1125x690_jfs/t30757/316/208746402/123953/9fa18794/5beb7d13Ne77e9f29.jpg!cr_1125x549_0_72!q70.jpg.dpg',
                categoryId: 2576
            },
            {
                imgUrl: '//m.360buyimg.com/mobilecms/jfs/t1/3926/29/4138/254748/5b9b646dE45cbeb7f/f80c8f7c24273bc1.jpg!cr_1125x549_0_72',
                categoryId: 100
            }
        ],
        categoryList: [
            {
                name: '京东超市',
                imgUrl: '//m.360buyimg.com/mobilecms/jfs/t25534/207/1767774998/8085/523157d6/5bbc800fN502129b8.png.webp'
            },{
                name: '全球购',
                imgUrl: '//m.360buyimg.com/mobilecms/jfs/t21658/347/221358098/7461/f86e6f74/5b03b170Nc9e0ec7c.png.webp'
            },{
                name: '京东时尚',
                imgUrl: '//m.360buyimg.com/mobilecms/jfs/t1/8385/17/3537/17895/5bd6ca67E09d23550/32d965fe9a9087a2.png.webp'
            },{
                name: '京东生鲜',
                imgUrl: '//m.360buyimg.com/mobilecms/jfs/t17725/156/1767366877/17404/f45d418b/5ad87bf0N66c5db7c.png.webp'
            },{
                name: '京东到家',
                imgUrl: '//m.360buyimg.com/mobilecms/jfs/t16990/157/2001547525/17770/a7b93378/5ae01befN2494769f.png.webp'
            },{
                name: '充值缴费',
                imgUrl: '//m.360buyimg.com/mobilecms/jfs/t18454/342/2607665324/6406/273daced/5b03b74eN3541598d.png.webp'
            },{
                name: '9.9元拼',
                imgUrl: '//m.360buyimg.com/mobilecms/jfs/t22228/270/207441984/11564/88140ab7/5b03fae3N67f78fe3.png.webp'
            },{
                name: '领劵',
                imgUrl: '//m.360buyimg.com/mobilecms/jfs/t25258/200/2527038521/14019/3d7a8470/5be92494N557a0c5b.png.webp'
            },{
                name: '省钱',
                imgUrl: '//m.360buyimg.com/mobilecms/jfs/t22120/183/200496447/5553/91ed22e0/5b03b7b8Ncea08c5b.png.webp'
            },{
                name: '全部',
                imgUrl: '//m.360buyimg.com/mobilecms/jfs/t21481/263/412160889/15938/4246b4f8/5b0cea29N8fb2865f.png.webp'
            }

        ],
        floorList: [
            {
                headUrl: '//m.360buyimg.com/mobilecms/jfs/t15526/56/2344102455/23273/d8e15d5a/5aa0dbc1Nefd2bd2a.png!q70.jpg.dpg',
                list: [
                    {
                        title: '玩3C',
                        desc: '黑鲨新品大爆炸',
                        products: [
                            {
                                imgUrl: '//m.360buyimg.com/n1/jfs/t25144/2/1278469398/101844/cb66b21/5b90f5bfNcd58f18b.png!q70.jpg.dpg',
                                categoryId: 1000
                            },
                            {
                                imgUrl: '//m.360buyimg.com/mobilecms/s240x240_jfs/t22792/274/2587775944/59292/3666f607/5b87bf15N9409ba0e.png!q70.jpg.dpg',
                                categoryId: 1000
                            }
                        ]
                    },
                    {
                        title: '京东家电',
                        desc: '家电狂欢 京彩有你',
                        products: [
                            {
                                imgUrl: '//m.360buyimg.com/mobilecms/s240x240_jfs/t22363/318/1484948466/11138/8317fc9b/5b2a528eN7c6bde83.jpg!q70.jpg.dpg',
                                categoryId: 1000
                            },
                            {
                                imgUrl: '//m.360buyimg.com/mobilecms/s240x240_jfs/t22666/293/257815171/29274/6b5605b1/5b2a5295N5a81ad96.jpg!q70.jpg.dpg',
                                categoryId: 1000
                            }
                        ]
                    },
                    {
                        title: '京东超市',
                        desc: '超市大放价 抢超值好货',
                        products: [
                            {
                                imgUrl: '//m.360buyimg.com/n1/jfs/t16852/170/2693122660/56143/28da8c2a/5b063c63N5746e4e4.jpg!q70.jpg.dpg',
                                categoryId: 1000
                            },
                            {
                                imgUrl: '//m.360buyimg.com/n1/jfs/t18877/293/2631103430/85245/f220b40d/5b063c6fN7820b399.jpg!q70.jpg.dpg',
                                categoryId: 1000
                            }
                        ]
                    },
                    {
                        title: '爱家',
                        desc: '家纺热卖 部分低至9.9元',
                        products: [
                            {
                                imgUrl: '//m.360buyimg.com/mobilecms/s240x240_jfs/t15244/283/356547262/47743/b6607b0f/5a2a6d51N8830e8b8.jpg!q70.jpg.dpg',
                                categoryId: 1000
                            },
                            {
                                imgUrl: '//m.360buyimg.com/mobilecms/s240x240_jfs/t16057/38/102057973/36179/b957e4ec/5a2a6d55N83655f7f.jpg!q70.jpg.dpg',
                                categoryId: 1000
                            }
                        ]
                    },
                    {
                        title: '家有萌宝',
                        desc: '低至五折',
                        products: [
                            {
                                imgUrl: '//m.360buyimg.com/n1/jfs/t17929/299/899794385/17291/d90318f9/5ab4c680N7d291625.jpg!q70.jpg.dpg',
                                categoryId: 1000
                            },
                            {
                                imgUrl: '//m.360buyimg.com/n1/jfs/t18802/262/2452746578/333259/5dcdfb06/5af3ffb4N0c700b57.jpg!q70.jpg.dpg',
                                categoryId: 1000
                            }
                        ]
                    },
                    {
                        title: '爱吃',
                        desc: '9.9包邮，夏日也生动',
                        products: [
                            {
                                imgUrl: '//m.360buyimg.com/mobilecms/s240x240_jfs/t14473/103/2042876100/41836/766c1953/5a697f47Nc952ed7f.jpg!q70.jpg.dpg',
                                categoryId: 1000
                            },
                            {
                                imgUrl: '//m.360buyimg.com/mobilecms/s240x240_jfs/t17155/227/2678303408/52223/f7a950c/5b0535d6Ne4073be7.jpg!q70.jpg.dpg',
                                categoryId: 1000
                            }
                        ]
                    }
                ]
            },
            {
                headUrl: '//m.360buyimg.com/mobilecms/jfs/t19381/275/717008577/26686/e58b7ef4/5aa23f27Nfa6d6be3.png!q70.jpg.dpg',
                list: [
                    {
                        title: '小家电馆',
                        desc: '满减狂欢',
                        products: [
                            {
                                imgUrl: '//m.360buyimg.com/mobilecms/s240x240_jfs/t25183/247/391394027/33684/8e1af9dc/5b6d048aNd7dae520.jpg!q70.jpg.dpg',
                                categoryId: 1000
                            }
                        ]
                    },
                    {
                        title: '珠宝馆',
                        desc: '满减优惠',
                        products: [
                            {
                                imgUrl: '//m.360buyimg.com/n1/jfs/t19009/357/347377157/13661/d0d9e5fb/5a6e8bb3Nd6182f9f.jpg!q70.jpg.dpg',
                                categoryId: 1000
                            }
                        ]
                    },
                    {
                        title: '鞋靴箱包',
                        desc: '低至五折',
                        products: [
                            {
                                imgUrl: '//m.360buyimg.com/n1/jfs/t21469/359/769885083/29352/68865ed/5b178e49Nc5db7341.jpg!q70.jpg.dpg',
                                categoryId: 1000
                            }
                        ]
                    },
                    {
                        title: '童装馆',
                        desc: '春夏小萌娃',
                        products: [
                            {
                                imgUrl: '//m.360buyimg.com/n1/jfs/t20614/194/808562651/89118/894d41a5/5b18ba8dN855ebe44.png!q70.jpg.dpg',
                                categoryId: 1000
                            }
                        ]
                    }
                ]
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
        },
        {
            name: '酒水饮料',
            desc: 'slide4'
        },
        {
            name: '家居家装',
            desc: 'slide4'
        },
        {
            name: '箱包手袋',
            desc: 'slide4'
        },
        {
            name: '钟表珠宝',
            desc: 'slide4'
        },
        {
            name: '玩具乐器',
            desc: 'slide4'
        },
    ]
}

Mock.mock('/home/data', 'post', homeData)
Mock.mock('/category/data', 'post', categoryData)
