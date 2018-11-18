<template>
    <div class="relative">
        <div class="mask-top absolute"></div>
        <div class="mask-bottom absolute"></div>
        <div class="wheel-wrapper" ref="wrapper">
            <ul class="wheel-scroller">
                <li class="wheel-item" v-for="index in data">{{index}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    const EVENT_CHANGE = 'change'
    import BScroll from 'better-scroll'
    export default {
        // props: {
        //     data: {
        //         type:Array,
        //         default:function(){
        //             return []
        //         }
        //     },
        //     selectedIndex: {
        //         type:Number,
        //         default:0
        //     }
        // },
        data() {
            return {
                data: [1,2,3,4,5,6,7,8,9,10],
                selectedIndex: 0
            }
        },
        mounted() {
            this.$nextTick(() => {
                this._createWheel().enable()
            })
        },
        methods: {
            _createWheel() {
                if (!this.wheels) {
                    const wheel = this.wheels = new BScroll(this.$refs.wrapper, {
                        wheel: {
                            selectedIndex: this.selectedIndex,
                            wheelWrapperClass: 'wheel-scroller',
                            wheelItemClass: 'wheel-item',
                            rotate: 0
                        },
                        observeDOM: false
                    })
                    wheel.on('scrollEnd', () => {
                        //滚动完成之后获取当前选取的索引值
                        this.$emit(EVENT_CHANGE,wheel.getSelectedIndex())
                    })
                } else {
                    this.wheels.refresh()
                }
                return this.wheels
            },
        }
    }
</script>
<style lang="scss" scoped>
    .relative{
        position: relative;
    }
    .absolute{
        position: absolute;
    }
    .mask-top{
        height:24px;
        width:100%;
        top:80px;
        border-bottom:1px solid red;
    }
    .mask-bottom{
        height:1px;
        width:100%;
        top:160px;
        border-bottom:1px solid red;
    }
    .wheel-wrapper{
        width: 100%;
        height: 300px;
        overflow: hidden;
        border: 1px solid red;
        .wheel-scroller{
            margin-top:24px;
            .wheel-item{
                width: 100%;
                height: 80px;
                text-align: center;
                line-height: 80px;
            }
        }
    }
</style>
