<template>
  <div class="modal-wrap">
    <slot>modal</slot>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Modal extends Vue {}
</script>

<style scoped lang="scss">
.modal-wrap {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 20;
  background: rgba($color: #000000, $alpha: 0.1);
}
</style>
