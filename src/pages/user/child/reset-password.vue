<template>
    <div class="reset-password">
        <user-header :headerTitle="'修改密码'"></user-header>
        <div class="reset-password-con">
            <div class="reset-password-form">
                <div>
                    <span>请输入当前密码</span>
                    <input type="password" class="password-old" placeholder="请输入当前密码" v-model="passwordOld"
                           @mouseenter="inputEnter($event)" @mouseleave="inputLeave($event)" />
                    <i class="iconfont icon-delete1" :class="{'hidden' : !clearPasswordOld}" @click="clearText($event)" data-type="password-old"></i>
                </div>
                <div>
                    <span>确认新密码</span>
                    <input type="password" class="password-new" placeholder="确认新密码" v-model="passwordNew"
                           @mouseenter="inputEnter($event)" @mouseleave="inputLeave($event)" />
                    <i class="iconfont icon-delete1" :class="{'hidden' : !clearPasswordNew}" @click="clearText($event)" data-type="password-new"></i>
                </div>
            </div>
            <div class="reset-password-bottom">
                <p>必须是6-20个英文字母、数字或符号(除空格)，且字母、数字和标点符号至少包含两种</p>
                <button @click="resetPassword">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
    import userHeader from 'components/user/userHeader'
    export default {
        data() {
            return {
                passwordOld: '',
                passwordNew: '',
                clearPasswordOld: false,
                clearPasswordNew: false
            }
        },

        methods: {
            resetPassword(){
                if(!this.passwordOld || !this.passwordNew){
                    alert('请输入当前密码和新密码')
                    return
                }
                this.$http('/api/user/reset_password.do',{
                    passwordOld: this.passwordOld,
                    passwordNew: this.passwordNew
                },'POST').then(()=>{
                    alert('更改密码成功')
                    this.$router.push('/user/login')
                })
            },
            inputEnter(e){
                this.changeDelete(e.target.className,true)
            },
            inputLeave(e){
                this.changeDelete(e.target.className,false)
            },
            changeDelete(className,isShow){
                className === 'password-old' ? this.clearPasswordOld = isShow : this.clearPasswordNew = isShow
            },
            clearText(e){
                let $type = e.currentTarget.getAttribute('data-type')
                $type === 'password-old' ? this.passwordOld = '' : this.passwordNew = ''
            }
        },
        components: {
            userHeader
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../../common/style/mixin';
    .reset-password{
        width: 100%;
        background: #eee;
        .reset-password-con{
            width: 100%;
            .reset-password-form{
                width: 100%;
                background: #eee;
                div{
                    @include fj;
                    width: 100%;
                    margin: 0 0 20px 0;
                    padding: 30px;
                    font-size: 30px;
                    box-sizing: border-box;
                    background: #fff;
                    span{
                        flex: 3;
                    }
                    input{
                        flex: 5;
                        font-size: 30px;
                    }
                    i{
                        flex: 1;
                        font-size: 40px;
                        color: #e8e8e8;
                        &.hidden{
                            opacity: 0;
                        }
                    }
                }
            }
            .reset-password-bottom{
                width: 100%;
                padding: 0 30px;
                font-size: 30px;
                box-sizing: border-box;
                p{
                    color: #666;
                }
                button{
                    width: 100%;
                    height: 80px;
                    margin-top: 80px;
                    text-align: center;
                    line-height: 80px;
                    color: #fff;
                    font-size: 30px;
                    background: $orange;
                }
            }
        }
    }
</style>
