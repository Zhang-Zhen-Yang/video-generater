import util from './util.js';
var workerPath = window.asm;
/* if(document.domain == 'localhost') {
	workerPath = location.href.replace(location.href.split('/').pop(), '') + 'script/ffmpeg_asm.js';
	// alert(workerPath);
}*/
function processInWebWorker() {
	var blob = URL.createObjectURL(new Blob(
		[
			`importScripts("${ workerPath }");
			var now = Date.now;
			function print(text) {
				postMessage({
					"type" : "stdout",
					"data" : text
				});
			};
			onmessage = function(event) {
				var message = event.data;
				if (message.type === "command") {
					var Module = {
						print: print,
						printErr: print,
						files: message.files || [],
						arguments: message.arguments || [],
						TOTAL_MEMORY: 268435456
				};
				postMessage({
					"type" : "start",
					"data" : Module.arguments.join(" ")
				});
				postMessage({
					"type" : "stdout",
					"data" : "Received command: " +Module.arguments.join(" ") +((Module.TOTAL_MEMORY) ? ".  Processing with " + Module.TOTAL_MEMORY + " bits." : ""
				)}
			);
			var time = now();
			var result = ffmpeg_run(Module);
			var totalTime = now() - time;
			postMessage({
				"type" : "stdout",
				"data" : "Finished processing (took " + totalTime + "ms)"});
				postMessage({"type" : "done","data" : result,"time" : totalTime});
			}};
			postMessage({"type" : "ready"});`
		], {
			type: 'application/javascript'
		}
	));
	var worker = new Worker(blob);
	URL.revokeObjectURL(blob);
	return worker;
}


function accessWorder() {
	return new Promise((resolve, reject)=>{
		let initWorder = processInWebWorker();
		initWorder.onmessage = function(event) {
			// alert(event);
			resolve();
			initWorder.terminate();
		}
		initWorder.onerror = function(e) {
			// alert(e);
			console.log(e);
			reject();
			initWorder.terminate();
		}
	});
}


function convertStreams(videoBlob, audioBlob, {t}) {
	var worker;
	var vab;
	var aab;
	var buffersReady;
	var workerReady;
	var posted = false;

	// 视频
	var fileReader1 = new FileReader();
	fileReader1.onload = function() {
		vab = this.result;
		if (!audioBlob || aab ) buffersReady = true;
		if (buffersReady && workerReady && !posted) postMessage();
	};

	// 音频
	var fileReader2 = new FileReader();
	fileReader2.onload = function() {
		aab = this.result;
		if (vab) buffersReady = true;
		if (buffersReady && workerReady && !posted) postMessage();
	};

	fileReader1.readAsArrayBuffer(videoBlob);
	if(audioBlob) {
		fileReader2.readAsArrayBuffer(audioBlob);
	}

	if (!worker) {
		worker = processInWebWorker();
	}
	worker.onmessage = function(event) {
		var message = event.data;
		if (message.type == "ready") {
			log('<a href="'+ workerPath +'" download="ffmpeg-asm.js">ffmpeg-asm.js</a> file has been loaded.');
			workerReady = true;
			if (buffersReady)
				postMessage();
		} else if (message.type == "stdout") {
			log(message.data);
		} else if (message.type == "start") {
			log('<a href="'+ workerPath +'" download="ffmpeg-asm.js">ffmpeg-asm.js</a> file received ffmpeg command.');
		} else if (message.type == "done") {
			log(JSON.stringify(message));
			var result = message.data[0];
			log(JSON.stringify(result));
			var blob = new Blob([result.data], {
				type: 'video/mp4'
			});
			log(JSON.stringify(blob));
			PostBlob(blob);
			worker = null;
		}
	};
	console.log('--------------time', t);
	var postMessage = function() {
		posted = true;
		
		/*
			[
				'-i', 'video.webm',
				'-i', 'audio.wav',
				'-s', '1280x720',
				'-c:v', 'mpeg4',
				'-c:a', 'aac',
				'-b:v', '1450k',
				'-b:a', '96k',
				'-bf', '2',
				'-g', '90',
				'-sc_threshold', '0',
				'-ar', '32000',
				'-strict', 'experimental', 'output.mp4'
			]
		*/
		
		let args = audioBlob ? [
			'-i', 'video.webm',
			'-i', 'audio.wav',
			'-i', 'audio.wav',
			'-i', 'audio.wav',
			'-t', t,
			'-q:v', '4',
			'-strict', 'experimental',
			'-r', 24,
			'output.mp4'
		] : [
			'-i', 'video.webm',
			'-t', t,
			'-q:v', '4',
			'-strict', 'experimental',
			'-r', 24,
			'output.mp4'
		];
		let files = audioBlob ? [
			{
				data: new Uint8Array(vab),
				name: 'video.webm'
			},
			{
				data: new Uint8Array(aab),
				name: "audio.wav"
			}
		] : [
			{
				data: new Uint8Array(vab),
				name: 'video.webm'
			},
		]
		console.log(new Uint8Array(vab));
		worker.postMessage({
			type: 'command',
			arguments:  args,
			files: files
		});
	};
}

// 生成下载链接
function PostBlob(blob) {
	var h2 = document.querySelector('#log');
	var downloadWrap  = document.getElementById('download-wrap');
	// h2.innerHTML = '<a href="' + URL.createObjectURL(blob) + '" target="_blank" download="Recorded Audio+Canvas File.mp4">Download Recorded Audio+Canvas file in MP4 container and play in VLC player!</a>';
	let link = '<a href="' + URL.createObjectURL(blob) + '" target="_blank" download="file.mp4">点击下载视频文件!<div id="video-download-icon"></div></a>';
	h2.innerHTML = link;
	downloadWrap.innerHTML = link;
	h2.setAttribute('contenteditable', 'false');
	downloadWrap.setAttribute('contenteditable', 'false');
}
function log(message) {
	var h2 = document.querySelector('#log');
	h2.innerHTML = message;
	console.log(message);
}

// 将图片生成视频
function convertImageToVideo(imagesArray, audio, {f, t, b}, callback) {
	var worker;	
	if (!worker) {
		worker = processInWebWorker();
	}
	let files = imagesArray.map((item, index)=>{
		console.log(`input${index}.jpeg`);
		return {
			name: `input${index}.jpeg`,
			data: item,
		}
	})
	files.push({
		"name": "input.wav",
		"data": audio
	})

	let commands = `-r ${f}  -f image2 -i input%d.jpeg ${audio? '-i input.wav' :  '' }  -strict -2 -b:v ${b}k -t ${t} output.mp4`;

	let args = util.parseArguments(commands);

	let postMessage = ()=>{
		worker.postMessage({
			type: 'command',
			arguments:  args,
			files
		})
	}
	// console.log(files);
	worker.onmessage = function(event) {
		var message = event.data;
		if(callback) {
			callback(message);
		}
		if (message.type == "ready") {
			log('<a href="'+ workerPath +'" download="ffmpeg-asm.js">ffmpeg-asm.js</a> file has been loaded.');
			// workerReady = true;
			postMessage();
		} else if (message.type == "stdout") {
			log(message.data);
		} else if (message.type == "start") {
			log('<a href="'+ workerPath +'" download="ffmpeg-asm.js">ffmpeg-asm.js</a> file received ffmpeg command.');
		} else if (message.type == "done") {
			log(JSON.stringify(message));
			var result = message.data[0];
			log(JSON.stringify(result));
			var blob = new Blob([result.data], {
				type: 'video/mp4'
			});
			log(JSON.stringify(blob));
			PostBlob(blob);
			worker = null;
		}
	};


}

export { convertStreams, accessWorder, convertImageToVideo };