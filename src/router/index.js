import Vue from 'vue'
import Router from 'vue-router'
import HotIndex from '@/components/Hot/HotIndex.vue';
import HotMusic from '@/components/HotMusic/HotMusicIndex.vue';
import singer from '@/components/singer/singer.vue';
import singerDetail from '@/components/singer/singerDetail.vue';
import search from '@/components/search/search.vue';
import playlist from '@/components/playList/playList.vue';
import commet from '@/components/playList/commet.vue';
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/HotPage'
        },
        {
            path: '/HotPage',
            component: HotIndex
        },
        {
            path: '/HotMusic',
            component: HotMusic
        },
        {
            path:'/singer',
            component:singer,
            children:[
                {
                    path:'/singerDetail/:id',
                    component:singerDetail
                }
            ]
        },
        {
            path:'/search',
            component:search
        },
        {
            path:'/playlist/:id',
            component:playlist,
            children:[{
                path:'/commet/:id'

            }]

        }
    ]
})
