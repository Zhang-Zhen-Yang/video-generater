/*
 * @Author: zhangzhenyang 
 * @Date: 2018-10-31 15:32:49 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: yyyy-11-dd 14:57:09
 */
const base = './';
// const remote = 'http://192.168.1.134:8090/wonbaoWeb/';
const remote = '';
let obj = {};
if(window.app == 'wb') {
	obj = {
	   remote,
	   img: `${base}/assets/`,
	   getItemInfo: `marketing/wireless/activitypage/getItemInfo`,// 获取宝贝详情(y)
	   getItems: `public/getItems`, // 获取宝贝(可参考旺店宝的无线活动页的添加(y)
	   loadPromotionActivity: `public/loadPromotionActivity`,//   加载促销活动列表(y)
	   getPromotionItems: `public/getPromotionItems`,//   加载活动中的宝贝 (y)
	   getPictureCategory: `goods/manage/picture/getPictureCategory`,//获取图片空间列表(y)
	   getPictureItems: `goods/manage/picture/getPictureItems`, // 获取图片空间图片列表(y)
	   getSellerCats:`public/getSellerCats`, // 获取宝贝类目 (y)
	   getPosterLabel: `marketing/wireless/activitypage/getPosterLabel`,// 获取海报主题，标签，颜色 (y)
	   getPosterTemplates: `marketing/wireless/activitypage/getPosterTemplates`,// 获取所有的海报模板 (y)
	   getMyPoster: `marketing/poster/template/getMyPoster`,// 获取我的海报
	   
	   // getCoupons: `promotion/coupon/ump/activity/getCoupons`,// 获取旺店宝优惠券(y)
	   // getPromotionCoupon: `marketing/poster/plan/getPromotionCoupon`,// 获取官方优惠券(y)
	   
	   // getPromotionMealPlan: `marketing/meal/plan/getPlans`,// 搭配套餐计划(y)
	   
	   
	   getPages: `marketing/wireless/activitypage/getPages`, // 获取无线活动页所有计划
	   
	   // getTemplate: 'marketing/wirelessnew/template/getTemplate', // 获取无线活动页的模板信息,页面加载时调用（y）
	   // addtemplate: 'marketing/wirelessnew/template/addOrUpdateTemplate', // 无线活动页保存到模板 (y)
	   // updatetemplate: '', // 无线活动页修改模板 （暂缺）
	   // getPagenew: `marketing/wirelessnew/activitypage/getPage`, // 获取新版无线活动页计划详细信息(y)
	   // addPage: `marketing/wirelessnew/activitypage/addPage`, // 无线活动页保存到计划 (y)
	   // updatePage: `marketing/wirelessnew/activitypage/updatePage`, // 无线活动页更新计划(y)
	   
	   getPromotion: `marketing/wirelessnew/template/getPromotion`,// 获取商品促销价格(y)
	   
	   
	   // 样式
	   // 获取样式列表(y)
	   // getTemplateStyles: 'marketing/wirelessnew/template/getTemplateStyles',
	   // 根据id获取单个样式
	   // getTemplateStyle: 'marketing/wirelessnew/template/getTemplateStyle',
	   // 保存和修改样式(y)
	   // addOrUpdateTemplateStyle: 'marketing/wirelessnew/template/addOrUpdateTemplateStyle',
	   // 根据id 删除样式(y)
	   // deletePageStyle: 'marketing/wirelessnew/template/deletePageStyle',
	   // 旧
	   // uploadPage: `marketing/wirelessnew/activitypage/uploadPage`,// 无线活动页上传本地图片到图片空间(y)
	   // 美工保存模板时上传图片（y）
	   uploadPage: 'marketing/mpicvideonew/uploadPage',
   
	   getPolicySignature: 'marketing/mpicvideonew/getPolicySignature',
	   uploadideospace: 'marketing/mpicvideonew/uploadideospace',
   } 
   
} else if (window.app == 'wn') {
	obj = {
		remote,
		img: `${base}/assets/`,
		getItemInfo: `marketing/wireless/activityPage/getItemInfo`,// 获取宝贝详情(y)
		getItems: `public/getItems`, // 获取宝贝(可参考旺店宝的无线活动页的添加(y)
		loadPromotionActivity: `public/loadPromotionActivity`,//   加载促销活动列表(y)
		getPromotionItems: `public/getPromotionItems`,//   加载活动中的宝贝 (y)
		getPictureCategory: `marketing/wireless/activityPage/getPictureCategory`,//获取图片空间列表(y)
		getPictureItems: `marketing/wireless/activityPage/getPictureItems`, // 获取图片空间图片列表(y)
		getSellerCats:`public/getSellerCats`, // 获取宝贝类目 (y)
		getPosterLabel: `marketing/wireless/activityPage/getPosterLabel`,// 获取海报主题，标签，颜色 (y)
		getPosterTemplates: `marketing/wireless/activityPage/getPosterTemplates`,// 获取所有的海报模板 (y)
		getMyPoster: `marketing/wireless/activityPage/getMyPoster`,// 获取我的海报
		
		// getCoupons: `promotion/coupon/ump/activity/getCoupons`,// 获取旺店宝优惠券(y)
		// getPromotionCoupon: `marketing/poster/plan/getPromotionCoupon`,// 获取官方优惠券(y)
		
		// getPromotionMealPlan: `marketing/meal/plan/getPlans`,// 搭配套餐计划(y)
		
		
		getPages: `marketing/wireless/activityPage/getPages`, // 获取无线活动页所有计划
		
		// getTemplate: 'marketing/wirelessnew/template/getTemplate', // 获取无线活动页的模板信息,页面加载时调用（y）
		// addtemplate: 'marketing/wirelessnew/template/addOrUpdateTemplate', // 无线活动页保存到模板 (y)
		// updatetemplate: '', // 无线活动页修改模板 （暂缺）
		// getPagenew: `marketing/wirelessnew/activitypage/getPage`, // 获取新版无线活动页计划详细信息(y)
		// addPage: `marketing/wirelessnew/activitypage/addPage`, // 无线活动页保存到计划 (y)
		// updatePage: `marketing/wirelessnew/activitypage/updatePage`, // 无线活动页更新计划(y)
		
		getPromotion: `marketing/wireless/activityPage/getPromotion`,// 获取商品促销价格(y)
		
		
		// 样式
		// 获取样式列表(y)
		// getTemplateStyles: 'marketing/wirelessnew/template/getTemplateStyles',
		// 根据id获取单个样式
		// getTemplateStyle: 'marketing/wirelessnew/template/getTemplateStyle',
		// 保存和修改样式(y)
		// addOrUpdateTemplateStyle: 'marketing/wirelessnew/template/addOrUpdateTemplateStyle',
		// 根据id 删除样式(y)
		// deletePageStyle: 'marketing/wirelessnew/template/deletePageStyle',
		// 旧
		// uploadPage: `marketing/wirelessnew/activitypage/uploadPage`,// 无线活动页上传本地图片到图片空间(y)
		// 美工保存模板时上传图片（y）
		uploadPage: 'mpicvideonew/video/uploadPage',
	
		getPolicySignature: 'mpicvideonew/mpicvideo/getPolicySignature',
		uploadideospace: 'mpicvideonew/mpicvideo/uploadideospace',
		
	} 

}

export default obj;