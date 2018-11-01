<template>
    <div id="app">
        <router-view class="router-view"></router-view>
    </div>
</template>

<script>
    export default {
        // 监听路由的路径，可以通过不同的路径去选择不同的切换效果
        data(){
            return{
                transitionName: 'slide-left'
            }
        }
    }
</script>

<style lang="scss" type="text/scss">
    @import './common/style/base';

</style>
