<template>
    <div class="popup" v-show="popupShow">
        <div class="popup-content">
          <div class="message">
            <i class="iconfont icon-alertwarn"></i>
            <span>{{popupTitle}}</span>
          </div>
          <div class="popup-buttons">
            <span @click="cancelPopup">取消</span>
            <span @click="confirmPopup">确认</span>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
          popupShow: {
            type: Boolean,
            default: false
          },
          popupTitle: {
            type: String,
            default: ''
          }
        },
        methods: {
          cancelPopup(){
            this.$emit('cancelPopup')
          },
          confirmPopup(){
            this.$emit('confirmPopup')
          }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/style/mixin';
    .popup{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
      z-index: 999999;
      .popup-content{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 80%;
        transform: translate(-50%,-50%);
        background: #ffffff;
        @include borderRadius(20px);
        .message{
          display: flex;
          flex-direction: column;
          width: 100%;
          padding: 40px;
          text-align: center;
          @include boxSizing;
          .iconfont{
            font-size: 70px;
            color: $red;
          }
          span{
            padding-top: 20px;
            font-size: 30px;
          }
        }
        .popup-buttons{
          display: flex;
          width: 100%;
          border-top: 1px solid #999;
          span{
            flex: 1;
            height: 100px;
            text-align: center;
            line-height: 100px;
            font-size: 30px;
            &:first-child{
              border-right: 1px solid #999;
              @include boxSizing;
            }
            &:last-child{
              color: $red;
            }
          }
        }
      }
    }
</style>
