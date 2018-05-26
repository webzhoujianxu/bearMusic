<template>
    <div class="Music-loading-bg" v-if="IsShow">
        <div class="Music-loading-center">
            <img src="../../BaseMenu/loading.png" class="loadings">
            <p>正在加载中...</p>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            IsShow:{
                 type:Boolean,
                 default:false
            }
        }
    }
</script>
<style scoped>
    .Music-loading-bg {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, .5);
        z-index: 100000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }

    .Music-loading-center p {
        color: white;
        font-size: .3rem;
    }

    .loadings {
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