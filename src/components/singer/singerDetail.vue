<template>
    <transition name="slide">
        <div class="details">
            <div class="item-img" ref="wraps" :style="'background:url('+info.picUrl+')'">
                <div class="inset" ref="blackBg"></div>
            </div>
            <div class="tools">
                <img src="./back.png" class="tobacks" @click="$router.back()">
              {{info.name}}
            </div>
            <HotScroll class="scrollwrap" ref="hots" :probeType="3" :listenScroll="true" @scroll="scroll" :click="true">
                <div>
                    <list :MusicList="MusicList" :MenuType="1"></list>
                </div>
            </HotScroll>
        </div>

    </transition>
</template>
<script>
    import {api} from '../../BaseMenu/config';
    import list from '../base/list.vue';
    import HotScroll from '../base/scroll.vue';

    export default {
        data() {
            return {
                MusicList: [],
                info: [],
                y: 0,
                wrapHeight: 0
            }
        },
        components: {
            list,
            HotScroll
        },
        watch: {
            y(t) {
                let translateY = Math.max(this.minTransalteY, t);
                let scale = 1;
                const scalePercent =  Math.abs(t / this.wrapHeight);
                if (t > 0) {
                    translateY = 0;
                    scale = 1 + scalePercent
                }
                else {
                    this.$refs.wraps.style.zIndex = 10;
                }
                if (0.3 < Math.abs(t) / this.wrapHeight + 0.3 && Math.abs(t) / this.wrapHeight + 0.3 < 0.8 && translateY !== 0) {
                    this.$refs.blackBg.style.opacity = Math.abs(t) / this.wrapHeight + .3;
                }



                this.$refs.wraps.style.transform = `translate3d(0,${translateY}px,0) scale(${scale})`;
            },

        },
        created() {
            this.getlist();
        },
        mounted() {
            this.setTops();

        },
        methods: {
            getlist() {
                this.$axios.get(api + 'artists?id=' + this.$route.params.id + '&limit=100' + '&offset=0&time='+new Date())
                    .then((res) => {
                        this.MusicList = res.data.hotSongs;
                        this.info = res.data.artist;
                    })
            },
            setTops() {
                this.$refs.hots.$el.style.top = this.$refs.wraps.clientHeight + 'px';
                this.wrapHeight = this.$refs.wraps.clientHeight;
                this.minTransalteY = -this.wrapHeight + 40;
            },
            scroll(pos) {
                this.y = pos.y
            }
        }
    }
</script>
<style scoped>
    .details {
        width: 100%;
        height: 100%;
        background: white;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .scrollwrap {
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
    }

    .img-div {
        width: 100%;
        height: 0;
        overflow: hidden;
        padding-bottom: 81%;
        position: relative;
    }

    .item-img {
        width: 100%;
        height: 0;
        padding-bottom: 81%;
        display: block;
        background-size: cover!important;
        background-repeat: no-repeat!important;
        position: absolute;
        top:0;
        left: 0;
        z-index: 10;
        transform-origin: top;
    }

    .inset {
        width: 100%;
        height: 100%;
        background: rgb(0, 0, 0);
        opacity: .3;
        position: absolute;
        top: 0;
        left: 0;
    }

    .slide-enter-active, .slide-leave-active {
        transition: all 0.3s

    }

    .slide-enter, .slide-leave-to {
        transform: translate3d(100%, 0, 0)
    }
    .tools{
         height: 40px;
        position: fixed;
        left: 0;
        top:0;
        z-index: 11;
        color: white;
        font-size:.35rem;
        line-height:40px;
        text-align: center;
        width: 100%;
    }
    .tobacks{
        position: absolute;
        left: 0;
        height:.4rem;
        top:50%;
        margin-top: -.2rem;
        margin-left: .15rem;
    }
</style>