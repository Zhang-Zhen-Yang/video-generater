import util from '../util.js';
const fun = function({stage, timeline, item, index, wait }) {
	let c = createjs;
	let pic_url = item.pic_url;
	let canvas = stage.canvas;
	let cw = canvas.width;
	let ch = canvas.height;
	let duration = item.duration;


	// 如果是第一张，加入背景
	if(index == 0) {
		let img = util.NImage(`${window.assets}bg1.jpg`);
		let bitmap = new createjs.Bitmap(img);
		stage.addChild(bitmap);
		img.onload = ()=>{
			let scale = util.getImageScale({img, cw, ch, type: 'cover'})
			bitmap.set({
				regX: img.width / 2,
				regY: img.height / 2,
				x: cw / 2,
				y: ch / 2,
				scaleX: scale,
				scaleY: scale,
			})
		}
	}

	let bitmapContainer = new c.Container();
	
	let photoRect = new c.Shape();
	bitmapContainer.addChild(photoRect);




	let img = util.NImage(pic_url);
	
	let bitmap = new c.Bitmap(img);
	
	// bitmapContainer.addChild(bitmap);
	stage.addChild(bitmapContainer);
	let scale = 1;
	img.onload = function(){
		scale = util.getImageScale({img, cw, ch, type: 'contain'});
		let iw = img.width;
		let ih = img.height;
		let distW = iw * scale;
		let distH = ih * scale;
		let strokeWidth = Math.min(cw, ch) * 0.04;
		photoRect.graphics.ss(strokeWidth, 'miterLimit').s('#ffffff').dr(0, 0, distW, distH).s('rgba(0,0,0,0)').bf(img,'no-repeat', new c.Matrix2D(scale,0,0,scale,0,0)).dr(0, 0, distW, distH);
		photoRect.set({
			regX: distW / 2,
			regY: distH / 2,
			x: distW / 2,//cw / 2,
			y: distH / 2, //ch / 2
			shadow: new createjs.Shadow("rgba(0,0,0,0.1)", 5, 5, 10),
		})


		bitmapContainer.set({
			regX: distW / 2,
			regY: distH / 2,
			x: cw + distW / 2,
			y: ch / 2,
			// scaleX: scale * 0.9,
			// scaleY: scale * 0.9,
			visible: false,
		})

		let tween = c.Tween.get(bitmapContainer, {})
		.wait(wait)
		.to({
			visible: true,
		}, 0)
		.to({
			x: canvas.width / 2,
			y: canvas.height / 2,
			scaleX: 0.8,
			scaleY: 0.8,
		}, duration * 0.5, c.Ease.circOut)
		.wait(duration * 0.4)
		.to({
			// x: -cw / 2,
			// alpha: 0.1
		}, duration * 0.3)
		
		let rotations = [3, -5, -8, 6, 4,-9, 3, 7,-5]
		

		let tweenB = c.Tween.get(photoRect, {})
		.wait(wait + duration * 0.5)
		.to({
			rotation: rotations[index % 9],
		}, duration, c.Ease.linear)
		





		timeline.addTween(tween);
		timeline.addTween(tweenB);
		


	}
	bitmapContainer.set({
		/*regX: img.width / 2,
		regY: img.height / 2,
		x: canvas.width + img.width / 2,
		y: canvas.height / 2,*/
		rotation: index % 2 > 0 ? 10 : -10,
		
		// scaleX: 0.5,
		// scaleY: 0.5,
	});




	

	
	// return tween;
}
export default fun;