<template>
  <div id="app">
    <PageHead
      :title="$route.meta.title"
      :className="$route.meta.headColor"
      v-show="!$route.meta.isHidden"
    />
    <main class="page-container" :key="$route.fullPath">
      <router-view />
    </main>
    <Menu v-if="menuShow"></Menu>
    <Modal v-show="loginShow">
      <Confirm title="用户未登录或已超时，请先登录！" @handleClick="handleClick"></Confirm>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PageHead from "./components/page-head/index.vue";
import Menu from "./components/menu/index.vue";
import Modal from "./components/modal/index.vue";
import Confirm from "./components/confirm/index.vue";

@Component({
  components: {
    PageHead,
    Menu,
    Modal,
    Confirm
  }
})
export default class App extends Vue {
  menuList: string[] = ["Home", "ShopBar", "User"];
  loginShow = false;

  get menuShow() {
    return this.menuList.includes(this.$route.name || "");
  }

  created() {
    window.toLogin = () => {
      this.loginShow = true;
    };
    window.router = this.$router
  }

  handleClick(bool: boolean) {
    this.loginShow = false;
    bool && this.$router.push({ name: "Login" });
  }
}
</script>
