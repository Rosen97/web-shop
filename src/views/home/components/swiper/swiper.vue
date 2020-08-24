<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in list" :key="item.categoryId">
        <router-link tag="a" :to="`/product-list`">
          <img :src="item.imgUrl" class="swiper_img" ref="slideImg" />
        </router-link>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/swiper-bundle.js";

interface SwiperItem {
  imgUrl: string;
  categoryId?: number;
}

@Component
export default class Swiper2 extends Vue {
  slider: any = null;

  @Prop({ default: [] })
  list: Array<SwiperItem>;

  mounted() {
    this.slider = new Swiper(".swiper-container", {
      autoplay: true,
      speed: 500,
      loop: true,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      // 分页器
      pagination: {
        el: ".swiper-pagination"
      }
    });
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.swiper-container {
  width: 100%;
  margin-top: 0;
  .swiper-slide {
    width: 100%;
  }
  .swiper_img {
    width: 100%;
  }
  span {
    color: $red;
  }
}
</style>
