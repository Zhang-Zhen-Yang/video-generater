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
		visible: false
	})

	
	// 图片
	let img = util.NImage(pic_url);
	
	let bitmap = new createjs.Bitmap(img);
	container.addChild(bitmap);
	stage.addChild(container);
	let scale = 1;



	img.onload = function(){
		let iw = img.width;
		let ih = img.height;
		container.set({
			visible: true
		})
		/*if(cw / ch > iw / ih) {
			scale = ch / ih;
		} else {
			scale = cw / iw;
		}*/
		scale = util.getImageScale({img, cw, ch, type: 'cover'});
		bitmap.set({
			regX: iw/2,
			regY: ih / 2,
			x: cw / 2,
			y: ch / 2,
			scaleX: scale,
			scaleY: scale,
			// shadow: new createjs.Shadow("rgba(0,0,0,0.5)", 5, 5, 10),
		})
		container.set({
			// alpha: index == 0 ? 1 : 0,
		})

		let tween  = null
			
		if(wait > 0) {
			tween = c.Tween.get(container, {})
			.wait(wait - 0.2 * duration)
			.to({
				alpha: 1
			}, duration * 0.2)
		} else {
			tween = c.Tween.get(container, {})
			.wait(wait);
		}
		
		tween = tween.to({
			alpha: 1,
		}, 0)
		.to({}, duration * 0.6, c.Ease.linear)
		.wait(duration * 0.1)
		.to({
			// x: -canvas.width / 2,
			// alpha: 0.1,
			// visible: false
		}, duration * 0.2)

		timeline.addTween(tween);


		let rect = new c.Shape();
		if(index % 2 == 0) {
			rect.graphics.f('#000000').drawRect(-cw / 2,0,cw,ch);
			rect.cache(0, 0, cw, ch);
			rect.set({
				x: cw / 2,
				y: 0,
				scaleX: index == 0 ? 1 : 0,
				// regX: cw / 2,
				regY: 0,
				// visible: false
			})
		} else {
			rect.graphics.f('#000000').drawRect(0,-ch / 2,cw,ch);
			rect.cache(0, 0, cw, ch);
			rect.set({
				x: 0,
				y: ch/2,
				scaleY: 0,
				// regX: cw / 2,
				regY: 0,
				regX: 0
				// visible: false
			})
		}
		

		bitmap.mask = rect;

		let maskTween = c.Tween.get(rect)
		.wait(wait)
		.to(index % 2 == 0 ? {
			scaleX: 1,
		}: {scaleY: 1}, duration, createjs.Ease.cubicOut   )

		// stage.addChild(rect);
		timeline.addTween(maskTween);



	}



}
export default fun;