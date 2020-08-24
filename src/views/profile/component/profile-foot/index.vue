<template>
  <div class="profile-footer">
    <div class="footer-con">
      <div>
        <i class="iconfont icon-yijian"></i>
        <span>意见反馈</span>
      </div>
      <div class="client">
        <i>MMall</i>
        <span>客户端</span>
      </div>
      <div class="logout" @click="toLogout">
        <i class="iconfont icon-40one"></i>
        <span>退出登录</span>
      </div>
    </div>
    <p class="mmall">MMall</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import {Action} from 'vuex-class';

@Component
export default class ProfileFoot extends Vue {
  @Action('toLogout') toLogout: Function
}
</script>

<style scoped lang="scss" src="../../index.scss"></style>
