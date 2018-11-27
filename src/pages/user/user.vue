<template>
    <div class="user-box">
        <header class="user-head">
            <i class="iconfont icon-left" @click="goBack"></i>
            <span>我的MMall</span>
            <i class="iconfont icon-More"></i>
        </header>
        <section class="user-page">
            <div class="user-info">
                <div class="info">
                    <img src="//img11.360buyimg.com/jdphoto/s120x122_jfs/t5683/191/7076936752/5123/834e5571/596dd62bN7a8affc5.png"/>
                    <div>
                        <p>{{userInfo.username}}</p>
                        <span class="name">用户名：{{userInfo.username}}</span>
                        <span>{{userInfo.phone}}</span>
                    </div>
                    <router-link to="./profile" class="account-management">
                        <i class="iconfont icon-shezhi"></i>账号管理
                    </router-link>
                </div>
            </div>
            <div class="user-menu">
                <router-link tag="div" to="./order-list?orderType=2" class="menu-item">
                    <i class="iconfont icon-daifukuan1"></i>
                    <span>待付款</span>
                </router-link>
                <router-link tag="div" to="./order-list?orderType=3" class="menu-item">
                    <i class="iconfont icon-daishouhuo1"></i>
                    <span>待收货</span>
                </router-link>
                <router-link tag="div" to="./order-list?orderType=4" class="menu-item">
                    <i class="iconfont icon-money"></i>
                    <span>已完成</span>
                </router-link>
                <router-link tag="div" to="./order-list?orderType=1" class="menu-item">
                    <i class="iconfont icon-icon1"></i>
                    <span>全部订单</span>
                </router-link>
            </div>
            <loading v-show="isLoading"></loading>
            <div v-show="!isLoading">
                <div class="user-fork">
                    <router-link tag="div" to="./profile-product?type=0" class="fork-item">
                        <i>{{followCount}}</i>
                        <span>关注的商品</span>
                    </router-link>
                    <div class="fork-item">
                        <i>0</i>
                        <span>关注的店铺</span>
                    </div>
                    <router-link tag="div" to="./profile-product?type=1" class="fork-item">
                        <i>{{footCount}}</i>
                        <span>我的足迹</span>
                    </router-link>
                </div>
                <p class="recommend-title">为你推荐</p>
                <div class="recommend-list">
                    <div class="recommend-item" v-for="(item,index) in recommendList" @click="productDetail(index)">
                        <img :src="item.imageHost+item.mainImage" v-if="item.imageHost && item.mainImage"/>
                        <img src="../../assets/product_default.jpg" v-else/>
                        <p>{{item.name}}</p>
                        <i>￥ {{item.price}}</i>
                    </div>
                </div>
            </div>
        </section>
        <nav-bar></nav-bar>
    </div>
</template>

<script>
    import navBar from '../../components/navBar'
    import loading from '../../components/common/loading'
    import {dedupeObject, getStore} from "../../common/js/util";
    import {checkLogin, productListKeyword} from "../../service/getData";
    import {mapState, mapMutations} from 'vuex'

    export default {
        data() {
            return {
                userInfo: {},
                recommendList: [],
                followCount: 0,
                footCount: 0,
                isLoading: true
            }
        },
        computed: {
            ...mapState({
                followList: state => state.followList
            })
        },
        beforeCreate() {
            checkLogin().then((res) => {
                if (res.status === 1) {   //未登录跳转
                    this.$router.push('./login')
                    return
                }
                this.userInfo = res.data
                console.log(res)
            })
        },
        created() {
            let footCount = getStore('footprintList').length
            this.footCount = footCount ? footCount : 0
            this.getRecommendList()
        },
        mounted() {
            this.followCount = this.followList.length
            this.$nextTick(()=>{
                setTimeout(()=>{
                    this.isLoading = false
                },500)
            })
        },
        methods: {
            ...mapMutations([
                'RECORE_FOOT'
            ]),
            getRecommendList() {
                let params = {
                    keyword: '1',
                    pageNum: 1,
                    pageSize: 6,
                    orderBy: 'default'
                }
                productListKeyword(params).then((res) => {
                    this.recommendList = res.data.list
                })
            },
            productDetail(index) {
                let footprintList = getStore('footprintList')
                footprintList.unshift(this.recommendList[index])
                this.RECORE_FOOT(dedupeObject(footprintList))
                this.$router.push('./product/' + this.recommendList[index].id)
            },
            goBack() {
                this.$router.go(-1)
            }
        },
        components: {
            navBar,
            loading
        }
    }
</script>

<style lang="scss" scoped="" type="text/scss">
    @import '../../common/style/mixin';

    .user-box {
        background: #F7F7F7;
        .user-head {
            @include fj;
            width: 100%;
            height: 88px;
            padding: 0 20px;
            line-height: 88px;
            font-size: 30px;
            @include boxSizing;
            border-bottom: 1px solid #dcdcdc;
            .iconfont {
                font-size: 44px;
            }
        }
        .user-info {
            width: 94%;
            margin: 20px 3%;
            height: 230px;
            background: linear-gradient(90deg, #eb3c3c, #ff7459);
            box-shadow: 0 2px 5px rgba(255, 98, 98, .4);
            @include borderRadius(12px);
            .info {
                position: relative;
                display: flex;
                width: 100%;
                height: 100%;
                padding: 50px 30px;
                @include boxSizing;
                img {
                    width: 120px;
                    height: 120px;
                }
                div {
                    display: flex;
                    flex-direction: column;
                    margin-left: 20px;
                    line-height: 40px;
                    font-size: 28px;
                    color: #fff;
                    .name {
                        color: hsla(0, 0%, 100%, .7);
                        font-size: 26px;
                        padding: 5px 0;
                    }
                    span {
                        &:nth-child(1) {
                            color: #999;
                            font-size: 26px;
                        }
                    }
                }
                .account-management {
                    position: absolute;
                    top: 20px;
                    right: 40px;
                    font-size: 26px;
                    color: rgba(76, 0, 0, .7);
                    .iconfont {
                        padding-right: 10px;
                        font-size: 28px;
                        color: rgba(76, 0, 0, .7);
                    }
                }
            }
        }
        .user-menu {
            display: flex;
            justify-content: space-around;
            width: 100%;
            height: 150px;
            background: #fff;
            .menu-item {
                display: flex;
                flex-direction: column;
                flex: 1;
                height: 100px;
                text-align: center;
                margin: 25px 0;
                .iconfont {
                    font-size: 50px;
                    color: #DD9E58;
                    &.icon-money {
                        font-size: 44px;
                        padding-top: 6px;
                    }
                    &.icon-icon1 {
                        @extend .icon-money;
                        color: $red;
                    }
                }
                span {
                    padding-top: 10px;
                    font-size: 24px;
                    color: #000;
                }
            }
        }
        .user-fork {
            margin: 30px 0;
            @extend .user-menu;
            .fork-item {
                display: flex;
                flex-direction: column;
                flex: 1;
                height: 100px;
                margin: 30px 0;
                text-align: center;
                i {
                    font-style: normal;
                    font-weight: bold;
                    padding: 10px 0;
                    font-size: 28px;
                }
            }
        }
        .recommend-title {
            width: 100%;
            height: 90px;
            padding-left: 20px;
            line-height: 90px;
            background: #fff;
            @include boxSizing;
        }
        .recommend-list {
            display: flex;
            flex-shrink: 0;
            flex-wrap: wrap;
            width: 100%;
            margin-top: 30px;
            padding-bottom: 150px;
            @include boxSizing;
            background: #fff;
            .recommend-item {
                display: flex;
                flex-direction: column;
                width: 50%;
                padding: 20px;
                @include boxSizing;
                border-bottom: 1px solid #dcdcdc;
                &:nth-child(2n-1) {
                    border-right: 1px solid #dcdcdc;
                }
                img {
                    width: 100%;
                    height: 290px;
                    margin: 0 auto;
                }
                p {
                    height: 60px;
                    padding: 20px 0;
                    font-size: 26px;
                    line-height: 40px;
                    color: #333;
                    overflow: hidden;
                }
                i {
                    font-style: normal;
                    font-size: 32px;
                    color: $red;
                }
            }
        }
    }
</style>
