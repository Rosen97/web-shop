<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            scrollData: {
                type: Array,
                default: []
            },
            listenScroll: {
                type: Boolean,
                default: false
            }
        },
        mounted(){
            setTimeout(()=>{
                this._initScroll()
            },20)
        },
        methods: {
            _initScroll(){
                if(!this.$refs.wrapper){
                    return
                }
                this.scroll = new BScroll(this.$refs.wrapper,{
                    probeType: this.probeType,
                    click: this.click
                })
                //监听滚动事件
                if(this.listenScroll){
                    //保留this
                    let _this = this
                    this.scroll.on('scroll', (pos)=>{
                        _this.$emit('scroll',pos)
                    })
                }
            },
            enable(){
                this.scroll && this.scroll.enable()
            },
            disable(){
                this.scroll && this.scroll.disable()
            },
            refresh(){
                this.scroll && this.scroll.refresh()
            },
            scrollTo(){
                this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
            },
            scrollToElement(){
                this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
            }
        },
        //监听data数据，重新渲染内容层，确保内容层有高度
        watch: {
            data(){
                setTimeout(()=>{
                    this.refresh()
                },20)
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>

</style>
