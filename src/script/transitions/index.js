import util from '../util.js';
// import { stat } from 'fs';

import defaultEffect from './default';
import camera from './camera';
import rect from './rect';
import fadeInOut from './fadeInOut';
import fadeInOutN from './fadeInOutN';
import monochromatic from './monochromatic';
import upDownAndScale from './upDownAndScale';
import photo1 from './photo1';
import photo2 from './photo2';
import photo3 from './photo3';
import photo4 from './photo4';
import star from './star';
import shutters from './shutters';
import blockSlice from './blockSlice';
import multipleShape from './multipleShape';
import rotation from './rotation';
import dissolve from './dissolve';
import extrusion from './extrusion';
import rightAngle from './rightAngle';
import flyIn from './flyIn';
import centerExpand from './centerExpand';


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
	default: function({stage, timeline, item, index, wait, project }) {
		
		defaultEffect({stage, timeline, item, index, wait, project });
		
	},
	// 2
	// 照相====================================================================================================================================
	camera: function({stage, timeline, item, index, wait , project}) {
		camera({stage, timeline, item, index, wait , project});
	},
	// 3
	// rect====================================================================================================================================
	rect: function({stage, timeline, item, index, wait , project}) {
		rect({stage, timeline, item, index, wait , project});
	},
	// 4
	fadeInOut: function({stage, timeline, item, index, wait , project}) {
		fadeInOutN({stage, timeline, item, index, wait , project});
	},
	monochromatic: function({stage, timeline, item, index, wait , project}) {
		monochromatic({stage, timeline, item, index, wait , project});
	},
	// 5
	upDownAndScale: function({stage, timeline, item, index, wait , project}) {
		upDownAndScale({stage, timeline, item, index, wait , project});
	},
	// 6
	photo1: function({stage, timeline, item, index, wait , project}) {
		photo1({stage, timeline, item, index, wait , project});
	},
	// 7
	photo2: function({stage, timeline, item, index, wait , project}) {
		photo2({stage, timeline, item, index, wait , project});
	},
	// 8
	photo3: function({stage, timeline, item, index, wait , project}) {
		photo3({stage, timeline, item, index, wait , project});
	},
	photo4: function({stage, timeline, item, index, wait , project}) {
		photo4({stage, timeline, item, index, wait , project});
	},
	// 9
	star: function({stage, timeline, item, index, wait , project}){
		star({stage, timeline, item, index, wait , project});
	},
	// 10
	shutters: function({stage, timeline, item, index, wait , project}){
		shutters({stage, timeline, item, index, wait , project});
	},
	blockSlice: function({stage, timeline, item, index, wait , project}){
		blockSlice({stage, timeline, item, index, wait , project});
	},
	multipleShape: function({stage, timeline, item, index, wait , project}){
		multipleShape({stage, timeline, item, index, wait , project});
	},
	rotation: function({stage, timeline, item, index, wait , project}){
		rotation({stage, timeline, item, index, wait , project});
	},
	dissolve: function({stage, timeline, item, index, wait , project}){
		dissolve({stage, timeline, item, index, wait , project});
	},
	extrusion: function({stage, timeline, item, index, wait , project}){
		extrusion({stage, timeline, item, index, wait , project});
	},
	rightAngle: function({stage, timeline, item, index, wait , project}){
		rightAngle({stage, timeline, item, index, wait , project});
	},
	// 左右飞入
	flyIn: function({stage, timeline, item, index, wait , project}){
		flyIn({stage, timeline, item, index, wait , project});
	},
	// 中间展开
	centerExpand: function({stage, timeline, item, index, wait , project}){
		centerExpand({stage, timeline, item, index, wait , project});
	},

}
export default transitions;