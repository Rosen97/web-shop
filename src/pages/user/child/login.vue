<template>
  <div>
    <user-header></user-header>
    <div class="main-icon">LUNAR</div>
    <div class="login-form">
      <div class="login-form-item">
        <input class="login-username" type="text" placeholder="请输入账户名" v-model="username"
               @mouseenter="inputEnter($event)" @mouseleave="inputLeave($event)" />
        <i class="iconfont icon-delete1" @click="clearText($event)" data-type="username" v-show="clearUsername"></i>
      </div>
      <div class="login-form-item">
        <input class="login-password" type="password" placeholder="请输入密码" v-model="password"
               @mouseenter="inputEnter($event)" @mouseleave="inputLeave($event)" ref="password" />
        <i class="iconfont icon-delete1" @click="clearText($event)" data-type="password"  v-show="clearPassword"></i>
        <i class="iconfont icon-eye" :class="{'active' : eyeIsActive}" @click="showPassword"></i>
      </div>
      <div class="other-edit">
        <router-link tag="a" to="./register">注册</router-link>
        <a>忘记密码</a>
      </div>
      <button class="login-btn" @click="loginSubmit" :class="{'active' : username&&password}">登录</button>
    </div>
    <popup v-show="errorShow">
      <div class="login-error">
        <p>用户名或者密码不正确</p>
        <div>
          <span @click="hideError">确定</span>
          <span>找回密码</span>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
  import userHeader from 'components/user/userHeader'
  import popup from 'components/common/popup'
  import {mapState, mapMutations} from 'vuex'
  export default {
    data() {
      return {
        username: '',
        password: '',
        clearUsername: false,
        clearPassword: false,
        eyeIsActive: false,
        errorShow: false
      }
    },
    computed: {
      ...mapState({
        loginName: state => state.loginName
      })
    },
    methods: {
      ...mapMutations([
        'RECORD_USERINFO'
      ]),
      loginSubmit(){
        if(!this.username || !this.password){
          return
        }
        this.$http('/api/user/login.do',{
          username: this.username,
          password: this.password
        },'POST').then((res)=>{
          this.RECORD_USERINFO(res.username)
          this.$router.go(-1)
        })
      },
      clearText(e){
        let $type = e.target.getAttribute('data-type')
        $type === 'username' ? this.username = '' : this.password = ''
      },
      showPassword(){
        if(this.$refs.password.type === 'password'){
          this.$refs.password.type = 'text'
          this.eyeIsActive = true
        }else{
          this.$refs.password.type = 'password'
          this.eyeIsActive = false
        }
      },
      inputEnter(e){
        this.changeDelete(e.target.className,true)
      },
      inputLeave(e){
        this.changeDelete(e.target.className,false)
      },
      changeDelete(className,isShow){
        className === 'login-username' ? this.clearUsername = isShow : this.clearPassword = isShow
      },
      hideError(){
        this.errorShow = false
      }
    },
    components: {
      userHeader,
      popup
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
    padding: 0 20px;
    box-sizing: border-box;
    .login-form-item{
      @include fj;
      width: 100%;
      margin-top: 60px;
      @include border-1px(#999);
      input{
        height: 60px;
        line-height: 60px;
        font-size: 30px;
      }
      input.login-username{
        width: 90%;
      }
      input.login-password{
        width: 80%;
      }
      .iconfont{
        text-align: right;
        width: 10%;
        height: 60px;
        line-height: 60px;
        font-size: 25px;
        color: #999;
      }
      .icon-eye{
        font-size: 40px;
      }
      .icon-eye.active{
        color: #333;
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
      @include borderRadius(40px);
      &.active{
        background: rgba(254,103,0,1);
      }
    }
  }
  .login-error{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 80%;
    height: 240px;
    margin-left: -40%;
    margin-top: -120px;
    @include borderRadius(20px);
    background: #fff;
    p{
      width: 100%;
      height: 140px;
      text-align: center;
      line-height: 140px;
      font-size: 42px;
      @include border-1px(#999);
    }
    div{
      width: 100%;
      height: 100px;
      display: flex;
      span{
        flex: 1;
        text-align: center;
        line-height: 100px;
        font-size: 40px;
        color: #218BFD;
        box-sizing: border-box;
        &:first-child{
          border-right: 1px solid #999;
        }
      }
    }
  }
</style>
