<template>
    <div id="index">
        <m-header></m-header>
        <nav-bar></nav-bar>
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
        },
        created(){
            this.$http('/home/data','POST').then((res)=>{
                console.log(res)
            })
        }
    }
</script>

<style lang="scss" scoped="" type="text/scss">

</style>
