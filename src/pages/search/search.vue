<template>
    <div class="search-box">
        <div class="search-header">
            <i class="iconfont icon-left" @click="goBack"></i>
            <div class="search-con">
                <i class="iconfont icon-search"></i>
                <input v-focus placeholder="双十一狂欢" v-model="searchText" />
            </div>
            <span @click="getSearch">搜索</span>
        </div>
        <div class="search-content">
            <div class="search-list history-list">
                <p>最近搜索
                    <i class="iconfont icon-delete"></i>
                </p>
                <div>
                    <span>哈哈</span>
                    <span>手机1</span>
                </div>
            </div>
            <div class="search-list hot-list">
                <p>热门搜索</p>
                <div>
                    <span class="hot">手环</span>
                    <span class="hot">外星人电脑</span>
                    <span class="hot">王亚妮</span>
                    <span>手环</span>
                    <span>外星人电脑</span>
                    <span>王亚妮</span>
                    <span>手环</span>
                    <span>外星人电脑</span>
                    <span>王亚妮</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchText: ''
            }
        },
        methods: {
            getSearch(){
                if(!this.searchText){
                    alert('请输入搜索内容')
                    return
                }
                this.$router.push('/category-list?keyword='+this.searchText+'&categoryId=0')
            },
            goBack(){
                this.$router.go(-1)
            }
        },
        directives: {
            focus: {
                // 指令的定义
                inserted: function (el) {
                    el.focus()
                }
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import "../../common/style/mixin";
    .search-box{
        width: 100%;
        font-size: 30px;
        .search-header{
            @include fj;
            width: 100%;
            height: 90px;
            padding: 15px 30px 15px 20px;
            box-sizing: border-box;
            @include border-1px(#dcdcdc);
            .icon-left{
                width: 10%;
                font-size: 50px;
              color: #252525;
              font-weight: bold;
            }
            .search-con{
                width: 76%;
                height: 100%;
                line-height: 60px;
                margin-left: -20px;
                padding-left: 30px;
                font-size: 26px;
                background: #F7F7F7;
                border-radius: 40px;
                @include boxSizing;
                .iconfont{
                    font-size: 36px;
                    padding-right: 20px;
                }
                input{
                    height: 100%;
                    font-size: 24px;
                    background: #F7F7F7;
                }
            }
            span{
                width: 12%;
                text-align: center;
                height: 100%;
                line-height: 60px;
                color: #fff;
                font-size: 26px;
                background: #E93B3D;
                border-radius: 10px;
            }
        }
        .search-content{
            width: 100%;
            padding: 0 30px 0 30px;
            box-sizing: border-box;
            .search-list{
                width: 100%;
                &.history-list{
                    margin-bottom: 20px;
                }
                p{
                    position: relative;
                    padding: 20px 0;
                    .icon-delete{
                        position: absolute;
                        right: 0;
                        top: 20px;
                        font-size: 34px;
                    }
                }
                div {
                    display: flex;
                    flex-shrink: 0;
                    flex-wrap: wrap;
                    span{
                        padding: 8px 26px;
                        margin: 0 20px 20px 0;
                        font-size: 24px;
                        color: #686868;
                        background: #F0F2F5;
                        border-radius: 10px;
                        &.hot{
                            color: #E93B3D;
                        }
                    }
                }
            }
        }
    }
</style>
