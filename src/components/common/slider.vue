<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot>
            </slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item,index) in dots" :class="{active : currentIndex === index}"></span>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import { addClass } from 'common/js/dom'
    export default {
        //父级传入默认参数
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay:{
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 5000
            }
        },
        data(){
            return {
                dots: [],
                currentIndex: 0
            }
        },
        mounted(){
            setTimeout(() => {
                this._setSliderWidth()
                this._initDots()

                if(this.autoPlay){
                    this._play()
                }
            },20)
            setTimeout(() => {
                this._initSlider()
            },100)
            //监听屏幕宽度变化
            window.addEventListener('resize', () => {
                if(!this.slider){
                    return
                }
                this._setSliderWidth(true)
                this.slider.refresh()
            })
        },
        //销毁时清除定时器，释放内存空间
        destroyed(){
            clearTimeout(this.timer)
        },
        methods: {
            _setSliderWidth(isResize){
                this.children = this.$refs.sliderGroup.children
                let width = 0,
                    sliderWidth = this.$refs.slider.clientWidth
                for(let i=0;i<this.children.length;i++){
                    let child = this.children[i]
                    addClass(child,'slider-item')
                    child.style.width = sliderWidth + 'px'
                    width += sliderWidth
                }
                if(this.loop && !isResize){
                    width += 2*sliderWidth
                }
                this.$refs.sliderGroup.style.width = width + 'px'
            },
            _initDots(){
                this.dots = new Array(this.children.length)
            },
            _initSlider(){
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    snap: {    //snap属性需要写在对象里，否则循环不了
                        loop: this.loop,
                        threshold: 0.3,
                        speed: 400
                    }
                })
                //初始slider绑定事件
                this.slider.on('scrollEnd', () => {
                    let pageIndex = this.slider.getCurrentPage().pageX
                    // if(this.loop){
                    //     pageIndex -= 1
                    // }
                    this.currentIndex = pageIndex
                    if(this.autoPlay){
                        clearTimeout(this.timer)
                        this._play()
                    }
                })
            },
            _play(){
                let pageIndex = this.currentPageIndex + 1
                if (this.loop) {
                    pageIndex += 1
                }
                this.timer = setTimeout(() => {
                    this.slider.next();
                }, this.interval);
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../common/style/mixin";
    .slider{
        position: relative;
        min-height: 1px;
        .slider-group{
            overflow: hidden;
            white-space: nowrap;
            .slider-item{
                float: left;
                overflow: hidden;
                text-align: center;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                a{
                    display: block;
                    width: 100%;
                    overflow: hidden;
                }
                img{
                    display: block;
                    width: 100%;
                    height: 300px;
                }
            }
        }
        .dots{
            position: absolute;
            bottom: 12px;
            right: 12px;
            text-align: center;
            font-size: 0;
            .dot{
                display: inline-block;
                margin: 0 10px;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: #fff;
                &.active{
                    width: 20px;
                    background: $orange;
                }
            }
        }
    }

</style>
