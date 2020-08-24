<template>
  <div class="register-page">
    <div class="register-wrap">
      <div class="register-text" v-for="item in inputArr" :key="item.label">
        <input :type="item.type" :placeholder="item.placeholder" v-model="item.text" />
      </div>
    </div>
    <button class="register-button" :class="judgeIsCanSubmit() && 'active'" @click="handleSubmit">注册</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";

interface InputItemProps {
  label: string;
  type: string;
  text: string;
  placeholder: string;
}

@Component({
  components: {}
})
export default class Register extends Vue {
  inputArr: Array<InputItemProps> = [
    { label: "username", type: "text", text: "", placeholder: "请输入用户名" },
    {
      label: "password",
      type: "password",
      text: "",
      placeholder: "请输入密码"
    },
    { label: "email", type: "text", text: "", placeholder: "请输入邮箱" },
    { label: "phone", type: "text", text: "", placeholder: "请输入手机号" }
  ];

  @Action("toRegister") toRegister: Function;

  judgeIsCanSubmit() {
    for (let i = 0; i < this.inputArr.length; i++) {
      const item = this.inputArr[i];
      if (item.text === "") {
        return false;
      }
    }
    return true;
  }

  handleSubmit() {
    const isCanSubmit = this.judgeIsCanSubmit();

    if (isCanSubmit) {
      const info = {
        username: this.inputArr[0].text,
        password: this.inputArr[1].text,
        email: this.inputArr[2].text,
        phone: this.inputArr[3].text,
        question: "?",
        answer: "?"
      };
      this.toRegister(info);
    }
  }
}
</script>

<style scoped lang="scss" src="./index.scss"></style>
