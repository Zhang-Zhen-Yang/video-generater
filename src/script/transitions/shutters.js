/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-02-15 09:21:23
 * @LastEditTime: 2019-02-16 17:42:14
 * @LastEditors: Please set LastEditors
 */

import util from '../util.js';
const fun = function({stage, timeline, item, index, wait, project = {} }) {
	let c = createjs;
	let pic_url = item.pic_url;
	let canvas = stage.canvas;
	let cw = canvas.width;
	let ch = canvas.height;
	let maxS = Math.max(cw, ch);
	let { durationScale, durationDefault, durationFirst } = project;
	let duration = index == 0 ? (durationFirst * durationScale) : (durationDefault * durationScale);

	let bitmapContainer = new c.Container();






	

	let img = util.NImage(pic_url);
	
	
	stage.addChildAt(bitmapContainer, 1);
	let scale = 1;
	img.onload = function(){
		let bitmap = new c.Bitmap(img);
		scale = util.getImageScale({img, cw, ch, type: 'cover'});
		let iw = img.width;
		let ih = img.height;
		let distW = iw * scale;
		let distH = ih * scale;
		bitmap.set({
			regX: iw / 2,
			regY: ih / 2,
			x: cw / 2,
			y: ch / 2,
			scaleX: scale, 
			scaleY: scale, 
		})
		if(index == 0) {
			let baseBitmap = bitmap.clone();
			stage.addChildAt(baseBitmap, 1);
		}
		
		for(let i = 0; i < 10; i++) {
			let nBitmap = bitmap.clone();
			bitmapContainer.addChild(nBitmap);

			let type = index % 4;
			let bar;
			let toProps;
			if(type == 0) {
				bar = new c.Shape();
				bar.graphics.beginFill("#FF0").drawRect(0, 0, cw / 10, ch);
				bar.set({
					x: i * cw /10,
					y: 0,
				})
				bar.cache(0, 0, cw, ch);
				toProps = {
					y: -ch
				};
			} else if(type == 1){
				bar = new c.Shape();
				bar.graphics.beginFill("#FF0").drawRect(0, 0, cw, ch / 10);
				bar.set({
					x: 0,
					y: i * ch / 10,
				})
				bar.cache(0, 0, cw, ch);
				toProps = {
					x: -cw
				};
			} else if(type == 2){
				bar = new c.Shape();
				bar.graphics.beginFill("#FF0").drawRect(0, 0, cw, ch / 10);
				bar.set({
					x: 0,
					y: i * ch / 10,
				})
				bar.cache(0, 0, cw, ch);
				toProps = {
					x: cw
				};
			} else if (type == 3){
				bar = new c.Shape();
				bar.graphics.beginFill("#FF0").drawRect(0, 0, cw / 10, ch);
				bar.set({
					x: i * cw /10,
					y: 0,
				})
				bar.cache(0, 0, cw, ch);
				toProps = {
					y: ch
				};
			}


			nBitmap.mask= bar;
			let timeBefore = duration * 0.3 /10 * i;
			let timeAfter = duration * 0.7 - timeBefore;
			let barTween = c.Tween.get(bar)
			.wait(wait + timeBefore)
			.to(toProps, duration * 0.3, c.Ease.cubicInOut)
			.wait(timeAfter)


			timeline.addTween(barTween);
		}
	}

	
	// stage.addChild(star);

}
export default fun;