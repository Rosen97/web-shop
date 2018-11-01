<template>
    <div>
      <div class="user-reset-header">
        <i class="iconfont icon-left"></i>
        <span>管理收货地址</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "shipping"
    }
</script>

<style lang="scss" scoped="" type="text/scss">
  @import '../../../common/style/mixin';
  .user-reset-header{
      position: relative;
      width: 100%;
      padding: 25px;
      text-align: center;
      font-size: 36px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      @include border-1px(#999);
      background: #bc;
      i{
          position: absolute;
          left: 20px;
          top: 20px;
          font-size: 54px;
      }
      a{
          position: absolute;
          right: 40px;
      }
  }
</style>
