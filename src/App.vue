<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App'
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
