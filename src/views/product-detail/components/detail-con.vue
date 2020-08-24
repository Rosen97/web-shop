<template>
  <div class="detail-con">
    <div class="product-focus">
      <Swiper :list="subImageList" />
    </div>
    <div class="detail-info">
      <p class="detail-info-name" v-text="info.name"></p>
      <p class="detail-info-subtitle" v-text="info.subtitle"></p>
      <div>
        <span class="detail-info-price" v-text="`￥${info.price}`"></span>
        <span class="detail-info-stock" v-text="`库存${info.stock}`"></span>
      </div>
    </div>
    <div>
      <div class="detail-content" ref="detailContent" id="content">
        <p class="detail-gap"></p>
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>安装服务</li>
          <li>常见问题</li>
        </ul>
        <div v-html="info.detail"></div>
      </div>
      <div ref="detailRecommend" id="recommend"></div>
      <div class="detail-cart">
        <div class="detail-cart-left">
          <div class="like">
            <!-- <i @click="lightLove" v-if="!isLoved" class="iconfont icon-lovetaoxin"></i>
            <i @click="cancelLove" v-else class="iconfont icon-love"></i>-->
            <span>喜欢</span>
          </div>
          <router-link tag="div" to="/shopcart" class="cart">
            <i class="iconfont icon-gouwuche"></i>
            <span>购物车</span>
            <!-- <span class="cart-num" v-text="cartCount" v-show="cartCount"></span> -->
          </router-link>
        </div>
        <div class="detail-cart-right">
          <button>加入购物车</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ProductDetailProps } from "@/store/product/interface";
import Swiper from "@/views/home/components/swiper/swiper.vue";

@Component({
  components: {
    Swiper
  }
})
export default class DetailCon extends Vue {
  @Prop({ default: () => ({}) })
  info: ProductDetailProps;

  get subImageList() {
    const list = this.info.subImages.split(",");
    const subImages: Array<{ imgUrl: string }> = [];
    list.map(item => {
      subImages.push({ imgUrl: `${this.info.imageHost}${item}` });
    });
    return subImages;
  }
}
</script>

<style lang="scss" src="../index.scss" scoped>
</style>