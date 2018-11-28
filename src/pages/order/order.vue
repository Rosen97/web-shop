<template>
    <div class="order-wrap">
        <header class="order-head">
            <i class="iconfont icon-left" @click="goBack"></i>
            <span>提交订单
            </span>
        </header>
        <loading v-show="isLoading" :loading-type="2"></loading>
        <section v-show="!isLoading">
            <div class="order-shipping" :class="{'fixed' : shippingFixed}">
                <router-link tag="div" class="shipping-info" to="./shipping">
                    <div class="info" v-if="!shippingEmpty">
                        <p>
                            <span class="name">{{shippingInfo.receiverName}}</span>
                            <span class="phone">{{shippingInfo.receiverMobile}}</span>
                        </p>
                        <div>
                            <span>{{shippingInfo.receiverProvince}}{{shippingInfo.receiverCity}}{{shippingInfo.receiverAddress}}</span>
                            <i class="iconfont icon-right"></i>
                        </div>
                    </div>
                    <div class="empty" v-else>
                        新增收货地址<i class="iconfont icon-right"></i>
                    </div>
                </router-link>
                <img src="../../assets/shipping-bottom.png" />
            </div>
            <div class="order-list">
                <div class="order-item" v-for="item in orderList">
                    <img :src="imageHost+item.productMainImage">
                    <div class="product-info">
                        <p class="name">{{item.productName}}</p>
                        <p class="subtitle">{{item.productSubtitle}}</p>
                        <div>
                            <span class="price">￥ {{item.productPrice}}</span>
                            <span class="quantity">X {{item.quantity}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="order-payment">
                <div>
                    <p>
                        <span>商品金额</span>
                        <span>￥ {{cartTotalPrice}}</span>
                    </p>
                    <p>
                        <span>运费</span>
                        <span>+ ￥0.00</span>
                    </p>
                </div>
                <div class="total-price">
                    总价：<span>￥{{cartTotalPrice}}</span>
                </div>
                <button class="payment" @click="goPayment" ref="submitButton">在线支付</button>
            </div>
        </section>
    </div>
</template>

<script>
    import loading from '../../components/common/loading'
    import {mapState, mapMutations} from 'vuex'
    export default {
        data() {
            return {
                shippingList:[],
                shippingInfo: {},
                orderList: [],
                imageHost: '',
                cartTotalPrice: 0,
                shippingFixed: false,
                categoryWrap: false,
                shippingEmpty: false,
                isLoading: true
            }
        },
        computed:{
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
            this.$nextTick(()=>{
                this.calculateHeight()
                setTimeout(()=>{
                    this.isLoading = false
                },500)
            })
        },
        methods: {
            ...mapMutations([
                'RECORD_SHIPPINGID'
            ]),
            calculateHeight(){
                let screenHeight = document.documentElement.clientHeight,
                    wrapHeight = document.querySelector('.order-wrap').clientHeight
                console.log(111)
                console.log(screenHeight)
                console.log(wrapHeight)
            },
            getShippingId(){
                this.$http('/api/shipping/list.do',{
                    pageNum: 1,
                    pageSize: 10
                },'POST').then((res)=>{
                    if(res.data.list.length){
                        this.shippingEmpty = false
                        this.shippingList = res.data.list
                        this.RECORD_SHIPPINGID(res.data.list[0].id)
                        this.getAddress()
                    }else{
                        this.shippingEmpty = true
                    }
                })
            },
            getAddress(){
                console.log(this.shippingList)
                this.$http('/api/shipping/select.do',{
                    shippingId: this.shippingId
                },'POST').then((res)=>{
                    this.shippingInfo = res.data
                    console.log(res)
                })
            },
            getOrderList(){
                this.$http('/api/cart/list.do',{},'POST').then((res)=>{
                    this.imageHost = res.data.imageHost
                    this.cartTotalPrice = res.data.cartTotalPrice
                    res.data.cartProductVoList.forEach((item)=>{
                        if(item.productChecked){
                            this.orderList.push(item)
                        }
                    })
                })
            },
            //去付款
            goPayment(){
                this.$http('/api/order/create.do',{
                    shippingId: this.shippingId
                },'POST').then((res)=>{
                    this.$router.push('/payment?orderNo='+res.data.orderNo)
                })
            },
            goBack(){
                this.$router.go(-1)
            }
        },
        components: {
            loading
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/style/mixin';
    .order-wrap{
        background: #f7f7f7;
        .order-head{
            position: relative;
            width: 100%;
            height: 88px;
            text-align: center;
            line-height: 88px;
            padding: 0 20px;
            font-size: 34px;
            @include boxSizing;
            background: #f8f8f8;
            .iconfont {
                position: absolute;
                left: 20px;
                top: 0;
                font-size: 50px;
                font-weight: bold;
            }
        }
        .order-shipping{
            display: flex;
            flex-direction: column;
            width: 100%;
            background: #FFFFFF;
            &.fixed{
                position: fixed;
                left: 0;
                top: 0;
                background: #fff;
                z-index: 10000000;
            }
            .shipping-info{
                width: 100%;
                padding: 20px;
                @include boxSizing;
                .empty{
                    display: block;
                    font-size: 40px;
                    padding: 10px 0;
                    .iconfont{
                        padding-left: 20px;
                        font-size: 30px;
                    }
                }
                .info{
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    font-size: 30px;
                    padding: 10px 0 0 0;
                    p{
                        display: flex;
                        width: 100%;
                        padding-bottom: 20px;
                        font-weight: bold;
                        span:last-child{
                            padding-left: 20px;
                        }
                    }
                    div{
                        @include fj;
                        span{
                            width: 90%;
                        }
                        .iconfont{
                            font-size: 34px;
                            color: #999;
                            font-weight: bold;
                        }
                    }
                }
            }
            img{
                width: 100%;
                height: 14px;
            }
        }
        .order-list{
            width: 100%;
            margin-top: 40px;
            padding: 20px 0 360px 0;
            background: #f7f7f7;
            .order-item{
                @include fj;
                width: 100%;
                padding: 20px;
                margin-bottom: 20px;
                background: #fff;
                @include boxSizing;
                img{
                    width: 180px;
                    height: 180px;
                }
                .product-info{
                    position: relative;
                    width: 70%;
                    .name{
                        width: 100%;
                        max-height: 80px;
                        font-size: 30px;
                        font-weight: bold;
                        overflow: hidden;
                    }
                    .subtitle{
                        padding: 8px 0;
                        color: #999;
                    }
                    div{
                        @include fj;
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        margin-top: 20px;
                        .price{
                            font-size: 30px;
                            color: $red;
                        }
                        .quantity{
                            color: #999;
                        }
                    }
                }
            }
        }
        .order-payment{
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            padding: 20px;
            font-size: 30px;
            @include boxSizing;
            z-index: 10000;
            background: #fff;
            p{
                @include fj;
                width: 100%;
                margin-bottom: 20px;
                span:nth-child(2){
                    color: $red;
                }
            }
            .total-price{
                width: 100%;
                text-align: right;
                font-size: 32px;
                font-weight: bold;
                span{
                    color: $red;
                    font-size: 34px;
                    font-weight: normal;
                }
            }
            button{
                width: 100%;
                height: 92px;
                margin: 30px 0;
                color: #fff;
                font-size: 30px;
                background: #3884FF;
                @include borderRadius(10px);
            }
        }
    }
</style>
