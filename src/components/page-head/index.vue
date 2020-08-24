<template>
  <div class="page-header" :class="className">
    <div class="left" @click="goBack" :class="className">
      <img :src="leftBg[className]" alt />
    </div>
    <div class="title" :class="className">{{title}}</div>
    <div class="right"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class PageHead extends Vue {
  leftBg = {
    normal: require("./assets/left-normal.png"),
    white: require("./assets/left-white.png")
  };

  @Prop({ default: "" })
  title: string;
  @Prop({ default: "normal" })
  className: string;

  goBack() {
    this.$router.back();
  }
}
</script>

<style scoped lang="scss" src="./assets/index.scss"></style>