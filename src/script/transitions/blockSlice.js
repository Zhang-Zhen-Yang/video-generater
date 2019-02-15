/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-02-15 15:12:40
 * @LastEditTime: 2019-02-15 16:03:42
 * @LastEditors: Please set LastEditors
 */


import util from '../util.js';
const fun = function({stage, timeline, item, index, wait }) {
	let c = createjs;
	let pic_url = item.pic_url;
	let canvas = stage.canvas;
	let cw = canvas.width;
	let ch = canvas.height;
	let maxS = Math.max(cw, ch);
	let duration = item.duration;

	let bitmapContainer = new c.Container();






	

	let img = util.NImage(pic_url);
	
	
	stage.addChildAt(bitmapContainer, 1);
	let scale = 1;
	img.onload = function(){
		let bitmap = new c.Bitmap(img);
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
			scaleX: scale, 
			scaleY: scale, 
		})
		if(index == 0) {
			let baseBitmap = bitmap.clone();
			stage.addChildAt(baseBitmap, 1);
		}
		
		

		let type = index % 3;
		let bar;
		let toProps;
		if(type == 0) {
			// alert(index);
			let blockW = cw / 5;
			let blockH = ch / 4;
			for(let i = 0; i < 5; i++) {

				for(let j = 0; j < 4 ; j++) {
					let blockBitmap = bitmap.clone();
					bar = new c.Shape();
					bar.graphics.beginFill("#FF0").drawRect(0, 0, blockW, blockH);
					bar.set({
						x: i * blockW,
						y: j * blockH,
					})
					bar.cache(0, 0, cw, ch);
					blockBitmap.mask = bar;
					toProps = {
						scaleX: 0
					};
					let isFirst = ((i % 2 == 0) && (j % 2 == 0)) || ((i % 2 == 1) && (j % 2 == 1))
					
					bitmapContainer.addChild(blockBitmap);
					let cWait = isFirst? duration / 4 : duration * 3 / 5;
					let barTween = c.Tween.get(bar)
					.wait(wait + cWait )
					.to(toProps, duration * 0.15, c.Ease.easeInOut)
					.wait(duration * (1 - 0.15) - cWait);
					timeline.addTween(barTween)
					
				}
			}
			
		} else {

			if(type == 1){
				let bar1 = new c.Shape();
				let bar2 = new c.Shape();
				for(let i = 0; i < 10; i++){
					if(i % 2 == 0) {
						bar1.graphics.drawRect(0, ch / 10 * i, cw, ch / 10);
					} else {
						bar2.graphics.drawRect(0, ch / 10 * i, cw, ch / 10 );
					}

				}
				
				bar1.cache(0, 0, cw, ch);
				bar2.cache(0, 0, cw, ch);
				let nBitmap1 =  bitmap.clone();
				let nBitmap2 =  bitmap.clone();
				nBitmap1.mask = bar1;
				nBitmap2.mask = bar2;
				bitmapContainer.addChild(nBitmap1, nBitmap2);

				let barTween1 = c.Tween.get(bar1)
				.wait(wait + 0.5 * duration )
				.to({
					x: -cw
				}, duration * 0.2, c.Ease.easeInOut)
				.wait(duration * 0.3)

				let barTween2 = c.Tween.get(bar2)
				.wait(wait + 0.5 * duration )
				.to({
					x: cw
				}, duration * 0.2, c.Ease.easeInOut)
				.wait(duration * 0.3)

				timeline.addTween(barTween1)
				timeline.addTween(barTween2)

			} else if(type == 2){
				let bar1 = new c.Shape();
				let bar2 = new c.Shape();
				for(let i = 0; i < 10; i++){
					if(i % 2 == 0) {
						bar1.graphics.drawRect(cw / 10 * i, 0, cw / 10, ch);
					} else {
						bar2.graphics.drawRect(cw / 10 * i, 0, cw / 10, ch);
					}

				}
				
				bar1.cache(0, 0, cw, ch);
				bar2.cache(0, 0, cw, ch);
				let nBitmap1 =  bitmap.clone();
				let nBitmap2 =  bitmap.clone();
				nBitmap1.mask = bar1;
				nBitmap2.mask = bar2;
				bitmapContainer.addChild(nBitmap1, nBitmap2);

				let barTween1 = c.Tween.get(bar1)
				.wait(wait + 0.5 * duration )
				.to({
					y: -ch
				}, duration * 0.2, c.Ease.easeInOut)
				.wait(duration * 0.3);
				

				let barTween2 = c.Tween.get(bar2)
				.wait(wait + 0.5 * duration )
				.to({
					y: ch
				}, duration * 0.2, c.Ease.easeInOut)
				.wait(duration * 0.3);

				timeline.addTween(barTween1)
				timeline.addTween(barTween2)
			}

		}
				

		
			/* nBitmap.mask= bar;
			let timeBefore = duration * 0.3 /10 * i;
			let timeAfter = duration * 0.7 - timeBefore;
			let barTween = c.Tween.get(bar)
			.wait(wait + timeBefore)
			.to(toProps, duration * 0.3, c.Ease.cubicInOut)
			.wait(timeAfter)


			timeline.addTween(barTween);*/
		
	}

	
	// stage.addChild(star);

}
export default fun;