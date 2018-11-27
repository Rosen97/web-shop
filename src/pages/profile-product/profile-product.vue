<template>
    <div class="profile-product">
        <header class="user-head">
            <i class="iconfont icon-left" @click="goBack"></i>
            <span>{{title}}</span>
            <i class="iconfont icon-More"></i>
        </header>
        <section class="product-wrap">
            <list-scroll :scroll-data="productList" v-if="productList.length > 0">
                <div class="product-list">
                    <div class="product-item" v-for="(item,index) in productList" @click="productDetail(index)">
                        <img :src="item.imageHost + item.mainImage">
                        <div class="product-info">
                            <span class="name">{{item.name}}</span>
                            <span class="subtitle">{{item.subtitle}}</span>
                            <span class="price">￥{{item.price}}</span>
                        </div>
                    </div>
                </div>
            </list-scroll>
            <p class="empty" v-else>暂无数据</p>
        </section>
    </div>
</template>

<script>
    import listScroll from '../../components/common/list-scroll'
    import {getStore, getUrlKey} from "../../common/js/util";
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                title: '',
                productList: []
            }
        },
        computed: {
            ...mapState({
                followList: state => state.followList
            })
        },
        created() {
            let $type = parseInt(getUrlKey('type')),   //0-关注  1-足迹
                productList = getStore('footprintList')
            if (!$type) {
                this.title = '我关注的商品'
                this.productList = this.followList
            } else {
                this.title = '我的足迹'
                this.productList = productList ? productList : []
            }
        },
        methods: {
            productDetail(index) {
                // let footprintList = getStore('footprintList')
                // footprintList.unshift(this.productList[index])
                // this.RECORE_FOOT(dedupeObject(footprintList))
                this.$router.push('./product/' + this.productList[index].id)
            },
            goBack() {
                this.$router.go(-1)
            }
        },
        components: {
            listScroll
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/style/mixin';

    .profile-product {
        background: #F7F7F7;
        .user-head {
            @include fj;
            width: 100%;
            height: 88px;
            padding: 0 20px;
            line-height: 88px;
            font-size: 30px;
            @include boxSizing;
            background: #f7f7f7;
            border-bottom: 1px solid #f7f7f7;
            .iconfont {
                font-size: 44px;
            }
        }
        .product-wrap {
            width: 100%;
            height: 1210px;
            overflow: hidden;
            .product-list {
                width: 100%;
                padding-bottom: 40px;
                background: #f7f7f7;
                .product-item {
                    display: flex;
                    width: 100%;
                    margin-bottom: 20px;
                    padding: 30px;
                    @include boxSizing;
                    background: #fff;
                    img {
                        width: 150px;
                        height: 150px;
                    }
                    .product-info {
                        width: 70%;
                        margin-left: 20px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        .name {
                            font-size: 30px;
                            line-height: 40px;
                            max-height: 80px;
                            overflow: hidden;
                        }
                        .subtitle {
                            max-height: 60px;
                            color: #999;
                            padding: 10px 0;
                            overflow: hidden;
                        }
                        .price {
                            font-size: 30px;
                            color: $red;
                        }
                    }
                }
            }
            .empty {
                width: 100%;
                margin: 60px 0;
                text-align: center;
                font-size: 28px;
                color: #999;
            }
        }
    }

</style>
