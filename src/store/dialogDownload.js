/*
 * @Author: zhangzhenyang 
 * @Date: 2019-02-19 10:29:12 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2019-03-06 17:06:56
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
		coverUrl: 'http://imgs.aixifan.com/content/2019_03_05/1551779417643.JPG'

	},
	// ---------------------------------------------------------------------------------------------------------
	getters: {
		
	},
	// -----------------------------------------------------------------------------------------------------------
	mutations: {
		
	},
	// ------------------------------------------------------------------------------------------------------------
	actions: {
		// 上传文件
		uploadFile({state, commit}, {blob}){
			// return;
			let formData = new FormData();
			let {title, label, coverUrl} = state;
			formData.append("videoUpload", blob);
			formData.append('title', 'test');
			formData.append('label', 'label');
			formData.append('coverUrl', 'http://imgs.aixifan.com/content/2019_03_05/1551779417643.JPG');
			var XHR=new XMLHttpRequest();
		   	XHR.open('post',`${window.remote}marketing/mpicvideonew/uploadideospace`)
		    XHR.send(formData)
			var message='图片上传中...'
		    XHR.onreadystatechange=function(e){	              
		        if(XHR.readyState==4){                    
		            if((XHR.status >=200 && XHR.status < 300 ) || XHR.status == 304){
						//判读是否有错误
						if(XHR.responseText.indexOf('true') > -1){
							alert('保存成功');
						} else if(XHR.responseText.indexOf('"msg"')>-1){
		    				alert('保存失败：'+XHR.responseText); 
		    			}else{
							alert('保存成功');
							/*var resultImgName = JSON.parse(XHR.response)[0].content;
							callback(resultImgName);*/
		    			} 
		               
		            }else{
		            	alert('上传失败');
		            }
		        }
		                
		    };

		}
		
	}// end actions 
}
export default store;
