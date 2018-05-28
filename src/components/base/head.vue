<template>
    <div>
        <div class="MusicHead">
                <span class="MusicTitle">
                    BearMusic | 比比熊音乐
                </span>
        </div>
        <HotScroll :click="true" :scrollX="true">
            <div class="MusicBar">
                <router-link tag="div" to="/HotPage" class="MusicBar-item"><span class="inset">推荐音乐</span></router-link>
                <router-link tag="div" to="/HotMusic" class="MusicBar-item"><span class="inset">热门榜单</span></router-link>
                <router-link tag="div" to="/singer" class="MusicBar-item"><span class="inset">热门歌手</span></router-link>
                <router-link tag="div" to="/search" class="MusicBar-item"><span class="inset">搜索</span></router-link>
                <router-link tag="div" to="/f" class="MusicBar-item"><span class="inset">最新歌曲</span></router-link>

            </div>
        </HotScroll>
    </div>


</template>
<script>
    import HotScroll from '../base/scroll.vue';

    export default {
        components: {
            HotScroll
        }
    }
</script>
<style scoped>
    .MusicHead {
        width: 100%;
        height: 1.1rem;
        background-color: #d43c33;
        display: flex;
    }

    .MusicTitle {
        font-size: .4rem;
        color: white;
        line-height: 1.1rem;
        margin-left: 10px;
        letter-spacing: 1px;
        font-family: 'Georgia, serif';
    }

    .MusicBar {
        box-sizing: border-box;
        width: 500px;
        height: .8rem;
        border-bottom: 1px solid whitesmoke;
        font-size: 0;
    }

    .MusicBar {

    }

    .MusicBar-item {
        font-size: .3rem;
        line-height: .8rem;
        position: relative;
        box-sizing: border-box;
        float: left;
        width: 100px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .inset{
        display: block;
        position: relative;
        box-sizing: border-box;
    }
    .router-link-active .inset {
        color: #d33a31;
        border-bottom: 2px solid #d33a31;
    }

</style>