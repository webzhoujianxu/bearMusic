<template>
    <div style="overflow: hidden;width: 100%">
        <div class="search-input">
            <div class="icon-wrap">
                <img src="../../BaseMenu/search.png" class="searchIcon">
            </div>
            <input type="text" placeholder="请输入查询" class="search-inputs" v-model="keywords">
            <div class="icon-wrap" v-if="keywords.length>0" @click="keywords=''">
                <img src="../../BaseMenu/clear.png" class="searchIcon" style="margin-right: .2rem;margin-left: 0">
            </div>
        </div>
        <div class="lines"></div>
        <HotScroll class="search-hot-list" v-if="!keywords.length" :click="true">
            <div>
                <h2 class="hottitles">热门搜索</h2>
                <ul class="m-hotlist ">
                    <li class="item fbd f-bd-full" v-for="item in hotList" :key="item.value"  @click="keywords = item.first">{{item.first}}</li>
                </ul>
            </div>
        </HotScroll>
        <searchScroll class="search-hot-list" v-if="keywords.length" :pullup="true" :data="searchList" @scrollToEnd="scrollToEnd"
                      :click="true" ref="searchs">
            <div>
                <div>
                    <div class="search-to-item" v-for="item in searchList" :key="item.value" @click="selectItem(item)">
                        <img src="../../BaseMenu/search.png" class="icon-i">
                        <span class="names-hot">{{item.name}} - {{item.artists[0].name}}</span>
                    </div>
                    <div class="loadingStutes" v-show="hasMore">
                        <img src="../../BaseMenu/loading.png" width="20" height="20" class="lo" style="vertical-align: middle">
                        <span style="vertical-align: middle">正在加载...</span>
                    </div>
                </div>

            </div>
        </searchScroll>
    </div>
</template>
<style scoped>
    .search-input {
        background: #ebecec;
        height: 30px;
        width: 94%;
        margin-left: 3%;
        border-radius: 15px;
        margin: 15px 3%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

    }

    .lines {
        border-top: 1px solid whitesmoke;
        height: 0px;
        box-sizing: border-box;
    }

    .searchIcon {
        width: 20px;
        vertical-align: middle;
    }

    .icon-wrap {
        line-height: 30px;
        font-size: 0;
        margin-left: .2rem;
    }

    .search-inputs {
        background: transparent;
        border: none;
        outline: none;
        flex: 1;
        font-size: .3rem;
        margin-left: .05rem;
    }

    .search-hot-list {
        position: fixed;
        top: calc(1.9rem + 61px);
        width: 100%;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
    }

    .hottitles {
        font-size: 12px;
        line-height: 12px;
        color: #666;
        margin-top: 15px;
        margin-left: 10px;
    }

    .m-hotlist {
        overflow: hidden;
        margin: 0 10px;
    }

    .m-hotlist .item {
        display: inline-block;
        height: 26px;
        margin-right: 8px;
        margin-bottom: 8px;
        padding: 0 10px;
        font-size: .3rem;
        line-height: 26px;
        color: #333;
        position: relative;
    }

    .fbd:after {
        position: absolute;
        z-index: 2;
        content: "";
        top: 0;
        left: 0;
        pointer-events: none;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        -webkit-transform-origin: top left;
        transform-origin: top left;
        border: 1px solid whitesmoke;
        border-radius: 32px;
    }

    .names-hot {
        font-size: .3rem;
        vertical-align: middle;
        white-space: nowrap;
        width: calc(100% - 40px);
        display: inline-block;
        text-overflow: ellipsis;
        overflow: hidden;
        padding: 5px 0;
    }

    .search-to-item {
        font-size: 0;
        border-bottom: 1px solid whitesmoke;
        padding: .2rem 0;
        width: 94%;
        margin-left: 3%;
    }

    .search-to-item:last-of-type {
        border-bottom: none;
    }

    .icon-i {
        width: 20px;
        margin-left: 10px;
        vertical-align: middle;
        margin-right: .1rem;
    }
    .loadingStutes{
        font-size:.28rem;
        text-align: center;
        padding: 10px 0;
    }
    .lo{
        animation: loading 1s steps(12, end) infinite;
    }
    @keyframes loading {
        0% {
            -webkit-transform: rotate3d(0, 0, 1, 0deg);
            transform: rotate3d(0, 0, 1, 0deg);
            -ms-transform: rotate3d(0, 0, 1, 0deg);
            -moz-transform: rotate3d(0, 0, 1, 0deg);
            -o-transform: rotate3d(0, 0, 1, 0deg);
        }
        100% {
            -webkit-transform: rotate3d(0, 0, 1, 360deg);
            transform: rotate3d(0, 0, 1, 360deg);
            -moz-transform: rotate3d(0, 0, 1, 360deg);
            -ms-transform: rotate3d(0, 0, 1, 360deg);
            -o-transform: rotate3d(0, 0, 1, 360deg);
        }
    }
</style>
<script>
    import {api} from '../../BaseMenu/config';
    import HotScroll from '../base/scroll.vue';
    import searchScroll from '../base/scroll.vue';
    import {mapActions} from 'vuex';
    export default {
        data() {
            return {
                keywords: '',
                hotList: [],
                searchList: [],
                pageNum: 0,
                pageSize: 30,
                songCount:30,
                hasMore:true
            }
        },
        components: {
            HotScroll,
            searchScroll
        },
        created() {
            this.getHotSearch()
        },
        watch: {
            keywords(res) {
                this.search(res,0);
            }
        },
        methods: {
            getHotSearch() {
                this.$axios.get(api + 'search/hot')
                    .then(res => {
                        this.hotList = res.data.result.hots;
                    })
            },
            search(keywords,type) {
                this.$axios.get(api + 'search?keywords=' + keywords + '&limit=' + this.pageSize + '&offset=' + this.pageNum * this.pageSize)
                    .then((res) => {
                        if (res.data.result) {
                            if(type===0){
                                this.searchList = res.data.result.songs;
                                if(res.data.result.songCount>this.pageSize){
                                    this.hasMore = true;
                                }
                                else{
                                    this.hasMore = false;
                                }
                            }
                            else{
                                if(res.data.result.songs){
                                    this.searchList = this.searchList.concat(res.data.result.songs);
                                    this.songCount = res.data.result.songCount;

                                }
                                else{

                                }
                                if( res.data.result.songCount>0&&res.data.result.songCount>this.pageNum * this.pageSize){
                                    this.hasMore = true;
                                }
                                else{
                                    this.hasMore = false;
                                }
                            }

                        }
                    })
            },
            scrollToEnd() {
                if(this.hasMore){
                    this.pageNum++;
                    this.search(this.keywords,1);
                }
            },
            selectItem(item){
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