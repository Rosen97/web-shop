<template>
  <div class="floor-list">
    <div class="floor-wrap" v-for="floor in list" :key="floor.headUrl">
      <img class="floor-head" :src="floor.headUrl" />
      <div class="floor-content">
        <div class="floor-category" v-for="category in floor.list" :key="category.title">
          <p>{{category.title}}</p>
          <p>{{category.desc}}</p>
          <div class="floor-products">
            <img
              :src="product.imgUrl"
              v-for="product in category.products"
              :key="product.categoryId"
              @click="selectCategory(product.categoryId)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

interface FloorItemProps {
  headUrl: string;
  list: Array<{
    title: string;
    desc: string;
    products: Array<{ imgUrl: string; categoryId: number }>;
  }>;
}

@Component
export default class Floor extends Vue {
  @Prop({ default: [] })
  list: Array<FloorItemProps>;
}
</script>

<style lang="scss" src="./index.scss" scoped></style>
