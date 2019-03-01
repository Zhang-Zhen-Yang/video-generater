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
console.log('2019-02-26 15:52:35');
// alert(typeof(Worker));

// alert('serviceWorker' in window.navigator);
// alert(window.importScripts);
if('serviceWorker' in window.navigator) {

}else{
  alert('您的浏览器可能无法支持现代浏览器的某些特性;请更新或更换浏览器，如果是兼容模式，请切换到极速模式！');
}

/* if(navigator.userAgent.indexOf('compatible')>-1){
  alert('您的浏览器可能无法支持现代浏览器的某些特性;请更换浏览器，如果是兼容模式，请切换到极速模式！');
}*/
