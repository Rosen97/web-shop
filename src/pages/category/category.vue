<template>
    <div>
        <div>
            <header class="category-header wrap">
                <i class="iconfont icon-left" @click="goHome"></i>
                <div class="header-search">
                    <i class="iconfont icon-search"></i>
                    <router-link tag="span" class="search-title" to="./search">家电返场同价11.11</router-link>
                </div>
                <i class="iconfont icon-More"></i>
            </header>
            <nav-bar></nav-bar>
            <section class="search-wrap" ref="searchWrap">
                <list-scroll :scroll-data="categoryData" class="nav-side-wrapper">
                    <ul class="nav-side">
                        <li v-for="(item,index) in categoryData" v-text="item.name"
                            :class="{'active' : currentIndex === index}" @click="selectMenu(index)"></li>
                    </ul>
                </list-scroll>
                <div class="search-content">
                    <list-scroll :scroll-data="categoryData" >
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                <transition name="fade-out">
                                    <div class="swiper-slide" v-for="(category,index) in categoryData"
                                         v-if="currentIndex === index">
                                        <img class="category-main-img" :src="category.mainImgUrl"
                                                                        v-if="category.mainImgUrl"/>
                                        <div class="category-list" v-for="products in category.list">
                                            <p class="catogory-title">{{products.title}}</p>
                                            <div class="product-item" v-for="product in products.productList" @click="selectProduct(product.title)">
                                                <img :src="product.imgUrl" class="product-img"/>
                                                <p v-text="product.title" class="product-title"></p>
                                            </div>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </list-scroll>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import mHeader from '../../components/mHeader'
    import navBar from '../../components/navBar'
    import listScroll from '../../components/common/list-scroll'
    import {categoryData} from "../../service/getData";

    export default {
        components: {
            mHeader,
            navBar,
            listScroll
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
        },
        methods: {
            //获取catgory菜单数据
            async getCategoryData() {
                await categoryData().then((res) => {
                  console.log(res)
                    this.categoryData = res.data
                })
            },
            //动态设置searc-wrap的高
            setSearchWrapHeight() {
                let $screenHeight = document.documentElement.clientHeight
                this.$refs.searchWrap.style.height = $screenHeight - 200 + 'px'
            },
            //左侧菜单和右侧区域联动
            selectMenu($index) {
                this.currentIndex = $index
            },
            selectProduct(title){
                this.$router.push('./product-list?keyword='+title)
            },
            goHome(){
              console.log(11111)
              this.$router.push('/home')
            }
        }
    }
</script>

<style lang="scss" scoped="" type="text/scss">
    @import '../../common/style/mixin';

    .category-header {
        position: fixed;
        left: 0;
        top: 0;
        @include fj;
        width: 100%;
        height: 100px;
        line-height: 100px;
        padding: 0 30px;
        @include boxSizing;
        font-size: 30px;
        color: #656771;
        z-index: 10000;
        &.active {
            background: $red;
        }
        .icon-left {
            font-size: 50px;
            font-weight: bold;
        }
        .header-search {
            display: flex;
            width: 80%;
            height: 40px;
            line-height: 40px;
            margin: 20px 0;
            padding: 10px 0;
            color: #232326;
            background: #F7F7F7;
            @include borderRadius(40px);
            .icon-search {
                padding: 0 20px 0 40px;
                font-size: 34px;
            }
            .search-title {
                font-size: 24px;
                color: #666;
            }
        }
        .icon-More {
            font-size: 40px;
        }
    }

    .search-wrap {
        @include fj;
        width: 100%;
        margin-top: 100px;
        background: #F8F8F8;
        border-top: 1px solid #999;
        .nav-side-wrapper {
            width: 28%;
            height: 100%;
            overflow: hidden;
            .nav-side {
                width: 100%;
                @include boxSizing;
                background: #F8F8F8;
                li {
                    width: 100%;
                    height: 92px;
                    text-align: center;
                    line-height: 92px;
                    font-size: 28px;
                    &.active {
                        color: $red;
                        background: #fff;
                    }
                }
            }
        }
        .search-content {
            width: 72%;
            height: 100%;
            padding: 0 20px;
            background: #fff;
            @include boxSizing;
            .swiper-container {
                width: 100%;
                .swiper-slide {
                    width: 100%;
                    .category-main-img {
                        width: 100%;
                    }
                    .category-list {
                        display: flex;
                        flex-wrap: wrap;
                        flex-shrink: 0;
                        width: 100%;
                      .catogory-title {
                        width: 100%;
                        font-size: 34px;
                        font-weight: 500;
                        padding: 40px 0;
                      }
                        .product-item {
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

    .fade-out-enter-active, .fade-out-leave-active {
        transition: opacity 2s;
    }

    .fade-out-enter, .fade-out-leave-to {
        opacity: 0;
    }
</style>
