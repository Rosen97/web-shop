<template>
    <div class="frame">
        <div class="head"></div>
        <div class="content">
            <h4 class="title"></h4>
            <p class="text"></p>
            <p class="text"></p>
            <div class="image"></div>
            <div class="image"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        created() {

        },
        methods: {}
    }
</script>

<style lang="scss" type="text/scss" scoped>
    .frame{
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100000;
        width: 100%;
        padding: 20px 30px;
        box-sizing: border-box;
        background: #fff;
        .head{
            width: 100%;
            height: 400px;
            background: #EBEBEB;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
        }
        .content{
            width: 100%;
            margin-top: 20px;
            h4{
                width: 100%;
                height: 40px;
                background: #EBEBEB;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
            }
            p{
                width: 80%;
                height: 40px;
                margin-top: 20px;
                background: #EBEBEB;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
            }
            .image{
                width: 100%;
                height: 300px;
                margin-top: 60px;
                background: #EBEBEB;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
            }
        }
    }
</style>
