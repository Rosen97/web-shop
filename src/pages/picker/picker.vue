<template>
    <div class="wrapper" ref="myScroll" @scroll.passive="onScroll($event)" @touchstart="touchStart($event)"
         @touchmove="touchMove($event)" @touchend="touchEnd($event)">
        <transition name="slide" v-show="isRefresh">
            <div class="pull-refresh">
                <span class="down-tip" v-show="state=== 1">下拉更新</span>
                <span class="up-tip" v-show="state=== 2">松开更新</span>
                <span class="refresh-tip" v-show="state=== 3">更新中</span>
            </div>
        </transition>
        <section class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
            <div class="scroll-content">
                <p v-for="item in listData">{{item}}</p>
            </div>
        </section>
        <footer class="load-more" v-show="isLoadmore">
            <span>加载中……</span>
        </footer>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                top: 0,     //transform值
                startY: 0,  //开始位置
                state: 0,   //状态
                aspect: 1,  // 1-刷新   2-加载
                listData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
                isRefresh: false,
                isLoadmore: false
            }
        },
        methods: {
            onScroll(e) {
            },
            touchStart(e) {
                this.startY = e.targetTouches[0].pageY
                console.log('gaga')
                console.log(this.$el.scrollTop)
            },
            touchMove(e) {
                let diff = e.targetTouches[0].pageY - this.startY
                if (diff > 0 && diff < 200) {
                    this.top = Math.pow(diff, 0.9)
                    this.isRefresh = true
                    this.state = 1
                    this.aspect = 0
                } else if (diff > 200) {
                    this.top = Math.pow(diff, 0.9)
                    this.isRefresh = true
                    this.state = 2
                    this.aspect = 1
                } else {
                    this.top = Math.pow(diff, 0.9)
                    this.isRefresh = false
                    this.state = 0
                    this.aspect = 2
                }
            },
            touchEnd(e) {
                if (this.aspect === 0) {
                    this.top = 0
                    this.isRefresh = false
                    return
                }
                if (this.aspect = 1) {
                    this.state = 3
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .wrapper {
        position: relative;
        .pull-refresh {
            position: absolute;
            left: 0;
            top: 0;
            display: flex;
            flex-direction: column;
            width: 100%;
            span {
                width: 100%;
                height: 100px;
                text-align: center;
                line-height: 100px;
                background: #eee;
            }
        }
        .scroll-content {
            width: 100%;
            p {
                width: 100%;
                height: 100px;
                text-align: center;
                line-height: 100px;
                border: 1px solid #dcdcdc;
            }
        }
        .load-more {
            display: flex;
            width: 100%;
            span {
                width: 100%;
                height: 100px;
                text-align: center;
                line-height: 100px;
                background: #eee;
            }
        }
    }

    .slide-enter-active, .slide-leave-active {
        transition: all 0.5s;
    }

    .slide-enter, .slide-leave-to {
        transform: translate3d(0, 100px, 0);
    }

</style>
