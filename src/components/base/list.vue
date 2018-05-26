<template>
        <div class="hotMusicList">
            <div class="hotMusicList-item" v-for="item in MusicList" v-bind:key="item.value">
                <div class="hotMusicList-left">
                    <p class="hotMusicList-left-title"  v-if="MenuType==0">
                        {{item.name}}
                        <span  v-for="items in item.song.alias" class="smalltitle">{{'(' + items + ')'}}</span>
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
                        <img src="../../BaseMenu/index_ic.png" class="tag" v-if="item.cd!=1"> <span v-for="itemd in item.ar" style="margin-right: 5px">{{itemd.name}}</span> - {{item.name}}</p>

                </div>
                <div class="hotMusicList-right">
                    <img src="../../BaseMenu/play.png">
                </div>
            </div>
        </div>
</template>
<script>
    export default {
          props:{
              MusicList:{
                  type:Array,
                  default:[]
              },
             MenuType:{
                  type:Number,
                  default:0
             }
          }
    }
</script>
<style scoped>


</style>