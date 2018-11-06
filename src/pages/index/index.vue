<template>
    <div class="home-wrap">
        <m-header></m-header>
        <nav-bar></nav-bar>
        <slider :imgUrl="headList" class="index-slider" style="margin-top: 80px;"></slider>
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
        <div class="floor-wrap phone-wrap">
            <div class="floor-title">
                手机专区
                <i class="iconfont icon-right-circle"></i>
            </div>
            <div class="floor-content">
                <div class="floor-item" v-for="item in phoneList">
                    <img :src="item.imgUrl"/>
                    <div class="floor-item-info">
                        <p class="floor-item-name" v-text="item.name"></p>
                        <p class="floor-item-desc" v-text="item.desc"></p>
                        <span class="floor-item-price" v-text="`￥${item.price}`"></span>
                    </div>
                </div>
            </div>
            <!--<div class="floor-banner"></div>-->
        </div>
        <div class="floor-wrap electricList-wrap">
            <div class="floor-title">
                家电专区
                <i class="iconfont icon-right-circle"></i>
            </div>
            <div class="floor-content">
                <div class="floor-item" v-for="item in electricList">
                    <img :src="item.imgUrl"/>
                    <div class="floor-item-info">
                        <p class="floor-item-name" v-text="item.name"></p>
                        <p class="floor-item-desc" v-text="item.desc"></p>
                        <span class="floor-item-price" v-text="`￥${item.price}`"></span>
                    </div>
                </div>
            </div>
            <!--<div class="floor-banner"></div>-->
        </div>
        <div class="floor-wrap intelligentList-wrap">
            <div class="floor-title">
                智能专区
                <i class="iconfont icon-right-circle"></i>
            </div>
            <div class="floor-content">
                <div class="floor-item" v-for="item in intelligentList">
                    <img :src="item.imgUrl"/>
                    <div class="floor-item-info">
                        <p class="floor-item-name" v-text="item.name"></p>
                        <p class="floor-item-desc" v-text="item.desc"></p>
                        <span class="floor-item-price" v-text="`￥${item.price}`"></span>
                    </div>
                </div>
            </div>
            <!--<div class="floor-banner"></div>-->
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
                headList: [],
                phoneList: [],
                electricList: [],
                intelligentList: []
            }
        },
        created() {
            this.$http('/home/data', 'POST').then((res) => {
                console.log(res)
                // res.headList.forEach((item) => {
                //     this.headList.push(item.imgUrl)
                // })
                this.headList = res.headList
                this.phoneList = res.phoneList
                this.electricList = res.electricList
                this.intelligentList = res.intelligentList
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
    .home-wrap{
        padding-bottom: 100px;
        .index-slider img{
            height: 400px;
        }
        .service-tag-list {
            @include fj;
            width: 100%;
            padding: 30px 20px;
            font-size: 30px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            background: $bc;
            .iconfont {
                font-size: 35px;
                color: #ea545d;
            }
        }

        .floor-wrap {
            width: 100%;
            padding: 20px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            background: #eee;
            &.electricList-wrap{
                background: #C5C4CA;
            }
            &.intelligentList-wrap{
                background: #E6D0BB;
            }
            .floor-title {
                position: relative;
                width: 100%;
                padding: 20px 0 30px 0;
                text-align: center;
                font-size: 36px;
                .iconfont {
                    position: absolute;
                    right: 0;
                    top: 25px;
                    font-size: 44px;
                    color: #999;
                }
            }
            .floor-content {
                @include fj;
                flex-wrap: wrap;
                flex-shrink: 0;
                width: 100%;
                .floor-item{
                    display: flex;
                    flex-direction: column;
                    width: 48%;
                    margin-bottom: 20px;
                    padding: 10px;
                    font-size: 30px;
                    background: #fff;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    img{
                        display: block;
                        width: 200px;
                        margin: 0 auto;
                    }
                    .floor-item-name{
                        width: 100%;
                        height: 30px;
                        line-height: 30px;
                        overflow: hidden;
                        text-align: center;
                        color: #333;
                    }
                    .floor-item-desc{
                        height: 50px;
                        line-height: 50px;
                        overflow: hidden;
                        text-align: center;
                        color: #999;
                    }
                    .floor-item-price{
                        display: block;
                        width: 100%;
                        text-align: center;
                        color: $orange;
                    }
                }
            }
            .floor-banner {
                width: 100%;
                height: 200px;
                background: #FF6B01;
            }
        }
    }
</style>
