<template>
    <div>
        <m-header v-show="$route.meta.navShow"></m-header>
        <nav-bar v-show="$route.meta.navShow"></nav-bar>
        <router-view></router-view>
    </div>
</template>

<script>
    import mHeader from '../../components/mHeader'
    import navBar from '../../components/navBar'
    export default {
        components: {
            mHeader,
            navBar
        },
        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped="" type="text/scss">

</style>
