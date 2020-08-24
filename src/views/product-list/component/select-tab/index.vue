<template>
  <div class="select-menu">
    <div
      class="select-item"
      :class="item.type === type && 'active'"
      @click="selectOrder(item.type)"
      v-for="item in list"
      :key="item.name"
    >
      {{item.name}}
      <i
        class="iconfont icon-up1"
        :class="item.type === type && 'active'"
        v-if="item.icon"
      ></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class SelectTab extends Vue {
  @Prop({ default: [] })
  list: { name: string; type: string; icon: string };
  @Prop({ default: "default" })
  type: string;
  @Prop({ default: () => {return false} })
  changeTab: Function;

  selectOrder(type: string) {
    this.$emit("changeTab", type);
  }
}
</script>

<style scoped lang="scss" src="../../index.scss"></style>
