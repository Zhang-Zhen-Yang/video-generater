/*
 * @Author: zhangzhenyang 
 * @Date: 2019-01-19 10:19:45 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: yyyy-01-dd 10:21:48
 */

import http from '../script/http';
import api from '../script/api';
import util from '../script/util';
import templates from '../script/templates/templates';
import {convertStreams, accessWorder, convertImageToVideo} from '../script/convert.js';

// import {convertStreamsNew, accessWorderNew} from '../script/convertNew.js';



import dialogGoods from './dialogGoods';
import dialogImage from './dialogImage';
import dialogTemplate from './dialogTemplate';
import dialogAudio from './dialogAudio';

const store = {
	state: {
		goods: {
			list: [],
			price: 200,
			promotionPrice: 100,

			listInited: false,
			promotionPriceInited: false,
		},
		asmInitedStatus: 'initing',
		activeIndex: 0,
		timeline: null,
		update: () => {},
		position: 0,
		playing: true,
		recording: false,
		project: {...templates[5].data},
		audio: null,

		snackbar: {
			text: '',
			timeout: '',
			show: false,
		}

		
	},
	// ---------------------------------------------------------------------------------------------------------
	getters: {
		// 是否管理员
		isAdmin(state) {
			// return false;
			if(window.user.id == '105227988' && util.getQueryString().admin != undefined) {
				return true;
			}
			return false;
		},
		queryObj() {
			return util.getQueryString();
		},

	},
	// -----------------------------------------------------------------------------------------------------------
	mutations: {
		setActiveIndex(state, {activeIndex}) {
			state.activeIndex = activeIndex;
			state.subActiveIndex = null;
		},
		positionChange(state, {position}) {
			state.position = position;
		},
		togglePlayState(state) {
			if(state.recording) return;
			if(state.timeline) {
				// console.log('togglePlayState', state.playing);
				state.timeline.setPaused(state.playing);
				state.playing = !state.playing;
				// console.log(state.timeline.paused);

			}
		},
		setPosition(state, {position}) {
			if(state.recording) return;
			if(state.timeline) {
				state.timeline.gotoAndStop(position);
			}
			// alert(position);
		},
		setSize(state, {val}) {
			state.project.width = val[0];
			state.project.height = val[1];
			state.update();
		},
		showSnackbar(state,{text,timeout=2000}) {
			state.snackbar.text = text;
			state.snackbar.timeout = timeout;
			state.snackbar.show = true;
		},
		update(state) {
			state.update();
		},
		// 将宝贝图片填充
		fillGoods(state) {
			if(state.goods.list.length > 0) {
				let newQueue = state.goods.list.map((item, index)=>{
					return {
						...state.project.queue[state.project.queue.length - 1],
						pic_url: item.url,
					}
				})
				state.project.queue = newQueue;
				state.project.wordEffectOptions.forEach((item, index)=>{
					if(item.tag == 'price') {
						item.value = item.value.replace(/[0-9]+\.?[0-9]*/, state.goods.price);
					}
					if(item.tag == 'promotionPrice') {
						item.value = item.value.replace(/[0-9]+\.?[0-9]*/, state.goods.promotionPrice);
					}
				})

				state.update();
			}
		}
		
	},
	// -------------------------------------------------------------------------------------------------------------
	actions: {
		// 初始化 网络请求
		init({state, commit, dispatch, getters}){
			accessWorder().then(()=>{
				// alert('ddddd');
				state.asmInitedStatus = 'success';
			}, ()=>{
				state.asmInitedStatus = 'error';
			})
			// 如果有numIid
			let numIid = getters.queryObj.numIid
			if(numIid) {
				dispatch('getItemInfoRoot', {numIid});
				dispatch('getPromotionRoot', {numIid})
			}
		},

		// 获取宝贝详情
		getItemInfoRoot({state, commit, dispatch, getters},{numIid}) {
			let req = {
				numIid: numIid,
				fields: 'pic_url,item_img,product_id,price',
			}
			http.post(api.getItemInfo, req).then((res)=>{
				state.goods.listInited = true;
				if(res.status == 200) {
					
					console.log(res.data);
					if(res.data.success) {
						state.goods.list = res.data.item.itemImgs;
						state.goods.price = res.data.item.price;
					} else {
						alert(res.data.msg || '获取宝贝信息出错');
					}
					
				} else {
				}
				if(state.goods.promotionPriceInited) {
					commit('fillGoods');
					// commit('update');
				}
			})
		},
		getPromotionRoot({state, commit, dispatch, getters},{numIid}){
			let req = {
				numIid: numIid,
			}
			http.post(api.getPromotion, req).then((res)=>{
				state.goods.promotionPriceInited = true;

				if(res.status == 200) {
					if(res.data.success) {
						let promotionPrice = res.data.promotionPrice;
						// alert(typeof promotionPrice);
						if(typeof promotionPrice != 'undefined'){
							state.goods.promotionPrice = promotionPrice;
						}
					} else {
						// commit('showSnackbar',{text:'获取宝贝促销价出错', timeout: 1000});
					}
				} else {
					commit('showSnackbar',{text:'获取宝贝促销价出错(net)', timeout: 1000});
				}
				if(state.goods.listInited) {
					commit('fillGoods');
					// commit('update');
				}
			})
		},
		// 开始生成
		generate({state, commit, dispatch, getters}) {
			console.time('startRecord')
			/* dispatch('testImgToVideo', {});
			return;*/
			state.recording = true;
			let prevPosition = 0;
			if(state.timeline) {
				let canvas = document.getElementById('canvas')
				// 开始录制
				var recordRTC = RecordRTC(canvas, {
					type: 'canvas',
					// mimeType: 'video/h264',
					// frameRate: 5,
				});
				state.timeline.gotoAndStop(0);
				state.playing = false;
				setTimeout(()=>{
					state.playing = true;
					state.timeline.setPaused(false);

					// 开始录制
					recordRTC.startRecording();

					/* setTimeout(()=>{
						// 结束录制
						recordRTC.stopRecording(function(videoURL) {
							// video.src = videoURL;
		
							var recordedBlob = recordRTC.getBlob();
							util.funDownload(null, recordedBlob, 'video.webm');
							
							// dispatch('convert', {recordedBlob});
							convert(recordedBlob, state.audio, {t: 1 });
							// convertStreams(recordedBlob, audioFile);
		
							recordRTC.getDataURL(function(dataURL) {
								// console.log(dataURL);
								// video.src = dataURL;
							});
						});
						console.log('生成完成');
					}, 1000)*/

					let handle = state.timeline.on('change', ()=>{
						let currentPositon = state.timeline.position;
						if(currentPositon < prevPosition) {
							state.recording = false;
							state.timeline.off('change', handle);
							// 结束录制
							recordRTC.stopRecording(function(videoURL) {
								console.log('d1', Date.now());
								// video.src = videoURL;
			
								var recordedBlob = recordRTC.getBlob();
								console.log('d2', Date.now());
								// util.funDownload(null, recordedBlob, 'video.webm');
								
								// dispatch('convert', {recordedBlob});

								let audioCode = '';

								try{
									if(state.dialogAudio.audioFrom == 'net') {
										if(state.dialogAudio.selectedAudioID != null) {
											audioCode = getters.idMapAudio[state.dialogAudio.selectedAudioID];
										}
									} else if(state.dialogAudio.audioFrom == 'local'){
										audioCode = state.dialogAudio.audioData;
									}

									if(audioCode) {
										let bytes = atob(audioCode);
										var bytesCode = new ArrayBuffer(bytes.length);
										// 转换为类型化数组
										var byteArray = new Uint8Array(bytesCode);
										
										// 将base64转换为ascii码
										for (var i = 0; i < bytes.length; i++) {
											byteArray[i] = bytes.charCodeAt(i);
										}
										// 生成Blob对象（文件对象）
										let b =  new Blob( [bytesCode] , {type : 'audio/wav'});
										// console.log(b);
										audioCode = b;
									}
								}catch(e){
									console.error(e);
								}
								convertStreams(recordedBlob, audioCode, {t: state.timeline.duration / 1000 });
								// convertStreams(recordedBlob, audioFile);
			
								// recordRTC.getDataURL(function(dataURL) {
									// console.log(dataURL);
									// video.src = dataURL;
								// });
							});
							console.log('生成完成');
							console.timeEnd('startRecord')
						}
						prevPosition = currentPositon;
					});

				}, 100)
			}
			
		},
		// 更新时间轴
		updateTimeline({state, commit, dispatch, getters}, {timeline}) {
			state.timeline = timeline;
			let position = state.position % timeline.duration;
			timeline.gotoAndStop(position);
			state.timeline.setPaused(!state.playing);
			// console.log(timeline);
		},
		// setAudio
		setAudio({state, commit, dispatch, getters}, {file}){
			state.audio = file;
			console.log(state.audio);
		},
		// 转换
		convert({state, commit, dispatch, getters}, {recordedBlob}) {
			console.log('recordedBlob', typeof recordedBlob);
			convert(recordedBlob, state.audio );
		},
		// 测试图片转视频
		testImgToVideo({state, commit, dispatch, getters}) {
			let canvas = document.getElementById('canvas');
			let count = 0;
			let images = [];
			state.project.queue.forEach((item, index)=>{
				if(item.file) {
					images.push(item.file)
				}
				console.log(images.length);
			})
			let fetchImage = function() {
				if(count > 3) {
					convertImageToVideo({images});
					console.log('images.length', images.length);
					console.log(images[0]);
					/* util.blobToUint8Array(window.atob(canvas.toDataURL('image/png').slice(22))).then((res)=>{
						console.log(res);
					})*/
				} else {
					// images.push(util.convertBase64ToBlob(canvas.toDataURL('image/png'), 'byteArray'));
					setTimeout(fetchImage, 100);
				}
				
				count += 1;
			}
			fetchImage();

		},
		setAction({state,commit}, {type, index}) {
			let pickItem;
			switch(type) {
				// 向上
				case 'left':
					if(index == 0) {
						return;
					}
					// dispatch('addStep');
					if(state.activeIndex > 0 ) {
						const distIndex = state.activeIndex - 1;
						commit('setActiveIndex',{activeIndex: distIndex});
					}
					pickItem = state.project.queue.splice(index, 1);
					state.project.queue.splice(index - 1,0,pickItem[0]);
					break;
				// 向下
				case 'right':
					// dispatch('addStep');
					pickItem = state.project.queue.splice(index + 1, 1)
					state.project.queue.splice(index,0,pickItem[0]);
					commit('setActiveIndex',{activeIndex: index + 1});
					break;
				// 删除
				case 'delete':
					if(state.project.queue.length == 1) {
						alert('不能少于一个模块');
						return;
					}
					if(confirm('确定要删除该模块')) {
						// dispatch('addStep');
						if(index + 1 == state.project.queue.length) {
							commit('setActiveIndex',{activeIndex: index - 1});
						}
						pickItem = state.project.queue.splice(index, 1);
					}
					break;
				default: break;
			}
		},
		setEffectWords({state,commit}, {type}) {
			if(state.project.wordEffect != type) {
				state.project.wordEffect = type;
				commit('update');
			}
		}
	},
	modules: {
		dialogGoods,
		dialogImage,
		dialogTemplate,
		dialogAudio,
	}
}
export default store;