// 徽章
let fun = function ({stage, wait, item, index, timeline, project, goods}) {
	let badges = [
		// `${window.assets}badge.svg`,
		"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-47 48.3 500 500' width='200' height='200'%3E%3Cpath d='M313.3 73.3c7.7 34.5 9.5 50.8 18.1 57.7 8.7 6.9 24.3 4.5 59.6 1.6-6.1 34.9-10.7 50.6-5.3 60.2 5.4 9.7 20.7 13.4 54.4 24.3-19 29.9-29.2 42.6-28 53.6 1.3 11 14 20.3 41 43.2-29 20.3-43.3 28.2-46.4 38.8-3.1 10.7 5.2 24.1 21.3 55.6-34.6 7.7-50.8 9.5-57.7 18.1-6.9 8.7-4.5 24.3-1.6 59.6-34.8-6.1-50.5-10.7-60.2-5.3-9.7 5.4-13.4 20.7-24.3 54.4-29.9-19-42.6-29.2-53.6-28-11 1.3-20.3 14-43.2 41-20.3-29-28.2-43.3-38.8-46.4-10.7-3.1-24.1 5.2-55.6 21.3-7.7-34.5-9.5-50.8-18.1-57.7-8.7-6.9-24.3-4.5-59.6-1.6 6.1-34.9 10.7-50.6 5.3-60.3-5.6-9.5-20.9-13.2-54.6-24 19-29.9 29.2-42.6 28-53.6-1.2-11-14-20.3-41-43.2 29-20.3 43.3-28.2 46.4-38.8 3-10.8-5.2-24.3-21.3-55.8 34.5-7.7 50.8-9.5 57.7-18.1 6.9-8.7 4.5-24.3 1.6-59.5 34.9 6.1 50.6 10.7 60.3 5.3 9.7-5.4 13.4-20.7 24.3-54.4 29.9 19 42.6 29.2 53.6 28 11-1.2 20.3-14 43.2-41 20.3 29 28.2 43.3 38.8 46.4 10.7 3 24.2-5.2 55.7-21.4z' fill='%2302abc1'/%3E%3C/svg%3E",


	];
	
	let c = createjs;
	let duration = item.duration;
	let cw = stage.canvas.width;
	let ch = stage.canvas.height;
	let ms = Math.min(cw, ch);

	let goodsPrice = goods.price;
	let goodsPromotionPrice = goods.promotionPrice;
	// alert();

	let promotionPrice = project.wordEffectOptions[0] ? project.wordEffectOptions[0].value : `¥ ${goodsPromotionPrice}`;
	let price =  project.wordEffectOptions[1] ? project.wordEffectOptions[1].value : `价格 ${goodsPrice}`;

	let currentWait = wait + 0.2 * duration;
	let currentDuration = 0.8 * duration;

	var priceContainer = new createjs.Container();
	stage.addChild(priceContainer);

	priceContainer.set({
		y:0, // 0.1 * ch,
		x: 0,
	});

	let rectSize = Math.min(cw, ch) * 0.3;


	let pPrice, oPrice;

	let badgeImg = new Image();
	badgeImg.src = badges[0];

	
	badgeImg.onload = function() {
		// alert(badgeImg.width);
		let bS = new c.Shape();
		bS.graphics.bf(badgeImg, 'no-repeat', new c.Matrix2D(rectSize / badgeImg.width, 0, 0, rectSize / badgeImg.height, 0, 0)).dr(0, 0, rectSize, rectSize);
		priceContainer.addChild(bS);
		bS.set({
			alpha: 0,
			regX: rectSize / 2,
			regY: rectSize / 2,
			x: rectSize / 2,
			y: rectSize / 2
		})

		let bSTween = c.Tween.get(bS)
		.wait(wait)
		.to({
			scaleX: 0.8,
			scaleY: 0.8,
			alpha: 1
		}, duration / 2);
		timeline.addTween(
			bSTween
		);

		// tag ==================================================================================
		// price
		let priceC = new c.Container();
		let priceTag = new c.Text('促销价', `bold ${rectSize * 0.3}px 黑体`);
		let priceW = priceTag.getMeasuredWidth();
		let priceH = priceTag.getMeasuredHeight();
		let priceLH = priceTag.getMeasuredLineHeight ();
		priceC.addChild(priceTag);
		priceC.set({
			x: rectSize / 2,
			y: rectSize / 3,
			alpha: 0,
		})
		priceTag.set({
			color: '#ffffff',
			regX: 0,
			regY: 0,
			x: -priceW / 2,
			y: -priceH / 2,
			scaleX: 1,
			scaleY: 1,
			alpha: 1,
		})
		priceContainer.addChild(priceC);
		var priceTween1 = createjs.Tween.get(priceC)
			.wait(currentWait+ currentDuration/2)
			.to({
			alpha: 1,
			scaleX: 0.5,
			scaleY: 0.5,
			alpha: 1,
		}, 500);

		timeline.addTween(
			priceTween1
		);




		// 促销价 ==================================================================================
		// price
		let pPriceC = new c.Container();
		pPrice = new c.Text(promotionPrice, `bold ${rectSize * 0.3}px 黑体`);
		let pPriceW = pPrice.getMeasuredWidth();
		let pPriceH = pPrice.getMeasuredHeight();
		let pPriceLH = pPrice.getMeasuredLineHeight ();
		pPriceC.addChild(pPrice);
		pPriceC.set({
			x: rectSize / 2,
			y: rectSize/ 2,
			alpha: 0,
		})
		pPrice.set({
			color: '#ffffff',
			regX: 0,
			regY: 0,
			x: -pPriceW / 2,
			y: -pPriceH / 2,
			scaleX: 1,
			scaleY: 1,
			alpha: 1,
		})
		priceContainer.addChild(pPriceC);
		var priceTween2 = createjs.Tween.get(pPriceC)
			.wait(currentWait+ currentDuration * 0.7)
			.to({
			alpha: 1,
			scaleX: 0.5,
			scaleY: 0.5,
			alpha: 1,
		}, 500);

		timeline.addTween(
			priceTween2
		);





		// 原价 ==================================================================================
		// price
		let oPriceC = new c.Container();
		oPrice = new c.Text(price, `bold ${rectSize * 0.2}px 黑体`);
		let oPriceW = oPrice.getMeasuredWidth();
		let oPriceH = oPrice.getMeasuredHeight();
		let oPriceLH = oPrice.getMeasuredLineHeight ();
		oPriceC.addChild(oPrice);
		oPriceC.set({
			x: parseInt(rectSize / 2),
			y: parseInt(rectSize * 2 / 3),
			alpha: 0,
		})
		oPrice.set({
			color: '#ffffff',
			regX: 0,
			regY: 0,
			x: parseInt(-oPriceW / 2),
			y: parseInt(-oPriceH / 2),
			scaleX: 1,
			scaleY: 1,
			alpha: 1,
		})
		priceContainer.addChild(oPriceC);
		var priceTween3 = createjs.Tween.get(oPriceC)
			.wait(currentWait+ currentDuration*0.8)
			.to({
			alpha: 1,
			scaleX: 0.5,
			scaleY: 0.5,
			alpha: 1,
		}, 500);

		timeline.addTween(
			priceTween3
		);


		// bar
		var bar = new c.Shape();
		bar.graphics.beginFill('#eeeeee').drawRect(0, 0, rectSize * 0.5, rectSize * 0.01);
		bar.set({
			x: -50 * 2,
			y: rectSize * (2 / 3 + 0.02),
			alpha: 0,
		})
		var barTween = createjs.Tween.get(bar)
		.wait(currentWait + currentDuration * 0.9)
		.to({
			x: rectSize * 0.25,
			alpha: 1,
		}, 500)
		priceContainer.addChild(bar);


		timeline.addTween(
			barTween
		);





	}
	






	// 添加配置
	project.wordEffectOptions = [];

	project.wordEffectOptions.push({
		name: '促销价',
		tag: 'promotionPrice',
		type: 'input',
		value: promotionPrice,
		callback: (e)=>{
			console.log(e.target.value);
			// console.log(price2)
			pPrice.text = e.target.value;
			let pPriceW = pPrice.getMeasuredWidth();
			pPrice.set({
				x: -pPriceW / 2,
			})
		}
	})


	project.wordEffectOptions.push({
		name: '价格',
		tag: 'price',
		type: 'input',
		value: price,
		callback: (e)=>{
			oPrice.text = e.target.value;
			let oPriceW = oPrice.getMeasuredWidth();
			oPrice.set({
				x: -oPriceW / 2,
			})
		}
	})


}
export default fun;