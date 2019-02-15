import util from '../util.js';
// import { stat } from 'fs';

import defaultEffect from './default';
import camera from './camera';
import rect from './rect';
import fadeInOut from './fadeInOut';
import monochromatic from './monochromatic';
import upDownAndScale from './upDownAndScale';
import photo1 from './photo1';
import photo2 from './photo2';
import photo3 from './photo3';
import photo4 from './photo4';
import star from './star';
import shutters from './shutters';
import blockSlice from './blockSlice';


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
	// 1
	default: function({stage, timeline, item, index, wait }) {
		
		defaultEffect({stage, timeline, item, index, wait });
		
	},
	// 2
	// 照相====================================================================================================================================
	camera: function({stage, timeline, item, index, wait }) {
		camera({stage, timeline, item, index, wait });
	},
	// 3
	// rect====================================================================================================================================
	rect: function({stage, timeline, item, index, wait }) {
		rect({stage, timeline, item, index, wait });
	},
	// 4
	fadeInOut: function({stage, timeline, item, index, wait }) {
		fadeInOut({stage, timeline, item, index, wait });
	},
	monochromatic: function({stage, timeline, item, index, wait }) {
		monochromatic({stage, timeline, item, index, wait });
	},
	// 5
	upDownAndScale: function({stage, timeline, item, index, wait }) {
		upDownAndScale({stage, timeline, item, index, wait });
	},
	// 6
	photo1: function({stage, timeline, item, index, wait }) {
		photo1({stage, timeline, item, index, wait });
	},
	// 7
	photo2: function({stage, timeline, item, index, wait }) {
		photo2({stage, timeline, item, index, wait });
	},
	// 8
	photo3: function({stage, timeline, item, index, wait }) {
		photo3({stage, timeline, item, index, wait });
	},
	photo4: function({stage, timeline, item, index, wait }) {
		photo4({stage, timeline, item, index, wait });
	},
	// 9
	star: function({stage, timeline, item, index, wait }){
		star({stage, timeline, item, index, wait });
	},
	// 10
	shutters: function({stage, timeline, item, index, wait }){
		shutters({stage, timeline, item, index, wait });
	},
	blockSlice: function({stage, timeline, item, index, wait }){
		blockSlice({stage, timeline, item, index, wait });
	},

}
export default transitions;