<template>
    <div class="yo-scroll" :class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}"
         @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
        <section class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }"
                 :class="{ special:isPhotos==true }">
            <header class="pull-refresh">
                <slot name="pull-refresh">
                    <span class="down-tip">
                        <i class="iconfont icon-down"></i>下拉更新
                    </span>
                    <span class="up-tip">
                        <i class="iconfont icon-up"></i>松开刷新数据
                    </span>
                    <span class="refresh-tip" style="padding-top: 30px;">
                        <img src="../../assets/loading/5-121204194032.gif" style="width: 40px;height: 40px;margin: 0 auto;"/>
                        <!--<i class="iconfont icon-loading"></i>加载中……-->
                    </span>
                </slot>
            </header>
            <slot>
            </slot>
            <footer class="load-more">
                <slot name="load-more">
                    <span v-show="downFlag===false ? delay : 0" class="up_loading">
                        <i class="iconfont icon-up"></i>上拉加载更多
                    </span>
                    <span v-show="downFlag===true" class="up_loading loading_text">
                        <img src="../../assets/loading/5-121204194032-50.gif" style="width: 80px;height: 80px;margin: 0 auto;" />
                    </span>
                </slot>
            </footer>
        </section>
    </div>
</template>

<script>
    export default {
        props: {
            offset: {
                type: Number,
                default: 40 //默认高度
            },
            enableInfinite: {
                type: Boolean,
                default: true
            },
            enableRefresh: {
                type: Boolean,
                default: true
            },
            noFlag: {
                type: Boolean,
                default: false
            },
            onRefresh: {
                type: Function,
                default: undefined,
                required: false
            },
            onInfinite: {
                type: Function,
                default: undefined,
                require: false
            },
            isPhotos: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                top: 0,
                state: 0,
                startX: 0,
                startY: 0,
                touching: false,
                infiniteLoading: false,
                downFlag: false, //用来显示是否加载中
            }
        },
        mounted() {
            this.downFlag = ''
        },
        methods: {
            delay() {
                setTimeout(function () {
                    return true
                }, 600)
            },
            touchStart(e) {
                this.startY = e.targetTouches[0].pageY;
                this.startX = e.targetTouches[0].pageX;
                this.startScroll = this.$el.scrollTop || 0;
                this.touching = true; //留着有用，不能删除

                // this.noFlag = false;
                this.$el.querySelector('.load-more').style.display = 'block';
            },
            touchMove(e) {
                if (!this.enableRefresh || !this.touching) {
                    return
                }
                let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
                if (diff > 0) {    //阻止默认事件 android下拉刷新无效
                    e.preventDefault()
                }
                this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)
                if (this.state === 2) { // in refreshing
                    return
                }
                if (this.top >= this.offset) {
                    this.state = 1
                } else {
                    this.state = 0
                }

                let more = this.$el.querySelector('.load-more');
                if (!this.top && this.state === 0) {
                    more.style.display = 'block';
                } else {
                    more.style.display = 'none';
                }
            },
            touchEnd(e) {
                if (!this.enableRefresh) {
                    return
                }
                this.touching = false
                if (this.state === 2) { // in refreshing
                    this.state = 2
                    this.top = this.offset
                    return
                }
                if (this.top >= this.offset) { // do refresh
                    this.refresh()
                } else { // cancel refresh
                    this.state = 0
                    this.top = 0
                }
                //用于判断滑动是否在原地 ----begin
                let endX = e.changedTouches[0].pageX,
                    endY = e.changedTouches[0].pageY,
                    dy = this.startY - endY,
                    dx = endX - this.startX;

                //如果滑动距离太短
                if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                    // console.log("滑动距离太短")
                    return;
                }
                if (!this.enableInfinite || this.infiniteLoading) {
                    return
                }
                let outerHeight = this.$el.clientHeight,
                    innerHeight = this.$el.querySelector('.inner').clientHeight,
                    scrollTop = this.$el.scrollTop,
                    ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0,
                    bottom = innerHeight - outerHeight - scrollTop - ptrHeight;
                if (bottom <= this.offset && this.state === 0) {
                    this.downFlag = true;
                    this.infinite();
                } else {
                    this.$el.querySelector('.load-more').style.display = 'none';
                    this.downFlag = false;
                }

            },
            refresh() {
                this.state = 2;
                this.top = this.offset;
                setTimeout(() => {
                    this.onRefresh(this.refreshDone)
                }, 1000);
            },
            refreshDone() {
                this.state = 0
                this.top = 0
            },
            infinite() {
                this.infiniteLoading = true
                setTimeout(() => {
                    this.onInfinite(this.infiniteDone);
                }, 2000);
            },
            infiniteDone() {
                this.infiniteLoading = false
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .yo-scroll {
        font-size: 28px;
        position: absolute;
        top: 300px;
        right: 0;
        bottom: 0;
        left: 0;
        height: auto;
        overflow-y: scroll;
        margin: 0 30px;
        .inner {
            position: absolute;
            top: -60px;
            width: 100%;
            transition-duration: 300ms;
            &.special {
                width: 100%;
                height: 100%;
                z-index: 999999;
                transition-duration: 0ms;
            }
        }
        .pull-refresh {
            position: relative;
            left: 0;
            top: 0;
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        &.touch {
            .inner {
                transition-duration: 0ms;
            }
        }
        &.down {
            .down-tip {
                display: block;
            }
        }
        &.up {
            .up-tip {
                display: block;
            }
        }
        &.refresh {
            .refresh-tip {
                display: block;
            }
        }
        &.load-more {
            height: 90px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .yo-scroll .down-tip, .yo-scroll .refresh-tip, .yo-scroll .up-tip {
        display: none;
    }

    .up_loading, .down-tip, .up-tip, .refresh-tip {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 28px;
    }
</style>
