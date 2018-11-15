<template>
    <header class="wrap">
        <i class="iconfont icon-left"></i>
        <span>{{mTitle}}</span>
    </header>
</template>

<script>
    export default {
        components: {},
        props: {
            mTitle: {
                type: String,
                default: ''
            }
        },
        data() {
            return {}
        },
        watch: {},
        created() {

        },
        mounted() {

        },
        computed() {

        },
        methods: {}
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/style/mixin';
    header{
        position: relative;
        width: 100%;
        height: 88px;
        text-align: center;
        line-height: 88px;
        padding: 0 20px;
        font-size: 34px;
        @include boxSizing;
        .iconfont{
            position: absolute;
            left: 20px;
            top: 0;
            font-size: 50px;
            font-weight: bold;
        }
    }
</style>
