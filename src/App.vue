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
    *{
        margin: 0;
        padding: 0;
    }

    html,body{
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    input{
        border: none;
        outline: none;
    }
    button{
        border: none;
        outline: none;
    }
    a{
        text-decoration: none;
        color: #333;
    }
    li{
        list-style-type: none;
    }

</style>
