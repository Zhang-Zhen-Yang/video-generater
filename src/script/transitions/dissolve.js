
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






	let star = new c.Shape();
	
	star.graphics.beginLinearGradientFill(["#000", "rgba(0,0,0,0)", "#000"], [0, 0.2, 1], 0, 0, 0, ch).drawRect(0, 0, cw, ch);

	star.set({
		regX: 0,
		regY: 0,
		x: 0,
		y: 0,
		scaleX: 1,
		scaleY: 1,
		rotation: 45,
	})
	star.cache(0, 0, cw, ch);

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
			// stage.addChildAt(baseBitmap, 1);
		}
		// bitmap.mask = star;
		bitmap.filters= [
			new c.AlphaMaskFilter(star.cacheCanvas)
		];
		bitmap.cache(0, 0, cw, ch);

		let starTween = c.Tween.get(star)
		.wait(wait)
		.to({
			y: 600,
		}, duration, c.Ease.cubicOut)
		.call(()=>{
			star.updateCache();
			bitmap.filters= [
				new c.AlphaMaskFilter(star.cacheCanvas)
			];
			bitmap.cache(0, 0, cw, ch);
		})

		timeline.addTween(starTween);
	}

	
	// stage.addChild(star);

}
export default fun;