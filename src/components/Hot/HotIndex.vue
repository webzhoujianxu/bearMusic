<template>
    <hot-scroll class="HotWrap" ref="HotWrap" :click="true">
        <div style="overflow: auto">
            <h2 class="HotTitle">推荐歌单</h2>
            <div class="HotMenuList">
                <div class="HotMenuList-item" v-for="item in MenuList" :key="item.value">
                    <div class="HotMenuList-item-head">
                        <img :src="item.picUrl" class="picUrl">
                        <div class="HotMenuList-item-Number">
                            <img src="./st.png">
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
                            <img src="./st.png">
                            <span>{{(item.program.listenerCount / 10000).toFixed(1) + '万'}}</span>
                        </div>
                    </div>
                    <p class="HotMenuList-text">
                        {{item.name}}
                    </p>
                </div>
            </div>
            <h2 class="HotTitle" style="margin-top: .5rem;margin-bottom: .4rem">最新音乐</h2>
            <div class="hotMusicList">
                <div class="hotMusicList-item" v-for="item in MusicList" v-bind:key="item.value">
                    <div class="hotMusicList-left">
                        <p class="hotMusicList-left-title">{{item.name}}<span v-for="items in item.song.alias"
                                                                              class="smalltitle">{{'(' + items + ')'}}</span>
                        </p>
                        <p class="hotMusicList-left-tag"><img src="./index_ic.png" class="tag" v-if="item.song.album.status===0">{{item.song.artists[0].name}} - {{item.song.album.name}}</p>
                    </div>
                    <div class="hotMusicList-right">
                        <img src="./play.png">
                    </div>
                </div>
            </div>
        </div>
    </hot-scroll>
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
                MenuList: [],
                MusicList: [],
                dialogsList:[]
            }
        },
        created() {
            this.getNewMusicList()
        },
        actived(){
            this.$refs.HotWrap.refresh();
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
                        this.dialogsList = dialogs.data.result
                    }))

            }
        }
    }
</script>
<style scoped>
    .HotWrap {
        position: fixed;
        width: 100%;
        left: 0;
        top: 1.9rem;
        bottom: 0;
        right: 0;
        overflow: hidden;
    }

    .HotMenuList {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
    }

    .HotMenuList-item {
        width: 31%;
        margin-top: .16rem;
    }

    .HotMenuList-item-head {
        width: 100%;
        height: 0;
        overflow: hidden;
        padding-bottom: 100%;
        position: relative;
    }

    .HotMenuList-item-Number {
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        right: .1rem;
        font-size: 0px;
        color: white;
        text-shadow: 1px 0 0 rgba(0, 0, 0, .15);
        text-align: right;
        line-height: .25rem;
        background: linear-gradient(180deg, rgba(0, 0, 0, .2), transparent);
    }

    .HotMenuList-item-Number span {
        font-size: .25rem;
        position: relative;
        top: .1rem;
    }

    .HotMenuList-item-Number spam, .HotMenuList-item-Number img {
        vertical-align: middle;
        margin-right: .05rem;
        height: .25rem;
    }

    .picUrl {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
    }

    .HotMenuList-text {
        font-size: .25rem;
        line-height: .32rem;
        margin-top: .1rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        max-height: .64rem;
        color: #333;
    }

    .HotTitle {
        font-size: .35rem;
        margin-top: .26rem;
        margin-bottom: .1rem;
        position: relative;
        text-indent: .15rem;
        margin-left: 1%;
    }

    .HotTitle:after {
        content: '';
        width: 2px;
        height: .35rem;
        display: block;
        background: #d33a31;
        position: absolute;
        left: 0;
        top: -.01rem;
    }

    .hotMusicList-right {
        margin-right: .1rem;
        position: relative;
        width: 22px;
    }

    .hotMusicList-left {
        flex: 1;
    }

    .hotMusicList-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid #f5f5f5;
        margin: 0 1%;
        padding: .15rem 0;
    }

    .hotMusicList-left-title {
        font-size: .35rem;
        margin-left: 2%;
        color: #333;
    }

    .hotMusicList-left-tag {
        font-size: .25rem;
        margin-left: 2%;
    }

    .hotMusicList-right img {
        width: 22px;
        height: 22px;
        display: block;
        position: absolute;
        top: 50%;
        margin-top: -11px;
        left: 0;
    }

    .smalltitle {
        color: #888;
    }

    .hotMusicList-left-tag {
        color: #888;
        margin-top: .2rem;
    }
    .tag{
        display: inline-block;
        width: 12px;
        height: 8px;
        margin-right: 4px;
        color: orangered;
        font-size:.15rem;
    }
</style>