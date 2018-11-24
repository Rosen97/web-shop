<template>
    <div class="update-info">
        <header class="user-head">
            <i class="iconfont icon-left" @click="goBack"></i>
            <span>个人信息</span>
            <i class="iconfont icon-More"></i>
        </header>
        <section class="user-info">
            <div class="user-item">
                <span>昵称：</span>
                <span class="username">{{userInfo.username}}</span>
            </div>
            <div class="user-item" data-type="email" data-title="邮箱" @click="showWrap">
                <span>邮箱：</span>
                <div>
                    <span>{{userInfo.email}}</span>
                    <i class="iconfont icon-right"></i>
                </div>
            </div>
            <div class="user-item" data-type="phone" data-title="手机号" @click="showWrap">
                <span>手机号：</span>
                <div>
                    <span>{{userInfo.phone}}</span>
                    <i class="iconfont icon-right"></i>
                </div>
            </div>
            <div class="user-item" data-type="question" data-title="密保问题" @click="showWrap">
                <span>密保问题：</span>
                <div>
                    <span>{{userInfo.question}}</span>
                    <i class="iconfont icon-right"></i>
                </div>
            </div>
            <div class="user-item" data-type="answer" data-title="密保问题答案" @click="showWrap">
                <span>密保问题答案：</span>
                <div>
                    <span>{{userInfo.answer}}</span>
                    <i class="iconfont icon-right"></i>
                </div>
            </div>
        </section>
        <transition name="slide">
            <section class="update-wrap" v-show="updateWrap">
                <div class="user-head">
                    <i class="iconfont icon-left" @click="closeWrap"></i>
                    <span>修改{{updateTitle}}</span>
                    <span @click="saveInfo">完成</span>
                </div>
                <input type="text" v-model="updateText" placeholder="编辑信息" class="update-text" />
            </section>
        </transition>
    </div>
</template>

<script>
    import {getUserInfo,updateInfo} from "../../service/getData";

    export default {
        data() {
            return {
                userInfo: {},
                updateType: '',
                updateTitle: '',
                updateText: '',
                updateWrap: false
            }
        },
        created(){
            this.init()

        },
        methods: {
            init(){
                getUserInfo().then((res)=>{
                    this.userInfo = res.data
                })
            },
            showWrap(e){
                let $title = e.currentTarget.getAttribute('data-title'),
                    $type = e.currentTarget.getAttribute('data-type')
                this.updateWrap = true
                this.updateType = $type
                this.updateTitle = $title
                this.updateText = this.userInfo[$type]
            },
            saveInfo(){
                this.userInfo[this.updateType] = this.updateText
                updateInfo(this.userInfo).then(()=>{
                    this.updateWrap = false
                    this.init()
                })
            },
            closeWrap(){
                this.updateWrap = false
            },
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/style/mixin';
    .update-info{
        .user-head{
            @include fj;
            width: 100%;
            height: 88px;
            padding: 0 20px;
            line-height: 88px;
            font-size: 30px;
            @include boxSizing;
            border-bottom: 1px solid #e8e8e8;
            .iconfont{
                font-size: 44px;
            }
        }
        .user-info{
            width: 100%;
            .user-item{
                @include fj;
                width: 100%;
                padding: 30px;
                @include boxSizing;
                color: #333333;
                font-size: 30px;
                border-bottom: 1px solid #e8e8e8;
                .iconfont{
                    font-size: 36px;
                }
                .username{
                    padding-right: 44px;
                }
            }
        }
        .update-wrap{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            background: #eee;
            .user-head{
                background: #fff;
            }
            input{
                width: 100%;
                margin-top: 60px;
                padding: 30px 0;
                font-size: 30px;
                text-indent: 40px;
                background: #fff;
            }
        }
        .slide-enter-active,.slide-leave-active{
            transition: all 0.5s;
        }
        .slide-enter,.slide-leave-to{
            transform: translate3d(100%,0,0);
        }
    }
</style>
