const list = [
	// 1.淡入淡出
	{
		cover: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042735289507E9.png',
		name: '淡入淡出',
		data: {
			bgColor: '#ffffff',
			width: 800,
			height: 600,
			wordEffect: 'defaultEffect',
			wordEffectOptions: [

			],
			queue: [
				{	
					type: 'image',
					transition: 'fadeInOut',
					duration: 2500,
					pic_url:/* `${window.assets}1.jpg`,//*/'http://imgs.aixifan.com/content/2019_1_12/1.5473042735289507E9.png',

				},
				{
					type: 'image',
					transition: 'fadeInOut',
					duration: 2500,
					pic_url: /*`${window.assets}2.jpg`,//*/'http://imgs.aixifan.com/content/2019_1_12/1.5473042773658206E9.png',
				},
				{
					type: 'image',
					transition: 'fadeInOut',
					duration: 2500,
					pic_url:  /*`${window.assets}3.jpg`,//*/'http://imgs.aixifan.com/content/2019_1_12/1.5473042821718707E9.png',
				},
				{
					type: 'image',
					transition: 'fadeInOut',
					duration: 2500,
					pic_url:  /*`${window.assets}3.jpg`,//*/'http://imgs.aixifan.com/content/2019_1_12/1.5473042745440927E9.png',
				},
			]
		}
	},
	// 2.拍照效果
	{
		cover: 'http://imgs.aixifan.com/content/2019_1_24/1.548296873667641E9.png',
		name: '拍照效果',
		data: {
			bgColor: '#ffffff',
			width: 800,
			height: 600,
			wordEffect: 'badgeEffect',
			wordEffectOptions: [

			],
			queue: [
				{	
					type: 'image',
					transition: 'camera',
					duration: 2500,
					pic_url: 'http://imgs.aixifan.com/o_1d2d0r6okd6hkko380filqnfg.jpg',
	
				},
				{
					type: 'image',
					transition: 'camera',
					duration: 2500,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_28/1.5486663585683255E9.png',
				},
				{
					type: 'image',
					transition: 'camera',
					duration: 2500,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_28/1.5486859542135582E9.png',
				},
				{
					type: 'image',
					transition: 'camera',
					duration: 2500,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_28/1.5486858052159495E9.png',
				},
			]
		}

	},
	// 3.线条
	{
		cover: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042821718707E9.png',
		name: '线条',
		data: {
			bgColor: '#ffffff',
			width: 800,
			height: 600,
			wordEffect: 'badgeEffect',
			wordEffectOptions: [

			],
			queue: [
				{	
					type: 'image',
					transition: 'rect',
					duration: 2500,
					pic_url: 'http://imgs.aixifan.com/o_1d2d0r6okd6hkko380filqnfg.jpg',
	
				},
				{
					type: 'image',
					transition: 'rect',
					duration: 2500,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_28/1.5486663585683255E9.png',
				},
				{
					type: 'image',
					transition: 'rect',
					duration: 2500,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_28/1.5486871851739235E9.png',
				},
				{
					type: 'image',
					transition: 'rect',
					duration: 2500,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_28/1.5486856127358165E9.png',
				},
				
			]
		}
	},
	// 4.slide
	{
		cover: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042735289507E9.png',
		name: '滑动',
		data: {
			bgColor: '#ffffff',
			width: 800,
			height: 600,
			wordEffect: 'badgeEffect',
			wordEffectOptions: [

			],
			queue: [
				{	
					type: 'image',
					transition: 'monochromatic',
					duration: 2000,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042735289507E9.png',
	
				},
				{
					type: 'image',
					transition: 'monochromatic',
					duration: 2000,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042773658206E9.png',
				},
				{
					type: 'image',
					transition: 'monochromatic',
					duration: 2000,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042821718707E9.png',
				},
				{
					type: 'image',
					transition: 'monochromatic',
					duration: 2000,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042745440927E9.png',
				},
			]
		}
	},
	// 5.上下放大
	{
		cover: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042745440927E9.png',
		name: '上下放大',
		data: {
			bgColor: '#ffffff',
			width: 800,
			height: 600,
			wordEffect: 'badgeEffect',
			wordEffectOptions: [

			],
			queue: [
				{	
					type: 'image',
					transition: 'upDownAndScale',
					duration: 2000,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042735289507E9.png',
	
				},
				{
					type: 'image',
					transition: 'upDownAndScale',
					// wordEffect: 'defaultEffect',
					duration: 2000,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_28/1.5486663585683255E9.png',
				},
				{
					type: 'image',
					transition: 'upDownAndScale',
					// wordEffect: 'defaultEffect',
					duration: 2000,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_28/1.5486859542135582E9.png',
				},
				{
					type: 'image',
					transition: 'upDownAndScale',
					// wordEffect: 'defaultEffect',
					duration: 2000,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_28/1.5486858052159495E9.png',
				},
			]
		}
	},
	// 6.相册效果
	{
		cover: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042773658206E9.png',
		name: '相册效果',
		data: {
			bgColor: '#ffffff',
			width: 800,
			height: 600,
			wordEffect: 'badgeEffect',
			wordEffectOptions: [

			],
			queue: [
				{	
					type: 'image',
					transition: 'photo1',
					duration: 2000,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042735289507E9.png',
	
				},
				{
					type: 'image',
					transition: 'photo1',
					// wordEffect: 'defaultEffect',
					duration: 2000,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_28/1.5486663585683255E9.png',
				},
				{
					type: 'image',
					transition: 'photo1',
					// wordEffect: 'defaultEffect',
					duration: 2000,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_28/1.5486859542135582E9.png',
				},
				{
					type: 'image',
					transition: 'photo1',
					// wordEffect: 'defaultEffect',
					duration: 2000,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_28/1.5486858052159495E9.png',
				},
			]
		}
	},
	// 7.相册效果2
	{
		cover: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042821718707E9.png',
		name: '相册效果2',
		data: {
			bgColor: '#ffffff',
			width: 800,
			height: 600,
			wordEffect: 'badgeEffect',
			wordEffectOptions: [

			],
			queue: [
				{	
					type: 'image',
					transition: 'photo2',
					duration: 2000,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042735289507E9.png',
	
				},
				{
					type: 'image',
					transition: 'photo2',
					// wordEffect: 'defaultEffect',
					duration: 2000,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_28/1.5486663585683255E9.png',
				},
				{
					type: 'image',
					transition: 'photo2',
					// wordEffect: 'defaultEffect',
					duration: 2000,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_28/1.5486859542135582E9.png',
				},
				{
					type: 'image',
					transition: 'photo2',
					// wordEffect: 'defaultEffect',
					duration: 2000,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_28/1.5486858052159495E9.png',
				},
			]
		}
	},
	// 8.相册效果3
	{
		cover: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042821718707E9.png',
		name: '相册效果3',
		data: {
			bgColor: '#ffffff',
			width: 800,
			height: 600,
			wordEffect: 'badgeEffect',
			wordEffectOptions: [

			],
			queue: [
				{	
					type: 'image',
					transition: 'photo3',
					duration: 2000,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_28/1.5486864778916757E9.png',
	
				},
				{	
					type: 'image',
					transition: 'photo3',
					duration: 2000,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042735289507E9.png',
	
				},
				{
					type: 'image',
					transition: 'photo3',
					// wordEffect: 'defaultEffect',
					duration: 2000,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_28/1.5486663585683255E9.png',
				},
				{
					type: 'image',
					transition: 'photo3',
					// wordEffect: 'defaultEffect',
					duration: 2000,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_28/1.5486859542135582E9.png',
				},
				{
					type: 'image',
					transition: 'photo3',
					// wordEffect: 'defaultEffect',
					duration: 2000,
					pic_url: 'http://imgs.aixifan.com/content/2019_1_28/1.5486858052159495E9.png',
				},
			]
		}
	},
	/*// 4.拍照效果
	{
		cover: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042735289507E9.png',
	},
	// 5.拍照效果
	{
		cover: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042745440927E9.png',
	},
	// 2.拍照效果
	{
		cover: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042773658206E9.png',
	},
	// 3.拍照效果
	{
		cover: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042821718707E9.png',
	},
	// 4.拍照效果
	{
		cover: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042735289507E9.png',
	},
	// 5.拍照效果
	{
		cover: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042745440927E9.png',
	},
	// 2.拍照效果
	{
		cover: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042773658206E9.png',
	},
	// 3.拍照效果
	{
		cover: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042821718707E9.png',
	},
	// 4.拍照效果
	{
		cover: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042735289507E9.png',
	},
	// 5.拍照效果
	{
		cover: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042745440927E9.png',
	},*/
];
export default list;