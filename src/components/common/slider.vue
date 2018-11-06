<template>
  <div class="swiper-container" :class="{'empty': imgUrl === []}">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in imgUrl">
        <img :src="item" class="swiper_img">
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
      new Swiper('.swiper-container',{
        autoplay: true,
        speed: 500,
        loop: true,
        // 分页器
        pagination: {
            el: '.swiper-pagination',
        }
      })
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .swiper-container{
    width: 100%;
    height: 300px;
    margin-top: 0;
    .swiper_img{
      width: 100%;
      height: 100%;
    }
  }

</style>
