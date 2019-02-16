import util from '../util.js';
const fun = function({stage, timeline, item, index, wait, project = {}}) {
	let pic_url = item.pic_url;
		let canvas = stage.canvas;
		let { durationScale, durationDefault, durationFirst } = project;
		let duration = index == 0 ? (durationFirst * durationScale) : (durationDefault * durationScale);

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
}
export default fun;