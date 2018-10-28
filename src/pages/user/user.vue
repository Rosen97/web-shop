<template>
    <div>
        <div class="user-box"  v-show="$route.meta.navShow">
            <div class="user-header">
                <i class="iconfont icon-user"></i>
                <router-link tag="span" to="/user/login">登录 / 注册</router-link>
            </div>
            <!--<div class="user-header">-->
                <!--<span>rosenwang</span>-->
            <!--</div>-->
            <div class="user-content">
                <div class="user-order">
                    <span>我的订单</span>
                    <div>
                        <span>全部订单</span>
                        <i class="iconfont icon-right"></i>
                    </div>
                </div>
                <div class="user-menu">
                    <div class="user-menu-item">
                        <i class="iconfont icon-daifukuan"></i>
                        <span>待付款</span>
                    </div>
                    <div class="user-menu-item">
                        <i class="iconfont icon-daishouhuo"></i>
                        <span>待收货</span>
                    </div>
                    <div class="user-menu-item">
                        <i class="iconfont icon-daipingjia"></i>
                        <span>待评价</span>
                    </div>
                    <div class="user-menu-item">
                        <i class="iconfont icon-tool"></i>
                        <span>退换修</span>
                    </div>
                </div>
                <div class="user-list">
                    <ul>
                        <li class="user-list-item">
                            <i class="iconfont icon-youhuiquan user-list-item-left"></i>
                            <div class="user-list-item-right">
                                <span>优惠券</span>
                                <i class="iconfont icon-right"></i>
                            </div>
                        </li>
                        <li class="user-list-item">
                            <i class="iconfont icon-huiyuanzhongxin user-list-item-left"></i>
                            <div class="user-list-item-right">
                                <span>会员中心</span>
                                <i class="iconfont icon-right"></i>
                            </div>
                        </li>
                        <li class="user-list-item">
                            <i class="iconfont icon-fuwufang user-list-item-left"></i>
                            <div class="user-list-item-right">
                                <span>服务中心</span>
                                <i class="iconfont icon-right"></i>
                            </div>
                        </li>
                        <li class="user-list-item-gap"></li>
                        <li class="user-list-item">
                            <i class="iconfont icon-icon user-list-item-left"></i>
                            <div class="user-list-item-right">
                                <span>更多功能</span>
                                <i class="iconfont icon-right"></i>
                            </div>
                        </li>
                        <li class="user-list-item">
                            <i class="iconfont icon-huiyuanzhongxin user-list-item-left"></i>
                            <div class="user-list-item-right">
                                <span>会员中心</span>
                                <i class="iconfont icon-right"></i>
                            </div>
                        </li>
                        <li class="user-list-item">
                            <i class="iconfont icon-fuwufang user-list-item-left"></i>
                            <div class="user-list-item-right">
                                <span>服务中心</span>
                                <i class="iconfont icon-right"></i>
                            </div>
                        </li>
                        <li class="user-list-item">
                            <i class="iconfont icon-shezhi user-list-item-left"></i>
                            <div class="user-list-item-right">
                                <span>设置</span>
                                <i class="iconfont icon-right"></i>
                            </div>
                        </li>
                        <li class="user-list-item-gap"></li>
                        <li class="user-list-item">
                            <i class="iconfont icon-icon user-list-item-left"></i>
                            <div class="user-list-item-right">
                                <span>更多功能</span>
                                <i class="iconfont icon-right"></i>
                            </div>
                        </li>
                        <li class="user-list-item">
                            <i class="iconfont icon-huiyuanzhongxin user-list-item-left"></i>
                            <div class="user-list-item-right">
                                <span>会员中心</span>
                                <i class="iconfont icon-right"></i>
                            </div>
                        </li>
                        <li class="user-list-item">
                            <i class="iconfont icon-fuwufang user-list-item-left"></i>
                            <div class="user-list-item-right">
                                <span>服务中心</span>
                                <i class="iconfont icon-right"></i>
                            </div>
                        </li>
                        <li class="user-list-item">
                            <i class="iconfont icon-shezhi user-list-item-left"></i>
                            <div class="user-list-item-right">
                                <span>设置</span>
                                <i class="iconfont icon-right"></i>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <nav-bar></nav-bar>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import navBar from '../../components/navBar'
    export default {
        components: {
            navBar
        },
        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped="" type="text/scss">
    .user-header{
        width: 100%;
        padding: 40px 0;
        line-height: 70px;
        background: #FE852E;
        .iconfont{
            margin-left: 30px;
            padding: 20px;
            font-size: 40px;
            color: #fff;
            border: 1px solid #fff;
            border-radius: 50%;
            background: orange;
        }
        span{
            margin-left: 20px;
            font-size: 28px;
            color: #ffffff;
        }
    }
    .user-content{
        width: 100%;
        .user-order{
            display: flex;
            justify-content: space-between;
            height: 90px;
            line-height: 90px;
            padding: 0 20px;
            font-size: 30px;
            border-bottom: 1px solid #999;
            div{
                color: #999;
                .iconfont{
                    font-size: 40px;
                }
            }
        }
        .user-menu{
            display: flex;
            justify-content: space-between;
            .user-menu-item{
                flex: 1;
                display: flex;
                flex-direction: column;
                padding: 20px 0;
                text-align: center;
                font-size: 30px;
                .iconfont{
                    font-size: 50px;
                    padding-bottom: 10px;
                    color: #666;
                }
            }
        }
        .user-list{
            width: 100%;
            ul{
                .user-list-item{
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    padding-left: 30px;
                    height: 90px;
                    line-height: 90px;
                    font-size: 30px;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    .iconfont{
                        font-size: 30px;
                        padding-right: 20px;
                    }
                    .user-list-item-left{
                        flex: 1;
                        text-align: center;
                        font-size: 50px;
                        &.icon-youhuiquan{
                            color: #FA6B58;
                        }
                        &.icon-huiyuanzhongxin{
                            color: #FDBF2C;
                        }
                        &.icon-fuwufang{
                            color: #F96C5E;
                        }
                        &.icon-icon{
                            color: #9ED35A;
                        }
                        &.icon-shezhi{
                            color: #808B98;
                        }
                    }
                    .user-list-item-right{
                        flex: 9;
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid #dcdcdc;
                    }
                }
                .user-list-item-gap{
                    width: 100%;
                    height: 10px;
                    background: #e8e8e8;
                }
            }
        }
    }
</style>
