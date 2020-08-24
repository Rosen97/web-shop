<template>
  <div class="product-detail">
    <ProductHead :navIndex="navIndex" :list="navList" @handleClick="navClick" />
    <DetailCon :info="currentProduct" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ProductHead from "./components/head.vue";
import DetailCon from "./components/detail-con.vue";
import { State } from "vuex-class";
import { ProductDetailProps } from "@/store/product/interface";

@Component({
  components: {
    ProductHead,
    DetailCon
  }
})
export default class ProductDetail extends Vue {
  navIndex = 0;
  navList = ["商品", "商品详情", "商品推荐"];

  @State(state => state.currentProduct) currentProduct: ProductDetailProps;

  navClick(index: number) {
    this.navIndex = index;
  }
}
</script>

<style lang="scss" src="./index.scss" scoped>
</style>