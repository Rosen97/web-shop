
<template>
  <div class="modal-wrap">
    <div class="modal-content">
      <div class="title">{{title}}</div>
      <div class="btn-list">
        <span @click="handleClick(false)">取消</span>
        <span @click="handleClick(true)">确定</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Confirm extends Vue {
  @Prop({ default: "" })
  title: string;

  handleClick(bool: boolean) {
    this.$emit("handleClick", bool);
  }
}
</script>

<style scoped lang="scss">
.modal-content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  text-align: center;
  background: #fff;
  border-radius: 20px;
}
.title {
  padding: 50px 0;
  color: #333;
}
.btn-list {
  display: flex;
  width: 100%;
  span {
    flex: 1;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #999;
    border-top: 1px solid #eee;
    border-right: 1px solid #eee;
    &:last-child {
      color: #3e86f7;
      border-right: none;
    }
  }
}
</style>