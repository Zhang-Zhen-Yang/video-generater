/*
 * @Author: zhangzhenyang 
 * @Date: 2019-01-19 09:49:36 
 * @Last Modified by:   zhangzhenyang 
 * @Last Modified time: 2019-01-19 09:49:36 
 */

let widgetTypes = {
	focusImg: '焦点图',
	codeBlock: '自定义代码块',
	videoBlock: '视频',
	poster: '海报',
	swipe: '轮播宝贝',
	hotItem: '爆款推荐',
	oneRow: '单列宝贝',
	twoRow: '双列宝贝',
	threeRow: '三列宝贝',
	groupGoods: '组合宝贝',
	promotionMeal: '搭配套餐',
	countDown: '倒计时',
	oneRowHorizontal: '左右图文',
	coupon: '优惠券',
	tab: '选项卡',
	marqueeBlock: '滚动宝贝',
	waterfall: '瀑布流',
	favorite: '收藏',
	pageBottom: '页面底部',
};
export default function install (Vue) {
	// 模块名称
    Vue.filter('widgetType', function (value) {
       return widgetTypes[value] || value;
    });
    
};
