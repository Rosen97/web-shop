<template>
    <div class="user-box">
        <div class="user-reset">
            <div class="user-reset-header">
                <i class="iconfont icon-left" @click="goBack"></i>
                <span>设置</span>
            </div>
            <div class="user-reset-item">
                <p>账号信息</p>
                <ul>
                    <li @click="showInfo">
                        <span>个人资料</span>
                        <div>
                            <span v-text="userInfo.username"></span>
                            <i class="iconfont icon-right"></i>
                        </div>
                    </li>
                    <router-link tag="li" to="/user/shipping">
                        <span>收货地址</span>
                        <div><i class="iconfont icon-right"></i></div>
                    </router-link>
                </ul>
            </div>
            <div class="user-reset-item">
                <p>账号安全</p>
                <ul>
                    <router-link tag="li" to="/user/reset-password">
                        <span>修改密码</span>
                        <div><i class="iconfont icon-right"></i></div>
                    </router-link>
                </ul>
            </div>
            <div class="user-reset-item">
                <p>关于</p>
                <ul>
                    <li>
                        <span>清空缓存</span>
                        <div><i class="iconfont icon-right"></i></div>
                    </li>
                </ul>
            </div>
            <p class="logout" @click="logout">退出当前账号</p>
        </div>
        <div class="user-info" v-show="infoShow">
            <div class="user-reset-header">
                <i class="iconfont icon-left" @click="hideInfo"></i>
                <span>个人资料</span>
            </div>
            <ul>
                <li>
                    <span>头像</span>
                    <div>
                        <span>hedong</span>
                    </div>
                </li>
                <li>
                    <span>用户名</span>
                    <div>
                        <span v-text="userInfo.username"></span>
                    </div>
                </li>
                <li @click="showEdit($event)" data-info="phone">
                    <span>手机号</span>
                    <div>
                        <span v-text="userInfo.phone"></span>
                        <i class="iconfont icon-right"></i>
                    </div>
                </li>
                <li @click="showEdit($event)" data-info="email">
                    <span>邮箱</span>
                    <div>
                        <span v-text="userInfo.email"></span>
                        <i class="iconfont icon-right"></i>
                    </div>
                </li>
                <li @click="showEdit($event)" data-info="question">
                    <span>密码提示问题</span>
                    <div>
                        <span v-text="userInfo.question"></span>
                        <i class="iconfont icon-right"></i>
                    </div>
                </li>
                <li @click="showEdit($event)" data-info="answer">
                    <span>提示问题答案</span>
                    <div>
                        <span v-text="userInfo.answer"></span>
                        <i class="iconfont icon-right"></i>
                    </div>
                </li>
            </ul>
            <div class="edit-info" v-show="editShow">
                <div class="user-reset-header">
                    <i class="iconfont icon-left" @click="hideEdit"></i>
                    <span>修改昵称</span>
                    <a @click="confirmEdit">完成</a>
                </div>
                <input v-model="editText" />
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
        data() {
            return {
                userInfo: {
                    username: '',
                    phone: '',
                    email: '',
                    question: '',
                    answer: ''
                },
                editText: '',
                editType:'',
                infoShow: false,
                editShow: false
            }
        },
        computed: {
            ...mapState({
                loginName: state => state.loginName
            })
        },
        created(){
            if(!this.loginName){
                setTimeout(()=>{
                    this.$router.push('/user/login')
                },800)
                return
            }
            this.getUserInfo()
        },
        methods: {
            ...mapMutations([
                "RECORD_USERINFO"
            ]),
            getUserInfo(){
                this.$http('/api/user/get_information.do',{},'POST').then((res)=>{
                    this.userInfo.username = res.username
                    this.userInfo.phone = res.phone
                    this.userInfo.email = res.email
                    this.userInfo.question = res.question
                    this.userInfo.answer = res.answer
                })
            },
            showInfo(){
                this.infoShow = true
            },
            //退出当前账号
            logout(){
                this.$http('/api/user/logout.do',{},'POST').then((res)=>{
                    //do nothing
                })
                this.RECORD_USERINFO('')
                this.$router.push('/user')
            },
            hideInfo(){
                this.infoShow = false
            },
            showEdit(e){
                this.editShow = true
                let $info = e.currentTarget.getAttribute('data-info')
                this.editType = $info
                this.editText = this.userInfo[$info]   //动态赋值
            },
            confirmEdit(){
                this.hideEdit()
                this.userInfo[this.editType] = this.editText
                this.$http('/api/user/update_information.do',this.userInfo,'POST').then((res)=>{
                    //更新个人信息
                    console.log(res)
                })
            },
            hideEdit(){
                this.editShow = false
            },
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../../common/style/mixin';
    .user-box{
        background: $bc;
        .user-reset-header{
            position: relative;
            width: 100%;
            padding: 25px;
            text-align: center;
            font-size: 36px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            @include border-1px(#999);
            background: #fff;
            i{
                position: absolute;
                left: 20px;
                top: 20px;
                font-size: 54px;
            }
            a{
                position: absolute;
                right: 40px;
            }
        }
        .user-reset{
            background: #F4F4F4;
            .user-reset-item{
                width: 100%;
                p{
                    width: 100%;
                    height: 90px;
                    padding-left: 25px;
                    line-height: 90px;
                    font-size: 32px;
                    box-sizing: border-box;
                    background: $bc;
                }
                ul{
                    width: 100%;
                    padding: 0 30px;
                    box-sizing: border-box;
                    background: #fff;
                    li{
                        @include fj;
                        width: 100%;
                        height: 100px;
                        overflow: hidden;
                        line-height: 100px;
                        font-size: 36px;
                        border-bottom: 1px solid #dcdcdc;
                        &:last-child{
                          border-bottom: none;
                        }
                        div{
                            font-size: 30px;
                            i{
                                margin-left: 10px;
                                font-size: 34px;
                            }
                        }
                    }
                }
            }
            .logout{
                position: fixed;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 100px;
                text-align: center;
                line-height: 100px;
                font-size: 36px;
                color: #fff;
                background: #FF6B01;
            }
        }
        .user-info{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: $bc;
            z-index: 1000;
            ul{
                width: 100%;
                padding: 0 30px;
                box-sizing: border-box;
                background: #fff;
                li{
                    @include fj;
                    width: 100%;
                    height: 100px;
                    line-height: 100px;
                    font-size: 36px;
                    @include border-1px(#dcdcdc);
                    div{
                        font-size: 30px;
                        i{
                            margin-left: 10px;
                            font-size: 34px;
                        }
                    }
                }
            }
            .edit-info{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                background: #F4F4F4;
                input{
                    width: 100%;
                    padding: 20px 0;
                    margin-top: 30px;
                    text-indent: 30px;
                    font-size: 40px;
                }
            }
        }
    }
</style>
