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


	let mask1 = new c.Shape();
	let mask2;
	

	if(index % 2 == 0) {
		mask1.graphics.beginFill("#FF0").drawRect(0, 0, cw / 2, ch);
		mask1.set({
			x: 0 - cw / 200
		})
		mask2 = mask1.clone();
		mask2.set({
			x: cw / 2 + cw / 200
		})
		
	} else {
		mask1.graphics.beginFill("#FF0").drawRect(0, 0, cw, ch / 2);
		mask1.set({
			y: 0 - ch / 200
		})
		mask2 = mask1.clone();
		mask2.set({
			y: ch / 2 + ch / 200
		})
	}
	
	mask1.cache(0, 0, cw, ch);
	mask2.cache(0, 0, cw, ch);


	let img = util.NImage(pic_url);
	
	let bitmap = new c.Bitmap(img);
	let bitmap2 = bitmap.clone();
	stage.addChild(bitmap);
	stage.addChild(bitmap2);

	let scale = 1;
	img.onload = function(){
		scale = util.getImageScale({img, cw, ch, type: 'cover'});
		let iw = img.width;
		let ih = img.height;
		let distW = iw * scale;
		let distH = ih * scale;

		if(index % 2 == 0) {
			bitmap.set({
				x: cw / 2,
				y: (ch - distH) / 2,
				scaleX: scale,
				scaleY: scale,
				visible: false,
			})
	
			bitmap2.set({
				x: cw / 2 - distW,
				y: (ch - distH) / 2,
				scaleX: scale,
				scaleY: scale,
				visible: false,
			})

		} else {
			bitmap.set({
				x: (cw - distW )/ 2,
				y: ch / 2,
				scaleX: scale,
				scaleY: scale,
				visible: false,
			})
	
			bitmap2.set({
				x: (cw - distW) / 2,
				y: ch / 2 - distH,
				scaleX: scale,
				scaleY: scale,
				visible: false,
			})
		}
		/* if(index == 0) {
			let baseBitmap = bitmap.clone();
			stage.addChildAt(baseBitmap, 1);
		}*/
		bitmap.mask= mask1;
		bitmap2.mask= mask2;
		// 1
		let tween1 = c.Tween.get(bitmap)
		.wait(wait)
		.set({
			visible: true,
		})
		.to(index % 2 == 0 ? {
			x: (cw - distW) / 2
		}: {y: (ch - distH) / 2}, duration * 0.3, c.Ease.easeOut)
		.wait(duration * 0.3)
		.to(index % 2 == 0 ? {
			y: -distH
		} : {x: -distW}, duration * 0.5, c.Ease.easeIn);

		let maskT1 = c.Tween.get(mask1)
		.wait(wait + duration * 0.4)
		.to(index % 2 == 0?{
			x: 0
		}: {y: 0}, duration * 0.1, c.Ease.easeOut)
		timeline.addTween(tween1);
		timeline.addTween(maskT1);


		// 2
		let tween2 = c.Tween.get(bitmap2)
		.wait(wait)
		.set({
			visible: true,
		})
		.to(index % 2 == 0?{
			x: (cw - distW) / 2
		}:{y: (ch - distH) / 2}, duration * 0.3, c.Ease.easeOut)
		.wait(duration * 0.3)
		.to(index % 2 == 0?{
			y: distH
		}: {x: distW}, duration * 0.5, c.Ease.easeIn);;


		let maskT2 = c.Tween.get(mask2)
		.wait(wait + duration * 0.4)
		.to(index % 2 == 0?{
			x: cw / 2
		}: {y: ch / 2}, duration * 0.1, c.Ease.easeOut)

		timeline.addTween(tween2);
		timeline.addTween(maskT2);
		// stage.addChild(star);
	}

	

}
export default fun;