<template>
    <div class="per">
        <hot-scroll class="HotWrap" ref="HotWrap" :click="true">
            <div style="overflow: auto">
                <h2 class="HotTitle">推荐歌单</h2>
                <div class="HotMenuList">
                    <div class="HotMenuList-item" v-for="item in MenuList" :key="item.value">
                        <div class="HotMenuList-item-head">
                            <img :src="item.picUrl" class="picUrl">
                            <div class="HotMenuList-item-Number">
                                <img src="../../BaseMenu/st.png">
                                <span>{{(item.playCount / 10000).toFixed(1) + '万'}}</span>
                            </div>
                        </div>
                        <p class="HotMenuList-text">
                            {{item.name}}
                        </p>
                    </div>
                </div>
                <h2 class="HotTitle">推荐电台</h2>
                <div class="HotMenuList">
                    <div class="HotMenuList-item" v-for="item in dialogsList" :key="item.value">
                        <div class="HotMenuList-item-head">
                            <img :src="item.picUrl" class="picUrl">
                            <div class="HotMenuList-item-Number">
                                <img src="../../BaseMenu/st.png">
                                <span>{{(item.program.listenerCount / 10000).toFixed(1) + '万'}}</span>
                            </div>
                        </div>
                        <p class="HotMenuList-text">
                            {{item.name}}
                        </p>
                    </div>
                </div>
                <h2 class="HotTitle" style="margin-top: .5rem;margin-bottom: .4rem">最新音乐</h2>
                <list :MusicList="MusicList"></list>
            </div>
        </hot-scroll>
        <Loadings :IsShow="IsShow"></Loadings>
    </div>
</template>
<script>
    import HotScroll from '../base/scroll.vue';
    import Loadings from '../base/loading.vue';
    import list from '../base/list.vue';
    import {api} from '../../BaseMenu/config';

    export default {
        components: {
            HotScroll,
            Loadings,
            list
        },
        data() {
            return {
                MenuList: [],
                MusicList: [],
                dialogsList:[],
                IsShow:true
            }
        },
        created() {
            this.getNewMusicList()
        },
        methods: {
            getNewMusicList() {
                this.$axios.all([
                    this.$axios.get(api + 'personalized?limit=6'),
                    this.$axios.get(api + 'personalized/newsong'),
                    this.$axios.get(api + 'personalized/djprogram?limit=6')
                ])
                    .then(this.$axios.spread((res, songs,dialogs) => {
                        this.MenuList = res.data.result;
                        this.MusicList = songs.data.result;
                        this.dialogsList = dialogs.data.result;
                        this.$nextTick(()=>{
                             this.IsShow = false;
                        })
                    }))

            }
        }
    }
</script>
