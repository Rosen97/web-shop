<template>
    <div class="update-password">
        <header class="user-head">
            <i class="iconfont icon-left" @click="goBack"></i>
            <span>账号管理</span>
            <i class="iconfont icon-More"></i>
        </header>
        <section class="update-form">
            <div class="password-item">
                <span>输入旧密码</span>
                <div class="password-text">
                    <input @mouseenter="focusText"
                           @mouseleave="blurText" type="password" placeholder="请输入旧密码" class="old-password" v-model="oldPassword" />
                    <div>
                        <i class="iconfont icon-close" v-show="oldClose" data-close="oldPassword" @click="clearText"></i>
                    </div>
                </div>
            </div>
            <div class="password-item">
                <span>设置新的登录密码</span>
                <div class="password-text">
                    <input @mouseenter="focusText"
                           @mouseleave="blurText" type="password" ref="passwordText" placeholder="6-20位数字 / 字母 / 字符组合" class="new-password" v-model="newPassword" />
                    <div>
                        <i class="iconfont icon-close" v-show="newClose" data-close="newPassword" @click="clearText"></i>
                        <i class="iconfont icon-eye1 eye" @click="changeType" v-if="!passwordType"></i>
                        <i class="iconfont icon-eye eye" @click="changeType" v-else></i>
                    </div>
                </div>
            </div>
            <p class="err-msg">{{errMsg}}</p>
            <button class="password-submit" :class="{'active' : removeSpace(oldPassword)&&removeSpace(newPassword)}" @click="submitPassword">确认</button>
        </section>
        <message v-show="isMessage" :message-text="messageText"></message>
    </div>
</template>

<script>
    import message from '../../components/common/message'
    import {removeSpace} from "../../common/js/util";
    import {updatePassword,logout} from "../../service/getData";

    export default {
        data(){
            return {
                oldPassword: '',
                newPassword: '',
                oldClose: false,
                newClose: false,
                errMsg: '',
                passwordType: 0,
                messageText: '',
                isMessage: false
            }
        },
        methods: {
            focusText(e){
                let $className = e.currentTarget.className
                console.log($className)
                $className === 'old-password' ? this.oldClose = true : this.newClose = true
            },
            blurText(e){
                let $className = e.currentTarget.className
                $className === 'old-password' ? this.oldClose = false : this.newClose = false
            },
            clearText(e){
                let $close = e.currentTarget.getAttribute('data-close')
                this[$close] = ''
            },
            changeType(){
                let $type = this.$refs.passwordText.getAttribute('type'),
                    value = ''
                console.log($type)
                $type === 'password' ? value = 'text' : value = 'password'
                this.$refs.passwordText.setAttribute('type',value)
                this.passwordType = !this.passwordType
            },
            removeSpace(value){
                return removeSpace(value)
            },
            submitPassword(){
                let params = {
                    username: '',

                }
                if(!removeSpace(this.oldPassword) || !removeSpace(this.newPassword)){
                    return
                }
                if(!/^[a-zA-Z0-9\x21-\x7e]{6,20}$/.test(this.newPassword)){
                    this.errMsg = '密码格式不对'
                    return
                }
                this.errMsg = ''
                updatePassword(this.oldPassword,this.newPassword).then((res)=>{
                    this.showMessage()
                    setTimeout(()=>{
                        logout().then(()=>{
                            this.$router.push('./user')
                        })
                    },1300)
                })
            },
            showMessage() {
                this.isMessage = true
                this.messageText = '更新密码成功！'
                setTimeout(() => {
                    this.isMessage = false
                }, 1200)
            },
            goBack(){
                this.$router.go(-1)
            }
        },
        components: {
            message
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/style/mixin';
    .update-password{
        background: #F5F5F5;
        .user-head{
            @include fj;
            width: 100%;
            height: 88px;
            padding: 0 20px;
            line-height: 88px;
            font-size: 30px;
            @include boxSizing;
            background: #fff;
            .iconfont{
                font-size: 44px;
            }
        }
        .update-form{
            width: 100%;
            padding: 0 40px;
            margin-top: 80px;
            @include boxSizing;
            .password-item{
                display: flex;
                flex-direction: column;
                width: 100%;
                margin-top: 20px;
                font-size: 28px;
                span{
                    padding-bottom: 20px;
                }
                .password-text{
                    @include fj;
                    width: 96%;
                    padding: 30px 2%;
                    background: #fff;
                    input{
                        width: 60%;
                        height: 40px;
                        line-height: 40px;
                        font-size: 30px;
                    }
                    div{
                        line-height: 40px;
                        .iconfont{
                            font-size: 26px;
                            color: #CCCCCC;
                            &.icon-close{
                                padding-top: 6px;
                            }
                            &.eye{
                                padding: 0 30px;
                                font-size: 40px;
                            }
                        }
                    }
                }
            }
            .err-msg{
                height: 40px;
                line-height: 40px;
                padding-top: 20px;
                color: $red;
                font-size: 28px;
            }
            .password-submit{
                width: 100%;
                height: 90px;
                margin-top: 100px;
                text-align: center;
                line-height: 90px;
                color: #fff;
                font-size: 30px;
                background: $red;
                background: rgba(246,53,21,.5);
                @include borderRadius(20px);
                &.active{
                    background: rgb(246,53,21)
                }
            }
        }
    }
</style>
