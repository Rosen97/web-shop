<template>
    <div class="order-wrap">
        <header class="user-head">
            <i class="iconfont icon-left" @click="goBack"></i>
            <span>订单列表</span>
            <i class="iconfont icon-More"></i>
        </header>
        <section class="order-search">
            <div>
                <i class="iconfont icon-search"></i>
                <input placeholder="商品名称/商品编号/订单号" />
            </div>
        </section>
        <section class="order-tag">
            <span :class="{'active' : orderType===1}" data-type="1" @click="selectTag">所有订单</span>
            <span :class="{'active' : orderType===2}" data-type="2" @click="selectTag">待付款</span>
            <span :class="{'active' : orderType===3}" data-type="3" @click="selectTag">待收货</span>
            <span :class="{'active' : orderType===4}" data-type="4" @click="selectTag">已完成</span>
        </section>
      <loading v-show="isLoading"></loading>
        <section>
            <div class="order-list" v-show="!isLoading">
                <div class="order-item" v-for="order in orderList" :data-orderNo="order.orderNo" @click="viewDetail">
                    <p class="order-num">订单号：<span>{{order.orderNo}}</span></p>
                    <div class="status">
                        <div>
                            <i>状态：<b>{{order.statusDesc}}</b></i>
                            <i>总价：<b>￥{{order.payment}}</b></i>
                        </div>
                        <span class="order-payment" v-show="order.status === 10" @click="goPayment(order.orderNo)">去支付</span>
                    </div>
                    <div class="product-list">
                        <div class="product-item" v-for="product in order.orderItemVoList">
                            <img :src="order.imageHost+product.productImage" />
                            <div>
                                <p>{{product.productName}}</p>
                                <span>x{{product.quantity}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="order-empty" v-show="orderList.length === 0">{{emptyMsg}}</div>
        </section>

    </div>
</template>

<script>
    import loading from '../../components/common/loading'
    import {getUrlKey} from "../../common/js/util";
    import {orderList} from "../../service/getData";

    export default {
        data() {
            return {
                orderList: [], //所有订单
                orderType: 1,  //1-全部  2-待付款  3-待收货  4-已完成  5-售后
                emptyMsg: '',
                isLoading: true
            }
        },
        created() {
            let $orderType = getUrlKey('orderType')
            this.orderType = parseInt($orderType)
            this.getOrderList()
        },
      mounted(){
          this.$nextTick(()=>{
            setTimeout(()=>{
              this.isLoading = false
            },500)
          })
      },
        methods: {
            getOrderList(){
                let pageNum = 1,
                    pageSize = 20
                orderList(pageSize,pageNum).then((res)=>{
                    console.log(res)
                    // if(!res.data.list.length){
                    //     return
                    // }
                    this.initOrderList(res.data.list)
                })
            },
            initOrderList(orderList){
                switch(this.orderType){
                    case 1:
                        this.orderList = orderList
                        this.emptyMsg = '你暂时没有订单!'
                        break
                    case 2:
                        orderList.forEach((order)=>{  //待付款
                            if(order.status === 10){
                                this.orderList.push(order)
                            }
                        })
                        this.emptyMsg = '你暂时没有要付款的订单!'
                        break
                    case 3:
                        this.orderList = []
                        this.emptyMsg = '你暂时没有待收货的订单!'
                        break
                    case 4:
                        this.orderList = []
                        this.emptyMsg = '你暂时没有已完成的订单!'
                        break
                }
            },
            selectTag(e){
                let $type = parseInt(e.currentTarget.getAttribute('data-type'))
                this.orderType = $type
                this.$router.replace('./order-list?orderType='+$type)
                this.orderList = []
                this.emptyMsg = ''
                this.getOrderList()
            },
            viewDetail(e){
                if(e.target.className === 'order-payment'){
                    return
                }
                this.$router.push('./order-detail?orderNo='+e.currentTarget.getAttribute('data-orderNo'))
            },
            //去支付
            goPayment(orderNo){
                this.$router.push('./payment?orderNo='+orderNo)
            },
            goBack(){
                this.$router.push('./user')
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
        .user-head{
            @include fj;
            width: 100%;
            height: 88px;
            padding: 0 20px;
            line-height: 88px;
            font-size: 30px;
            @include boxSizing;
            background: #fff;
            border-bottom: 1px solid #dcdcdc;
            .iconfont{
                font-size: 44px;
            }
        }
        .order-search{
            width: 100%;
            padding: 15px 30px;
            @include boxSizing;
            div{
                width: 100%;
                height: 60px;
                line-height: 60px;
                background: #fff;
                @include borderRadius(40px);
                .iconfont{
                    padding: 0 20px 0 30px;
                    font-size: 30px;
                }
                input{
                    width: 80%;
                    height: 100%;
                    line-height: 60px;
                    font-size: 30px;
                }
            }
        }
        .order-tag{
            display: flex;
            justify-content: space-around;
            width: 100%;
            background: #fff;
            span{
                height: 88px;
                line-height: 88px;
                font-size: 30px;
                &.active{
                    color: $red;
                    border-bottom: 4px solid $red;
                }
            }
        }
        .order-list{
            width: 100%;
            background: #eee;
            .order-item{
                width: 100%;
                margin-top: 30px;
                padding: 20px;
                @include boxSizing;
                background: #fff;
                .order-num{
                    padding: 20px 0;
                    font-size: 30px;
                    color: #999;
                    border-bottom: 1px solid #dcdcdc;
                    span{
                        color: #000;
                    }
                }
                .status{
                    @include fj;
                    @extend .order-num;
                    div{
                        display: flex;
                        flex-direction: column;
                        i{
                            font-style: normal;
                            padding-bottom: 10px;
                            &:last-child{
                                b{
                                    font-weight: normal;
                                    color: #000;
                                }
                            }
                            b{
                                font-weight: normal;
                                color: $red;
                            }
                        }
                    }
                    span{
                        width: 154px;
                        height: 60px;
                        margin-top: 20px;
                        text-align: center;
                        line-height: 60px;
                        color: #fff;
                        background: $red;
                        @include borderRadius(10px);
                    }
                }
                .product-list{
                    width: 100%;
                    padding: 20px 0;
                    .product-item{
                        @include fj;
                        width: 100%;
                        margin-bottom: 20px;
                        img{
                            width: 150px;
                            height: 150px;
                        }
                        div{
                            width: 74%;
                            font-size: 28px;
                            span{
                                line-height: 60px;
                                color: #999;
                                font-size: 24px;
                            }
                        }
                    }
                }
            }
        }
        .order-empty{
            width: 100%;
          margin-top: 60px;
            text-align: center;
            font-size: 28px;
            color: #999;
        }
    }
</style>
