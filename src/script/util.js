const util = {
	getQueryString: function() {
        let result = {};
        let href = window.location.toString();
        let queryString = href.split('?')[1];
        if(queryString) {
            let queryStringList = queryString.split('&');
            if(queryStringList) {
                queryStringList.forEach((item) => {
                    let queryPairing = item.split('=');
                    result[queryPairing[0]] = queryPairing[1];
                });
            }
        }
        return result;
    },
	// 下载文件
	funDownload: function(content, blob, filename) {
		var eleLink = document.createElement('a');
		eleLink.download = filename;
		eleLink.style.display = 'none';
		// 字符内容转变成blob地址
		// var blob = new Blob([content]);
		eleLink.href = URL.createObjectURL(blob);
		// 触发点击
		document.body.appendChild(eleLink);
		eleLink.click();
		// 然后移除
		document.body.removeChild(eleLink);
	},
	NImage: function(pic_url) {
		let isBase64 = pic_url.indexOf('data:image') > -1;
		let image = new Image();
		if(isBase64) {
			image.src=pic_url;
		} else {
			image.crossOrigin = "anonymous";
			image.src=pic_url; //+ '?type=layerImg';
		}
		return image;
	},
	blobToUint8Array: function(blob){
        let fileReader = new FileReader();
        return new Promise((resolve, reject) => {
            fileReader.onloadend = () => {
                resolve(new Uint8Array(fileReader.result));
            };
            fileReader.readAsArrayBuffer(blob);
        });
	},
	base64ToArrayBuffer: function(base64) {
		var binary_string =  window.atob(base64);
		var len = binary_string.length;
		var bytes = new Uint8Array( len );
		for (var i = 0; i < len; i++)        {
			bytes[i] = binary_string.charCodeAt(i);
		}
		return bytes.buffer;
	},
	convertBase64ToBlob: function(base64, type){
		var base64Arr = base64.split(',');
		var imgtype = '';
		var base64String = '';
		if(base64Arr.length > 1){
			//如果是图片base64，去掉头信息
			base64String = base64Arr[1];
			imgtype = base64Arr[0].substring(base64Arr[0].indexOf(':')+1,base64Arr[0].indexOf(';'));
		}
		// 将base64解码
		var bytes = atob(base64String);
		//var bytes = base64;
		var bytesCode = new ArrayBuffer(bytes.length);
		 // 转换为类型化数组
		var byteArray = new Uint8Array(bytesCode);
		
		// 将base64转换为ascii码
		for (var i = 0; i < bytes.length; i++) {
			byteArray[i] = bytes.charCodeAt(i);
		}
		if(type == 'byteArray') {
			return byteArray;
		}
		// 生成Blob对象（文件对象）
		return new Blob( [bytesCode] , {type : imgtype});
	},
	base64toUnit8: function(s) {
		return new Uint8Array(atob(s).split('').map(charCodeAt))
	},
	blobtoUnit8: function(b) {
		console.log(b);
		return new Uint8Array(b.split('').map(charCodeAt))
	},
	getImageScale: function({img, cw, ch,type}) {
		let scale = 1;
		let iw = img.width;
		let ih = img.height;
		if(type == 'contain') {
			if(cw / ch > iw / ih) {
				scale = ch / ih;
			} else {
				scale = cw / iw;
			}
		} else if(type == 'cover'){
			if(cw / ch > iw / ih) {
				scale = cw / iw;
			} else {
				scale = ch / ih;
			}
		}
		
		return scale;
	}

}
export default util;