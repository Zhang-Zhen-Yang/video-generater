/*
 * @Author: zhangzhenyang 
 * @Date: 2019-02-18 08:43:15 
 * @Last Modified by:   zhangzhenyang 
 * @Last Modified time: 2019-02-18 08:43:15 
 */

import util from '../util.js';
const fun = function({stage, timeline, item, index, wait, project = {} }) {
	let c = createjs;

	let pic_url = item.pic_url;
	let canvas = stage.canvas;
	let { durationScale, durationDefault, durationFirst } = project;
	let duration = index == 0 ? (durationFirst * durationScale) : (durationDefault * durationScale);
	let cw = canvas.width;
	let ch = canvas.height;
	
	let container = new c.Container();
	container.set({
		width: canvas.width,
		height: canvas.height,
		regX: canvas.width / 2,
		regY: canvas.height / 2,
	})

	
	// 图片
	let img = util.NImage(pic_url);
	
	let bitmap = new createjs.Bitmap(img);
	stage.addChild(bitmap);
	let scale = 1;
	img.onload = function(){
		let iw = img.width;
		let ih = img.height;
		scale = util.getImageScale({img, cw, ch, type: 'cover'});
		/*if(cw / ch > iw / ih) {
			scale = ch / ih;
		} else {
			scale = cw / iw;
		}*/
		bitmap.set({
			regX: iw/2,
			regY: ih / 2,
			x: cw / 2,
			y: ch / 2,
			scaleX: scale,
			scaleY: scale,
			alpha: index == 0 ? 1 : 0,
			// shadow: new createjs.Shadow("rgba(0,0,0,0.5)", 5, 5, 10),
		})

		let tween  = null
			
		if(wait > 0) {
			tween = c.Tween.get(bitmap, {})
			.wait(wait - 0.2 * duration)
			.to({
				alpha: 1
			}, duration * 0.2)
		} else {
			tween = c.Tween.get(bitmap, {})
			.wait(wait);
		}
		
		tween = tween.to({
				alpha: 1,
				scaleX: scale,
				scaleY: scale,
			}, 0)
			.to({
				scaleX: scale + 0.05,
				scaleY: scale + 0.05,
			}, duration * 0.6, c.Ease.linear)
			.wait(duration * 0.1)
			.to({
				// x: -canvas.width / 2,
				alpha: 0.1,
				visible: false
			}, duration * 0.2)
		timeline.addTween(tween);
		
	}
	bitmap.set({
		alpha: 0
	});
}
export default fun;