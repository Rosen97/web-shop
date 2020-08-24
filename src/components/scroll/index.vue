<template>
  <div class="scroll-container" ref="scrollContainer">
    <div class="scroll-con" ref="scrollWrap">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import BScroll from "better-scroll";

@Component
export default class Scroll extends Vue {
  isLoading = false;

  // 监听滚动
  handleScroll = (pos) => {
    if (this.isLoading) return;
    const scrollContainer = this.$refs.scrollContainer;
    const scrollWrap = this.$refs.scrollWrap;
    // 下拉加载
    if (scrollWrap.clientHeight + pos.y <= scrollContainer.clientHeight + 10) {
      this.isLoading = true;
      this.$emit("loadMore", () => {
        this.isLoading = false;
      });
    }
  };
  mounted() {
    const scroller = new BScroll(this.$refs.scrollContainer, {
      scrollY: true,
      probeType: 3,
      click: true,
      bounce: {
        top: true,
        bottom: true
      }
    });
    if (!scroller) return;
    scroller.on("scroll", this.handleScroll);
  }
}
</script>

<style>
.scroll-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>