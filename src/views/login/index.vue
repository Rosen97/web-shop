<template>
  <section class="login-wrap">
    <div class="login-content">
      <div class="login-text">
        <input v-model="username" type="text" placeholder="用户名/邮箱/已验证手机" />
      </div>
      <div class="login-text">
        <input v-model="password" type="password" placeholder="请输入密码" />
      </div>
      <div class="login-error"></div>
      <button class="login-button" :class="isCanSubmit && 'active'" @click="loginSubmit">登 录</button>
      <div class="quick-nav">
        <router-link tag="span" to="./register">快速注册</router-link>
        <router-link tag="span" to="./forget-password">忘记密码</router-link>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component({
  components: {}
})
export default class Login extends Vue {
  username = "";
  password = "";

  get isCanSubmit() {
    return this.username && this.password;
  }

  @Action("toLogin") toLogin: Function;

  // 登录
  async loginSubmit() {
    if (!this.username.trim() || !this.password.trim()) return;
    this.toLogin({ username: this.username, password: this.password });

    // const info = await this.$App.api.toLogin({username: this.username, password: this.password});
    // this.$store.commit('setStatus', true);
    // this.$store.commit('setUserInfo', info.data);
    // this.$router.back();
  }
}
</script>

<style scoped lang="scss" src="./index.scss"></style>
