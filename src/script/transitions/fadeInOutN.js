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

	stage.addChildAt(bitmap, 1);
	let scale = 1;
	img.onload = function(){
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
		let bitmapTween = c.Tween.get(bitmap)
		.wait(wait)
		.to({
			scaleX: scale* 1.05,
			scaleY: scale * 1.05,
		}, 0.5 * duration, c.Ease.easeOut)
		.to({
			alpha: 0
		}, 0.5 * duration)

		timeline.addTween(bitmapTween);
	}

	
	// stage.addChild(star);

}
export default fun;