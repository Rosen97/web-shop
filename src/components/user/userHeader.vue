<template>
    <div class="user-header">
        <i class="iconfont icon-left" @click="goBack"></i>
        <span v-text="headerTitle" class="user-header-title"></span>
        <span>帮助</span>
    </div>
</template>

<script>
    export default {
        props: {
            headerTitle: {
                type: String,
                default: ''
            }
        },
        data() {
            return {}
        },
        methods: {
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    .user-header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        padding: 10px 20px;
        font-size: 40px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        .user-header-title{
            padding-left: 30px;
        }
        .iconfont{
            font-size: 60px;
        }
    }
</style>
