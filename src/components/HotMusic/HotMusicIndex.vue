<template>
    <div>
        <hot-scroll class="HotWrap" ref="HotWrap" :click="true" :probeType="2" :listenScroll="true" >
            <div style="overflow: auto">
                <div class="heads">
                    <img :src="coverList.coverImgUrl" class="backg" ref="bgs">
                </div>
                <list :MusicList="MusicList" :MenuType="1" :showIndex="true"></list>
            </div>
        </hot-scroll>
        <Loadings :IsShow="IsShow"></Loadings>
    </div>
</template>
<script>
    import HotScroll from '../base/scroll.vue';
    import Loadings from '../base/loading.vue';
    import {api} from '../../BaseMenu/config';
    import list from '../base/list.vue';

    export default {
        components: {
            HotScroll,
            Loadings,
            list
        },
        data() {
            return {
                MusicList: [],
                coverList:[],
                IsShow:true
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
                        this.MusicList = res.data.playlist.tracks;
                        this.$nextTick(()=>{
                            this.IsShow = false;
                        })
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
