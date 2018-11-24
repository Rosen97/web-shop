<template>
    <div class="profile">
        <header class="user-head">
            <i class="iconfont icon-left" @click="goBack"></i>
            <span>账号管理</span>
            <i class="iconfont icon-More"></i>
        </header>
        <section class="profile-content">
            <h3 class="profile-title">当前登录账号</h3>
            <div class="profile-item info">
                <img src="//img11.360buyimg.com/jdphoto/s50x50_jfs/t1291/121/695557320/451/826741e1/559cd82bN8edc6bc0.png">
                <div>
                    <span class="username">{{userInfo.username}}</span>
                    <span class="email">邮箱：{{userInfo.email}}</span>
                </div>
            </div>
            <router-link tag="div" to="./update-password" class="profile-item">
                <span>修改登录密码</span>
                <i class="iconfont icon-right"></i>
            </router-link>
            <router-link tag="div" to="./update-info" class="profile-item">
                <span>修改个人信息</span>
                <i class="iconfont icon-right"></i>
            </router-link>
            <router-link tag="div" to="./shipping" class="profile-item">
                <span>收货地址管理</span>
                <i class="iconfont icon-right"></i>
            </router-link>
        </section>
        <section class="profile-footer">
            <div class="footer-con">
                <div>
                    <i class="iconfont icon-yijian"></i>
                    <span>意见反馈</span>
                </div>
                <div class="client">
                    <i>MMall</i>
                    <span>客户端</span>
                </div>
                <div class="logout" @click="userLogout">
                    <i class="iconfont icon-40one"></i>
                    <span>退出登录</span>
                </div>
            </div>
            <p class="mmall">MMall</p>
        </section>
    </div>
</template>

<script>
    import {getUserInfo,logout} from "../../service/getData";

    export default {
        data() {
            return {
                userInfo: {}
            }
        },
        created(){
            getUserInfo().then((res)=>{
                this.userInfo = res.data
            })
        },
        methods: {
            userLogout(){
                logout().then(()=>{
                    this.$router.push('./user')
                })
            },
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/style/mixin';
    .profile{
        .user-head{
            @include fj;
            width: 100%;
            height: 88px;
            padding: 0 20px;
            line-height: 88px;
            font-size: 30px;
            @include boxSizing;
            border-bottom: 1px solid #f7f7f7;
            .iconfont{
                font-size: 44px;
            }
        }
        .profile-content{
            width: 100%;
            .profile-title{
                width: 100%;
                padding: 30px;
                @include boxSizing;
                font-weight: normal;
                color: #999;
                border-bottom: 1px solid #f7f7f7;
            }
            .profile-item{
                @extend .profile-title;
                @include fj;
                color: #999;
                font-size: 30px;
                &.info{
                    justify-content: left;
                    img{
                        width: 100px;
                        height: 100px;
                        @include borderRadius(50%);
                    }
                    div{
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        padding-left: 30px;
                        font-size: 30px;
                        color: #666;
                        span:last-child{
                            color: #999;
                        }
                    }
                }
                .iconfont{
                    font-size: 38px;
                }
            }
        }
        .profile-footer{
            width: 100%;
            margin-top: 200px;
            .footer-con{
                display: flex;
                width: 100%;
                div{
                    flex: 1;
                    height: 40px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 26px;
                    color: #333;
                    &.client{
                        line-height: 50px;
                    }
                    &.logout{
                        line-height: 44px;
                    }
                    i{
                        font-style: normal;
                        font-size: 30px;
                        color: #999;
                        &.iconfont{
                            font-size: 44px;
                        }
                    }
                }
            }
            .mmall{
                width: 100%;
                margin-top: 140px;
                text-align: center;
                font-size: 50px;
                color: $red;
            }
        }
    }
</style>
