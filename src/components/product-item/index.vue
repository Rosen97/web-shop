<template>
  <div class="product-item" @click="handleClick">
    <img :src="info.imageHost+info.mainImage" v-if="info.imageHost && info.mainImage" />
    <img src="./product_default.jpg" v-else />
    <div class="product-info">
      <p class="name">{{info.name}}</p>
      <p class="subtitle">{{info.subtitle}}</p>
      <span class="price">￥ {{info.price}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ProductItemProps } from "@/store/product/interface";

@Component
export default class ProductItem extends Vue {
  @Prop({ default: () => ({}) })
  info: ProductItemProps;

  handleClick() {
    this.$emit('jumpDetail', this.info.id)
  }
}
</script>

<style lang="scss" src="./index.scss" scoped>
</style>