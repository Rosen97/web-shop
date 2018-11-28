<template>
    <div>
        <header class="home-header wrap" :class="{'active' : headerActive}">
            <router-link tag="i" to="./category" class="iconfont icon-caidan"></router-link>
            <div class="header-search">
                <span class="app-name">M</span>
                <i class="iconfont icon-search"></i>
                <router-link tag="span" class="search-title" to="./search">家电返场同价11.11</router-link>
            </div>
            <router-link tag="span" to="./login" v-if="!isLogin">登录</router-link>
            <router-link tag="span" to="./user" v-else>
                <i class="iconfont icon-iconyonghu"></i>
            </router-link>
        </header>
        <nav-bar></nav-bar>
        <slider :imgUrl="headList"></slider>
        <section class="category-list">
            <div v-for="item in categoryList" @click="selectCategory(item.categoryId)">
                <img :src="item.imgUrl">
                <span>{{item.name}}</span>
            </div>
        </section>
        <section class="floor-list">
            <div class="floor-wrap" v-for="floor in floorList">
                <img class="floor-head" :src="floor.headUrl">
                <div class="floor-content">
                    <div class="floor-category" v-for="category in floor.list">
                        <p>{{category.title}}</p>
                        <p>{{category.desc}}</p>
                        <div class="floor-products">
                            <img :src="product.imgUrl" v-for="product in category.products" @click="selectCategory(product.categoryId)">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import mHeader from 'components/mHeader'
    import navBar from 'components/navBar'
    import slider from 'components/common/slider'
    import {homeData,checkLogin} from "../../service/getData";
    import {getStore,setStore} from "../../common/js/util";

    export default {
        data() {
            return {
                headList: [],
                categoryList: [],
                floorList: [],
                headerActive: false,
                isLogin: false
            }
        },
        beforeCreate(){
            checkLogin().then((res)=>{
              res.status == 1 ? this.isLogin = false : this.isLogin = true
            })
        },
        created(){
            let followList = getStore('followList'),
                footprintList = getStore('footprintList')
            if(!followList){
                setStore('followList',[])
            }
            if(!footprintList){
                setStore('footprintList',[])
            }
        },
        mounted() {
            homeData().then((res) => {
                this.headList = res.data.headList
                this.categoryList = res.data.categoryList
                this.floorList = res.data.floorList
            })
            window.addEventListener('scroll', this.pageScroll)
        },
        methods: {
            pageScroll() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                scrollTop > 100 ? this.headerActive = true : this.headerActive = false
            },
            selectCategory(categoryId){
                this.$router.push('./product-list?categoryId='+categoryId)
            }
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

    .home-header {
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
        color: #fff;
        z-index: 10000;
        &.active {
            background: $red;
        }
        .icon-caidan {
            font-size: 50px;
        }
        .header-search {
            display: flex;
            width: 74%;
            height: 40px;
            line-height: 40px;
            margin: 20px 0;
            padding: 10px 0;
            color: #232326;
            background: #fff;
            @include borderRadius(40px);
            .app-name {
                padding: 0 20px;
                color: $red;
                font-size: 40px;
                font-weight: bold;
                border-right: 1px solid #666;
            }
            .icon-search {
                padding: 0 20px;
                font-size: 34px;
            }
            .search-title {
                font-size: 24px;
                color: #666;
            }
        }
        .icon-iconyonghu{
            font-size: 44px;
        }
    }

    .swiper-container .swiper_img {
        height: 400px;
    }

    .category-list {
        display: flex;
        flex-shrink: 0;
        flex-wrap: wrap;
        width: 100%;
        padding-bottom: 26px;
        div {
            display: flex;
            flex-direction: column;
            width: 20%;
            text-align: center;
            img {
                width: 80px;
                height: 80px;
                margin: 26px auto 16px auto;
            }
        }
    }

    .floor-list {
        width: 100%;
        padding-bottom: 100px;
        .floor-head {
            width: 100%;
            height: 80px;
            background: #F6F6F6;
        }
        .floor-content {
            display: flex;
            flex-shrink: 0;
            flex-wrap: wrap;
            width: 100%;
            @include boxSizing;
            .floor-category {
                width: 50%;
                padding: 20px;
                border-right: 1px solid #dcdcdc;
                border-bottom: 1px solid #dcdcdc;
                @include boxSizing;
                &:nth-child(2n) {
                    border-right: none;
                }
                p {
                    font-size: 34px;
                    color: #333;
                    &:nth-child(2) {
                        padding: 10px 0;
                        font-size: 26px;
                        color: $red;
                    }
                }
                .floor-products {
                    display: flex;
                    justify-content: space-around;
                    width: 100%;
                    img {
                        width: 130px;
                        height: 130px;
                    }
                }
            }
        }
    }
</style>
