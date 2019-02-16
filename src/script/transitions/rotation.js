import util from '../util.js';
const fun = function({stage, timeline, item, index, wait, project = {} }) {
	let c = createjs;
	let pic_url = item.pic_url;
	let canvas = stage.canvas;
	let cw = canvas.width;
	let ch = canvas.height;
	let maxS = Math.max(cw, ch);
	let { durationScale, durationDefault, durationFirst } = project;
	let duration = index == 0 ? (durationFirst * durationScale) : (durationDefault * durationScale);

	let bitmapContainer = new c.Container();




	let img = util.NImage(pic_url);
	
	let bitmap = new c.Bitmap(img);

	stage.addChild(bitmap,);
	let scale = 1;
	img.onload = function(){
		scale = util.getImageScale({img, cw, ch, type: 'cover'});
		let iw = img.width;
		let ih = img.height;
		let distW = iw * scale;
		let distH = ih * scale;
		bitmap.set({
			regX: iw / 2,
			regY: ih / 2,
			x: cw / 2,
			y: ch / 2,
			scaleX: index == 0 ? scale : 0, 
			scaleY: index == 0 ? scale : 0, 
			rotation: index == 0 ? 360 : 0
		})
		/*if(index == 0) {
			let baseBitmap = bitmap.clone();
			stage.addChildAt(baseBitmap, 1);
		}*/
        // bitmap.mask= shape;
        
        

        let bitmapTween = c.Tween.get(bitmap)
        .wait(wait + duration * (index == 0 ? 0 : 0.3))
        .to({
			rotation: 360,
			scaleX: scale,
			scaleY: scale,

		}, duration * 0.3, c.Ease.easeOut)
		.to({
			scaleX: scale * 1.1,
			scaleY: scale * 1.1 
		}, duration * 0.4)
        
        timeline.addTween(bitmapTween);
    
       
	}

	
	// stage.addChild(star);

}
export default fun;