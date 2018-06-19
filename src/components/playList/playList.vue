<template>
    <transition  name="normal">
          <div class="play-wrap">
                <div style="width: 100%;height: 100%">
                    <div class="singer_photo"
                         :style="'background-image:url('+'//music.163.com/api/img/blur/'+list.al.pic+')'"
                         v-if="list.al">

                    </div>
                    <div class="playList">
                        <div class="play-list-head">
                            <img src="./toback.png" style="vertical-align: middle;height: 25px" @click="$router.back()">
                            <div class="names">
                                <p class="big">{{list.name}}</p>
                                <p class="small">{{ar.name}}</p>
                            </div>
                            <div class="right" style="float: right;font-size: 14px;">
                                <span @click="getMessage">留言</span>
                            </div>
                        </div>
                        <div class="linesa">
                            <img src="./needle.png" class="lines"/>
                        </div>
                        <div class="centerAreas">
                            <div class="inset-crirle start" v-bind:class="!canplay?'pause':''">
                                <img v-if="list.al" :src="list.al.picUrl" class="inset-img">
                            </div>
                        </div>
                        <div class="player">
                            <div class="progress-wrap">
                                <span>{{formatTime(currentTime)}}</span>
                                <div class="progress" @click.stop="setTimes($event)" ref="cps">
                                    <div class="inset-progress" :style="'width:'+getWidth+'%'"

                                    >
                                        <div class="squres">
                                            <div class="center-squres"
                                                 @click.stop="doNotihing"
                                                 @touchstart="touchStarts($event)"
                                                 @touchmove="touchMoves($event)"
                                                 @touchend="touchEnds($event)"></div>
                                        </div>
                                    </div>
                                </div>
                                <span>{{alltime}}</span>
                            </div>
                            <div class="bottom-toobar">
                                <span class="icon-sjbf"></span>
                                <span class="icon-last"></span>
                                <span class=" ct" v-bind:class="!canplay?'icon-play':'icon-zt'" @click="playMusic"></span>
                                <span class="icon-next"></span>
                                <span class="icon-lbxh"></span>

                            </div>
                        </div>

                    </div>
                </div>
                <audio :src="'http://music.163.com/song/media/outer/url?id='+$route.params.id+'.mp3'"  ref="audios" @timeupdate="updateTime" @canplay="canPlay"></audio>
                <div class="commet-list" v-if="commetStutes">
                    <div class="commet-head">
                        <img src="./toback.png" class="back-btn" style="vertical-align: middle;height: 25px" @click="commetStutes=false">
                        <span style="font-size: 16px;vertical-align: middle;color: white;margin-left: 10px">评论({{total}})</span>
                    </div>

                    <div >
                        <Scroll class="commet-con" :pullup="true" ref="slk" @scrollToEnd="scrollToEnd">
                            <div>
                               <div class="commet-con-item" v-for="item in commetList" v-bind:key="item.value">
                               <div class="commet-con-head">

                                   <div class="c-head-l">
                                       <img :src="item.user.avatarUrl" class="avaor">
                                   </div>
                                   <div class="c-head-r">
                                       <span class="name-c">{{item.user.nickname}}</span>
                                       <span class="time-c">{{TransformTime(item.time)}}</span>
                                   </div>
                               </div>
                                 <div class="c-con" >
                                     {{item.content}}
                                      <div v-for="items in item.beReplied" :key="item.value" class="col">
                                          <span class="l">@{{items.user.nickname}}</span> {{items.content}}
                                      </div>
                                 </div>


                               </div>
                                <div class="loadingStutes" v-show="hasMore">
                                    <img src="../../BaseMenu/loading.png" width="20" height="20" class="lo" style="vertical-align: middle">
                                    <span style="vertical-align: middle">正在加载...</span>
                                </div>
                            </div>
                        </Scroll>
                    </div>
                </div>
          </div>
    </transition>


</template>
<script>
    var begin,beginPoint;
    import Scroll from '../base/scroll.vue';
    import {api} from '../../BaseMenu/config';
    import {mapGetters} from 'vuex';
    export default {
        data() {
            return {
                list: [],
                ar: {},
                id:'',
                canplay:false,
                currentTime:0,
                percent:0,
                alltime:0,
                useTIme:0,
                commetStutes:false,
                limit:30,
                offsets:0,
                total:0,
                hasMore:true,
                commetList:[]
            }
        },
        components:{
            Scroll
        },
        computed: {
            getWidth() {
                return (this.useTIme / this.percent) * 100
            },
            ...mapGetters([
                'playId'

            ])
        },
        watch:{
            id(res){
                this.getMusicDetail()
           }
        },
        compontnts: {
            Scroll
        },
        created() {
            this.id = this.$route.params.id;
            this.getCommetList()
        },
        mounted() {
            setTimeout(function () {

            }, 2000)
        },
        methods: {
            doNotihing(){},
            getMusicDetail() {
                this.$axios.get(api + 'song/detail?ids=' + this.$route.params.id)
                    .then((res) => {
                        if (res.data.code === 200) {
                            this.list = res.data.songs[0];
                            this.ar = res.data.songs[0].ar[0]
                        }
                    })
            },
            playMusic(){
                if(this.canplay){
                    this.canplay = false
                    this.$refs.audios.pause();

                }
                else{
                    this.canplay = true;
                    this.$refs.audios.play();
                }
            },
            updateTime(){
                this.currentTime =  this.useTIme =  this.$refs.audios.currentTime;

                if (this.currentTime >= this.percent) {
                    this.canplay = false;
                }
            },
            formatTime(seconds) {
                var min = Math.floor(seconds / 60),
                    second = Math.floor(seconds % 60),
                    hour, newMin, time;

                if (min > 60) {
                    hour = Math.floor(min / 60);
                    newMin = min % 60;
                }

                if (second < 10) {
                    second = '0' + second;
                }
                if (min < 10) {
                    min = '0' + min;
                }

                return time = hour ? (hour + ':' + newMin + ':' + second) : (min + ':' + second);
            },
            canPlay(){
                this.canplay = true;
                setTimeout(()=>{
                    this.$refs.audios.play();
                    if(this.canplay){
                         this.alltime = this.formatTime(this.$refs.audios.duration);
                         this.percent = this.$refs.audios.duration;
                    }

                },20);
            },
            setTimes(e){
                this.currentTime = this.useTIme =  this.$refs.audios.currentTime = Number(this.percent) * e.offsetX / this.$refs.cps.clientWidth;
            },
            touchStarts(e){
                begin = e.target.offsetLeft;
                beginPoint = e.changedTouches[0].pageX;
            },
            touchMoves(e){
                if (beginPoint - e.changedTouches[0].pageX > 0) {
                    var pg = this.currentTime - (Number(this.percent) * ((beginPoint - e.changedTouches[0].pageX) / this.$refs.cps.clientWidth));
                    this.useTIme  = pg;

                }
                else {
                    var pg = this.currentTime + -(Number(this.percent) * ((beginPoint - e.changedTouches[0].pageX) / this.$refs.cps.clientWidth));
                    if(pg<this.percent){
                        this.useTIme = pg;
                    }

                }
            },
            touchEnds(e){

            },
            getCommetList(type){
                 this.$axios.get(api+'comment/music?id='+this.$route.params.id+'&limit='+this.limit+'&offset='+this.offsets*this.limit)
                     .then((res)=>{
                       this.commetList = this.commetList.concat(res.data.comments);
                       if(type){
                           this.$nextTick(()=>{
                               this.$refs.slk.refresh();
                           })
                       }
                       else{
                           this.total = res.data.total
                       }
                     })
            },
            getMessage(){
                this.getCommetList();
                this.commetStutes = true;
            },
            scrollToEnd(){
                this.offsets++;
                this.getCommetList(1);

            },
            TransformTime(timestamp){
                var timestamp = timestamp;
                var d = new Date(timestamp);    //根据时间戳生成的时间对象
                var year = d.getFullYear();
                var Month = d.getMonth() + 1;
                if (Month.toString().length < 2) {
                    Month = '0' + Month;
                }
                var datas = d.getDate();
                if (datas.toString().length < 2) {
                    datas = '0' + datas;
                }
                var hour = d.getHours();
                if (hour.toString().length < 2) {
                    hour = '0' + hour;
                }
                var minute = d.getMinutes();
                if (minute.toString().length < 2) {
                    minute = '0' + minute;
                }
                var times = year + '-' + Month + '-' + datas + ' ' + hour + ':' + minute;
                return times;

            }

        },
        activated(){
               this.getMusicDetail();
        },
        deactivated(){
               this.commetStutes = false;
        }
    }
</script>
<style scoped>
    .col{
        padding:  .1rem;
        background: whitesmoke;
    }
    .l {
        color: blue;
    }
    .commet-con{
        position: absolute;
        top:40px;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
    }
    .lineer{
        margin:10px 0;
        height: 1px;
        float:right;background: whitesmoke;
        width: calc(100% - 40px - .45rem);
    }
    .c-con{
        font-size:.3rem;
        width: calc(100% - 40px - .45rem);
        float: right;
        margin-right: .1rem;
        line-height:.6rem;
        border-bottom: 1px solid whitesmoke;
        /*padding: .2rem 0;*/
        padding-bottom: .2rem;
    }
    .commet-con-item{
        overflow: hidden;
    }
    .commet-con-head{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
    .c-head-r{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 40px;
    }
    .time-c{
        font-size:12px;
    }
    .name-c{
        font-size:14px;
    }
    .avaor{
         width: 40px;
         height: 40px;
         border-radius: 50%;
         margin-left: .15rem;
         margin-right: .2rem;
    }
    .commet-con-head{
        margin-top: .2rem;
    }
    .back-btn{
        margin-left: .15rem;
    }
    .commet-head{
        background: #d43c33;
        height: 40px;
        width: 100%;
        font-size:0;
        line-height:40px;
    }
    .commet-list{
         width: 100%;
         height: 100%;
         position: fixed;
         left: 0;
         top:0;
         bottom: 0;
         right: 0;
         z-index: 300;
         background: white;
    }
    .pause {
        animation-play-state: paused!important;
        -webkit-animation-play-state: paused!important;
    }
    .singer_photo {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        background-size: auto 100% !important;
        background-position: 50% !important;
        transform-origin: top center !important;
        overflow: hidden;

    }

    .singer_photo:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        display: block;
        background: rgba(0, 0, 0, .5);
    }

    .play-wrap {
        position: fixed;
        width: 100%;
        height: 100%;
        overflow: hidden;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    .play-list-head {
        font-size: 0;
        margin: .2rem .2rem;
        height: 1rem;
        margin-bottom: 0;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(255, 255, 255, .2);

    }

    .names {
        display: inline-block;
        vertical-align: middle;
        margin-left: .4rem;
    }

    .big {
        font-size: .32rem;
        color: white;
    }

    .small {
        font-size: .3rem;
        margin-top: .15rem;
        color: white;
    }

    .playList {
        overflow: hidden;
        width: 100%;
        height: 100%;
    }

    .lines {
        height: 2rem;

    }

    .linesa {
        text-align: center;
    }

    .centerAreas {
        width: 6rem;
        height: 6rem;
        box-sizing: border-box;
        margin: 0 auto;
        border-radius: 50%;
        border: 10px solid hsla(0, 0%, 100%, .1);
        position: relative;
        top: -50px;
        z-index: -1;
    }

    .inset-crirle {
        width: 100%;
        height: 100%;
        background: url(./disc-ip6.png) no-repeat;
        border-radius: 50%;
        background-size: cover;
        position: relative;
    }
    .start{
        animation: rotate 20s linear infinite;

    }

    .inset-img {
        width: 3.6rem;
        height: 3.6rem;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        margin-left: -1.8rem;
        top: 50%;
        margin-top: -1.8rem;

    }

    @keyframes rotate {
        0% {
            transform: rotate(0)

        }
        100% {
            transform: rotate(360deg)

        }
    }

    .normal-enter-active,.normal-leave-active{
        transition: all 0.3s;
        z-index: 100;
    }
    .normal-enter, .normal-leave-to {
        opacity: 0;


    }
    .normal-enter-active .play-list-head, .normal-leave-active .play-list-head{
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32) ;
        -webkit-transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32) ;
    }
    .normal-enter .play-list-head, .normal-leave-to .play-list-head {
        transform: translate3d(0, -50px, 0);
        -webkit-transform: translate3d(0, -50px, 0);

    }
    .normal-enter-active .player, .normal-leave-active .player{
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32) ;
        -webkit-transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32) ;
    }
    .normal-enter .player, .normal-leave-to .player {
        transform: translate3d(0, 150px, 0);
        -webkit-transform: translate3d(0, 150px, 0);

    }

     .player{
           position: absolute;
           bottom:0px;
           font-size:0;
           width: 100%;
     }
     .bottom-toobar{
         display: flex;
         flex-direction: row;
         justify-content: space-between;
         align-items: center;
         width:85%;
         margin-left: 7.5%;
         height: 35px;
         line-height:35px;
         padding-bottom: 20px;
     }
     .shadow{
         width: 100%;
         height: 0px;
         position: absolute;
         bottom: 0;
         left: 0;
     }
     .icon-lbxh,.icon-sjbf{

         font-size:20px;
     }
     .icon-lbxh:before,.icon-sjbf:before{
         color: #c2c0ce;
     }
    .icon-last,.icon-next{
        font-size:25px;
    }
    .ct{
        font-size:35px;
    }
    .progress-wrap{
        width:85%;
        margin-left: 7.5%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 15px;
        margin-bottom: 15px;
    }
    .progress-wrap span{
        font-size:.23rem;
        color: #c2c0ce;
    }
    .progress{
        flex: 1;
        background: #c2c0ce;
        height: 3px;
        margin: 0 20px;
        border-radius: 5px;
        position: relative;

    }
    .inset-progress{
        width: 0px;
        height: 100%;
        position: absolute;
        top:0;
        bottom: 0;
        left: 0;
        background: #d7393a;
    }
    .center-squres{
         width: 3px;
        height: 3px;
        background: #d7393a;
        display: inline-block;
        border-radius: 50%;

    }
    .squres{
         width: 15px;
         height: 15px;
         border-radius: 50%;
         background: white;
         position: absolute;
         right: 0px;
         top:-7.5px;
         text-align: center;
          line-height:18px;

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