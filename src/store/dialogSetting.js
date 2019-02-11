/*
 * @Author: zhangzhenyang 
 * @Date: 2019-02-10 16:46:16 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2019-02-11 09:04:39
 */


import http from '../script/http';
import api from '../script/api';

import util from '../script/util';
import Vue from 'vue';
const store = {
	state: {
		show: false,
		lastAction: 'loading',
		quality: 60,


	},
	// ---------------------------------------------------------------------------------------------------------
	getters: {
		
	},
	// -----------------------------------------------------------------------------------------------------------
	mutations: {
		showSettingDialog(state, {}) {
			state.show = true;
		},
	},
	// ------------------------------------------------------------------------------------------------------------
	actions: {
		

		
		
	}// end actions 
}
export default store;
