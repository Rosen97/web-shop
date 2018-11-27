<template>
    <div class="order">
        <header class="user-head">
            <i class="iconfont icon-left" @click="goBack"></i>
            <span>订单详情</span>
            <i class="iconfont icon-More"></i>
        </header>
        <section class="order-info">
            <div>
                <p>订单状态：<span class="order-status">{{orderInfo.statusDesc}}</span></p>
                <p>订单编号：<span>{{orderInfo.orderNo}}</span></p>
                <p>下单时间：<span>{{orderInfo.createTime}}</span></p>
            </div>
            <button class="pay-order" @click="goPayment" v-show="orderInfo.status === 10">去支付</button>
            <button class="cancel-order" @click="cancelOrder" v-show="orderInfo.status === 10">取消订单</button>
        </section>
        <section class="user-info">
            <div>商品金额：<span>￥ {{orderInfo.payment}}</span></div>
            <div v-if="orderInfo.shippingVo">收货地址：<span>{{orderInfo.shippingVo.receiverProvince}}{{orderInfo.shippingVo.receiverCity}}{{orderInfo.shippingVo.receiverAddress}}</span></div>
            <div v-if="orderInfo.shippingVo">收货人：<span>{{orderInfo.shippingVo.receiverName}} {{orderInfo.shippingVo.receiverMobile}}</span></div>
            <div>配送方式：<span>普通快递</span></div>
        </section>
        <section class="product-list">
            <div class="product-item" v-for="item in orderInfo.orderItemVoList">
                <img :src="orderInfo.imageHost+item.productImage" >
                <div>
                    <p>{{item.productName}}</p>
                    <span>￥ {{item.totalPrice}}</span>
                </div>
                <span class="product-price">
                    <i>￥{{item.currentUnitPrice}}</i>
                    <i>x{{item.quantity}}</i>
                </span>
            </div>
        </section>
        <popup :popup-title="popupTitle"
               :popup-show="popupShow"
               @cancelPopup="cancelPopup"
               @confirmPopup="confirmPopup"></popup>
    </div>
</template>

<script>
    import popup from '../../components/common/popup'
    import {getUrlKey} from "../../common/js/util";
    import {orderDetail,cancelOrder} from "../../service/getData";

    export default {
        data() {
            return {
                orderNo: '',
                orderInfo: {},
                popupTitle: '',
                popupShow: false
            }
        },
        created() {
            let $orderNo = getUrlKey('orderNo')
            this.orderNo = $orderNo
            this.init()
        },
        methods: {
            init(){
                orderDetail(this.orderNo).then((res)=>{
                    console.log(res)
                    this.orderInfo = res.data
                })
            },
            //去支付
            goPayment(){
                this.$router.push('./payment?orderNo='+this.orderNo)
            },
            //取消订单
            cancelOrder(){
                ModalHelper.afterOpen()
                this.popupTitle = '确认删除改订单吗？'
                this.popupShow = true
                // if(confirm('确定取消订单吗？')){
                //     cancelOrder(this.orderNo).then((res)=>{
                //         console.log(res)
                //     })
                //     this.init()
                // }
            },
            confirmPopup(){
                cancelOrder(this.orderNo).then((res)=>{
                    // do nothing
                })
                this.init()
                this.cancelPopup()
            },
            cancelPopup(){
                ModalHelper.beforeClose()
                this.popupShow = false
            },
            goBack(){
                this.$router.go(-1)
            }
        },
        components: {
            popup
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/style/mixin';
    .order{
        background: #f7f7f7;
        .user-head{
            @include fj;
            width: 100%;
            height: 88px;
            padding: 0 20px;
            line-height: 88px;
            font-size: 30px;
            @include boxSizing;
            background: #fff;
            border-bottom: 1px solid #666;
            .iconfont{
                font-size: 44px;
            }
        }
        .order-info{
            width: 100%;
            padding: 30px;
            @include boxSizing;
            background: #fff;
            div{
                p{
                    font-size: 30px;
                    color: #999;
                    padding: 5px 0;
                    span{
                        color: #000;
                        &.order-status{
                            color: $red;
                        }
                    }
                }
            }
            button{
                width: 100%;
                height: 92px;
                margin-top: 20px;
                text-align: center;
                line-height: 92px;
                color: #fff;
                font-size: 30px;
                background: #E93B3D;
                &.cancel-order{
                    color: #000;
                    background: #fff;
                    border: 1px solid #999;
                    @include borderRadius(10px);
                }
            }
        }
        .user-info{
            margin-top: 30px;
            width: 100%;
            padding: 30px;
            @include boxSizing;
            background: #fff;
            div{
                padding: 5px 0;
                font-size: 30px;
                color: #999;
                span{
                    color: #000;
                }
            }
        }
        .product-list{
            width: 100%;
            margin-top: 30px;
            background: #ffffff;
            .product-item{
                @include fj;
                width: 100%;
                padding: 20px;
                @include boxSizing;
                img{
                    width: 150px;
                    height: 150px;
                }
                div{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 60%;
                    font-size: 30px;
                    p{
                        max-height: 80px;
                        overflow: hidden;
                    }
                    span{
                        color: $red;
                        font-size: 30px;
                    }
                }
                .product-price{
                    display: flex;
                    flex-direction: column;
                    i{
                        font-style: normal;
                        text-align: right;
                        padding-bottom: 10px;
                        &:first-child{
                            color: $red;
                        }
                    }
                }
            }
        }
    }
</style>
