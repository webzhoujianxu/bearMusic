<template>
    <div class="hotMusicList">
        <div class="hotMusicList-item" v-for="(item,index) in MusicList" v-bind:key="item.value"
             @click="setStutes(item)">
            <div class="hotMuisc-index" v-if="MenuType==1&&showIndex">
                <span v-html="index<9?'0'+(index+1):index+1" class="Nums"
                      v-bind:class="index<3?'hotIndex':'normalIndex'"></span>
            </div>
            <div class="hotMusicList-left">
                <p class="hotMusicList-left-title" v-if="MenuType==0">
                    {{item.name}}
                    <span v-for="items in item.song.alias" class="smalltitle">{{'(' + items + ')'}}</span>
                </p>
                <p class="hotMusicList-left-title" v-if="MenuType==1">
                    {{item.name}}
                    <span v-for="items in item.alia"
                          class="smalltitle">{{'(' + items + ')'}}</span>
                </p>
                <p class="hotMusicList-left-tag" v-if="MenuType==0">
                    <img src="../../BaseMenu/index_ic.png" class="tag" v-if="item.song.album.status===0">
                    {{item.song.artists[0].name}} - {{item.song.album.name}}
                </p>
                <p class="hotMusicList-left-tag" v-if="MenuType==1">
                    <img src="../../BaseMenu/index_ic.png" class="tag" v-if="item.cd!=1"> <span v-for="itemd in item.ar"
                                                                                                style="margin-right: 5px">{{itemd.name}}</span>
                    - {{item.name}}</p>
            </div>
            <div class="hotMusicList-right">
                <img src="../../BaseMenu/play.png">
            </div>
        </div>
    </div>
</template>
<script>
    import {mapActions} from 'vuex';
    export default {
        props: {
            MusicList: {
                type: Array,
                default: []
            },
            MenuType: {
                type: Number,
                default: 0
            },
            showIndex: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            setStutes(item) {
                this.SetPlayId({
                    PlayID:item.id
                })
                this.$router.push('/playlist/' + item.id)
            },
            ...mapActions([
                'SetPlayId'
            ])
        }
    }
</script>
<style scoped>
    .hotMuisc-index {
        font-size: 0;
        width: 30px;
        position: relative;
        text-align: center;
    }

    .Nums {
        font-size: .35rem;
        display: block;
        position: absolute;
        width: 100%;
        top: 50%;
        margin-top: -.175rem;
    }

    .hotMusicList-left {
        max-width: calc(100% - 60px);
    }

    .hotIndex {
        color: #df3436;
    }

    .normalIndex {
        color: #999;
    }
</style>