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
import watermark from '../script/watermark';

// import {convertStreamsNew, accessWorderNew} from '../script/convertNew.js';

// import {covertNew} from '../script/termimal.js';


import dialogGoods from './dialogGoods';
import dialogImage from './dialogImage';
import dialogTemplate from './dialogTemplate';
import dialogAudio from './dialogAudio';
import dialogGenerate from './dialogGenerate';
import dialogSetting from './dialogSetting';

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
		// 
		project: {...templates[8].data},
		audio: null,

		snackbar: {
			text: '',
			timeout: '',
			show: false,
		},
		stage: null

		
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
		// 设置播放位置
		setPosition(state, {position}) {
			// 如果是正在录制 不做任何操作
			if(state.recording) return;
			if(state.timeline) {
				if(state.playing) {
					state.timeline.gotoAndPlay(position);
				} else {
					state.timeline.gotoAndStop(position);
				}
				
			}
			// alert(position);
		},
		// 设置尺寸
		setSize(state, {val}) {
			state.project.width = val[0];
			state.project.height = val[1];
			state.update();
		},
		// 显示提示
		showSnackbar(state,{text,timeout=2000}) {
			state.snackbar.text = text;
			state.snackbar.timeout = timeout;
			state.snackbar.show = true;
		},
		// 更新舞台
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
		},
		// 设置音频的播放位置
		setAudioPosition(state) {
			try{
				let audio = document.getElementById('audio');
				
				let audioDuration = audio.duration * 1000;
				let shouldPosition = state.position % audioDuration;
				audio.currentTime =  shouldPosition / 1000;
			}catch(e){
				console.log(e);
			}
		},
		// 更新水印
		updateWatermark(state) {
			watermark({stage: state.stage,timeline: state.timeline,project: state.project});			
		}
	},
	// -------------------------------------------------------------------------------------------------------------
	actions: {
		// 初始化 网络请求
		init({state, commit, dispatch, getters}){
			dispatch('getSettingFromStorage');
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
		// 获取宝贝促销价
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
			dispatch('generateNew');
			return;

			// 弃用 (web RTC有不足之处)
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
					// recorderType: RecordRTC.WhammyRecorder,
					// frameInterval: 5,
					// mimeType: 'video/h264',
					// frameRate: 5,
					useWhammyRecorder: true,
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
								util.funDownload(null, recordedBlob, 'video.webm');
								
								return;
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

				}, 200)
			}
			
		},
		// 生成（new）
		generateNew({state, commit, dispatch, getters}) {
			let datas = [];
			console.log('new');

			state.timeline.removeAllEventListeners();
			
			// 时长
			const duration = state.timeline.duration
			let currentPosition = 0;
			state.timeline.gotoAndStop(0.05);
			// 显示弹窗
			state.dialogGenerate.show = true;
			state.dialogGenerate.step = 1;
			// 帧数
			// let f = 12;
			let f = state.dialogSetting.frames;
			// 每帧占用的时间
			let tseperate = 1000 / f;
			state.recording = true;
			var tickHandler = state.timeline.on('change', () => {
				const thisPosition = state.timeline.position;
				console.log('positon', thisPosition);
				//刷新 动画画面
				state.stage.update();

				
				// 获取图片数据(1)
				const base64str = window.canvas.toDataURL('image/jpeg', 0.9);
				var imgdata =  base64str.slice(23)
				var bytes = atob(imgdata);
				//console.log('ddddddddddddddddddddddddddddddddddddddddddddddddd', bytes.slice(0, 100));
				//var bytes = base64;
				var bytesCode = new ArrayBuffer(bytes.length);
				// 转换为类型化数组
				var byteArray = new Uint8Array(bytesCode);
				// 将base64转换为ascii码
				for (var i = 0; i < bytes.length; i++) {
					byteArray[i] = bytes.charCodeAt(i);
				}
				datas.push(byteArray);


				// 获取图片数据(2)
				/*window.canvas.toBlob((res)=>{
					// console.log('res', res.toString());
					util.blobToUint8Array(res).then((r)=>{
						datas.push(r);
						//============================================
						if(thisPosition + tseperate < duration) {
							setTimeout(()=>{
								state.timeline.gotoAndStop(thisPosition + tseperate);
							}, 0);
						} else { // 播放结束
							state.recording = false;
							state.timeline.off('change',tickHandler);
							// console.log(datas.length);
							console.log('获取图片帧完毕');
							if(state.playing) {
								state.timeline.gotoAndPlay(0);
							} else{
								state.timeline.gotoAndStop(0);
							}
							let audioCode = null;
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
									audioCode = byteArray;
								}
							}catch(e) {
								console.error(e);
							}
							let {width, height} = state.stage.canvas;
							let total = width * height;
							// 比特率
							// let bit = (total / 1000 * 5) | 0;
							let bit = (total / 1000 * state.dialogSetting.quality / 10) | 0;
							state.dialogGenerate.step = 2;
							// 转换图片到视频
							convertImageToVideo(
								datas,
								audioCode,
								{
									f: f,
									t: state.timeline.duration / 1000,
									b: bit
								},
								(msg)=>{
									if (msg.type == "ready") {
										
									} else if (msg.type == "stdout") {
										
									} else if (msg.type == "start") {
									} else if (msg.type == "done") {
										state.dialogGenerate.show = false;
										setTimeout(()=>{
											commit('showSnackbar', {
												text: '视频生成完毕,请点击下方的链接下载！',
											});
											// alert();
										},0)
									}
								}
							);
						}



						//============================================

					});


				}, 'image/jpeg', 0.9);


				return; 
				*/
				
				
				if(thisPosition + tseperate < duration) {
					setTimeout(()=>{
						state.timeline.gotoAndStop(thisPosition + tseperate);
					}, 0);
				} else { // 播放结束
					state.recording = false;
					state.timeline.off('change',tickHandler);
					// console.log(datas.length);
					console.log('获取图片帧完毕');
					if(state.playing) {
						state.timeline.gotoAndPlay(0);
					} else{
						state.timeline.gotoAndStop(0);
					}
					let audioCode = null;
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
							audioCode = byteArray;
						}
					}catch(e) {
						console.error(e);
					}
					let {width, height} = state.stage.canvas;
					let total = width * height;
					// 比特率
					// let bit = (total / 1000 * 5) | 0;
					let bit = (total / 1000 * state.dialogSetting.quality / 10) | 0;
					state.dialogGenerate.step = 2;
					// 转换图片到视频
					convertImageToVideo(
						datas,
						audioCode,
						{
							f: f,
							t: state.timeline.duration / 1000,
							b: bit
						},
						(msg)=>{
							if (msg.type == "ready") {
								
							} else if (msg.type == "stdout") {
								
							} else if (msg.type == "start") {
							} else if (msg.type == "done") {
								state.dialogGenerate.show = false;
								setTimeout(()=>{
									commit('showSnackbar', {
										text: '视频生成完毕,请点击下方的链接下载！',
									});
									// alert();
								},0)
							}
						}
					);
				}
				
			});
			state.timeline.gotoAndStop(0);
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
		// 删除，左移，右移
		setAction({state,commit, dispatch}, {type, index}) {
			let pickItem;
			switch(type) {
				// 向左
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
					commit('update');
					break;
				// 向右
				case 'right':
					// dispatch('addStep');
					pickItem = state.project.queue.splice(index + 1, 1)
					state.project.queue.splice(index,0,pickItem[0]);
					commit('setActiveIndex',{activeIndex: index + 1});
					commit('update');
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
					commit('update');
					break;
				default: break;
			}
		},
		// 设置价格标签
		setEffectWords({state,commit}, {type}) {
			if(state.project.wordEffect != type) {
				state.project.wordEffect = type;
				commit('update');
			}
		},
		// 保存项目到本地
		saveProject({state, commit}) {
			let project = JSON.stringify(state.project);
			// console.log(project);
			var blob = new Blob([project]);
			util.funDownload('', blob, 'project.temp');
		}
	},
	modules: {
		dialogGoods,
		dialogImage,
		dialogTemplate,
		dialogAudio,
		dialogGenerate,
		dialogSetting,
	}
}
export default store;