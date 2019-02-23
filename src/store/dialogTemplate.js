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
			let currentProjectPics = rootState.project.queue.map((item)=>{
				return item.pic_url;
			});
			// console.log(currentProjectPics);
			let {useWatermark,
				watermark,
				watermarkPosition,
				watermarkScale,
				watermarkAlpha,
				wordEffect,
				wordEffectOptions
				} = rootState.project;
			let newProject = {...JSON.parse(JSON.stringify(temp.data))};

			let saveItems = {useWatermark,
				watermark,
				watermarkPosition,
				watermarkScale,
				watermarkAlpha};
			for(let i in saveItems) {
				newProject[i] = saveItems[i];
			}
			currentProjectPics.forEach((item,index)=>{
				if(newProject.queue[index]){
					
				} else {
					newProject.queue[index] = JSON.parse(JSON.stringify(newProject.queue[index-1]));

				}
				newProject.queue[index].pic_url = item;
			})
			newProject.queue =  newProject.queue.splice(0, currentProjectPics.length);
			newProject.wordEffect = wordEffect;
			newProject.wordEffectOptions = wordEffectOptions;
			rootState.project = newProject;
			commit('update');
			if(!rootState.playing) {
				commit('togglePlayState')
			}
		}
		
	}// end actions 
}
export default store;
