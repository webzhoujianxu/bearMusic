// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import promise from 'es6-promise';
promise.polyfill();
import Vue from 'vue'
import App from './App'
import router from './router';
import './assets/style.css';
import axios from 'axios';
import store from '../static/store';

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
    store,
  components: { App },
  template: '<App/>'
})
