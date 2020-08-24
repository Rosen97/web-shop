<template>
  <div class="user-menu">
    <router-link
      tag="div"
      :to="item.path"
      class="menu-item"
      v-for="(item, index) in list"
      :key="index"
    >
      <i class="iconfont" :class="item.iconClass"></i>
      <span>{{item.name}}</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State } from "vuex-class";
import { UserInfoProps } from "@/store/home/interface";

interface ItemProps {
  name: string;
  iconClass: string;
  path: string;
}

@Component
export default class HeadInfo extends Vue {
  list: Array<ItemProps> = [
    {
      name: "待付款",
      iconClass: "icon-daifukuan1",
      path: "./order-list?orderType=2"
    },
    {
      name: "待收货",
      iconClass: "icon-daishouhuo1",
      path: "./order-list?orderType=3"
    },
    {
      name: "已完成",
      iconClass: "icon-money",
      path: "./order-list?orderType=4"
    },
    {
      name: "全部订单",
      iconClass: "icon-icon1",
      path: "./order-list?orderType=1"
    }
  ];
}
</script>

<style scoped lang="scss" src="../../index.scss"></style>
