<template>
  <div class="nav-bar">
    <ul class="nav-list">
      <li
        class="nav-list-item"
        :class="$route.name === item.label && 'active'"
        v-for="item in menuList"
        :key="item.label"
        @click="menuClick(item)"
      >
        <i class="iconfont" :class="item.iconClass"></i>
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { State } from "vuex-class";

interface MenuItemProps {
  name: string;
  iconClass: string;
  label: string;
  isRequireLogin?: boolean;
}

@Component
export default class PageHead extends Vue {
  menuList: Array<MenuItemProps> = [
    {
      name: "首页",
      iconClass: "icon-home",
      label: "Home"
    },
    {
      name: "购物车",
      iconClass: "icon-gouwuche",
      label: "ShopCar"
    },
    {
      name: "我的",
      iconClass: "icon-iconyonghu",
      label: "User",
      isRequireLogin: true
    }
  ];

  @State(state => state.loginStatus ) loginStatus: boolean

  menuClick(item: MenuItemProps) {
    // 涉及用户信息 需要登陆
    if (item.isRequireLogin && !this.loginStatus) {
      return window.toLogin && window.toLogin();
    }

    this.$router.push({ name: item.label });
  }
}
</script>

<style scoped lang="scss" src="./index.scss"></style>