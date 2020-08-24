<template>
  <div class="profile-wrap">
    <div class="profile-content">
      <h3 class="profile-title">当前登录账号</h3>
      <ProfileInfo />
      <router-link
        tag="div"
        :to="item.path"
        class="profile-item"
        v-for="item in labelArr"
        :key="item.name"
      >
        <span>{{item.name}}</span>
        <i class="iconfont icon-right"></i>
      </router-link>
    </div>
    <ProfileFoot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { UserInfoProps } from "@/store/home/interface";
import { State } from "vuex-class";
import ProfileInfo from "./component/profile-info/index.vue";
import ProfileFoot from "./component/profile-foot/index.vue";

@Component({
  components: {
    ProfileInfo,
    ProfileFoot
  }
})
export default class User extends Vue {
  labelArr = [
    { name: "修改登录密码", path: "./update-password" },
    { name: "修改个人信息", path: "./update-info" },
    { name: "收货地址管理", path: "./update-shipping" }
  ];

  @State(state => state.userInfo) userInfo: UserInfoProps;
}
</script>

<style scoped lang="scss" src="./index.scss"></style>
