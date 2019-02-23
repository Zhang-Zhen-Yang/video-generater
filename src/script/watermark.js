import util from './util.js';
let c = createjs;
// 水印
let fun = ({stage,timeline,project})=>{
	/* if(project.watermarkObject) {
		stage.removeChild(project.watermarkObject);
	} */
	let useWatermark = project.useWatermark;
	if(!useWatermark) return;

	let cw = stage.canvas.width;
	let ch =stage.canvas.height;

	let prevWaterVall = stage.getChildByName('waterfall');
	let promise;
	if(prevWaterVall) {
		promise = new Promise((resolve, reject)=>{
			// console.log(prevWaterVall);
			resolve(prevWaterVall.image);
		})

	} else {
		promise = new Promise((resolve, reject)=>{
			let watermark = project.watermark;
			let img = util.NImage(watermark);
			img.onload = ()=> {
				let bitmap = new c.Bitmap(img);
				bitmap.name = 'waterfall';
				stage.addChild(bitmap);
				prevWaterVall = bitmap;
				resolve(img);
			}
			img.src = watermark;
		})
	}

	promise.then(
		(img)=>{
			let scale = util.getImageScale({img, cw, ch, type: 'contain'});
			let watermarkPosition = project.watermarkPosition;
			let watermarkScale = project.watermarkScale;
			let watermarkAlpha = project.watermarkAlpha;
			// console.log([position, watermarkScale]);
			let distImageW = scale * watermarkScale * img.width;
			let distImageH = scale * watermarkScale * img.height;
			let x = 0,y=0;
			let offset = 0.04;
			/*
			
				{
         
			
			*/
			switch(watermarkPosition){
				// 正中方
				case 'Center':
					x = (cw - distImageW) / 2;
					y = (ch - distImageH) / 2;
				break;
				// 正上方
				case 'North':
					x = (cw - distImageW) / 2;
					y = offset * ch;
				break;
				// 正下方
				case 'South':
					x = (cw - distImageW) / 2;
					y = ch - distImageH - offset * ch;
				break;
			  	// 左边
				case 'West':
					x = offset * cw;
					y = (ch - distImageH) / 2;
				break;
			  	// 右边
				case 'East':
					x = cw - distImageW - cw * offset;
					y = (ch - distImageH) / 2;
				break;
			  	// 左上角
				case 'NorthWest':
					x = cw * offset;
					y = ch * offset;
				break;
			  	// 左下角
				case 'SouthWest':
					x = cw * offset;
					y = ch - distImageH - ch * offset;
				break;
				// 右上角
				case 'NorthEast':
					x = cw - distImageW - cw * offset;
					y = ch * offset;
				break;
			  	// 右下角
				case 'SouthEast':
					x = cw - distImageW - cw * offset;
					y = ch - distImageH - ch * offset;
				break;
				default: break;
			}

			prevWaterVall.set({
				x: x,
				y: y,
				scaleX: scale * watermarkScale,
				scaleY: scale * watermarkScale,
				alpha: watermarkAlpha,
			})
		},
		(res)=>{

		}
	)

	
	
	
	
		
	
	
}
export default fun;