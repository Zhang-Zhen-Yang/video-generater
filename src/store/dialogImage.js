/*
 * @Author: zhangzhenyang 
 * @Date: 2018-10-31 15:33:39 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: yyyy-12-dd 09:08:55
 */
import http from '../script/http';
import api from '../script/api';
const store = {
	state: {
		show: false,
		pageSize: 20,
		pageNo: 1,
		hastNext: true,
		pictureCategoryId: -1,
		pictureCategoryName: '我的空间',
		itemData: {

		},
		itemIndex: 0,
		list: [],
		lastAction: 'linding',
		allowCount: 1,
		selectedPic: '',
		tabIndex: 0,
		key: '',

		color: '所有颜色',
		industry: '所有主题',
		tag:'所有标签',
		sort: '综合人气',
		posterPageSize:20,
		posterPageNo: 1,
		posterCount: 0,
		posters: [],
		posterLastAction: 'loading',
		// 图片分类
		pictureCategory: null,
		// 海报标签
		posterLabel: {
			colors: [
				'所有颜色'
			],
			industrys: [
				'所有主题'
			],
			tags: [
				'所有标签'
			]
		},




		myposterPageNo: 1,
		myposterPageSize: 20,
		myposterLastAction: 'loading',
		myposterCount: 0,
		myposterList: [],

	},
	// ---------------------------------------------------------------------------------------------------------
	getters: {

	},
	// -----------------------------------------------------------------------------------------------------------
	mutations: {
		showDialogImage(state) {

		}
	},
	// ------------------------------------------------------------------------------------------------------------
	actions: {
		// 获取图片空间类目
		getPictureCategory({state, commit}) {
			http.post(api.getPictureCategory,{}).then((res)=>{
				if(res.status == 200) {
					// console.log('-------------------------');

					const categoryList = res.data.data;

					let top = categoryList.filter((item)=>{
						return item.picture_category_id == -1;
					})

					var parentList = [];
					categoryList.forEach(function(item) {
						if(item.parent_id == 0 &&item.picture_category_id != -1 ) {
							parentList.push(item);
						}
					})
					function getChildren(list) {
						list.forEach(function(item){
							const id = item.picture_category_id;

							const childList = []
							categoryList.forEach(function(i){
								if(i.parent_id == id){
									childList.push(i);
								} 
							})
							if(childList.length > 0) {
								getChildren(childList)
							}
							item.children = childList;
						});
					}
					getChildren(parentList);

					let result = parentList;
					if(top && top[0]){
						top[0].children = parentList;
						result = top
					}
					state.pictureCategory = result;
					// console.log(parentList);


				} else {

				}
			})
		},
		// 获取图片空间图片列表
		getPictureItems({state, commit}, {pageNo = 1}) {
			const {pageSize, pictureCategoryId } = state;
			const req = {
				pageSize,
				categoryId: pictureCategoryId,
				currentPage: pageNo,
			}
			state.lastAction = 'loading';
			http.post(api.getPictureItems, req).then((res)=>{
				if(res.status == 200) {
					// console.log('-------------------------');
					state.pageNo = pageNo;
					state.list = res.data.data.map((item, index)=>{
						return {
							pic_url: item.imgUrl,
							id: item.id,
							pictureId: item.pictureId,
							pixel: item.pixel,
							sizes: item.sizes,
						}
					});
					// console.log(state.list);
					state.lastAction = 'success';
					state.pageNo = pageNo;
					state.hastNext = res.data.hastNext || false;
				} else {
					state.lastAction = 'error';
				}
			})
		},
		// 获取所有的海报模板
		getPosterTemplates({state, commit}, {pageNo = 1}){
	
			/*color: '所有颜色',
			industry: '所有主题',
			tag:'所有标签',
			sort: '综合人气',
			posterPageSize:10,
			posterPageNo: 1,
			posterCount: 0,
			posters: [],
			posterLastAction: 'loading',*/
	
	
			let { industry, tag, color, sort, posterPageSize } = state;
			let req = {
				pageNo,
				pageSize: posterPageSize,
				trade: industry == '所有主题' ? '' : industry,
				tag: tag == '所有标签' ? '' : tag,
				color: color == '所有颜色' ? '' : color,
				sort: sort == '综合人气' ? 'attention' : 'time'
			}
			state.posterLastAction = 'loading';
			http.post(api.getPosterTemplates, req).then((res)=>{
				if(res.status == 200) {
					// console.log(res.data);
					state.posters = res.data.data.map((item)=>{
						return {
							pic_url: item.width_750_pic,
						}
					});
					state.posterLastAction = 'success';
					state.posterCount = res.data.total;
					state.posterPageNo = pageNo;
				} else {
					state.posterLastAction = 'error';
				}
			});
		},
		// 上传图片
		imageUpload({state, commit, dispatch}, {formdata,callback=()=>{}}) {
			// alert('dddd');

			let XHR = new XMLHttpRequest();
			commit('setLoadingMask', {show: true, text: '上传中···'});
			XHR.open('post', `${window.remote}${api.uploadPage}`);
			XHR.send(formdata);
			XHR.onreadystatechange=function(e){
				if(XHR.readyState==4){                    
					if((XHR.status >=200 && XHR.status < 300 ) || XHR.status == 304){
						commit('setLoadingMask', {show: false, text: '上传中···'});
						// alert('上传成功');
						let res = JSON.parse(XHR.response);
						if(res.success){
							// alert('上传成功');
							commit('showSnackbar', {text: '上传成功'});
							// 如果是 我的空间 重新加载数据（应该还得判断当前是否主图视频 及是否有 主图视频这个目录 待做）

							if (JSON.stringify(state.pictureCategory || {}).indexOf('主图视频') < 0) {
								console.log('主图视频一项，重新获取');
								dispatch('getPictureCategory');
							}
							if(state.pictureCategoryId == -1 ||state.pictureCategoryName == '主图视频') {
								dispatch('getPictureItems', {pageSize: 1});
							} else{
								
							}
							callback(res.thumbnail);
						} else {
							// alert('上传失败');
							if(res.msg) {
								alert(res.msg);
							} else {
								commit('showSnackbar', {text: '上传失败'});
							}
						}
						//判读是否有错误
						/* if(XHR.responseText.indexOf('"msg"')>-1){
							alert('保存失败：'+XHR.responseText); 
						}else{
							var fn=success();
							if(typeof fn=='function'){
								// alert(XHR.response);
								// success()(JSON.parse(XHR.response).name);
								//2018
								var resultImgName = JSON.parse(XHR.response)[0].content;
								success(resultImgName)(resultImgName)
							}
						} */
					   
					}else{
						commit('setLoadingMask', {show: false, text: '上传中···'});
						// alert('上传失败');
						commit('showSnackbar', {text: '上传失败'});
					}
				}
						
			};
		},
		// 获取海报标签
		getPosterLabel({state, commit}) {
			http.post(api.getPosterLabel, {}).then((res)=>{
				if(res.status == 200) {
					// console.log(res.data);
					state.posterLabel = res.data;
					if(state.posterLabel){
						if(state.posterLabel.colors){
							state.posterLabel.colors.unshift('所有颜色');
							state.posterLabel.industrys.unshift('所有主题');
							state.posterLabel.tags.unshift('所有标签');
						}
					}
				} else {
	
				}
			});
		},
		// 获取我的海报
		myposerFetch({state, commit}, {pageNo = 1}) {
			let req = {
				pageSize: state.myposterPageSize,
				pageNo
			}
			state.myposterLastAction = 'loading';
			http.post(api.getMyPoster, req).then((res)=>{
				if(res.status == 200) {
					// console.log(res.data);
					if(res.data.success) {
						state.myposterLastAction = 'success';
						state.myposterList = res.data.data;
						state.myposterCount = res.data.total;
						state.myposterPageNo = pageNo;

					} else {
						state.myposterLastAction = 'error';
					}
					
				} else {
					state.myposterLastAction = 'error';
				}
			});
		}
	},
}
export default store;