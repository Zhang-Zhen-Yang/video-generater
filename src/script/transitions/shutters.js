import util from '../util.js';
const fun = function({stage, timeline, item, index, wait }) {
	let c = createjs;
	let pic_url = item.pic_url;
	let canvas = stage.canvas;
	let cw = canvas.width;
	let ch = canvas.height;
	let maxS = Math.max(cw, ch);
	let duration = item.duration;

	let bitmapContainer = new c.Container();






	let star = new c.Shape();
	
	star.graphics.beginFill("#FF0").drawPolyStar(0, 0, maxS, 5, 0.6, -90);

	star.set({
		regX: 0,
		regY: 0,
		x: maxS / 2,
		y: maxS / 2,
		scaleX: 2.2,
		scaleY: 2.2,
		rotation: 0,
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
			stage.addChildAt(baseBitmap, 1);
		}
		bitmap.mask= star;
	}

	let starTween = c.Tween.get(star)
	.wait(wait)
	.to({
		scaleX: 0,
		scaleY: 0,
		rotation: 360,
	}, duration, c.Ease.cubicOut);

	timeline.addTween(starTween);
	// stage.addChild(star);

}
export default fun;