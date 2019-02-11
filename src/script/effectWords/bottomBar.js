let fun = function ({stage, wait, item, index, timeline, project, goods}) {
	let c = createjs;
	let duration = item.duration;
	let cw = stage.canvas.width;
	let ch = stage.canvas.height;
	let ms = Math.min(cw, ch);

	let goodsPrice = goods.price;
	let goodsPromotionPrice = goods.promotionPrice;
	// alert();

	let promotionPrice = project.wordEffectOptions[0] ? project.wordEffectOptions[0].value : `促销价 ¥ ${goodsPrice}`;
	let price =  project.wordEffectOptions[1] ? project.wordEffectOptions[1].value : `价格 ${goodsPromotionPrice}`;

	let currentWait = wait + 0.2 * duration;
	let currentDuration = 0.8 * duration;

	var priceContainer = new createjs.Container();
	priceContainer.set({
		y: 1 * ch
	})
	stage.addChild(priceContainer);


	let rect = new c.Shape();
	let bottomBarHeight = ch*0.15;
	rect.graphics.f('orange').drawRect(0, 0, cw, ch*0.15);
	rect.set({
		alpha: 0.6
	})
	priceContainer.addChild(rect);

	let rectLine = new c.Shape();
	rectLine.graphics.f('orange').drawRect(0, 0, cw, ch*0.008);
	priceContainer.addChild(rectLine);


	var barTween = c.Tween.get(priceContainer)
		.wait(currentWait + currentDuration)
		.to({
			y: 0.85 * ch
		}, 500, c.Ease.easeOut)
	timeline.addTween(
		barTween
	);





	// 价格 标价
	var priceOrigin = new c.Container();
	
	var price1 = new c.Text(price, `bold ${Math.min(ch, cw)*0.08}px Impact`);
	var price1Width = price1.getMeasuredWidth();

	var price1DeleteLine = new c.Shape();
	price1DeleteLine.graphics.f('#eeeeee').drawRect(0, bottomBarHeight / 2- ch*0.008, price1Width, ch*0.016 );
	price1.set({
		color: '#eeeeee',
		x: (cw - price1Width) / 2,
		y: bottomBarHeight / 2,
		alpha: 1,
		textBaseline:'middle'
	})
	priceOrigin.addChild(price1);
	priceOrigin.addChild(price1DeleteLine);
	priceOrigin.set({
		regX:cw /  2,
		x: cw / 2,
		y: bottomBarHeight / 2,
		regY: bottomBarHeight / 2,
		rotation: 0,
		
	})
	priceContainer.addChild(priceOrigin);

	var price1DeleteLineTween = c.Tween.get(price1DeleteLine)
		.wait(currentWait + currentDuration )
		.to({
			x: (cw - price1Width) / 2
		}, 1000, c.Ease.easeOut)
	timeline.addTween(
		price1DeleteLineTween
	);


	var priceOriginTween = c.Tween.get(priceOrigin)
		.wait(currentWait + currentDuration + 2500)
		.to({
			rotation: 360,
			x: cw * 3 / 4,
			scaleX: 0.6,
			scaleY: 0.6
		}, 1000, c.Ease.easeOut)
	timeline.addTween(
		priceOriginTween
	);


	// 促销价格

	var pricePromotionContainer = new c.Container();
	
	var price2 = new c.Text(promotionPrice, `bold ${Math.min(ch, cw)*0.08}px Impact`);
	var price2Width = price2.getMeasuredWidth();
	price2.set({
		color: '#eeeeee',
		x: -cw,
		y: bottomBarHeight / 2,
		alpha: 1,
		textBaseline:'middle'
	})
	pricePromotionContainer.addChild(price2);
	pricePromotionContainer.set({
		regX:cw /  2,
		x: cw / 2,
		y: bottomBarHeight / 2,
		regY: bottomBarHeight / 2,
		rotation: 0,
		
	})
	priceContainer.addChild(pricePromotionContainer);

	var price2Tween = c.Tween.get(price2)
		.wait(currentWait + currentDuration + 2000)
		.to({
			x: cw * 1 / 8 ,
		}, 1000, c.Ease.easeOut)
	timeline.addTween(
		price2Tween
	);


	










	// 添加配置
	project.wordEffectOptions = [];

	project.wordEffectOptions.push({
		name: '促销价',
		tag: 'promotionPrice',
		type: 'input',
		value: promotionPrice,
		callback: (e)=>{
			console.log(e.target.value);
			console.log(price2)
			price2.text = e.target.value;
		}
	})


	project.wordEffectOptions.push({
		name: '标价',
		tag: 'price',
		type: 'input',
		value: price,
		callback: (e)=>{
			price1.text = e.target.value;
			let priceDeleteLineGraphics = new c.Graphics();
			priceDeleteLineGraphics.f('#eeeeee').drawRect(0, bottomBarHeight / 2- ch*0.008, price1.getMeasuredWidth(), ch*0.016 );
			price1DeleteLine.graphics = priceDeleteLineGraphics;
		}
	})

	project.wordEffectOptions.push({
		name: '颜色',
		tag: 'color',
		type: 'color',
		value: '#FFA500',
		callback: (e)=>{
			console.log(e);
			let rGraphics = new c.Graphics();
			rGraphics.f(e).drawRect(0, 0, cw, ch*0.15);
			rect.graphics = rGraphics; // .f('orange').drawRect(0, 0, cw, ch*0.15);

			let rLGraphics = new c.Graphics();
			rLGraphics.f(e).drawRect(0, 0, cw, ch*0.008);
			rectLine.graphics = rLGraphics;
			// rectLine.graphics.f('orange').drawRect(0, 0, cw, ch*0.008);


		}
	})


}
export default fun;