<template>
    <div class="loading">
        <img src="../../assets/loading/loading-0.gif" class="image-top" v-if="loadingType === 1">
        <img src="../../assets/loading/loading-0.gif" class="image-center" v-else>
    </div>
</template>

<script>
    export default {
        props: {
            loadingType: {    //1-靠近顶部加载   2-居中加载
                type: Number,
                default: 1
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    .loading {
        position: relative;
        width: 100%;
        height: 100%;
        img {
            width: 120px;
            &.image-top{
                position: absolute;
                left: 50%;
                top: 100px;
                margin-left: -60px;
            }
            &.image-center{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
</style>
