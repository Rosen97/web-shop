<template>
    <div class="swiper-container" :class="{'empty': imgUrl === []}">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in imgUrl" @click="initFocus(item.categoryId)">
                <router-link tag="a" :to="`/product/${item.categoryId}`">
                    <img :src="item.imgUrl" class="swiper_img">
                </router-link>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>
<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'
    import 'swiper/dist/js/swiper.min.js'

    export default {
        props: {
            imgUrl: Array,
            default: []
        },
        mounted() {
            this.slider = new Swiper('.swiper-container', {
                autoplay: true,
                speed: 500,
                loop: true,
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true,//修改swiper的父元素时，自动初始化swiper
                // 分页器
                pagination: {
                    el: '.swiper-pagination',
                }
            })
        },
        methods: {
            initFocus(id) {
                // console.log(id)
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .swiper-container {
        width: 100%;
        margin-top: 0;
        .swiper_img {
            width: 100%;
            height: 340px;
        }
    }

</style>
