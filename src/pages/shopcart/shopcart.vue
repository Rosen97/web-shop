<template>
    <div class="shopcart">
        <div class="shopcart-header" v-text="`购物车(${cartProductVoList.length})`"></div>
        <div class="shopcart-content">
            <div class="shopcart-empty" v-if="cartProductVoList.length === 0">
                <img src="../../assets/shopcart-empty.png">
                <p>购物车竟然是空的</p>
                <p>“再忙，也要记得买点什么犒劳自己”</p>
            </div>
            <div class="shopcart-list" v-else>
                <div class="shopcart-item" v-for="item in cartProductVoList" data-type="0">
                    <div class="shopcart-item-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd">
                        <div class="shopcart-item-select">
                            <i class="iconfont icon-duigou" data-selected="true" @click="selectProduct($event,item.productId)" v-if="item.productChecked"></i>
                            <i class="iconfont icon-weibiaoti38" data-selected="false" @click="selectProduct($event,item.productId)" v-else></i>
                        </div>
                        <img :src="imageHost + item.productMainImage"/>
                        <div class="shopcart-item-info">
                            <p class="shopcart-name" v-text="item.productName"></p>
                            <p class="shopcart-subtitle" v-text="item.productSubtitle"></p>
                            <div class="shopcart-num">
                                <span class="shopcart-price" v-text="`￥${item.productPrice}`"></span>
                                <span class="shopcart-quantity" v-text="`X${item.quantity}`"></span>
                            </div>
                        </div>
                    </div>
                    <div class="delete" @click="deleteShopcart(item.productId)">删除</div>
                </div>
            </div>
        </div>
        <div class="shopcart-footer">
            <div class="shopcart-item-select" @click="selectAll">
                <i class="iconfont icon-duigou" v-if="allChecked === true"></i>
                <i class="iconfont icon-weibiaoti38" v-else></i>
                <span>全选</span>
            </div>
            <div class="shopcart-accounts">
                <span>合计：<i v-text="`￥${cartTotalPrice}`"></i></span>
                <button>结算</button>
            </div>
        </div>
        <nav-bar></nav-bar>
    </div>
</template>

<script>
    import navBar from '../../components/navBar'
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
        created(){
            this.getCartList()
        },
        methods: {
            async getCartList(){
                await this.$http('/api/cart/list.do',{},'POST').then((res)=>{
                    this.setConfig(res.imageHost,res.cartProductVoList,res.cartTotalPrice,res.allChecked)
                })
            },
            //后台接口来取消/选中商品
            async selectProduct($event,id){
                let $selected = $event.currentTarget.getAttribute('data-selected'),
                    $url = ''
                $selected == 'true' ? $url = '/api/cart/un_select.do' : $url = '/api/cart/select.do'
                !$selected ? $url = '/api/cart/un_select.do' : '/api/cart/select.do'
                await this.$http($url,{
                    productId: id
                },'POST').then((res)=>{
                    this.setConfig(res.imageHost,res.cartProductVoList,res.cartTotalPrice,res.allChecked)
                })
                this.getCartList()
            },
            selectAll(){
                let $url = ''
                this.allChecked === true ? $url = '/api/cart/un_select_all.do' : $url = '/api/cart/select_all.do'
                this.$http($url,{},'POST').then((res)=>{
                    this.setConfig(res.imageHost,res.cartProductVoList,res.cartTotalPrice,res.allChecked)
                })
                this.getCartList()
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
                console.log(this.startX)
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
                this.$http('/api/cart/delete_product.do',{
                    productIds: id
                },"POST").then((res)=>{
                    console.log(res)
                    this.setConfig(res.imageHost,res.cartProductVoList,res.cartTotalPrice,res.allChecked)
                })
                this.resetSlide()
            }
        }
    }
</script>

<style lang="scss" scoped="" type="text/scss">
    @import "../../common/style/mixin";
    .shopcart{
        width: 100%;
        min-height: 100%;
        padding-bottom: 200px;
        background: #fff;
        .shopcart-header{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100px;
            text-align: center;
            line-height: 100px;
            color: #ffffff;
            font-size: 36px;
            background: $orange;
            z-index: 100;
        }
        .shopcart-content{
            width: 100%;
            margin-top: 100px;
            .shopcart-empty{
                width: 100%;
                margin: 100px 0;
                text-align: center;
                img{
                    display: inline-block;
                    width: 300px;
                    height: 300px;
                    margin-left: -20px;
                }
                p{
                    font-size: 36px;
                    padding-bottom: 20px;
                    &:last-child{
                        font-size: 28px;
                        color: #999;
                    }
                }
            }
            .shopcart-list{
                width: 100%;
                overflow: hidden;
                background: #fff;
                .shopcart-item{
                    position: relative;
                    -webkit-transition: all 0.2s;
                    transition: all 0.2s;
                    .shopcart-item-box{
                        display: flex;
                        margin-bottom: 20px;
                        padding: 20px 0;
                        background: #eee;
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
                                    color: $orange;
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
                                    color: $orange;
                                }
                                .shopcart-quantity{
                                    color: #999;
                                    font-size: 28px;
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
                        color: $orange;
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
                        color: $orange;
                    }
                }
                button{
                    width: 240px;
                    height: 100%;
                    text-align: center;
                    font-size: 30px;
                    color: #fff;
                    background: $orange;
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
    }
</style>

