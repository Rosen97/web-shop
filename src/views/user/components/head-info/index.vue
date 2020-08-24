<template>
  <div class="user-info">
    <div class="info">
      <img
        src="//img11.360buyimg.com/jdphoto/s120x122_jfs/t5683/191/7076936752/5123/834e5571/596dd62bN7a8affc5.png"
      />
      <div>
        <p>{{userInfo.username}}</p>
        <span class="name">用户名：{{userInfo.username}}</span>
        <span>{{userInfo.phone}}</span>
      </div>
      <router-link to="./profile" class="account-management">
        <i class="iconfont icon-shezhi"></i>账号管理
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State } from "vuex-class";
import { UserInfoProps } from "@/store/home/interface";

@Component
export default class HeadInfo extends Vue {
  @State(state => state.userInfo) userInfo: UserInfoProps;
}
</script>

<style scoped lang="scss" src="../../index.scss"></style>
