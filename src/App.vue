<template>
  <div id="app">
    <MusicHeader></MusicHeader>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  import MusicHeader from './components/base/head.vue';
  import {RemYdui} from './BaseMenu/Rem';
export default {
  name: 'App',
  components:{
      MusicHeader
  },
  created(){
      RemYdui()
  }
}
</script>

<style>
  @import "./BaseMenu/reset.css";
  html,body,#app{
     width: 100%;
     height: 100%;
     overflow: hidden;
  }
</style>
