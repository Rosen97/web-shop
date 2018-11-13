<template>
    <div class="order-wrap">
        <div class="order-header" ref="orderHeader">
            <div class="header-top">
                <i class="iconfont icon-left" @click="goBack"></i>
                <span>订单配送至</span>
            </div>
            <router-link tag="div" to="/user/shipping" class="order-shipping" v-if="shippingId">
                <p class="user-info" v-text="`${shippingInfo.receiverName}  ${shippingInfo.receiverMobile
}`"></p>
                <p class="user-address" v-text="`${shippingInfo.receiverCity} ${shippingInfo.receiverAddress}`"></p>
                <i class="iconfont icon-right"></i>
            </router-link>
            <router-link tag="div" to="/user/shipping" class="add-shipping" v-else>
                新增收货地址
                <i class="iconfont icon-right"></i>
            </router-link>
        </div>
        <div class="order-content" ref="orderContent">
            <div class="order-info">
                <div class="order-item order-images" @click="showCategoryList">
                    <div class="order-item-left">
                        <img :src="imageHost+item.productMainImage" v-for="item in orderList" v-if="item.productMainImage" />
                    </div>
                    <div class="order-item-right">
                        <span v-text="`共${orderList.length}件`"></span>
                        <i class="iconfont icon-right"></i>
                    </div>
                </div>
                <div class="order-item">
                    <div class="order-item-left">
                        商品总价
                    </div>
                    <div class="order-item-right" v-text="`￥ ${cartTotalPrice}`"></div>
                </div>
                <div class="order-item">
                    <div class="order-item-left">
                        运费
                    </div>
                    <div class="order-item-right">
                        包邮
                    </div>
                </div>
                <div class="order-item">
                    <div class="order-item-left">
                        优惠券
                    </div>
                    <div class="order-item-right">
                        无可用
                    </div>
                </div>
                <div class="order-item small-total">
                    <div class="order-item-left">
                        小计
                    </div>
                    <div class="order-item-right" v-text="`￥ ${cartTotalPrice}`"></div>
                </div>
            </div>
        </div>
        <div class="order-footer">
            <div>
                <span v-text="`共${orderList.length}件，应付金额：`"></span>
                <i v-text="`￥${cartTotalPrice}`"></i>
            </div>
            <button @click="goPayment">去付款</button>
        </div>
        <transition name="fade-out">
            <div v-show="categoryWrap" class="order-top-modal" ref="orderTopModal"></div>
        </transition>
        <transition name="slide-up">
            <div class="category-list" ref="orderContent" v-show="categoryWrap">
                <div class="category-list-top">
                    <p>商品清单</p>
                    <span>共2件</span>
                </div>
                <div class="category-list-con">
                    <div class="category-item" v-for="item in orderList">
                        <img :src="imageHost+item.productMainImage" />
                        <div class="category-info">
                            <div class="category-info-top">
                                <span v-text="item.productName"></span>
                                <span v-text="`￥${item.productPrice}`"></span>

                            </div>
                            <div class="category-info-bottom">
                                <span v-text="item.productSubtitle"></span>
                                <span v-text="`X ${item.quantity}`"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <button @click="closeCategorList">确定</button>
            </div>
        </transition>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
        data() {
            return {
                shippingList:[],
                shippingInfo: {},
                orderList: [],
                imageHost: '',
                cartTotalPrice: 0,
                categoryWrap: false
            }
        },
        computed: {
            ...mapState({
                shippingId: state => state.shippingId
            })
        },
        created(){
            if(!this.shippingId){
                this.getShippingId()
            }else{
                this.getAddress()
            }
            this.getOrderList()
        },
        mounted(){
            this.setOrderContentHeight()
        },
        methods: {
            ...mapMutations([
                'RECORD_SHIPPINGID'
            ]),
            getShippingId(){
                this.$http('/api/shipping/list.do',{
                    pageNum: 1,
                    pageSize: 10
                },'POST').then((res)=>{
                    if(res.list.length){
                        this.shippingList = res.list
                        this.RECORD_SHIPPINGID(res.list[0].id)
                        this.getAddress()
                    }
                })
            },
            getAddress(){
                console.log(this.shippingList)
                this.$http('/api/shipping/select.do',{
                    shippingId: this.shippingId
                },'POST').then((res)=>{
                    this.shippingInfo = res
                })
            },
            getOrderList(){
                this.$http('/api/cart/list.do',{},'POST').then((res)=>{
                    this.imageHost = res.imageHost
                    this.cartTotalPrice = res.cartTotalPrice
                    res.cartProductVoList.forEach((item)=>{
                        if(item.productChecked){
                            this.orderList.push(item)
                        }
                    })
                })
            },
            setOrderContentHeight() {
                let $screenHeight = document.documentElement.clientHeight,
                    $orderHeaderHeight = this.$refs.orderHeader.clientHeight
                this.$refs.orderTopModal.style.height = $orderHeaderHeight + 'px'
                this.$refs.orderContent.style.height = $screenHeight - $orderHeaderHeight + 'px'
            },
            showCategoryList(){
                this.categoryWrap = true
            },
            closeCategorList(){
                this.categoryWrap = false
            },
            //去付款
            goPayment(){
                this.$http('/api/order/create.do',{
                    shippingId: this.shippingId
                },'POST').then((res)=>{
                    this.$router.push('/payment/'+res.orderNo)
                })
            },
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/style/mixin';
    .order-wrap{
        width: 100%;
        background: $orange;
        .order-header{
            width: 100%;
            font-size: 36px;
            padding: 20px 30px;
            box-sizing: border-box;
            .header-top{
                position: relative;
                width: 100%;
                height: 80px;
                text-align: center;
                line-height: 80px;
                color: #fff;
                font-size: 36px;
                .iconfont{
                    position: absolute;
                    left: 0;
                    top: 0;
                    font-size: 50px;
                    color: #DADADA;
                }
            }
            .order-shipping{
                position: relative;
                width: 100%;
                padding: 30px 0;
                color: #fff;
                .user-address{
                    padding-top: 10px;
                    font-size: 30px;
                }
                .iconfont{
                    position: absolute;
                    right: 0;
                    top: 60px;
                    font-size: 30px;
                    color: #DADADA;
                }
            }
            .add-shipping{
                height: 40px;
                padding: 60px 0;
                line-height: 40px;
                color: #fff;
                .iconfont{
                    font-size: 30px;
                    color: #DADADA;
                }
            }
        }
        .order-content{
            width: 100%;
            font-size: 34px;
            background: #eee;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            .order-item{
                @include fj;
                width: 100%;
                padding: 20px 30px;
                box-sizing: border-box;
                @include border-1px(#dcdcdc);
                background: #fff;
                &.order-images{
                    height: 140px;
                    line-height: 100px;
                    .order-item-left{
                        max-width: 70%;
                        overflow: hidden;
                    }
                    .iconfont{
                        font-size: 34px;
                        color: #999;
                    }
                }
                &.small-total{
                    color: $orange;
                    border-bottom: none;
                }
                img{
                    display: inline-block;
                    width: 100px;
                    height: 100px;
                    margin: 0 5px;
                }
            }
        }
        .order-footer{
            @include fj;
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            padding: 0 20px;
            height: 100px;
            line-height: 100px;
            font-size: 34px;
            z-index: 100;
            background: #fff;
            box-sizing: border-box;
            div i{
                font-style: normal;
                color: $orange;
            }
            button{
                width: 200px;
                height: 70px;
                margin: 15px 0;
                color: #fff;
                font-size: 30px;
                background: $orange;
                border-radius: 40px;
            }
        }
        .order-top-modal{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            z-index: 1000;
            background: rgba(0,0,0,.3);
        }
        .category-list{
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            background: #fff;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            z-index: 1000;
            .category-list-top{
                width: 100%;
                height: 100px;
                padding: 20px 0;
                text-align: center;
                box-sizing: border-box;
                p{
                    font-size: 34px;
                }
                span{
                    padding-top: 10px;
                    font-size: 26px;
                    color: #999;
                }
            }
            .category-list-con{
                width: 100%;
                height: 70%;
                margin-top: 40px;
                overflow-y: scroll;
                .category-item{
                    @include fj;
                    width: 100%;
                    height: 160px;
                    padding: 20px;
                    box-sizing: border-box;
                    @include border-1px(#dcdcdc);
                    img{
                        width: 160px;
                        height: 100px;
                    }
                    .category-info{
                        flex: 4;
                        display: flex;
                        flex-direction: column;
                        padding: 0 0 20px 20px;
                        box-sizing: border-box;
                        .category-info-top{
                            @include fj;
                            width: 100%;
                            span{
                                flex: 3;
                                height: 40px;
                                overflow: hidden;
                            }
                            span:nth-child(2){
                                flex: 1;
                                text-align: right;
                            }
                        }
                        .category-info-bottom{
                            @include fj;
                            width: 100%;
                            padding-top: 20px;
                            color: #999;
                            font-size: 26px;
                            span{
                                flex: 3;
                                height: 40px;
                                overflow: hidden;
                            }
                            span:nth-child(2){
                                flex: 1;
                                text-align: right;
                            }
                        }
                    }
                }
            }
            button{
                position: fixed;
                left: 0;
                bottom: 20px;
                width: 90%;
                height: 60px;
                margin: 0 5%;
                text-align: center;
                line-height: 60px;
                color: #fff;
                font-size: 30px;
                background: $orange;
                border-radius: 40px;
            }
        }
    }
    .slide-up-enter-active,.slide-up-leave{
        transition: all 0.5s;
    }
    .slide-up-enter,.slide-up-leave-to{
        transform: translate3d(0,100%,0);
    }
</style>
