/*
 * @Author: zhangzhenyang 
 * @Date: 2019-02-19 10:29:12 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2019-03-14 09:03:52
 */


import http from '../script/http';
import api from '../script/api';

import util from '../script/util';
import Vue from 'vue';
const store = {
	state: {
		show: false,
		step: 2,
		title: 'title',
		label: 'label',
		coverUrl: 'https://img.alicdn.com/imgextra/i2/105227988/O1CN01RODt6p28sYHB9HBe6-105227988.jpg',
		blob: null,
		uploading: false
	},
	// ---------------------------------------------------------------------------------------------------------
	getters: {
		
	},
	// -----------------------------------------------------------------------------------------------------------
	mutations: {
		linkTo(state, {link, timeout = 0}) {
			setTimeout(()=>{
				console.log(window.history.length)
				if(window.history > 1) {
					window.history.back();
				} else {
					location.href = link;
				}
				
			}, timeout)
		}
	},
	// ------------------------------------------------------------------------------------------------------------
	actions: {
		// 上传video文件
		uploadVideoFile({state, commit, getters}, {type}){
			let title = state.title.trim();
			let label = state.label.trim();
			let coverUrl = state.coverUrl.trim();
			let numIid = getters.queryObj.numIid;
			let linkToUrl = 'https://2015.wonbao.net/marketing/mpicvideonew/list';
			console.log([title, label, coverUrl]);
			if(!title) {
				commit('showSnackbar', {text: '请输入标题'});
				return 
			}
			if(!coverUrl) {
				commit('showSnackbar', {text: '请输选择封面图'});
				return 
			}
			let formData = new FormData();
			formData.append("videoUpload", state.blob);
			formData.append('title', title);
			formData.append('label', label);
			formData.append('coverUrl', coverUrl);
			if(type == 0) {
				formData.append('numIid', numIid);
			}
			var XHR=new XMLHttpRequest();
		   	XHR.open('post',`${window.remote}marketing/mpicvideonew/uploadideospace`)
		    XHR.send(formData)
			state.uploading = true;
		    XHR.onreadystatechange=function(e){	              
		        if(XHR.readyState==4){
					state.uploading = false;                 
		            if((XHR.status >=200 && XHR.status < 300 ) || XHR.status == 304){
						//判读是否有错误
						if(XHR.responseText.indexOf('true') > -1){
							commit('showSnackbar', {text: '上传成功'});
							commit('linkTo', {link: linkToUrl, timeout: 1000});
							
						} else if(XHR.responseText.indexOf('"msg"')>-1){
							commit('showSnackbar',{text: '上传失败：'+XHR.responseText});
		    			}else{
							commit('showSnackbar',{text: '上传成功'});
							commit('linkTo', {link: linkToUrl, timeout: 1000});
							
							/*var resultImgName = JSON.parse(XHR.response)[0].content;
							callback(resultImgName);*/
		    			} 
		            }else{
						commit('showSnackbar',{text: '上传失败'});
						// commit('linkTo', {link: linkToUrl, timeout: 1000});
		            }
		        }
		    };
		}
		
	}// end actions 
}
export default store;
