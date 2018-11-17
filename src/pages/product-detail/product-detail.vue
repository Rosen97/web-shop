<template>
    <div class="product-detail">
        <header class="detail-nav">
            <i class="iconfont icon-left-circle" @click="goBack"></i>
            <i class="iconfont icon-more1"></i>
        </header>
        <slider :imgUrl="subImageList" :imgHeight="700" class="detail-slider"></slider>
        <section class="detail-info">
            <p class="detail-info-name" v-text="categoryData.name"></p>
            <p class="detail-info-subtitle" v-text="categoryData.subtitle"></p>
            <div>
                <span class="detail-info-price" v-text="`￥${categoryData.price}`"></span>
                <span class="detail-info-stock" v-text="`库存${categoryData.stock}`"></span>
            </div>
        </section>
        <section>
            <div class="detail-content">
                <p class="detail-gap"></p>
                <ul>
                    <li>概述</li>
                    <li>参数</li>
                    <li>安装服务</li>
                    <li>常见问题</li>
                </ul>
                <div v-html="categoryData.detail"></div>
            </div>
            <div class="detail-cart">
                <router-link tag="div" to="/shopcart" class="detail-cart-left">
                    <i class="iconfont icon-gouwuche"></i>
                    <span>购物车</span>
                    <span class="cart-num" v-text="cartCount" v-show="cartCount"></span>
                </router-link>
                <div>
                    <button @click="addCart">加入购物车</button>
                    <button>立即购买</button>
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
                cartCount: 0
            }
        },
        created(){
            this.getDetail()
            this.getCartCount()
        },
        methods: {
            async getDetail(){
                let subImages = [],
                    imageHost = ''
                await productDetail(this.$route.params.id).then((res)=>{
                    console.log(res)
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
                    console.log(res)
                    this.cartCount = res
                })
            },
            async addCart(){
                await addCart(this.categoryData.id,1).then((res)=>{
                    console.log(res)
                })
                this.getCartCount()
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
            padding: 30px 20px;
            box-sizing: border-box;
            z-index: 1000;
            i{
                font-size: 50px;
                color: #000;
                opacity: 0.6;
            }
        }
        .detail-slider img{
            height: 700px;
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
                    color: $orange;
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
                p{
                    width: 100%;
                    font-size: 40px;
                    text-align: center;
                    img{
                        width: 100%;
                    }
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
            font-size: 30px;
            background: #fff;
            z-index: 1000;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            .detail-cart-left{
                position: relative;
                display: flex;
                flex-direction: column;
                width: 100px;
                font-size: 26px;
                text-align: center;
                i{
                    font-size: 40px;
                }
                .cart-num{
                    position: absolute;
                    top: -4px;
                    right: 10px;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    color: #fff;
                    font-size: 24px;
                    background: $orange;
                    z-index: 100;
                }
            }
            div{
                button{
                    width: 260px;
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
