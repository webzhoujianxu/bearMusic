<template>
    <div>
        <HotScroll class="HotWrap" :pullup="true" @scrollToEnd="scrollToEnd" :click="true" ref="scorls">
            <div style="overflow: hidden;padding-bottom: 40px">
                  <div class="singer-list">
                      <div class="singer-list-item" v-for="item in singerList" :key="item.value" @click="$router.push('/singerDetail/'+item.id)">
                          <img :src="item.img1v1Url" class="singerAvator">
                          <span class="singerName">{{item.name}}</span>
                      </div>
                  </div>
                <div class="loadingStutes" v-show="loadingStutes">
                    <img src="../../BaseMenu/loading.png" width="20" height="20" class="lo" style="vertical-align: middle">
                     <span style="vertical-align: middle">正在加载...</span>
                </div>
            </div>
        </HotScroll>
        <router-view></router-view>
    </div>
</template>
<script>
    import {api} from '../../BaseMenu/config';
    import HotScroll from '../base/scroll.vue';
    import Loadings from '../base/loading.vue';

    export default {
       data(){
          return{
              singerList:[],
              limit:30,
              offset:0,
              loadingStutes:false,
              hasMore:true
          }
       },
       created(){
          this.getlist()
       },
       components:{
           HotScroll,
           Loadings
       } ,
       methods:{
           getlist(){
                this.$axios.get(api+'top/artists?offset='+this.offset+'&limit='+this.limit)
                    .then((res)=>{
                       this.loadingStutes = false;
                       this.singerList = this.singerList.concat(res.data.artists);
                       if(res.data.artists.length>0){
                           this.hasMore = true;
                       }
                       else{
                           this.hasMore = false;
                       }

                    })
           },
           scrollToEnd(){
             if(this.hasMore){
                 this.hasMore =false;
                 this.loadingStutes = true;
                 this.$nextTick(()=>{
                     this.$refs.scorls.refresh()
                 });
                 this.offset+=this.limit;
                 this.getlist()
             }

           }
       }
    }
</script>
<style scoped>
.singerAvator{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    vertical-align: middle;
    margin-left: 10px;
}
    .singerName{
        font-size:.3rem;
        vertical-align: middle;
        margin-left: 10px;
    }
    .singer-list-item{
        font-size:0;
        margin-top: 20px;
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