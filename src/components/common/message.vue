<template>
    <transition name="fade">
        <div class="message-wrap">
            <p class="message-text">{{messageText}}</p>
        </div>
    </transition>
</template>

<script>
  export default {
    props: {
      messageText: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/style/mixin';
    .message-wrap{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 999999;
      .message-text{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 80%;
        padding: 20px 0;
        text-align: center;
        transform: translate(-50%,-50%);
        font-size: 28px;
        color: #666;
        @include borderRadius(20px);
        background: #EDF2FC;
      }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
