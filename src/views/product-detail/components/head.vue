<template>
  <header class="detail-nav">
    <i class="iconfont icon-left" @click="goBack"></i>
    <div class="nav-list">
      <span
        :class="index === navIndex && 'active'"
        @click="handleClick(index)"
        v-for="(item, index) in list"
        :key="item"
      >
        <i class="iconfont icon-location" v-show="navIndex === index"></i>
        {{item}}
      </span>
    </div>
    <i class="iconfont icon-More"></i>
  </header>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Mutation } from "vuex-class";

@Component
export default class ProductHead extends Vue {
  @Prop({ default: 0 })
  navIndex: number;
  @Prop({ default: () => [] })
  list: string[];

  @Mutation("setProductInfo") setProductInfo: Function;
  @Mutation("setDetailShow") setDetailShow: Function;

  goBack() {
    this.setDetailShow(false);
    this.setProductInfo({});
  }
  handleClick(index: number) {
    this.$emit("handleClick", index);
  }
}
</script>

<style lang="scss" src='../index.scss'  scoped>
</style>