import util from '../util.js';
const fun = function({stage, timeline, item, index, wait }) {
	let c = createjs;

	let pic_url = item.pic_url;
	let canvas = stage.canvas;
	let duration = item.duration;
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
		scale = util.getImageScale({img, cw, ch,type: 'cover'});
		// bitmap.cache(0, 0, cw, ch);
		bitmap.set({
			regX: iw/2,
			regY: ih / 2,
			x: cw / 2,
			y: index % 2 == 0 ? - ch : ch ,//ch / 2,
			scaleX: scale,
			scaleY: scale,
			alpha: index == 0 ? 1 : 0,
			// shadow: new createjs.Shadow("rgba(0,0,0,0.5)", 5, 5, 10),
		})

		let tween  = null
			
		if(wait > 0) {
			tween = c.Tween.get(bitmap, {})
			.wait(wait)
			.to({
				alpha: 1,
				visible: true,
			}, 0)
			.to({
				y: ch / 2
			}, duration / 2)
			.to({
				scaleX: scale + 0.1,
				scaleY: scale + 0.1
			}, duration / 2)
			
		} else {
			tween = c.Tween.get(bitmap, {})
			.wait(wait)
			.to({
				alpha: 1,
				visible: true,
				y: ch / 2
			}, 0)
			.to({
				scaleX: scale + 0.1,
				scaleY: scale + 0.1
			},duration, c.Ease.cubicOut )
			
		}
		
		
		timeline.addTween(tween);
		
	}
	bitmap.set({
		alpha: 0
	});
}
export default fun;