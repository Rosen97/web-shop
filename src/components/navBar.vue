<template>
    <div class="nav-bar">
        <ul class="nav-list">
            <router-link tag="li" class="nav-list-item active" to="/index">
                <i class="iconfont icon-home"></i>
                <span>首页</span>
            </router-link>
            <router-link tag="li" class="nav-list-item" to="/category">
                <i class="iconfont icon-chazhaobiaodanliebiao"></i>
                <span>分类</span>
            </router-link>
            <router-link tag="li" class="nav-list-item" to="shopcart">
                <i class="iconfont icon-gouwuche"></i>
                <span>购物车</span>
            </router-link>
            <router-link tag="li" class="nav-list-item" to="user">
                <i class="iconfont icon-iconyonghu"></i>
                <span>我的</span>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped="" type="text/scss">
    .nav-bar{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        padding: 10px 0;
        z-index: 1000;
        background: #F7F7F7;
        .nav-list{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 0;
            .nav-list-item{
                display: flex;
                flex: 1;
                flex-direction: column;
                text-align: center;
                color: #666;
                &.router-link-active{
                    color: #FF6B01;
                }
                i{
                    tetx-align: center;
                    font-size: 44px;
                }
                span{
                    font-size: 24px;
                }
            }
        }
    }
</style>
