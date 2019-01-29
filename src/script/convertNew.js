var workerPath = 'https://archive.org/download/ffmpeg_asm/ffmpeg_asm.js';

if(document.domain == 'localhost') {
	workerPath = location.href.replace(location.href.split('/').pop(), '') + 'script/ffmpeg-webm.js';
	// alert(workerPath);
}
function processInWebWorker() {
	let code = `importScripts('${workerPath}');
	self.addEventListener('message', ev => {
		console.log('GOT MESSAGE', ev.data.type);
		if(ev.data.type === 'process'){
			console.log('655556662262233232----------------------------------------------');
			let files = ev.data.files;
			let args = ev.data.args;
			let obj = ffmpegjs({
				MEMFS: files,
				arguments: args,
				noExitRuntime: false,
				print: function(data) { console.log(data)  },
				printErr: function(data) { console.log(data) },
				onRuntimeInitialized: e => {
					console.log('RUNETIM INIT')
				},
				onfilesready: e => {
					console.log('FILES READY', e.MEMFS[0]);
					self.postMessage({
						type: 'result'
					});
					e.MEMFS.forEach(f => {
						f.data = null;
						f = null;
					});
					console.log('OBJ', obj)
				},
				onExit: function(e) {
					console.log('EXITING FMPEG WASM');
				},
				onAbort: e => {
					console.log('ANORT FMPEG WASM');
				}
			});
		}else{
			self.postMessage({
				type: 'access'
			});
		}
	});
	postMessage({
		"type": "ready"
	});`
	var blob = URL.createObjectURL(new Blob([code], {
		type: 'application/javascript'
	}));
	var worker = new Worker(blob);
	URL.revokeObjectURL(blob);
	return worker;
}


function accessWorderNew() {
	return new Promise((resolve, reject)=>{
		let initWorder = processInWebWorker();
		/*initWorder.postMessage({
			type: 'access',
			// files: [],
			args: ['-h']
		});*/
		initWorder.onmessage = function(event) {
			resolve();
			initWorder.terminate();
		}
		initWorder.onerror = function(e) {
			// console.log('eeeeeeeeeeeeeeeeeeeeee', e);
			// alert('dd');
			reject();
			initWorder.terminate();
		}
	});
}


function convertStreamsNew(videoBlob, audioBlob, {t}) {
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
		/*worker.postMessage({
			type: 'access',
			// files: [],
			args: ['-h']
		});*/
	}
	worker.onmessage = function(event) {
		var message = event.data;
		console.log('message type', message.type);
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
	worker.onerror= function(event){
		console.error(event);
	}
	console.log('--------------time', t);
	var postMessage = function() {
		alert('dddd');
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
		worker.postMessage({
			type: 'process',
			arguments:  args,
			
			/* [
				// '-help',
				'-i', 'video.webm',
				'-i', 'audio.wav',
				'-t', t,
				// '-c:v', 'mpeg4',
				// '-vcodec', 'copy',
				//'-c:a', 'vorbis', // or aac
				// '-b:v', '1450k',  // or 1450k
				// '-b:a', '96k',  // or 96k
				//'-pix_fmt', 'yuv420p',
				//'-preset', 'slow',
				// '-profile:v', 'baseline',
				// '-pre','slow',
				'-q:v', '4',
				// '-crf', '51',
				'-strict', 'experimental',
				// '-c:v', 'libx264',
				// '-vframes', '24',
				// '-c:v', 'mpeg4',
				// '-vcodec', 'h264',
				'-r', 24,
				'output.mp4'
			],*/
			/* arguments: [
				'-i', 'video.webm',
				'-i', 'audio.wav',
				'-c:v', 'mpeg4',
				'-c:a', 'vorbis', // or aac
				'-b:v', '6400k',  // or 1450k
				'-b:a', '4800k',  // or 96k
				'-strict', 'experimental', 'output.mp4'
			],*/
			files: files
		});
	};
}

function PostBlob(blob) {
	var h2 = document.querySelector('#log');
	h2.innerHTML = '<a href="' + URL.createObjectURL(blob) + '" target="_blank" download="Recorded Audio+Canvas File.mp4">Download Recorded Audio+Canvas file in MP4 container and play in VLC player!</a>';
	h2.setAttribute('contenteditable', 'false');
}
function log(message) {
	var h2 = document.querySelector('#log');
	h2.innerHTML = message;
	console.log(message);
}

export { convertStreamsNew, accessWorderNew };