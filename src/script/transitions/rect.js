import util from '../util.js';
const fun = function({stage, timeline, item, index, wait, project = {} }) {
	let c = createjs;
	let pic_url = item.pic_url;
	let canvas = stage.canvas;
	let { durationScale, durationDefault, durationFirst } = project;
	let duration = index == 0 ? (durationFirst * durationScale) : (durationDefault * durationScale);
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
		scale = util.getImageScale({img, cw, ch, type: 'cover'})
		/*if(cw / ch > iw / ih) {
			scale = ch / ih;
		} else {
			scale = cw / iw;
		}*/
		bitmap.set({
			regX: iw/2,
			regY: ih / 2,
			x: cw / 2,
			y: ch / 2,
			scaleX: scale,
			scaleY: scale,
			alpha: index == 0 ? 1 : 0,
			// shadow: new createjs.Shadow("rgba(0,0,0,0.5)", 5, 5, 10),
		})
		let tween = c.Tween.get(bitmap, {})
			.wait(wait)
			.to({
				alpha: 1,
				scaleX: scale,
				scaleY: scale,
			}, 10)
			.to({
				scaleX: scale + 0.1,
				scaleY: scale + 0.1,
			}, duration * 0.6, c.Ease.linear)
			.wait(duration * 0.2)
			.to({
				// x: -canvas.width / 2,
				// alpha: 0.1
				visible: true
			}, duration * 0.2)
		timeline.addTween(tween);
		
	}
	bitmap.set({
		alpha: 0
	});


	// rect

	let rc = new c.Container();
	let rect = new c.Shape();
	rect.graphics.f('rgba(0,0,0,0.7)').drawRect(0, 0, cw, ch);
	rc.addChild(rect);
	stage.addChild(rc);
	rect.set({
		visible: false
	})
	let tweenR = c.Tween.get(rect, {})
	.wait(wait)
	.to({
		visible: true,
		alpha: 1,
	}, 1)
	.to({
		alpha: 0,
		visible: false
	}, duration)
	timeline.addTween(tweenR);


	let barWidth = Math.min(cw, ch) * 0.01;
	let offset = 10;
	let fillColor = '#ffffff';//'#FFCF4F';

	// tb
	let tb = new c.Shape();
	let tbc = new c.Container;
	tb.graphics.f(fillColor).drawRect(0, 0, cw - 2*offset, barWidth);
	tbc.set({
		x: 0,
		y: 0
	})
	tbc.addChild(tb);
	stage.addChild(tbc);
	tb.set({
		scaleX: 0,
		visible: false,
		x: offset,
		y: offset,
	})

	let tweenTB = c.Tween.get(tb, {})
	.wait(wait)
	.to({
		visible: true,
	}, 0)
	.to({
		scaleX: 1,
		visible: true
	}, duration / 5)
	.to({
		visible: false
	}, duration * 4 / 5)
	timeline.addTween(tweenTB);

	// rb
	let rb = new c.Shape();
	let rbc = new c.Container();
	rb.graphics.f(fillColor).drawRect( 0 , 0, barWidth, ch - 2 * offset);
	rbc.set({
		x: cw - offset - barWidth,
		y: offset, 
	});
	rbc.addChild(rb);
	stage.addChild(rbc);
	rb.set({
		scaleY: 0,
		visible: false,
	})

	let tweenRB = c.Tween.get(rb, {})
	.wait(wait + duration / 5)
	.to({
		visible: true,
	}, 0)
	.to({
		scaleY: 1,
		visible: true
	}, duration / 5)
	.to({
		visible: false
	}, duration * 3 / 5)
	timeline.addTween(tweenRB);
	

	// bb
	let bb = new c.Shape();
	let bbc = new c.Container();
	bb.graphics.f(fillColor).drawRect(0, 0, cw - 2*offset, barWidth);
	bbc.set({
		x: cw / 2 - offset,
		y: ch / 2 - offset,
		regX: cw / 2 ,
		regY: ch / 2,
		rotation: 180,
	})
	bbc.addChild(bb);
	stage.addChild(bbc);
	bb.set({

	})
	bb.set({
		scaleX: 0,
		visible: false,
	})

	let tweenBB = c.Tween.get(bb, {})
	.wait(wait + duration * 2 / 5)
	.to({
		visible: true,
	}, 0)
	.to({
		scaleX: 1,
		visible: true
	}, duration *1/ 5)
	.to({
		visible: false
	}, duration * 3/ 5)
	timeline.addTween(tweenBB)



	// lb
	let lb = new c.Shape();
	let lbc = new c.Container();
	lb.graphics.f(fillColor).drawRect(0, 0, barWidth, ch - 2*offset);
	lbc.set({
		x: -cw / 2 + offset + barWidth,
		y: ch / 2 - offset,
		regX: cw / 2 ,
		regY: ch / 2,
		rotation: 180,
	})
	lbc.addChild(lb);
	stage.addChild(lbc);
	lb.set({

	})
	lb.set({
		scaleY: 0,
		visible: false,
	})

	let tweenLB = c.Tween.get(lb, {})
	.wait(wait + duration * 3 / 5)
	.to({
		visible: true,
	}, 0)
	.to({
		scaleY: 1,
		visible: true
	}, duration / 5)
	.to({
		visible: false
	}, duration / 5)
	timeline.addTween(tweenLB);
}
export default fun;