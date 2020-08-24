<template>
  <div class="profile-item info">
    <img
      src="//img11.360buyimg.com/jdphoto/s50x50_jfs/t1291/121/695557320/451/826741e1/559cd82bN8edc6bc0.png"
    />
    <div>
      <span class="username">{{userInfo.username}}</span>
      <span class="email">邮箱：{{userInfo.email}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State } from "vuex-class";
import { UserInfoProps } from "@/store/home/interface";

@Component
export default class ProfileInfo extends Vue {
  @State(state => state.userInfo) userInfo: UserInfoProps;
}
</script>

<style scoped lang="scss" src="../../index.scss"></style>
