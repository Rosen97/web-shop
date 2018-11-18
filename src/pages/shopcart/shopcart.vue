<template>
    <div class="shopcart-box">
        <header class="user-head">
            <i class="iconfont icon-left" @click="goBack"></i>
            <span>购物车</span>
            <i class="iconfont icon-More"></i>
        </header>
        <section class="shopcart-page">
            <div class="shopcart-list">
                <div class="shopcart-item" v-for="item in cartProductVoList" data-type="0" @click="showDetail($event,item.productId)">
                    <div class="shopcart-item-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd">
                        <div class="shopcart-item-select">
                            <i class="iconfont icon-duigou" data-selected="1" @click="selectProduct($event,item.productId)" v-if="item.productChecked"></i>
                            <i class="iconfont icon-weibiaoti38" data-selected="0" @click="selectProduct($event,item.productId)" v-else></i>
                        </div>
                        <img :src="imageHost + item.productMainImage" v-if="item.productMainImage" />
                        <img src="../../assets/product_default.jpg" v-else />
                        <div class="shopcart-item-info">
                            <p class="shopcart-name" v-text="item.productName"></p>
                            <p class="shopcart-subtitle" v-text="item.productSubtitle"></p>
                            <div class="shopcart-num">
                                <span class="shopcart-price" v-text="`￥${item.productPrice}`"></span>
                                <div class="shopcart-quantity">
                                    <i @click="reduceCount(item.productId,item.quantity,item.productStock)" :class="{'active' : item.quantity === 1}">-</i>
                                    <span>{{item.quantity}}</span>
                                    <i @click="addCount(item.productId,item.quantity)" :class="{'active' : item.quantity === item.productStock}">+</i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="delete" @click="deleteShopcart(item.productId)">删除</div>
                </div>
            </div>
            <div class="shopcart-footer">
                <div class="shopcart-item-select" @click="selectAll">
                    <i class="iconfont icon-duigou" v-if="allChecked === true && cartProductVoList.length"></i>
                    <i class="iconfont icon-weibiaoti38" v-else></i>
                    <span>全选</span>
                </div>
                <div class="shopcart-accounts">
                    <span>合计：<i v-text="`￥${cartTotalPrice}`"></i></span>
                    <button @click="settleAccounts" :class="{'active' : cartTotalPrice > 0}">结算</button>
                </div>
            </div>
        </section>
        <nav-bar></nav-bar>
    </div>
</template>

<script>
    import navBar from '../../components/navBar'
    import {
        checkLogin,
        cartList,
        selectProduct,
        unSelectProduct,
        selectAll,
        unSelectAll,
        deleteProduct,
        updateCartCount
    } from "../../service/getData";

    export default {
        components: {
            navBar
        },
        data() {
            return {
                imageHost: '',
                cartProductVoList: [],
                cartTotalPrice: 0,
                allChecked: false,
                startX: 0,
                endX: 0
            }
        },
        beforeCreate(){
            checkLogin().then((res)=>{
                if(res.status === 1){
                    this.$router.push('./login')
                    return
                }
            })
        },
        created(){
            this.getCartList()
        },
        methods: {
            async getCartList(){
                await cartList().then((res)=>{
                    console.log(res)
                    this.setConfig(res.imageHost,res.cartProductVoList,res.cartTotalPrice,res.allChecked)
                })
            },
            //取消/选中商品
            async selectProduct($event,id){
                let $selected = parseInt($event.currentTarget.getAttribute('data-selected'))
                if(!$selected){
                    await selectProduct(id).then((res)=>{
                        this.setConfig(res.imageHost,res.cartProductVoList,res.cartTotalPrice,res.allChecked)
                    })
                }else{
                    await unSelectProduct(id).then((res)=>{
                        this.setConfig(res.imageHost,res.cartProductVoList,res.cartTotalPrice,res.allChecked)
                    })
                }
                this.getCartList()
            },
            selectAll(){
                if(this.allChecked){
                    unSelectAll().then((res)=>{
                        this.setConfig(res.imageHost,res.cartProductVoList,res.cartTotalPrice,res.allChecked)
                    })
                }else{
                    selectAll().then((res)=>{
                        this.setConfig(res.imageHost,res.cartProductVoList,res.cartTotalPrice,res.allChecked)
                    })
                }
            },
            //增减商品数量
            addCount(id,num,stock){
                if(num === stock){  //数量不超过库存数
                    alert('超过该商品的库存量')
                    return
                }
                num ++
                updateCartCount(id,num).then((res)=>{
                    this.setConfig(res.imageHost,res.cartProductVoList,res.cartTotalPrice,res.allChecked)
                })
            },
            reduceCount(id,num){
                if(num === 1){   //数量最小为1
                    alert('该商品1件起售')
                    return
                }
                num --
                updateCartCount(id,num).then((res)=>{
                    this.setConfig(res.imageHost,res.cartProductVoList,res.cartTotalPrice,res.allChecked)
                })
            },
            showDetail(e,id){
                console.log(e.currentTarget.className)
                console.log(id)
            },
            setConfig(imageHost,cartProductVoList,cartTotalPrice,allChecked){
                this.imageHost = imageHost
                this.cartProductVoList = cartProductVoList
                this.cartTotalPrice = cartTotalPrice
                this.allChecked = allChecked
            },
            //滑动开始
            touchStart(e){
                // 记录初始位置
                this.startX = e.touches[0].clientX
            },
            //滑动结束
            touchEnd(e){
                let $element = e.currentTarget.parentElement
                this.endX = e.changedTouches[0].clientX
                if( $element.dataset.type == 0 && this.startX - this.endX > 30 ){
                    this.resetSlide()
                    $element.dataset.type = 1
                }
                // 右滑
                if( $element.dataset.type == 1 && this.startX - this.endX < -30 ){
                    this.resetSlide()
                    $element.dataset.type = 0
                }
                this.startX = 0;
                this.endX = 0;
            },
            //复位滑动状态
            resetSlide(){
                let listItems = document.querySelectorAll('.shopcart-item');
                // 复位
                for( let i = 0 ; i < listItems.length ; i++){
                    listItems[i].dataset.type = 0;
                }
            },
            deleteShopcart(id){
                deleteProduct(id).then((res)=>{
                    this.setConfig(res.imageHost,res.cartProductVoList,res.cartTotalPrice,res.allChecked)
                })
                this.resetSlide()
            },
            //结算
            settleAccounts(){
                if(!this.cartTotalPrice){
                    return
                }
                this.$router.push('/order')
            },
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" scoped="" type="text/scss">
    @import "../../common/style/mixin";
    .shopcart-box{
        background: #f7f7f7;
        padding-bottom: 10%;
        .user-head{
            @include fj;
            width: 100%;
            height: 88px;
            padding: 0 20px;
            line-height: 88px;
            font-size: 30px;
            @include boxSizing;
            border-bottom: 1px solid #dcdcdc;
            .iconfont{
                font-size: 44px;
            }
        }
        .shopcart-list{
            width: 100%;
            overflow: hidden;
            background: #f7f7f7;
            .shopcart-item{
                position: relative;
                -webkit-transition: all 0.2s;
                transition: all 0.2s;
                .shopcart-item-box{
                    display: flex;
                    margin-bottom: 20px;
                    padding: 20px 0;
                    background: #fff;
                    .shopcart-item-select{
                        width: 12%;
                        height: 180px;
                        line-height: 180px;
                        text-align: center;
                        .iconfont{
                            display: inline-block;
                            width: 100%;
                            height: 100%;
                            font-size: 40px;
                            &.icon-duigou{
                                color: $red;
                            }
                            &.icon-weibiaoti38{
                                color: #999;
                            }
                        }
                    }
                    img{
                        width: 180px;
                        height: 180px;
                    }
                    .shopcart-item-info{
                        width: 60%;
                        margin-left: 20px;
                        line-height: 40px;
                        .shopcart-name{
                            height: 80px;
                            overflow: hidden;
                        }
                        .shopcart-subtitle{
                            color: #999;
                            height: 40px;
                            overflow: hidden;
                        }
                        .shopcart-num{
                            @include fj;
                            padding-top: 10px;
                            font-size: 30px;
                            .shopcart-price{
                                color: $red;
                            }
                            .shopcart-quantity{
                                @include fj;
                                width: 210px;
                                height: 60px;
                                line-height: 60px;
                                color: #999;
                                background: #fff;
                                span{
                                    width: 80px;
                                    height: 100%;
                                    text-align: center;
                                    line-height: 60px;
                                    background: #F7F7F7;
                                }
                                i{
                                    width: 60px;
                                    height: 100%;
                                    text-align: center;
                                    line-height: 60px;
                                    font-style: normal;
                                    font-size: 50px;
                                    background: #F7F7F7;
                                    &.active{
                                        color: #dcdcdc;
                                    }
                                }
                            }
                        }
                    }
                }
                .delete{
                    position: absolute;
                    right: -260px;
                    top: 0;
                    width: 260px;
                    height: 220px;
                    text-align: center;
                    line-height: 220px;
                    font-size: 32px;
                    color: #fff;
                    background: red;
                    z-index: 1000;
                }
            }
        }
        .shopcart-footer{
            @include fj;
            position: fixed;
            left: 0;
            bottom: 100px;
            width: 100%;
            height: 100px;
            line-height: 100px;
            background: #fff;
            .shopcart-item-select{
                width: 150px;
                height: 100%;
                text-align: center;
                .iconfont{
                    display: inline-block;
                    height: 100%;
                    font-size: 40px;
                    &.icon-duigou{
                        color: $red;
                    }
                    &.icon-weibiaoti38{
                        color: #999;
                    }
                }
                span{
                    padding-left: 10px;
                    color: #666;
                }
            }
            .shopcart-accounts{
                height: 100%;
                span{
                    font-size: 30px;
                    i{
                        padding: 0 10px;
                        font-style: normal;
                        color: $red;
                    }
                }
                button{
                    width: 240px;
                    height: 100%;
                    text-align: center;
                    font-size: 30px;
                    color: #fff;
                    background: #DADADA;
                }
                button.active{
                    background: $red;
                }
            }
        }
    }
    .shopcart-item[data-type="0"]{
        transform: translate3d(0,0,0);
    }
    .shopcart-item[data-type="1"]{
        transform: translate3d(-260px,0,0);
    }
    .shopcart-item:after{
        content: " ";
        position: absolute;
        left: 0.2rem;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #ccc;
        color: #ccc;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        z-index: 2;
    }
</style>
