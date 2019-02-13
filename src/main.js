/*
 * @Author: zhangzhenyang 
 * @Date: 2019-01-19 09:49:54 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: yyyy-01-dd 10:14:18
 */

import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import rootStore from './store/index';
import widgets from './widgets/index.js';
import filter from './script/filter.js';

import global from './style/global.scss';
import fonts from './style/fonts.scss';


// 注册全局组件
Vue.use(Vuex);
Vue.use(widgets);
Vue.use(filter);
const store = new Vuex.Store(rootStore);

window.p = new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
console.log('2019-02-13 16:15:35');
