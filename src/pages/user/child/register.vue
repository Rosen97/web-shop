<template>
  <div>
    <user-header :headerTitle="'注册'"></user-header>
    <div class="main-icon">LUNAR</div>
    <div class="login-form">
      <div class="login-form-item">
        <input class="register-username" placeholder="请输入账户名" v-model="requestData.username"
               @mouseenter="inputEnter($event)" @mouseleave="inputLeave($event)" />
        <i class="iconfont icon-delete1" v-show="clear.username" @click="clearText($event)" data-type="username"></i>
      </div>
      <div class="login-form-item">
        <input class="register-password" placeholder="请输入密码" v-model="requestData.password"
               @mouseenter="inputEnter($event)" @mouseleave="inputLeave($event)"/>
        <i class="iconfont icon-delete1" v-show="clear.password" @click="clearText($event)" data-type="password"></i>
      </div>
      <div class="login-form-item">
        <input class="register-confirm-password" placeholder="请再次输入密码" v-model="confirmPassword"
               @mouseenter="inputEnter($event)" @mouseleave="inputLeave($event)"/>
        <i class="iconfont icon-delete1" v-show="clear.confirmPassword" @click="clearText($event)" data-type="confirmPassword"></i>
      </div>
      <div class="login-form-item">
        <input class="register-phone" placeholder="请输入手机号" v-model="requestData.phone"
               @mouseenter="inputEnter($event)" @mouseleave="inputLeave($event)"/>
        <i class="iconfont icon-delete1" v-show="clear.phone" @click="clearText($event)" data-type="phone"></i>
      </div>
      <div class="other-edit">
        <router-link tag="a" to="./login">立即去登陆</router-link>
      </div>
      <button class="login-btn" @click="registerSubmit"
              :class="{'active' : requestData.username&&requestData.password&&confirmPassword&&requestData.password===confirmPassword&&requestData.phone}">注册</button>
    </div>
  </div>
</template>

<script>
  import userHeader from 'components/user/userHeader'
  export default {
    data() {
      return {
        requestData: {
          username: '',
          password: '',
          email: '',
          phone: '',
          question: '',
          answer: ''
        },
        confirmPassword: '',
        clear: {
          username: false,
          password: false,
          confirmPassword: false,
          phone: false
        }
      }
    },
    methods: {
      registerSubmit(){
        if(!this.requestData.username || !this.requestData.password || !this.confirmPassword
          || !this.requestData.phone || this.requestData.password != this.confirmPassword){
          return
        }
        this.$http('/api/user/register.do',{
          username: this.requestData.username,
          password: this.requestData.password,
          email: 'xxxxx@qq.com',   //不能传空邮箱
          phone: this.requestData.phone,
          question: '',
          answer: ''
        },'POST').then((res)=>{
          console.log(res)
        })
      },
      clearText(e){
        let $type = e.target.getAttribute('data-type')
        switch($type){
          case 'username':
            this.requestData.username = ''
            break
          case 'password':
            this.requestData.password = ''
            break
          case 'confirmPassword':
            this.confirmPassword = ''
            break
          case 'phone':
            this.requestData.phone = ''
            break
        }
      },
      inputEnter(e){
        this.changeDelete(e.target.className,true)
      },
      inputLeave(e){
        this.changeDelete(e.target.className,false)
      },
      changeDelete(className,isShow){
        switch(className){
          case 'register-username':
            this.clear.username = isShow
            break
          case 'register-password':
            this.clear.password = isShow
            break
          case 'register-confirm-password':
            this.clear.confirmPassword = isShow
            break
          case 'register-phone':
            this.clear.phone = isShow
            break
        }
      }
    },
    components: {
      userHeader
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import '../../../common/style/mixin';
  .main-icon{
    width: 160px;
    height: 160px;
    margin: 60px auto;
    text-align: center;
    line-height:160px;
    font-size: 40px;
    color: #fff;
    @include borderRadius(50%);
    background: #FE6700;
  }
  .login-form{
    width: 100%;
    padding: 0 40px;
    box-sizing: border-box;
    .login-form-item{
      display: flex;
      width: 100%;
      margin-top: 30px;
      @include border-1px(#999);
      input{
        width: 90%;
        height: 80px;
        font-size: 30px;
      }
      .iconfont{
        text-align: right;
        width: 10%;
        height: 80px;
        line-height: 80px;
        font-size: 25px;
        color: #999;
      }
      .icon-eye{
        font-size: 40px;
      }
    }
    .other-edit{
      width: 100%;
      padding: 40px 0;
      text-align: right;
      a{
        font-size: 30px;
        margin-left: 20px;
      }
    }
    .login-btn{
      width: 90%;
      height: 70px;
      margin: 30px 5% 0 5%;
      line-height: 70px;
      color: #fff;
      font-size: 30px;
      background: rgba(254,103,0,.5);
      @include borderRadius(20px);
      &.active{
        background: rgba(254,103,0,1);
      }
    }
  }
</style>
