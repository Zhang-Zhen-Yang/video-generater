/*
 * @Author: zhangzhenyang 
 * @Date: 2019-02-18 15:21:58 
 * @Last Modified by: zhangzhenyang
 * @Last Modified time: 2019-02-18 15:43:27
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
			x: cw / 2,
			y: ch / 2,
			scaleX: (scale + additionalScale), 
			scaleY: (scale + additionalScale)
			// rotation: index == 0 ? 360 : 0
		})
		/*if(index == 0) {
			let baseBitmap = bitmap.clone();
			stage.addChildAt(baseBitmap, 1);
		}*/
		// bitmap.mask= shape;
		
		let rightAngle = new c.Shape();
		rightAngle.graphics.f('#000').drawRect(0, 0, maxS * 2, maxS * 2);
		rightAngle.set({
			regX:maxS,
			regY:maxS,
			x: index % 2 == 0 ? (cw / 2 + 2*maxS ) : (cw / 2 - 2*maxS),
			y: ch / 2,
			rotation: 45,
		})
		rightAngle.cache(0, 0, cw, ch);
		if(index > 0) {
			bitmap.mask = rightAngle;
		}


        let bitmapTween;
        if(index == 0) {
			bitmapTween = c.Tween.get(bitmap)
			.wait(wait)
			.to({
				x: cw / 2 - 0.05 * cw,
			}, duration, c.Ease.easeOut)

		} else {
			bitmapTween = c.Tween.get(bitmap)
			.wait(wait)
			.to({
				// rotation: 360,
				scaleX: (scale + additionalScale),
				scaleY: (scale + additionalScale),
			}, duration * 0.4, c.Ease.easeOut)
			.to({
				x: index % 2 == 0 ? (cw / 2 - 0.05 * cw): (cw / 2 + 0.05 * cw),
			}, duration * 0.6)


			let rightAngleTween = c.Tween.get(rightAngle)
			.wait(wait)
			.to({
				x:cw / 2
			}, 0.5 * duration)
			timeline.addTween(rightAngleTween);
		}

        
        timeline.addTween(bitmapTween);
    
       
	}

	
	// stage.addChild(star);

}
export default fun;