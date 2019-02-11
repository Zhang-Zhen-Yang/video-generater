import util from '../util.js';
// import { stat } from 'fs';
import camera from './camera';
import rect from './rect';
import fadeInOut from './fadeInOut';
import monochromatic from './monochromatic';
import upDownAndScale from './upDownAndScale';
import photo1 from './photo1';
import photo2 from './photo2';
import photo3 from './photo3';
import photo4 from './photo4';

let c = createjs;
let transitions = {
	scaleIn: function({stage, timeline, item, index, wait }) {
		// console.log(stage.canvas.width);
		let pic_url = item.pic_url;
		let container = new createjs.Container();

		// 图片
		let image =  util.NImage(pic_url);
		image.onload = function(){
			console.log([this.width, this.height]);
		}
		let img = new createjs.Bitmap(image);
		img.set({
			x: index * 100,
			y: index * 100
		})
		container.addChild(img);

		// 文本
		let text = new createjs.Text("站酷小薇", "100px 站酷小薇LOGO", "#ff7700");
		text.set({
			x: 100,
			y: 200,
		})
		container.addChild(text);




		stage.addChild(container);
		let tween = createjs.Tween.get(container)
		.wait(wait)
		.to({alpha:0.1, x: 150 * index, /*visible:true*/}, 2000)
		.to({alpha: 1, y: 150 * index, /*visible: true*/}, 2000)
		.call(function(){
		
		});
		timeline.addTween(tween);
		return tween;
	},

	default: function({stage, timeline, item, index, wait }) {
		let pic_url = item.pic_url;
		let canvas = stage.canvas;
		let duration = item.duration;

		let img = util.NImage(pic_url);
		
		let bitmap = new createjs.Bitmap(img);
		stage.addChild(bitmap);
		img.onload = function(){
			bitmap.set({
				regX: img.width / 2,
				regY: img.height / 2,
				x: canvas.width + img.width / 2,
				y: canvas.height / 2,
				width: canvas.width / 2,
				height: canvas.height / 2,
			})
		}
		bitmap.set({
			regX: img.width / 2,
			regY: img.height / 2,
			x: canvas.width + img.width / 2,
			y: canvas.height / 2,
			rotation: index % 2 > 0 ? 10 : -10,
			shadow: new createjs.Shadow("rgba(0,0,0,0.5)", 5, 5, 10),
			scaleX: 0.5,
			scaleY: 0.5,
		});
		let tween = c.Tween.get(bitmap, {})
			.wait(wait)
			.to({
				x: canvas.width / 2,
				y: canvas.height / 2,
			}, duration * 0.7, c.Ease.backInOut)
			.to({
				x: -canvas.width / 2,
				// alpha: 0.1
			}, duration * 0.3)

		timeline.addTween(tween);
		return tween;
	},
	// 照相====================================================================================================================================
	camera: function({stage, timeline, item, index, wait }) {
		camera({stage, timeline, item, index, wait });
	},

	// rect====================================================================================================================================
	rect: function({stage, timeline, item, index, wait }) {
		rect({stage, timeline, item, index, wait });
	},
	fadeInOut: function({stage, timeline, item, index, wait }) {
		fadeInOut({stage, timeline, item, index, wait });
	},
	monochromatic: function({stage, timeline, item, index, wait }) {
		monochromatic({stage, timeline, item, index, wait });
	},
	upDownAndScale: function({stage, timeline, item, index, wait }) {
		upDownAndScale({stage, timeline, item, index, wait });
	},
	photo1: function({stage, timeline, item, index, wait }) {
		photo1({stage, timeline, item, index, wait });
	},
	photo2: function({stage, timeline, item, index, wait }) {
		photo2({stage, timeline, item, index, wait });
	},
	photo3: function({stage, timeline, item, index, wait }) {
		photo3({stage, timeline, item, index, wait });
	},
	photo4: function({stage, timeline, item, index, wait }) {
		photo4({stage, timeline, item, index, wait });
	},

}
export default transitions;