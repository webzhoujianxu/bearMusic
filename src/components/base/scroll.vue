<template>
    <div ref="ScrollWrap">
        <slot></slot>
    </div>
</template>
<script>
    import BestScroll from 'better-scroll';

    export default {
        props: {
            click: {
                type: Boolean,
                default: false
            },
            probeType: {
                type: Number,
                default: 0
            },
            pullDownRefreshStutes: {
                type: Boolean,
                default: false
            },
            pullUpLoadStutes: {
                type: Boolean,
                default: false
            },
            listenScroll: {
                type: Boolean,
                default: false
            },
            pullup: {
                type: Boolean,
                default: false
            },
            scrollX: {
                type: Boolean,
                default: false
            },
            flick: {
                type: Boolean,
                default: false
            },
            data:{
                type:Array,
                default:null
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initBestScroll();
            })
        },
        watch:{
            data(){
                 this.$nextTick(()=>{
                     this.refresh()
                 })
            }
        },
        methods: {
            initBestScroll() {
                let pullDownRefresh;
                this.pullDownRefreshStutes ? pullDownRefresh = {
                    threshold: 50,
                    stop: 20
                } : pullDownRefresh = false;
                let pullUpLoad;
                this.pullUpLoad ? pullUpLoad = true : pullUpLoad = false;
                let bounceObk = {};

                this.scroll = new BestScroll(this.$refs.ScrollWrap, {
                    click: this.click,
                    probeType: this.probeType,
                    pullDownRefresh: pullDownRefresh,
                    scrollX: this.scrollX
                });

                if (this.listenScroll) {
                    this.scroll.on('scroll', (pos) => {
                        this.$emit('scroll', pos)
                    })
                }
                if (this.pullup) {
                    this.scroll.on('scrollEnd', () => {
                        if (this.scroll.y <= (this.scroll.maxScrollY + 100)) {
                            this.$emit('scrollToEnd')
                        }
                    })
                }
                if(this.flick){
                      this.$emit('flicks')
                }
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            }

        },
        activated() {
            this.refresh()
        },

    }
</script>
<style scoped>

</style>