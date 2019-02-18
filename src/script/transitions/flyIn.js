/*
 * @Author: zhangzhenyang 
 * @Date: 2019-02-18 13:49:02 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2019-02-18 16:26:30
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
	
	let bitmap = new c.Bitmap(img);

	stage.addChild(bitmap,);
	let scale = 1;
	img.onload = function(){
		scale = util.getImageScale({img, cw, ch, type: 'cover'});
		let iw = img.width;
		let ih = img.height;
		let distW = iw * scale;
		let distH = ih * scale;
		let additionalScale = (0.1 * cw / iw);
		bitmap.set({
			regX: iw / 2,
			regY: ih / 2,
			x: index == 0 ? (cw / 2) : (index % 2 == 0 ? (cw / 2 + distW * 2) :  (cw / 2 - distW * 2)),
			y: ch / 2,
			scaleX: (scale / 5), 
			scaleY: (scale / 5), 
			rotation: 0,
			// rotation: index == 0 ? 360 : 0
		})
		/*if(index == 0) {
			let baseBitmap = bitmap.clone();
			stage.addChildAt(baseBitmap, 1);
		}*/
        // bitmap.mask= shape;
        let bitmapTween;
        if(index == 0) {
			bitmap.set({
				regY: ih / 2,
				scaleX: (scale + additionalScale), 
				scaleY: (scale + additionalScale), 
			})
			bitmapTween = c.Tween.get(bitmap)
			.wait(wait)
			.to({
				x: cw / 2 - 0.05 * cw,
			}, duration, c.Ease.easeOut)

		} else {
			bitmapTween = c.Tween.get(bitmap)
			.wait(wait)
			.to({
				rotation: index % 2 == 0 ? -360 : 360,
				x: cw / 2,
				scaleX: (scale + additionalScale), 
				scaleY: (scale + additionalScale), 
			}, duration * 0.5, c.Ease.easeOut)
			.to({
				regY: ih / 2,
				x: index % 2 == 0 ? (cw / 2 - 0.05 * cw): (cw / 2 + 0.05 * cw),
			}, duration * 0.5)
		}

        
        timeline.addTween(bitmapTween);
    
       
	}

	
	// stage.addChild(star);

}
export default fun;