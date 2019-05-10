/*
 * @Author: zhangzhenyang 
 * @Date: 2019-02-19 10:29:12 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2019-05-10 09:27:09
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
		uploading: false,
		client: null
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
		/*调用后台接口获取阿里云上传下载通行证 */
		initOSSinitConfig({state, commit, getters}) {
			let req = {

			};
			
		},
		// 上传video文件
		uploadVideoFile({state, commit, getters}, {type, key}){
			let title = state.title.trim();
			let label = state.label.trim();
			let coverUrl = state.coverUrl.trim();
			let numIid = window.user.numIid || getters.queryObj.numIid;
			let linkToUrl = window.app == 'wb' ? 'https://wdb.wonbao.net/marketing/mpicvideonew/list' : 'https://wnsp.wonbao.net/mpicvideonew/video/index';
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
			// formData.append("videoUpload", state.blob);
			formData.append('title', title);
			formData.append('label', label);
			formData.append('coverUrl', coverUrl);
			formData.append('key', key);
			if(type == 0) {
				formData.append('numIid', numIid);
			}
			var XHR=new XMLHttpRequest();
		


		   	XHR.open('post',`${window.remote}${api.uploadideospace}`);
		    XHR.send(formData);
			state.uploading = true;
		    XHR.onreadystatechange=function(e){	              
		        if(XHR.readyState==4){
					state.uploading = false;                 
		            if((XHR.status >=200 && XHR.status < 300 ) || XHR.status == 304){
						//判读是否有错误
						if(XHR.responseText.indexOf('true') > -1){
							commit('showSnackbar', {text: '上传成功'});
							if(window.app == 'wb') {
								commit('linkTo', {link: linkToUrl, timeout: 1000});
							}
							
						} else if(XHR.responseText.indexOf('"msg"')>-1){
							commit('showSnackbar',{text: '上传失败：'+XHR.responseText});
		    			}else{
							commit('showSnackbar',{text: '上传成功'});
							if(window.app == 'wb') {
								commit('linkTo', {link: linkToUrl, timeout: 1000});
							}
							
							/*var resultImgName = JSON.parse(XHR.response)[0].content;
							callback(resultImgName);*/
		    			} 
		            }else{
						commit('showSnackbar',{text: '上传失败'});
						// commit('linkTo', {link: linkToUrl, timeout: 1000});
		            }
		        }
		    };
		},
		// 上传文件到oss
		uploadFileOSS({state, commit, getters, dispatch}, {type}) {
			
			let title = state.title.trim();
			let label = state.label.trim();
			let coverUrl = state.coverUrl.trim();
			let numIid = window.user.numIid || getters.queryObj.numIid;
			let linkToUrl = 'https://wdb.wonbao.net/marketing/mpicvideonew/list';
			console.log([title, label, coverUrl]);
			if(!title) {
				commit('showSnackbar', {text: '请输入标题'});
				return 
			}
			if(!coverUrl) {
				commit('showSnackbar', {text: '请输选择封面图'});
				return 
			}
			let remoteRequest = {
				title,
				label,
				coverUrl,
			};
			/* let formData = new FormData();
			formData.append("videoUpload", state.blob);
			formData.append('title', title);
			formData.append('label', label);
			formData.append('coverUrl', coverUrl);*/
			if(type == 0) {
				// formData.append('numIid', numIid);
				remoteRequest.numIid = numIid;
			}

			http.post(api.getPolicySignature, {}).then((res)=>{
				
				if(res.status == 200) {
					if(res.data.success) {
						let {accessKeyId, bucketUrl, key, policy, signature} = res.data.data;

						let request = new FormData();
						request.append("OSSAccessKeyId", accessKeyId); //Bucket 拥有者的Access Key Id。
						request.append("policy", policy); //policy规定了请求的表单域的合法性
						request.append("Signature", signature); //根据Access Key Secret和policy计算的签名信息，OSS验证该签名信息从而验证该Post请求的合法性
						request.append("key", key+title+'.mp4');
						request.append("name", 'test.mp4');
						request.append("success_action_status", '200'); // 让服务端返回200,不然，默认会返回204
						request.append('file', state.blob); //需要上传的文件 file
						

						var XHR=new XMLHttpRequest();
						XHR.open('POST', `${bucketUrl}`)
						XHR.send(request)
						state.uploading = true;
						XHR.onreadystatechange=function(e){	              
							if(XHR.readyState==4){
								state.uploading = false;                 
								if((XHR.status >=200 && XHR.status < 300 ) || XHR.status == 304){
									dispatch('uploadVideoFile', {type, key: key+title+'.mp4'});
								} else {
									commit('showSnackbar', {text: '上传文件出错'});
								}
							}
						}

						/* $.ajax({
							url: uploadObj.host, //上传阿里地址
							data: request,
							processData: false, //默认true，设置为 false，不需要进行序列化处理
							cache: false, //设置为false将不会从浏览器缓存中加载请求信息
							async: false, //发送同步请求
							contentType: false, //避免服务器不能正常解析文件---------具体的可以查下这些参数的含义
							dataType: 'json', //不涉及跨域  写json即可
							type: 'post',
							success: function(response) { //callbackHost：success,request中就是 回调的一些信息，包括状态码什么的
								// console.log(response);
							},
							error: function(error) {
								alert("上传图片成功");
								verifyImg = `${uploadObj.host}/${uploadObj.dir}/${file.name}`;
							}
						});*/
						
					} else {
						commit('showSnackbar', {text: '获取直传签名出错'});
					}
					console.log(res.data);
				} else {
					commit('showSnackbar', {text: '获取直传签名出错（net）'});
				}
			})


			
		}
		
	}// end actions 
}
export default store;
