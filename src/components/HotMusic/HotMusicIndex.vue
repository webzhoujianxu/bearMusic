<template>
    <div>

        <hot-scroll class="HotWrap" ref="HotWrap" :click="true" :probeType="2" :listenScroll="true" @scroll="listenerScrolls">
            <div style="overflow: auto">
                <div class="heads">
                    <img :src="coverList.coverImgUrl" class="backg" ref="bgs">
                </div>
                <div class="hotMusicList">
                    <div class="hotMusicList-item" v-for="item in MusicList" v-bind:key="item.value">
                        <div class="hotMusicList-left">
                            <p class="hotMusicList-left-title">{{item.name}}
                                <span v-for="items in item.alia"
                                      class="smalltitle">{{'(' + items + ')'}}</span>
                            </p>
                            <p class="hotMusicList-left-tag"><img src="../../BaseMenu/index_ic.png" class="tag" v-if="item.cd!=1">{{item.ar[0].name}} -  - {{item.name}}</p>
                        </div>
                        <div class="hotMusicList-right">
                            <img src="../../BaseMenu/play.png">
                        </div>
                    </div>
                </div>
            </div>
        </hot-scroll>
    </div>
</template>
<script>
    import HotScroll from '../base/scroll.vue';
    import {api} from '../../BaseMenu/config';

    export default {
        components: {
            HotScroll
        },
        data() {
            return {
                MusicList: [],
                coverList:[]
            }
        },
        created() {
            this.getNewMusicList()
        },
        mounted(){
//             this.$refs.HotWrap.$el.style.top= this.$refs.bgs.offsetParent.clientHeight+this.$refs.bgs.offsetParent.offsetTop+'px';
        },
        actived(){
            this.$refs.HotWrap.refresh();
        },
        methods: {
            getNewMusicList() {
                this.$axios.all([
                    this.$axios.get(api + 'top/list?idx=1&limit=10'),

                ])
                    .then(this.$axios.spread((res) => {

                        this.coverList = res.data.playlist;
                        this.MusicList = res.data.playlist.tracks
                    }))

            },
//            listenerScrolls(pos){
//                if(pos.y*-1<320){
//                    this.$refs.bgs.offsetParent.style.transform='scale(.1)';
//                    this.$refs.bgs.offsetParent.style.paddingBottom='0';
//                }
//            }
        }
    }
</script>
<style scoped>
    .heads{
        width: 100%;
        height: 0px;
        padding-bottom: 100%;
        position: relative;
    }
    .backg{
        position: absolute;
        width: 100%;
        height: 100%;
        top:0;
        left: 0;
    }
</style>
