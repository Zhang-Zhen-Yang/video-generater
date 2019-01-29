/*
 * @Author: zhangzhenyang 
 * @Date: yyyy-01-dd 16:45:37 
 * @Last Modified by:   zhangzhenyang 
 * @Last Modified time: yyyy-01-dd 16:45:37 
 */

import http from '../script/http';
import api from '../script/api';
import Vue from 'vue';
const store = {
	state: {
		show: false,
		lastAction: 'loading',
		count: 0,
		list: [],
		pageNo: 1,
		pageSize: 15,
	},
	// ---------------------------------------------------------------------------------------------------------
	getters: {
		
	},
	// -----------------------------------------------------------------------------------------------------------
	mutations: {
		showTemplateDialog(state, {}) {
			state.show = true;
		},
	},
	// ------------------------------------------------------------------------------------------------------------
	actions: {
		// 获取宝贝列表
		fetchTemplates({state, commit},{pageNo = 1}){
			
		},
		setTemplate({rootState, state, commit}, temp) {
			// console.log(temp);
			rootState.project = {...temp.data};
			commit('update');
		}
		
	}// end actions 
}
export default store;
