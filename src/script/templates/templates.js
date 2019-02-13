let watermarkUrl = `${window.assets}logo.png`;
let i1 = `${window.assets}demo1.jpg`;
let i2 = `${window.assets}demo2.jpg`;
let i3 = `${window.assets}demo3.jpg`;
const list = [
	// 1.淡入淡出
	{
		cover: `${window.assets}t1.png`,
		name: '淡入淡出',
		data: {
			bgColor: '#ffffff',
			width: 600,
			height: 600,
			wordEffect: 'defaultEffect',
			useEffectWord: true,
			useWatermark: false,
			watermarkPosition: 'SouthEast',
			watermarkScale: 0.2,
			watermarkAlpha: 1,
			wordEffectOptions: [

			],
			// 水印
			watermark: watermarkUrl,
			queue: [
				{	
					type: 'image',
					transition: 'fadeInOut',
					duration: 2500,
					pic_url:i1,

				},
				{
					type: 'image',
					transition: 'fadeInOut',
					duration: 2500,
					pic_url: i2,
				},
				{
					type: 'image',
					transition: 'fadeInOut',
					duration: 2500,
					pic_url:  i3,
				},
				
			]
		}
	},
	// 2.拍照效果
	{
		cover: `${window.assets}t2.png`,
		name: '拍照效果',
		data: {
			bgColor: '#ffffff',
			width: 600,
			height: 600,
			wordEffect: 'badgeEffect',
			useEffectWord: true,
			useWatermark: false,
			watermarkPosition: 'SouthEast',
			watermarkScale: 0.2,
			watermarkAlpha: 1,
			wordEffectOptions: [

			],
			// 水印
			watermark: watermarkUrl,
			queue: [
				{	
					type: 'image',
					transition: 'camera',
					duration: 2500,
					pic_url: i1,
	
				},
				{
					type: 'image',
					transition: 'camera',
					duration: 2500,
					pic_url: i2,
				},
				{
					type: 'image',
					transition: 'camera',
					duration: 2500,
					pic_url: i3,
				},
				
			]
		}

	},
	// 3.线条
	{
		cover: `${window.assets}t3.png`,
		name: '线条',
		data: {
			bgColor: '#ffffff',
			width: 600,
			height: 600,
			wordEffect: 'badgeEffect',
			useEffectWord: true,
			useWatermark: false,
			watermarkPosition: 'SouthEast',
			watermarkScale: 0.2,
			watermarkAlpha: 1,
			wordEffectOptions: [

			],
			// 水印
			watermark: watermarkUrl,
			queue: [
				{	
					type: 'image',
					transition: 'rect',
					duration: 2500,
					pic_url: i1,
	
				},
				{
					type: 'image',
					transition: 'rect',
					duration: 2500,
					pic_url: i2,
				},
				{
					type: 'image',
					transition: 'rect',
					duration: 2500,
					pic_url: i3,
				},
				
			]
		}
	},
	// 4.slide
	{
		cover: `${window.assets}t4.png`,
		name: '滑动',
		data: {
			bgColor: '#ffffff',
			width: 600,
			height: 600,
			wordEffect: 'badgeEffect',
			useEffectWord: true,
			useWatermark: false,
			watermarkPosition: 'SouthEast',
			watermarkScale: 0.2,
			watermarkAlpha: 1,
			wordEffectOptions: [

			],
			// 水印
			watermark: watermarkUrl,
			queue: [
				{	
					type: 'image',
					transition: 'monochromatic',
					duration: 2000,
					pic_url: i1,
	
				},
				{
					type: 'image',
					transition: 'monochromatic',
					duration: 2000,
					pic_url: i2,
				},
				{
					type: 'image',
					transition: 'monochromatic',
					duration: 2000,
					pic_url: i3,
				},
			]
		}
	},
	// 5.上下放大
	{
		cover: `${window.assets}t5.png`,
		name: '上下放大',
		data: {
			bgColor: '#ffffff',
			width: 600,
			height: 600,
			wordEffect: 'badgeEffect',
			useEffectWord: true,
			useWatermark: false,
			watermarkPosition: 'SouthEast',
			watermarkScale: 0.2,
			watermarkAlpha: 1,
			wordEffectOptions: [

			],
			// 水印
			watermark: watermarkUrl,
			queue: [
				{	
					type: 'image',
					transition: 'upDownAndScale',
					duration: 2000,
					pic_url: i1,
	
				},
				{
					type: 'image',
					transition: 'upDownAndScale',
					// wordEffect: 'defaultEffect',
					duration: 2000,
					pic_url: i2,
				},
				{
					type: 'image',
					transition: 'upDownAndScale',
					// wordEffect: 'defaultEffect',
					duration: 2000,
					pic_url: i3,
				},
			]
		}
	},
	// 6.相片效果
	{
		cover: `${window.assets}t6.png`,
		name: '相片效果',
		data: {
			bgColor: '#ffffff',
			width: 600,
			height: 600,
			wordEffect: 'badgeEffect',
			useEffectWord: true,
			useWatermark: false,
			watermarkPosition: 'SouthEast',
			watermarkScale: 0.2,
			watermarkAlpha: 1,
			wordEffectOptions: [

			],
			// 水印
			watermark: watermarkUrl,
			queue: [
				{	
					type: 'image',
					transition: 'photo1',
					duration: 2000,
					pic_url: i1,
	
				},
				{
					type: 'image',
					transition: 'photo1',
					// wordEffect: 'defaultEffect',
					duration: 2000,
					pic_url: i2,
				},
				{
					type: 'image',
					transition: 'photo1',
					// wordEffect: 'defaultEffect',
					duration: 2000,
					pic_url: i3,
				},
			]
		}
	},
	// 7.相片效果2
	{
		cover: `${window.assets}t7.png`,
		name: '相片效果2',
		data: {
			bgColor: '#ffffff',
			width: 600,
			height: 600,
			wordEffect: 'badgeEffect',
			useEffectWord: true,
			useWatermark: false,
			watermarkPosition: 'SouthEast',
			watermarkScale: 0.2,
			watermarkAlpha: 1,
			wordEffectOptions: [

			],
			// 水印
			watermark: watermarkUrl,
			queue: [
				{	
					type: 'image',
					transition: 'photo2',
					duration: 2000,
					pic_url: i1,
	
				},
				{
					type: 'image',
					transition: 'photo2',
					// wordEffect: 'defaultEffect',
					duration: 2000,
					pic_url: i2,
				},
				{
					type: 'image',
					transition: 'photo2',
					// wordEffect: 'defaultEffect',
					duration: 2000,
					pic_url: i3,
				},
				
			]
		}
	},
	// 8.相片效果3
	{
		cover: `${window.assets}t8.png`,
		name: '相片效果3',
		data: {
			bgColor: '#ffffff',
			width: 600,
			height: 600,
			wordEffect: 'bottomBar',
			useEffectWord: true,
			useWatermark: false,
			watermarkPosition: 'SouthEast',
			watermarkScale: 0.2,
			watermarkAlpha: 1,
			wordEffectOptions: [

			],
			// 水印
			watermark: watermarkUrl,
			queue: [
				{	
					type: 'image',
					transition: 'photo3',
					duration: 2000,
					pic_url: i1,
	
				},
				{	
					type: 'image',
					transition: 'photo3',
					duration: 2000,
					pic_url: i2,
	
				},
				{
					type: 'image',
					transition: 'photo3',
					// wordEffect: 'defaultEffect',
					duration: 2000,
					pic_url: i3,
				},
			]
		}
	},
	// 9.相片效果4
	/*{
		cover: 'http://imgs.aixifan.com/content/2019_1_12/1.5473042821718707E9.png',
		name: '相片效果4',
		data: {
			bgColor: '#ffffff',
			width: 600,
			height: 600,
			// 价格标签
			wordEffect: 'bottomBar',
			useEffectWord: true,
			useWatermark: false,
			watermarkPosition: 'SouthEast',
			watermarkScale: 0.2,
			watermarkAlpha: 1,
			wordEffectOptions: [

			],
			// 水印
			watermark: watermarkUrl,
			queue: [
				{	
					type: 'image',
					transition: 'photo4',
					duration: 2000,
					pic_url: i1,
	
				},
				{	
					type: 'image',
					transition: 'photo4',
					duration: 2000,
					pic_url: i2,
	
				},
				{
					type: 'image',
					transition: 'photo4',
					// wordEffect: 'defaultEffect',
					duration: 2000,
					pic_url: i3,
				},
				
			]
		}
	},*/
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