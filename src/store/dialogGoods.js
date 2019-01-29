/*
 * @Author: zhangzhenyang 
 * @Date: 2018-10-31 15:33:34 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: yyyy-11-dd 15:02:18
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
		itemData: {
			type: null,
			list: [],
		},
		mode: 'add',
		allowCount: 5,
		
		pageNo: 1,
		pageNo:1,
		pageSize: 15,
		type:'onsale',
		cid: 'all',
		keyword: '',
		

		tabIndex: 0,
		promotionPageSize: 15,
		promotionLastAction: 'loading',
		promotionPageNo: 1,
		promotionCount: 0,
		promotionList: [],
		promotion: 0,
		promotionType: '',
		activityId: 0,
		activityName: '',
		promotionActivity:[
			// 个性打折
			{	
				label: '个性打折',
				value: 'identity',
				children: []
			},
			// 统一打折
			{
				label: '统一打折',
				value: 'unify',
				children: [
				],
			},
			// 限购活动
			{	
				label: '限购活动',
				value: 'purchase',
				children: [

				]
			},
			// 首件优惠
			{
				label: '首件优惠',
				value: 'first',
				children: [

				]
			},
			// 时间阶梯
			{
				label: '时间阶梯',
				value: 'step',
				children : [

				]
			},
			// 满就送
			{ 
				label: '满就送',
				value: 'mjs',
				children: [
				]
			},
		],
		// 所有的宝贝分类
		sellerCats : [
			// {id: "all", pid: "all", name: "全部分类"},
		],
		// 宝贝主图
		goodsMainPics: {

		},
		// 促销价
		promotionPrices: {

		}
	},
	// ---------------------------------------------------------------------------------------------------------
	getters: {
		sellerCats(state){
			return state.sellerCats.map((item,index)=>{
				return {
					label: item.name,
					value: item.id,
				}
			})
		},
	},
	// -----------------------------------------------------------------------------------------------------------
	mutations: {
		showGoodsDialog(state, {itemData, allowCount, mode}) {
			state.itemData = itemData;
			state.allowCount = allowCount;
			state.mode = mode;
			state.show = true;
		},
	},
	// ------------------------------------------------------------------------------------------------------------
	actions: {
		// 获取宝贝列表
		fetchGoods({state, commit},{pageNo = 1, isPromotion = false}){
			state.lastAction = 'loading';
			const {pageSize, type, keyword, cid, promotion, activityId} = state;
			let reqs = {
				pageNo,
				pageSize,
				type,
				keyword,
				cid,
				promotion,
				activityId,
				fields: '',
			};
			let apiUrl = isPromotion ? api.getPromotionItems : api.getItems;
			http.post(apiUrl,reqs).then((res)=>{
				if(res.status == 200) {
					// console.log('-------------------------');
					// console.log(res.data);
					state.list = res.data.items.map((item,index)=>{
						return {
							title: item.title,
							pic_url: item.picUrl,
							price: item.price,
							prev_price: item.price,
							num_iid:item.numIid,
							num: item.num,
						}
					});
					state.count = res.data.totalCount;
					state.pageNo = pageNo;
					state.lastAction = 'success';
				} else {
					state.lastAction = 'error';
				}
			})
		},
		// 获取活动宝贝列表
		fetchPromotionGoods({state, commit},{pageNo = 1}){
			state.promotionLastAction = 'loading';
			const {promotionPageSize, promotion, activityId} = state;
			let reqs = {
				pageNo,
				pageSize: promotionPageSize,
				promotion,
				activityId,
			};
			let apiUrl = api.getPromotionItems;
			http.post(apiUrl,reqs).then((res)=>{
				if(res.status == 200) {
					// console.log('-------------------------');
					// console.log(res.data);
					state.promotionList = res.data.items.map((item,index)=>{
						return {
							title: item.title,
							pic_url: item.picUrl,
							price: item.price,
							prev_price: item.price,
							num_iid:item.numIid,
							num: item.num,
						}
					});
					state.promotionCount = res.data.totalCount;
					state.promotionPageNo = pageNo;
					state.promotionLastAction = 'success';
				} else {
					state.promotionLastAction = 'error';
				}
			})
		},
		// 加载促销活动列表
		loadPromotionActivity({state, commit}) {
			http.post(api.loadPromotionActivity,{}).then((res)=>{
				if(res.status == 200) {
					// console.log('-------------------------');
					// console.log(res.data);
					const promotionMap = {};
					res.data.data.forEach((item, index)=>{
						const type = item.type;
						if(!promotionMap[type]) {
							promotionMap[type] = [];
						}
						promotionMap[type].push({
							label: item.name,
							value: item.activityId,
							id: item.id,
							activityId: item.activityId,
							type: item.type,
							status: item.status,
						})
					})
					// console.log(promotionMap);
					state.promotionActivity.forEach((item, index) => {
						const type = item.value;
						item.children = promotionMap[type] || []
					})

					// console.log(JSON.stringify(state.promotionActivity));
					
				} else {
					
				}
			})
		},
		// 获取宝贝类目
		getSellerCats({state, commit}){
			http.post(api.getSellerCats,{}).then((res)=>{
				if(res.status == 200) {
					// console.log('-------------------------');
					// console.log(res.data);
					state.sellerCats = res.data.data;
					
				} else {
					
				}
			})
		},
		// 获取宝贝详情
		getItemInfo({state, commit},{num_iid}){
			if(!num_iid){
				return;
			}
			let goodsMainPicsData = state.goodsMainPics[`n${num_iid}`];
			if(!goodsMainPicsData || (goodsMainPicsData && goodsMainPicsData.lastAction == 'error')) {
				state.goodsMainPics[`n${num_iid}`] = goodsMainPicsData || { lastAction: 'loading' };
				Vue.set(state, 'goodsMainPics', {...state.goodsMainPics});
				if(state.goodsMainPics[`n${num_iid}`].msg == '没有权限获取该商品信息') {
					return;
				}
				let req = {
					numIid: num_iid,
					fields: 'pic_url,item_img,product_id',
				}
				state.goodsMainPics[`n${num_iid}`].lastAction = 'loading';
				Vue.set(state, 'goodsMainPics', {...state.goodsMainPics});
				http.post(api.getItemInfo, req).then((res)=>{
					if(res.status == 200) {
						// console.log(res.data);
						if(res.data.success) {
							state.goodsMainPics[`n${num_iid}`] = {...state.goodsMainPics[`n${num_iid}`], lastAction: 'success', list: res.data.item.itemImgs}
						} else {
							state.goodsMainPics[`n${num_iid}`].lastAction = 'error';
							state.goodsMainPics[`n${num_iid}`].msg = res.data.msg;
						}
						
					} else {
						state.goodsMainPics[`n${num_iid}`].lastAction = 'error';
					}
					Vue.set(state, 'goodsMainPics', {...state.goodsMainPics});
				})
			}
		},
		// 获取促销价
		getPromotion({state, commit}, {item}) {
			// console.log(item);
			let numIid = item.num_iid;
			let cachePrice = state.promotionPrices[`price${numIid}`]
			if(cachePrice) {
				item.price = cachePrice;
			} else {
				let req = {
					numIid
				}
				http.post(api.getPromotion, req).then((res)=>{
					if(res.status == 200) {
						if(res.data.success) {
							let promotionPrice = res.data.promotionPrice;
							// alert(typeof promotionPrice);
							if(typeof promotionPrice != 'undefined'){
								item.price = promotionPrice;
							}
							state.promotionPrices[`price${numIid}`] = res.data.promotionPrice;
						} else {
							// commit('showSnackbar',{text:'获取宝贝促销价出错', timeout: 1000});
						}
					} else {
						commit('showSnackbar',{text:'获取宝贝促销价出错(net)', timeout: 1000});
					}
				})

			}
		}
	}// end actions 
}
export default store;
