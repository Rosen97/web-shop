<template>
    <div id="index">
        <m-header></m-header>
        <nav-bar></nav-bar>
        <slider style="margin-top: 40px;" :imgUrl="headList"></slider>
        <div class="service-tag-list">
            <div class="service-tag-item">
                <i class="iconfont icon-kongxinduigou"></i>
                <span>自营品牌</span>
            </div>
            <div class="service-tag-item">
                <i class="iconfont icon-kongxinduigou"></i>
                <span>无忧退款</span>
            </div>
            <div class="service-tag-item">
                <i class="iconfont icon-kongxinduigou"></i>
                <span>48小时快速退款</span>
            </div>
        </div>
        <div class="floor-wrap">
            <div class="floor-title">
                section1<i class="iconfont icon-right-circle"></i>
            </div>
            <div class="floor-content">
                <div class="floor-item"></div>
                <div class="floor-item"></div>
                <div class="floor-item"></div>
                <div class="floor-item"></div>
            </div>
            <div class="floor-banner"></div>
        </div>
        <div class="floor-wrap">
            <div class="floor-title">
                section1<i class="iconfont icon-right-circle"></i>
            </div>
            <div class="floor-content">
                <div class="floor-item"></div>
                <div class="floor-item"></div>
                <div class="floor-item"></div>
                <div class="floor-item"></div>
            </div>
            <div class="floor-banner"></div>
        </div>
        <div class="floor-wrap">
            <div class="floor-title">
                section1<i class="iconfont icon-right-circle"></i>
            </div>
            <div class="floor-content">
                <div class="floor-item"></div>
                <div class="floor-item"></div>
                <div class="floor-item"></div>
                <div class="floor-item"></div>
            </div>
            <div class="floor-banner"></div>
        </div>
    </div>
</template>

<script>
    import mHeader from 'components/mHeader'
    import navBar from 'components/navBar'
    import slider from 'components/common/slider'
    export default {
        data() {
            return {
                headList: []
            }
        },
        created(){
            this.$http('/home/data','POST').then((res)=>{
              res.headList.forEach((item)=>{
                this.headList.push(item.imgUrl)
              })
            })
        },
        components: {
            mHeader,
            navBar,
            slider
        }
    }
</script>

<style lang="scss" scoped="" type="text/scss">
    @import '../../common/style/mixin';
    .service-tag-list{
        @include fj;
        width: 100%;
        padding: 30px 20px;
        font-size: 30px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background: $bc;
        .iconfont{
            font-size: 35px;
            color: #ea545d;
        }
    }
    .floor-wrap{
        width: 100%;
        padding: 20px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        .floor-title{
            position: relative;
            width: 100%;
            padding: 20px 0 30px 0;
            text-align: center;
            font-size: 36px;
            .iconfont{
                position: absolute;
                right: 0;
                top: 25px;
                font-size: 44px;
                color: #999;
            }
        }
        .floor-content{
            @include fj;
            flex-wrap: wrap;
            flex-shrink: 0;
            width: 100%;
            .floor-item{
                width: 48%;
                height: 300px;
                margin-bottom: 20px;
                background: #B7DDF2;
            }
        }
        .floor-banner{
            width: 100%;
            height: 200px;
            background: #FF6B01;
        }
    }
</style>
