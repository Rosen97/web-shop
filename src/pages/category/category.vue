<template>
    <div>
        <div>
            <m-header></m-header>
            <nav-bar></nav-bar>
            <div class="search-wrap" ref="searchWrap">
                <ul class="nav-side">
                    <li v-for="(item,index) in categoryData" v-text="item.name"
                        :class="{'active' : currentIndex === index}" @click="selectMenu(index)"></li>
                </ul>
                <div class="search-content">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="item in categoryData">
                                <img class="category-main-img" :src="item.mainImgUrl"/>
                                <p class="catogory-title" v-text="item.name"></p>
                                <div class="category-list">
                                    <div class="product-item" v-for="product in item.list">
                                        <img :src="product.imgUrl" class="product-img"/>
                                        <p v-text="product.title" class="product-title"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mHeader from '../../components/mHeader'
    import navBar from '../../components/navBar'
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'
    import 'swiper/dist/js/swiper.min.js'

    export default {
        components: {
            mHeader,
            navBar
        },
        data() {
            return {
                categoryData: [],
                currentIndex: 0
            }
        },
        created() {
            console.log('我是父路由')
            this.getCategoryData()
        },
        mounted() {
            this.setSearchWrapHeight()
            setTimeout(() => {
                this.initSwiper()
            }, 500)
        },
        methods: {
            //获取catgory菜单数据
            async getCategoryData() {
                await this.$http('/category/data', {}, 'POST').then((res) => {
                    this.categoryData = res
                })
            },
            //动态设置searc-wrap的高
            setSearchWrapHeight() {
                let $screenHeight = document.documentElement.clientHeight
                this.$refs.searchWrap.style.height = $screenHeight - 200 + 'px'
            },
            initSwiper() {
                let _this = this
                this.slider = new Swiper('.swiper-container', {
                    direction: 'vertical', // 垂直切换选项
                    initialSlide: this.currentIndex,
                    on: {
                        //列表滑动完毕时
                        slideChangeTransitionEnd: function () {
                            _this.currentIndex = this.activeIndex
                        }
                    }
                })
            },
            //左侧菜单和右侧区域联动
            selectMenu($index) {
                this.currentIndex = $index
                this.slider.slideTo($index)
            }
        }
    }
</script>

<style lang="scss" scoped="" type="text/scss">
    @import '../../common/style/mixin';

    .search-wrap {
        @include fj;
        width: 100%;
        margin-top: 100px;
        border-top: 1px solid #999;
        .nav-side {
            height: 100%;
            overflow: scroll;
            border-right: 1px solid #999;
            li {
                padding: 20px 15px;
                text-align: center;
                font-size: 30px;
                &.active {
                    font-size: 32px;
                    color: $orange;
                }
            }
        }
        .search-content {
            width: 78%;
            height: 100%;
            padding: 0 20px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            .swiper-container {
                width: 100%;
                height: 100%;
                .swiper-slide{
                    width: 100%;
                    .category-main-img{
                        width: 100%;
                    }
                    .catogory-title{
                        width: 100%;
                        font-size: 40px;
                        padding: 20px 0;
                    }
                    .category-list{
                        display: flex;
                        flex-wrap: wrap;
                        flex-shrink: 0;
                        width: 100%;
                        .product-item{
                            width: 33.3333%;
                            margin-bottom: 20px;
                            text-align: center;
                            font-size: 30px;
                        }
                    }
                }
            }
        }
    }
</style>
