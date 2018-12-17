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
            <p class="detail-info-name" v-text="productData.name"></p>
            <p class="detail-info-subtitle" v-text="productData.subtitle"></p>
            <div>
                <span class="detail-info-price" v-text="`￥${productData.price}`"></span>
                <span class="detail-info-stock" v-text="`库存${productData.stock}`"></span>
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
                <div v-html="productData.detail"></div>
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
        <transition name="fade">
            <div class="modal" @click="closeCart" v-show="cartShow"></div>
        </transition>
        <transition name="slide-up">
            <section class="cart-wrap" v-show="cartShow">
                <div class="cart-content">
                    <div class="cart-head">
                        <img :src="subImageList[0].imgUrl" v-if="subImageList.length > 0">
                        <div>
                            <span class="price">￥{{productData.price}}</span>
                            <p>{{productData.name}}</p>
                        </div>
                        <i class="iconfont icon-close" @click="closeCart"></i>
                    </div>
                    <div class="cart-config">
                        <div class="subtitle">
                            <span>商品介绍</span>
                            <span>{{productData.subtitle}}</span>
                        </div>
                    </div>
                    <div class="cart-count">
                        <span>数量</span>
                        <div class="cart-quantity">
                            <i @click="reduceCount" :class="{'active' : productCount === 1}">-</i>
                            <span>{{productCount}}</span>
                            <i @click="addCount" :class="{'active' : productCount === productData.stock}">+</i>
                        </div>
                    </div>
                    <button class="add-cart" @click="confirmCart">确认</button>
                </div>
            </section>
        </transition>
        <!--<framework v-show="frameShow"></framework>-->
    </div>
</template>

<script>
    import framework from 'components/common/frame'
    import slider from 'components/common/slider'
    import {productDetail, cartCount, addCart} from "../../service/getData";
    import {mapState, mapMutations} from 'vuex'

    export default {
        data() {
            return {
                subImageList: [],
                productData: {},
                productCount:1,
                cartCount: 0,
                navIndex: 0,    //导航索引
                isLoved: false,
                cartShow: false,
                frameShow: true
            }
        },
        computed: {
            ...mapState({
                followList: state => state.followList
            })
        },
        created() {
            this.getDetail()
            this.getCartCount()
        },
        mounted() {
            this.$nextTick(function () {
                window.addEventListener('scroll', this.pageScroll)
                setTimeout(()=>{
                    this.frameShow = false
                },800)
            })
        },
        methods: {
            ...mapMutations([
                'ADD_FOLLOW',
                'REDUCE_FOLLOW'
            ]),
            //商品详情
            async getDetail() {
                let subImages = [],
                    imageHost = ''
                await productDetail(this.$route.params.id).then((res) => {
                    console.log(res)
                    subImages = res.data.subImages.split(',')
                    imageHost = res.data.imageHost
                    this.productData = res.data
                })
                subImages.forEach((item) => {
                    this.subImageList.push({
                        imgUrl: imageHost + item
                    })
                })
            },
            getCartCount() {
                cartCount().then((res) => {
                    // console.log(res)
                    this.cartCount = res.data
                })
            },
            addCart() {
                this.cartShow = true
                ModalHelper.afterOpen()
            },
            addCount(){
                if(this.productCount === this.productData.stock){
                    return
                }
                this.productCount ++

            },
            reduceCount(){
                if(this.productCount === 1){
                    return
                }
                this.productCount --
            },
            //加入购物车
            async confirmCart(){
                await addCart(this.productData.id,this.productCount).then((res)=>{
                    // do nothing
                })
                this.getCartCount()
                this.closeCart()
            },
            closeCart() {
                this.cartShow = false
                ModalHelper.beforeClose()
            },
            scrollToView(e) {
                let $type = e.target.getAttribute('data-type')
                switch ($type) {
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
            pageScroll() {
                // let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

            },
            //喜欢
            lightLove() {
                this.isLoved = true
                this.followList.unshift(this.productData)
                this.ADD_FOLLOW(this.followList)
            },
            //取消喜欢
            cancelLove() {
                this.isLoved = false
                this.REDUCE_FOLLOW('reduce', this.productData.id)
            },
            goBack() {
                this.$router.go(-1)
            }
        },
        components: {
            framework,
            slider
        },
    }
</script>

<style lang="scss" type="text/scss">
    @import '../../common/style/mixin';

    .product-detail {
        width: 100%;
        &.active {
            background: rgba(0, 0, 0, .6);
        }
        .detail-nav {
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
            i {
                font-size: 50px;
                color: #000;
            }
            div span {
                padding: 0 20px;
                font-size: 28px;
                &.active {
                    color: $red;
                }
                .iconfont {
                    padding-right: 8px;
                    font-size: 28px;
                    color: $red;
                }
            }
        }
        .detail-slider img {
            height: 700px;
        }
        .product-focus {
            margin-top: 88px;
        }
        .detail-info {
            width: 100%;
            padding: 20px 30px;
            font-size: 30px;
            box-sizing: border-box;
            .detail-info-name {
                font-size: 40px;
                color: #333;
            }
            .detail-info-subtitle {
                padding: 10px 0;
                font-size: 28px;
                color: #999;
            }
            div {
                @include fj;
                padding: 10px 0;
                font-size: 32px;
                color: #999;
                .detail-info-price {
                    color: $red;
                    font-size: 44px;
                }
            }
        }
        .detail-content {
            width: 100%;
            .detail-gap {
                width: 100%;
                height: 20px;
                background: #eee;
            }
            ul {
                @include fj;
                width: 100%;
                margin: 20px 0;
                li {
                    flex: 1;
                    padding: 10px 0;
                    text-align: center;
                    font-size: 30px;
                    border-right: 1px solid #999;
                    box-sizing: border-box;
                    &:last-child {
                        border-right: none;
                    }
                }
            }
            div {
                width: 100%;
                overflow: hidden;
                p {
                    width: 100%;
                    font-size: 40px;
                    text-align: center;
                }
                img {
                    width: 100%;
                }
            }
        }
        .detail-cart {
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
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
            @include boxSizing;
            .detail-cart-left {
                @include fj;
                width: 46%;
                padding: 0 30px;
                @include boxSizing;
                .like {
                    width: 40%;
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    .iconfont {
                        font-size: 34px;
                        line-height: 60px;
                        color: #000000;
                        font-weight: bold;
                        &.icon-love {
                            color: $red;
                        }
                    }
                    span {
                        line-height: 30px;
                        font-size: 26px;
                    }
                }
                .cart {
                    @extend .like;
                    position: relative;
                    .cart-num {
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
                    .iconfont {
                        font-size: 40px;
                        font-weight: normal;
                    }
                }
            }
            .detail-cart-right {
                width: 54%;
                button {
                    width: 100%;
                    height: 100px;
                    color: #fff;
                    font-size: 30px;
                    background: $red;
                    &:nth-child(1) {
                        margin-right: -10px;
                        background: rgba(246,53,21,.9);
                    }
                }
            }
        }
        .modal{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            background: rgba(0,0,0,.6);
        }
        .cart-wrap {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 60%;
            z-index: 99999999;
            .cart-content {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                font-size: 30px;
                background: #fff;
                .cart-head {
                    display: flex;
                    width: 100%;
                    padding: 30px;
                    @include boxSizing;
                    img {
                        width: 180px;
                        height: 180px;
                        margin-top: -60px;
                        border: 1px solid #999;
                    }
                    div {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        width: 64%;
                        margin-left: 20px;
                        .price {
                            display: block;
                            font-size: 34px;
                            color: $red;
                            padding-bottom: 10px;
                        }
                        p {
                            max-height: 40px;
                            overflow: hidden;
                        }
                    }
                    .iconfont {
                        position: absolute;
                        top: 30px;
                        right: 30px;
                        font-size: 28px;
                        color: #dcdcdc;
                    }
                }
                .cart-config {
                    @extend .cart-head;
                    padding: 0 30px 30px 30px;
                    .subtitle {
                        width: 100%;
                        margin-left: 0;
                        padding: 20px 0;
                        span {
                            &:first-child {
                                color: #999;
                                padding-bottom: 20px;
                            }
                        }
                    }
                }
                .cart-count {
                    @include fj;
                    width: 100%;
                    padding: 0 30px 30px 30px;
                    @include boxSizing;
                    .cart-quantity {
                        @include fj;
                        width: 210px;
                        height: 60px;
                        line-height: 60px;
                        color: #999;
                        background: #fff;
                        span {
                            width: 80px;
                            height: 100%;
                            text-align: center;
                            line-height: 60px;
                            background: #F7F7F7;
                        }
                        i {
                            width: 60px;
                            height: 100%;
                            text-align: center;
                            line-height: 60px;
                            font-style: normal;
                            font-size: 50px;
                            background: #F7F7F7;
                            &.active {
                                color: #dcdcdc;
                            }
                        }
                    }
                }
                .add-cart {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 100px;
                    text-align: center;
                    line-height: 100px;
                    color: #fff;
                    font-size: 30px;
                    background: $red;
                }
            }
        }
        .slide-up-enter-active, .slide-up-leave-active {
            transition: all 0.5s;
        }
        .slide-up-enter, .slide-up-leave-to {
            transform: translate3d(0, 100%, 0);
        }
    }
</style>
