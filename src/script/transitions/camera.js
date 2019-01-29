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
		 /* if(cw / ch > iw / ih) {
			scale = ch / ih;
		} else {
			scale = cw / iw;
		}*/
		scale = util.getImageScale({img, cw, ch, type: 'cover'})
		bitmap.set({
			regX: iw/2,
			regY: ih / 2,
			x: cw / 2,
			y: ch / 2,
			scaleX: scale - 0.1,
			scaleY: scale - 0.1,
			alpha: 0,
			// shadow: new createjs.Shadow("rgba(0,0,0,0.5)", 5, 5, 10),
		})
		let tween = c.Tween.get(bitmap, {})
			.wait(wait)
			.to({
				alpha: 1,
				scaleX: scale - 0.1,
				scaleY: scale - 0.1,
			}, 10)
			.to({
				scaleX: scale,
				scaleY: scale,
			}, duration * 0.6, c.Ease.linear)
			.wait(duration * 0.1)
			.to({
				visible: false, 
			}, 100)
			.to({
				visible: true, 
			}, 100)
			.to({
				// x: -canvas.width / 2,
				// alpha: 0.1
				visible: false
			}, duration * 0.2)
		timeline.addTween(tween);
		
	}
	bitmap.set({
		alpha: 0
	});
	
	
	// 遮罩
	let mask = new c.Shape();
	mask.graphics.beginFill("#000000").drawRect(0, 0, cw, cw);
	mask.set({
		x: cw / 2,
		y: ch / 2,
		alpha:0,
		regX: cw / 2,
		regY: ch / 2,
	})
	stage.addChild(mask);
	let mtween = c.Tween.get(mask, {})
		.wait(wait)
		.to({
			alpha: 1
		}, 10)
		.to({
			scaleX: 0.2,
			scaleY: 0.2,
			// rotation: 180,
			visible: false,
		}, duration * 0.1, c.Ease.linear)
		
	timeline.addTween(mtween);
	
	let offset = Math.min(cw,ch) * 0.04, lw = Math.min(cw,ch) * 0.03, bw = 0.15 * cw, bh = 0.15* ch;

	// 左上角
	let ltcontainer = new c.Container();
	let leftTop = new c.Shape();
	leftTop.graphics.beginFill("#ffffff").drawRect(offset, offset, bw, lw).drawRect(offset,offset,lw,bh);
	
	/* c.Graphics();
	leftTop.beginStroke("red").beginFill("blue").drawRect(20, 20, 100, 50);*/
	ltcontainer.set({
		visible: false
	})
	ltcontainer.addChild(leftTop);
	stage.addChild(ltcontainer);
	
	let tweenLT = c.Tween.get(ltcontainer, {})
	.wait(wait)
	.to({
		x: cw * 0.2,
		y: ch * 0.2,
		visible: true,
	}, duration * 0.1, c.Ease.linear)
	.to({
		x: 0,
		y: 0,
	}, duration * 0.3)
	.wait(duration * 0.5)
	.to({
		alpha: 0,
	})
	timeline.addTween(tweenLT);

	// 右下角
	
	let rightBottom = leftTop.clone()
	// console.log(rightBottom.getBounds());
	rightBottom.set({
		rotation: 180,
		x: cw,
		y: ch,
		visible: false
	})

	stage.addChild(rightBottom);
	
	let tweenRB = c.Tween.get(rightBottom, {})
	.wait(wait)
	.to({
		x: cw * 0.8,
		y: ch * 0.8,
		visible: true,
	}, duration * 0.1, c.Ease.linear)
	.to({
		x: cw,
		y: ch,
	}, duration * 0.3)
	.wait(duration * 0.5)
	.to({
		alpha: 0,
	})
	timeline.addTween(tweenRB);
	// return tween;
}
export default fun;