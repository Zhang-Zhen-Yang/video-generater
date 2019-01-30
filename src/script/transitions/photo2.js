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
		scale = util.getImageScale({img, cw, ch, type: 'contain'}) * 0.8;
		let iw = img.width;
		let ih = img.height;
		let distW = iw * scale;
		let distH = ih * scale;
		let strokeWidth = Math.min(cw, ch) * 0.04;
		photoRect.graphics.ss(strokeWidth, 'miterLimit').s('#ffffff').dr(0, 0, distW, distH).s('rgba(0,0,0,0)').bf(img,'no-repeat', new c.Matrix2D(scale,0,0,scale,0,0)).dr(0, 0, distW, distH);
		photoRect.set({
			regX: distW / 2,
			regY: 0,
			x: distW / 2,//cw / 2,
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

		let tweenB = c.Tween.get(photoRect, {})
		.wait(wait + duration * 0.5)
		.to({
			rotation: 5,
		}, duration * 0.06, c.Ease.linear)
		.to({
			rotation: 0,
		}, duration * 0.08, c.Ease.linear)
		.to({
			rotation: -5,
		}, duration * 0.08, c.Ease.linear)
		.to({
			rotation: 0,
		}, duration * 0.6, c.Ease.linear)





		timeline.addTween(tween);
		timeline.addTween(tweenB);
		// 
		/*let tapUrl = "data:image/svg+xml,%3Csvg width='250' height='96' viewBox='0 0 500 176' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='.9'%3E%3Cpath opacity='.9' fill='%23817067' d='M47.179 23.132s351.705-.33 423.651-23.133l-17.999 49.996 32.743 11.871-23.086 31.61 30.688 9.45-32.641 37.481L500 152.865s-213.384 41.726-461.071 13.104l16.603-34.431-33.155-7.414 18.249-27.541L9.249 69.122 40.12 51.678 0 21.203l47.179 1.929z' class='color c1'/%3E%3C/g%3E%3C/svg%3E"; 
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

		*/

		let pinUrl = "data:image/svg+xml,%3Csvg viewBox='0 0 222 340' xmlns='http://www.w3.org/2000/svg' width='111' height='170'%3E%3Cpath fill='%23D9D9D9' class='color c1' d='M100.786 138.847L71.248 499.136l8.382.864 57.947-353.702z'/%3E%3Cpath fill='%23D65349' d='M221.371 245.528c-4.79 40.547-55.885 66.164-115.462 64.83-59.11-1.264-103.353-34.823-106.147-72.25.864-62.271 44.077-69.189 105.483-68.391 61.838.763 122.513 4.158 116.126 75.811z' class='color c2'/%3E%3Cpath opacity='.17' fill='%23FFF' d='M221.469 225.733c.534 36.559-47.367 64.635-106.611 63.402C56.147 287.872 6.649 258.133 3.986 222.04c-2.728-36.823 43.945-66.596 104.883-65.829 61.406.764 112.037 32.2 112.6 69.522z'/%3E%3Cpath opacity='.2' fill='%23FFF' d='M124.539 170.159c14.869.201 29.238 2.127 42.512 5.39-16.766-7.319-36.99-11.776-58.614-12.044-56.218-.697-99.461 26.778-97.031 60.842.166 1.697.465 3.395.798 5.022 6.385-34.029 53.157-59.974 112.335-59.21z'/%3E%3Cpath fill='%23D65349' d='M83.955 89.615l-28.111 93.541s-25.015 66.728 55.42 61.171c84.89-5.918 68.991-55.917 68.991-55.917L169.71 95.537l-85.755-5.922z' class='color c2'/%3E%3Cpath fill='%23D65349' d='M216.512 71.352c.566 38.256-35.857 68.227-81.132 67.696-44.973-.5-83.062-31.005-85.322-68.793C47.761 31.703 83.455-.132 130.159 0c46.904.101 85.721 32.366 86.353 71.352z' class='color c2'/%3E%3Cpath opacity='.17' fill='%23FFF' d='M208.664 50.728c.398 25.216-33.066 45.107-74.68 44.743-41.283-.333-75.776-20.593-77.272-45.573-1.433-25.282 31.533-45.972 73.847-45.84 42.511.066 77.636 21.124 78.105 46.67z'/%3E%3C/svg%3E";
		let pinImage = new Image();
		pinImage.src = pinUrl;
		let pin = new c.Bitmap(pinImage);
		let pinScale = Math.min(cw, ch) / 2000;
		pinImage.onload = ()=>{
			let iw = pinImage.width;
			let ih = pinImage.height;
			pin.set({
				regX: iw / 2,
				regY: ih,
				x: distW / 2,
				y: 0,
				scaleX: pinScale,
				scaleY: pinScale,
			})
		}
		bitmapContainer.addChild(pin);


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