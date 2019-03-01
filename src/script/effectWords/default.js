let fun = function ({stage, wait, item, index, timeline, project, goods}) {
	let c = createjs;
	let duration = item.duration;
	let cw = stage.canvas.width;
	let ch = stage.canvas.height;
	let ms = Math.min(cw, ch);

	let goodsPrice = goods.price;
	let goodsPromotionPrice = goods.promotionPrice;
	// alert();

	let promotionPrice = project.wordEffectOptions[0] ? project.wordEffectOptions[0].value : `¥ ${goodsPrice}`;
	let price =  project.wordEffectOptions[1] ? project.wordEffectOptions[1].value : `价格 ${goodsPromotionPrice}`;
	let themeColor = project.wordEffectOptions[2] ? project.wordEffectOptions[2].value : `rgba(255,207,79,1)`;
	let position = project.wordEffectOptions[3] ? project.wordEffectOptions[3].value : 'northWest';

	let currentWait = wait + 0.2 * duration;
	let currentDuration = 0.8 * duration;

	var priceContainer = new createjs.Container();
	stage.addChild(priceContainer);

	priceContainer.set({
		// y: 0.1 * ch,
		scaleX: ms / 1000,
		scaleY: ms / 1000,
	});
	switch(position) {
		case 'northWest':
			priceContainer.set({
				x: 0,
				y: Math.min(cw, ch) * 0.1,
			})
			break;
		case 'southWest':
			priceContainer.set({
				x: 0,
				y: 0.9 * ch - 130,
			})
			break;
		/*case 'northEast':
			priceContainer.set({
				x: cw - rectSize,
				y: 0,
			})
			break;
		case 'southEast':
			priceContainer.set({
				x: cw - rectSize,
				y: ch - rectSize,
			})
			break;*/
		default: break;
	}

	// 1
	var rect1 = new c.Shape();
	rect1.graphics.beginFill(themeColor).drawRect(0, 0, 200 * 2, 40*2);
	rect1.set({
		x: -200 *2,
		y: 0,
		opacity: 0,
	});
	// 2
	var rect2 = new createjs.Shape();
	rect2.graphics.beginFill('white').drawRect(0, 40 * 2, 300*2, 50*2);
	rect2.set({
		x: -300 * 2,
		y: 0,
		opacity: 0,
	});
	var rect3 = new createjs.Shape();
	rect3.graphics.beginFill('gray').drawRect(0, 90*2, 250 * 2, 40 * 2);
	rect3.set({
		x: -250 * 2,
		y: 0,
		opacity: 0,
	});

	priceContainer.addChild(rect1);
	priceContainer.addChild(rect2);
	priceContainer.addChild(rect3);

	var rectTween1 = createjs.Tween.get(rect1)
	.wait(currentWait)
	.to({
		x: -100 * 2,
		opacity: 1,
	}, 1500, createjs.Ease.backInOut)

	var rectTween2 = createjs.Tween.get(rect2)
	.wait(currentWait)
	.to({
		x: -150 * 2,
		opacity: 1,
	}, 1000, createjs.Ease.backInOut)

	var rectTween3 = createjs.Tween.get(rect3)
	.wait(currentWait)
	.to({
		x: -130 * 2,
		opacity: 1,
	}, 1200, createjs.Ease.backInOut)


	// price 1
	var price1 = new createjs.Text('促销价', 'bold 50px Impact');
	price1.set({
		color: 'white',
		x: 10 * 2,
		y: 5 * 2,
		alpha: 0,
	})
	priceContainer.addChild(price1);
	var priceTween1 = createjs.Tween.get(price1)
		.wait(currentWait+ currentDuration/2)
		.to({
		alpha: 1,
	}, 500);

	// price 2
	var price2 = new createjs.Text(promotionPrice, 'bold 70px Impact');
	price2.set({
		color: themeColor, // '#c31311',
		x: 10 * 2,
		y: 45 * 2,
		alpha: 0,
	})
	priceContainer.addChild(price2);
	var priceTween2 = createjs.Tween.get(price2)
	.wait(currentWait+ currentDuration/2)
	.to({
		alpha: 1,
	}, 500);

	// price 3
	var price3 = new createjs.Text(price, 'normal 40px Impact');
	price3.set({
		color: 'white',
		x: 10 * 2,
		y: 97 * 2,
		alpha: 0,
	})
	priceContainer.addChild(price3);
	var priceTween3 = createjs.Tween.get(price3)
	.wait(currentWait+ currentDuration/2)
	.to({
		alpha: 1,
	}, 500);

	// bar 
	var bar = new createjs.Shape();
	let textWidth = price3.getMeasuredWidth();
	bar.graphics.beginFill('#eeeeee').drawRect(0, 0, textWidth, 3 * 2);
	bar.set({
		x: -50 * 2,
		y: 110 * 2,
		alpha: 0,
	})
	var barTween = createjs.Tween.get(bar)
	.wait(currentWait + currentDuration/ 2)
	.to({
		x: 10 * 2,
		alpha: 1,
	}, 500)
	priceContainer.addChild(bar);

	timeline.addTween(
		rectTween1,
		rectTween2,
		rectTween3,
		priceTween1,
		priceTween2,
		priceTween3,
		barTween
	);





	// 添加配置
	project.wordEffectOptions = [];

	project.wordEffectOptions.push({
		name: '促销价',
		tag: 'promotionPrice',
		type: 'input',
		value: promotionPrice,
		callback: (e)=>{
			// console.log(e.target.value);
			// console.log(price2)
			price2.text = e.target.value;
		}
	})


	project.wordEffectOptions.push({
		name: '价格',
		tag: 'price',
		type: 'input',
		value: price,
		callback: (e)=>{
			price3.text = e.target.value;
			let textWidth = price3.getMeasuredWidth();
			let graphics = new c.Graphics();
			graphics.beginFill('#eeeeee').drawRect(0, 0, textWidth, 3 * 2);
			bar.graphics = graphics;
		}
	})
	project.wordEffectOptions.push({
		name: '颜色',
		tag: 'color',
		type: 'color',
		value: themeColor,
		callback: (e)=>{
			// console.log(e);
			price2.set({
				color: e,
			})

			let rGraphics = new c.Graphics();
			rGraphics.f(e).drawRect(0, 0, 200 * 2, 40*2);
			rect1.graphics = rGraphics;		
		}
	})

	// 位置
	project.wordEffectOptions.push({
		name: '位置',
		tag: 'position',
		type: 'select',
		options: [
			{name: '左上',value: 'northWest'},
			{name: '左下',value: 'southWest'},
			/* {name: '右上',value: 'northEast'},
			{name: '右下',value: 'southEast'},*/
		],
		value: position,
		callback: (e)=>{
			// console.log(e);
			let position = e.target.value;
			switch(position) {
				case 'northWest':
					priceContainer.set({
						x: 0,
						y: Math.min(cw, ch) * 0.1,
					})
					break;
				case 'southWest':
					priceContainer.set({
						x: 0,
						y: 0.9 * ch - 130,
					})
					break;
				/*case 'northEast':
					priceContainer.set({
						x: cw - rectSize,
						y: 0,
					})
					break;
				case 'southEast':
					priceContainer.set({
						x: cw - rectSize,
						y: ch - rectSize,
					})
					break;*/
				default: break;
			}
		}
	})


}
export default fun;