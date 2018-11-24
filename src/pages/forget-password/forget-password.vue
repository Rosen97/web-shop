<template>
    <div>
        <m-header :mTitle="'忘记密码'"></m-header>
        <section class="page">
            <div class="forget-content slide-username" v-show="usernameShow">
                <input type="text" placeholder="请输入用户名" v-model="username" />
                <button @click="usernameNext" :class="{'active' : removeSpace(username)}">下 一 步</button>
            </div>
            <div class="forget-content slide-question" v-show="answerShow">
                <p>密码提示问题是：<span>{{questionText}}</span>
                </p>
                <div>
                    <span>请输入答案:</span>
                    <input type="text" placeholder="请输入密码提示问题答案" v-model="answer" />
                </div>
                <button @click="answerNext" :class="{'active' : removeSpace(answer)}">下 一 步</button>
            </div>
            <div class="forget-content slide-password" v-show="passwordShow">
                <div>
                    <input type="password" placeholder="请重置密码" v-model="password" />
                </div>
                <button @click="passwordSubmit" :class="{'active' : removeSpace(password)}">提 交</button>
            </div>
        </section>
    </div>
</template>

<script>
    import mHeader from 'components/common/m-header'
    import {removeSpace,formValidate} from "../../common/js/util";
    import {getQuestion,submitAnswer,forgetResetPassword} from "../../service/getData";

    export default {
        data() {
            return {
                username: '',
                answer: '',
                password: '',
                questionText: '',
                forgetToken: '',
                usernameShow: true,
                answerShow: false,
                passwordShow: false
            }
        },
        methods: {
            usernameNext(){
                if(!formValidate(this.username,'require')){
                    return
                }
                getQuestion(this.username).then((res)=>{
                    this.usernameShow = false
                    this.answerShow = true
                    this.questionText = res.data
                })
            },
            answerNext(){
                if(!formValidate(this.answer,'require')){
                    return
                }
                let params = {
                    username: this.username,
                    question: this.questionText,
                    answer: this.answer
                }
                submitAnswer(params).then((res)=>{
                    this.forgetToken = res.data
                    this.usernameShow = false
                    this.answerShow = false
                    this.passwordShow = true
                })
            },
            passwordSubmit(){
                if(!formValidate(this.password,'require')){
                    return
                }
                let params = {
                    username: this.username,
                    passwordNew: this.password,
                    forgetToken: this.forgetToken
                }
                forgetResetPassword(params).then(()=>{
                    alert('重置密码成功')
                    this.$router.push('./login')
                })
            },
            removeSpace(value){
                return removeSpace(value)
            }
        },
        components: {
            mHeader
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/style/mixin';
    .forget-content{
        width: 100%;
        margin-top: 100px;
        &.slide-question{
            div {
                display: flex;
                flex-direction: column;
                span{
                    padding: 10px 0 20px 0;
                    font-size: 30px;
                }
            }
        }
        p{
            padding-bottom: 20px;
            color: #000;
            font-size: 34px;
        }
        input{
            width: 100%;
            height: 60px;
            padding: 10px 0;
            margin-right: 20px;
            line-height: 60px;
            color: #222;
            font-size: 32px;
            text-indent: 20px;
            border: 1px solid #dcdcdc;
        }
        button{
            width: 100%;
            height: 80px;
            margin-top: 80px;
            text-align: center;
            line-height: 80px;
            color: #fff;
            font-size: 32px;
            background: rgba(246,53,21,.5);
            @include borderRadius(60px);
            &.active{
                background: rgb(246,53,21)
            }
        }
    }
</style>
