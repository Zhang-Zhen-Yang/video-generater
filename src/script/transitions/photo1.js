import util from '../util.js';
const fun = function({stage, timeline, item, index, wait, project = {} }) {
	let c = createjs;
	let pic_url = item.pic_url;
	let canvas = stage.canvas;
	let cw = canvas.width;
	let ch = canvas.height;
	let { durationScale, durationDefault, durationFirst } = project;
	let duration = index == 0 ? (durationFirst * durationScale) : (durationDefault * durationScale);
	let bgImage = project.bgImage;

	// 如果是第一张，加入背景
	if(index == 0) {
		let img = util.NImage(bgImage);
		let bitmap = new createjs.Bitmap(img);
		bitmap.name = 'bgImage';
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
		scale = util.getImageScale({img, cw, ch, type: 'contain'}) * 0.8;
		let iw = img.width;
		let ih = img.height;
		let distW = iw * scale;
		let distH = ih * scale;
		let strokeWidth = Math.min(cw, ch) * 0.04;
		photoRect.graphics.ss(strokeWidth, 'miterLimit').s('#ffffff').dr(0, 0, distW, distH).s('rgba(0,0,0,0)').bf(img,'no-repeat', new c.Matrix2D(scale,0,0,scale,0,0)).dr(0, 0, distW, distH);
		photoRect.set({
			// regX: distW / 2,
			// regY: distH / 2,
			x: 0,//cw / 2,
			y: 0, //ch / 2
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
		}, duration * 0.5, c.Ease.backOut)
		.wait(duration * 0.4)
		.to({
			x: -cw / 2,
			// alpha: 0.1
		}, duration * 0.3)

		timeline.addTween(tween);
		// 
		let tapUrl = "data:image/svg+xml,%3Csvg width='250' height='96' viewBox='0 0 500 176' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='.9'%3E%3Cpath opacity='.9' fill='%23817067' d='M47.179 23.132s351.705-.33 423.651-23.133l-17.999 49.996 32.743 11.871-23.086 31.61 30.688 9.45-32.641 37.481L500 152.865s-213.384 41.726-461.071 13.104l16.603-34.431-33.155-7.414 18.249-27.541L9.249 69.122 40.12 51.678 0 21.203l47.179 1.929z' class='color c1'/%3E%3C/g%3E%3C/svg%3E"; 
		let tapImage = new Image();
		tapImage.src = tapUrl;
		let tap = new c.Bitmap(tapImage);
		let tapScale = Math.min(cw, ch) / 1500  
		tapImage.onload = ()=>{
			tap.set({
				regX: tapImage.width / 2,
				regY: tapImage.height / 2,
				x: 0,
				y: 0,
				rotation: -45,
				scaleX: tapScale,
				scaleY: tapScale
			})

			let tap2 = tap.clone();
			tap2.set({
				x: distW ,
				y: distH,
			})
			bitmapContainer.addChild(tap2);

		}
		bitmapContainer.addChild(tap);





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