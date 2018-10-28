<template>
    <div class="header-box">
        <i class="iconfont icon-iconfontzhizuobiaozhun023110"></i>
        <div class="header-search">
            <i class="iconfont icon-search"></i>
            <input class="header-search-text" placeholder="小米8年度旗舰机">
        </div>
        <i class="iconfont icon-saoma"></i>
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
    .header-box{
        position: fixed;
        left: 0;
        top: 0;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 80px;
        line-height: 80px;
        .icon-iconfontzhizuobiaozhun023110{
            flex: 1;
            text-align: center;
            font-size: 40px;
            color: #999;
        }
        .header-search{
            position: relative;
            flex: 6;
            .icon-search{
                position: absolute;
                left: 10px;
                top: 0;
                font-size: 30px;
                z-index: 100;
            }
            .header-search-text{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 60px;
                margin-top: 10px;
                padding-left: 60px;
                font-size: 30px;
                line-height: 60px;
                box-sizing: border-box;
                background-color: #f7f7f7;
                border: 1px solid #999;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
            }
        }
        .icon-saoma{
            @extend .icon-iconfontzhizuobiaozhun023110
        }
    }
</style>
