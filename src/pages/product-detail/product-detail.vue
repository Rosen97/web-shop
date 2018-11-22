<template>
    <div class="product-detail">
        <header class="detail-nav">
            <i class="iconfont icon-left" @click="goBack"></i>
            <div class="nav-list">
                <span :class="{'active' : navIndex === 0}" data-type="product" @click="scrollToView($event)">
                    <i class="iconfont icon-location" v-show="navIndex === 0"></i>商品
                </span>
                <span data-type="detail" @click="scrollToView($event)" :class="{'active' : navIndex === 1}">
                    <i class="iconfont icon-location" v-show="navIndex === 1"></i>商品详情
                </span>
                <span data-type="recommend" @click="scrollToView($event)" :class="{'active' : navIndex === 2}">
                    <i class="iconfont icon-location" v-show="navIndex === 2"></i>商品推荐
                </span>
            </div>
            <i class="iconfont icon-More"></i>
        </header>
        <section class="product-focus">
            <slider :imgUrl="subImageList" :imgHeight="700" class="detail-slider"></slider>
        </section>
        <section class="detail-info">
            <p class="detail-info-name" v-text="categoryData.name"></p>
            <p class="detail-info-subtitle" v-text="categoryData.subtitle"></p>
            <div>
                <span class="detail-info-price" v-text="`￥${categoryData.price}`"></span>
                <span class="detail-info-stock" v-text="`库存${categoryData.stock}`"></span>
            </div>
        </section>
        <section>
            <div class="detail-content" ref="detailContent" id="content">
                <p class="detail-gap"></p>
                <ul>
                    <li>概述</li>
                    <li>参数</li>
                    <li>安装服务</li>
                    <li>常见问题</li>
                </ul>
                <div v-html="categoryData.detail"></div>
            </div>
            <div ref="detailRecommend" id="recommend">
            </div>
            <div class="detail-cart">
                <div class="detail-cart-left">
                    <div class="like">
                        <i @click="lightLove" v-if="!isLoved" class="iconfont icon-lovetaoxin"></i>
                        <i @click="cancelLove" v-else class="iconfont icon-love"></i>
                        <span>喜欢</span>
                    </div>
                    <router-link tag="div" to="/shopcart" class="cart">
                        <i class="iconfont icon-gouwuche"></i>
                        <span>购物车</span>
                        <span class="cart-num" v-text="cartCount" v-show="cartCount"></span>
                    </router-link>
                </div>
                <div class="detail-cart-right">
                    <button @click="addCart">加入购物车</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import slider from 'components/common/slider'
    import { productDetail,cartCount,addCart } from "../../service/getData";

    export default {
        components: {
            slider
        },
        data() {
            return {
                subImageList: [],
                categoryData: {},
                cartCount: 0,
                navIndex: 0,    //导航索引
                isLoved: false
            }
        },
        created(){
            this.getDetail()
            this.getCartCount()
        },
        mounted(){
            this.$nextTick(function(){
                window.addEventListener('scroll',this.pageScroll)
            })
        },
        methods: {
            async getDetail(){
                let subImages = [],
                    imageHost = ''
                await productDetail(this.$route.params.id).then((res)=>{
                    // console.log(res)
                    subImages = res.subImages.split(',')
                    imageHost = res.imageHost
                    this.categoryData = res
                })
                subImages.forEach((item)=>{
                    this.subImageList.push({
                        imgUrl: imageHost + item
                    })
                })
            },
            getCartCount(){
                cartCount().then((res)=>{
                    // console.log(res)
                    this.cartCount = res
                })
            },
            async addCart(){
                await addCart(this.categoryData.id,1).then((res)=>{
                    // console.log(res)
                })
                this.getCartCount()
            },
            scrollToView(e){
                let $type = e.target.getAttribute('data-type')
                switch($type){
                    case 'product':
                        this.navIndex = 0
                        break
                    case 'detail':
                        this.navIndex = 1
                        break
                    case 'recommend':
                        this.navIndex = 2
                        break
                }
                document.documentElement.scrollTop = document.querySelector('#content').offsetTop
                // console.log($type)
                // console.log(document.querySelector('#content').offsetTop)
                // console.log(document.querySelector('#recommend').offsetTop)
            },
            //监听页面滚动
            pageScroll(){
                // let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

            },
            lightLove(){
                this.isLoved = true
            },
            cancelLove(){
                this.isLoved = false
            },
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" type="text/scss">
    @import '../../common/style/mixin';
    .product-detail{
        width: 100%;
        .detail-nav{
            @include fj;
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 88px;
            padding: 0 20px;
            line-height: 88px;
            box-sizing: border-box;
            z-index: 1000;
            color: #252525;
            background: #fff;
            border-bottom: 1px solid #dcdcdc;
            i{
                font-size: 50px;
                color: #000;
            }
            div span{
                padding: 0 20px;
                font-size: 28px;
                &.active{
                    color: $red;
                }
                .iconfont{
                    padding-right: 8px;
                    font-size: 28px;
                    color: $red;
                }
            }
        }
        .detail-slider img{
            height: 700px;
        }
        .product-focus{
            margin-top: 88px;
        }
        .detail-info{
            width: 100%;
            padding: 20px 30px;
            font-size: 30px;
            box-sizing: border-box;
            .detail-info-name{
                font-size: 40px;
                color: #333;
            }
            .detail-info-subtitle{
                padding: 10px 0;
                font-size: 28px;
                color: #999;
            }
            div{
                @include fj;
                padding: 10px 0;
                font-size: 32px;
                color: #999;
                .detail-info-price{
                    color: $red;
                    font-size: 44px;
                }
            }
        }
        .detail-content{
            width: 100%;
            .detail-gap{
                width: 100%;
                height: 20px;
                background: #eee;
            }
            ul{
                @include fj;
                width: 100%;
                margin: 20px 0;
                li{
                    flex: 1;
                    padding: 10px 0;
                    text-align: center;
                    font-size: 30px;
                    border-right: 1px solid #999;
                    box-sizing: border-box;
                    &:last-child{
                        border-right: none;
                    }
                }
            }
            div{
                width: 100%;
                overflow: hidden;
                p{
                    width: 100%;
                    font-size: 40px;
                    text-align: center;
                }
                img{
                    width: 100%;
                }
            }
        }
        .detail-cart{
            @include fj;
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 100px;
            line-height: 100px;
            font-size: 30px;
            background: #FEFBF9;
            z-index: 1000;
            @include boxSizing;
            .detail-cart-left{
                @include fj;
                width: 46%;
                padding: 0 30px;
                @include boxSizing;
                .like{
                    width: 40%;
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    .iconfont{
                        font-size: 34px;
                        line-height: 60px;
                        color: #000000;
                        font-weight: bold;
                        &.icon-love{
                            color: $red;
                        }
                    }
                    span{
                        line-height: 30px;
                        font-size: 26px;
                    }
                }
                .cart{
                    @extend .like;
                    position: relative;
                    .cart-num{
                        position: absolute;
                        right: 20px;
                        top: 0;
                        width: 30px;
                        height: 30px;
                        text-align: center;
                        line-height: 30px;
                        color: #fff;
                        font-size: 22px;
                        background: $red;
                        @include borderRadius(50%);
                    }
                    .iconfont{
                        font-size: 40px;
                        font-weight: normal;
                    }
                }
            }
            .detail-cart-right{
                width: 54%;
                button{
                    width:100%;
                    height: 100px;
                    color: #fff;
                    font-size: 30px;
                    background: $red;
                    &:nth-child(1){
                        margin-right: -10px;
                        background: $orange;
                    }
                }
            }
        }
    }
</style>
