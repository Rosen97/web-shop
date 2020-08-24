<template>
  <div class="category-header wrap">
    <i class="iconfont icon-left" @click="$router.back()"></i>
    <div class="header-search">
      <i class="iconfont icon-search"></i>
      <input type="text" class="search-title" @input="changeInput($event)" />
    </div>
    <span class="search-btn" @click="handleSearch">搜索</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class SearchHead extends Vue {
  @Prop({ default: "" })
  keyword: string;

  handleSearch() {
    this.$emit("handleSearch");
  }

  changeInput(evt: any) {
    this.$emit("changeInput", evt.target.value);
  }
}
</script>

<style scoped lang="scss" src="../../index.scss"></style>
