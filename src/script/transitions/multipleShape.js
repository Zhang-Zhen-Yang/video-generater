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



	let shape = new c.Shape();
	if(index % 3 == 0) {
        let size = Math.max(cw, ch);
        // shape.graphics.beginFill("#FF0").drawRect(-size / 2, -size / 2, size, size);
        shape.graphics.beginFill("#FF0").drawPolyStar(0, 0, Math.max(cw, ch), 4, 0, -90);
    } else if(index % 3 == 1){
        let redius = Math.sqrt(cw*cw + ch*ch);
        shape.graphics.beginFill("#FF0").drawCircle(0, 0, redius);
    } else if(index % 3 == 2){
        shape.graphics.beginFill("#FF0").drawPolyStar(0, 0, Math.max(cw, ch), 5, 0, -90);
    }

	shape.set({
		regX: 0,
		regY: 0,
		x: maxS / 2,
		y: maxS / 2,
		scaleX: index == 0 ? 1 : 0,
		scaleY: index == 0 ? 1 : 0,
		rotation: 0,
	})
	shape.cache(0, 0, cw, ch);

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
			scaleX: scale + (0.1 * cw / iw), 
			scaleY: scale + (0.1 * cw / iw), 
		})
		/*if(index == 0) {
			let baseBitmap = bitmap.clone();
			stage.addChildAt(baseBitmap, 1);
		}*/
        bitmap.mask= shape;
        let shapeTween = c.Tween.get(shape)
        .wait(wait)
        .to({
            scaleX: 1,
            scaleY: 1,
            rotation: 360,
        }, duration * 0.3, c.Ease.easeOut);
        

        let bitmapTween = c.Tween.get(bitmap)
        .wait(wait + duration * 0.3)
        .to({
            x: index % 2 == 0 ? (cw / 2 + cw * 0.05) :　(cw / 2 - cw * 0.05)
        }, duration * 0.7, c.Ease.easeOut)
        
        timeline.addTween(bitmapTween);
    
        timeline.addTween(shapeTween);
	}
	// stage.addChild(star);
}
export default fun;