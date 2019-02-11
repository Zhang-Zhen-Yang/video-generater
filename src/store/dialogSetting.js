/*
 * @Author: zhangzhenyang 
 * @Date: 2019-02-10 16:46:16 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2019-02-11 10:08:54
 */


import http from '../script/http';
import api from '../script/api';

import util from '../script/util';
import Vue from 'vue';
const store = {
	state: {
		show: false,
		lastAction: 'loading',
		quality: 50,
		frames: 12,
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
		getSettingFromStorage({state, rootState}) {
			let quality = localStorage.getItem('setting-quality');
			let frames = localStorage.getItem('setting-frames');
			
			if(quality) {
				state.quality = quality;
			}
			if(frames) {
				state.frames = frames;
			}
		}
		
		
	}// end actions 
}
export default store;
