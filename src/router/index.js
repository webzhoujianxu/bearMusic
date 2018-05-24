import Vue from 'vue'
import Router from 'vue-router'
import HotIndex from '@/components/Hot/HotIndex.vue';
import HotMusic from '@/components/HotMusic/HotMusicIndex.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/HotPage'
    },
      {
        path:'/HotPage',
        component: HotIndex
      },
      {
        path:'/HotMusic',
        component:HotMusic
      }
  ]
})
