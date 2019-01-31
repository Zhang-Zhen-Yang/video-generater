var workerPath = window.ffmpeg;

function initWorker() {
	worker = processInWebWorker();
	worker.onmessage = function (event) {
	  var message = event.data;
	  if (message.type == "ready") {
		isWorkerLoaded = true;
		worker.postMessage({
		  type: "command",
		  arguments: ["-help"]
		});
	  } else if (message.type == "stdout") {
		outputElement.textContent += message.data + "\n";
	  } else if (message.type == "start") {
		outputElement.textContent = "Worker has received command\n";
	  } else if (message.type == "done") {
		stopRunning();
		var buffers = message.data;
		if (buffers.length) {
		  outputElement.className = "closed";
		}
		buffers.forEach(function(file) {
			alert('dddd');
		  // filesElement.appendChild(getDownloadLink(file.data, file.name));
		});
	  }
	};
  }


function processInWebWorker() {
	let code = `importScripts('${workerPath}');

	var now = Date.now;
	
	function print(text) {
	  postMessage({
		'type' : 'stdout',
		'data' : text
	  });
	}
	
	onmessage = function(event) {
	
	  var message = event.data;
	
	  if (message.type === "command") {
	
		var Module = {
		  print: print,
		  printErr: print,
		  files: message.files || [],
		  arguments: message.arguments || [],
		  TOTAL_MEMORY: 268435456
		  // Can play around with this option - must be a power of 2
		  // TOTAL_MEMORY: 268435456
		};
	
		postMessage({
		  'type' : 'start',
		  'data' : Module.arguments.join(" ")
		});
	
		postMessage({
		  'type' : 'stdout',
		  'data' : 'Received command: ' +
					Module.arguments.join(" ") +
					((Module.TOTAL_MEMORY) ? ".  Processing with " + Module.TOTAL_MEMORY + " bits." : "")
		});
	
		var time = now();
		var result = ffmpeg_run(Module);
	
		var totalTime = now() - time;
		postMessage({
		  'type' : 'stdout',
		  'data' : 'Finished processing (took ' + totalTime + 'ms)'
		});
	
		postMessage({
		  'type' : 'done',
		  'data' : result,
		  'time' : totalTime
		});
	  }
	};
	
	postMessage({
	  'type' : 'ready'
	});
	`
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


function convertStreamsNew(imagesArray, audioBlob, {t}) {
	var worker = processInWebWorker();
	var vab;
	var aab;
	var buffersReady;
	var workerReady;
	var isWorkerLoaded = false;
	var posted = false;
	let files = imagesArray.map((item, index)=>{
		return {
			name: `input${index}`,
			data: item
		}
	})
	let text  = `-r 1 -t ${t} -f image2 -i input%d.jpeg  ${audioBlob ? '-i input.wav' : ''} -strict -2 -pix_fmt yuv420p -preset slow -profile:v baseline -q:v 4 output.mp4`
	var args = parseArguments(text);
    console.log(args);
    worker.postMessage({
      type: "command",
      arguments: args,
      files: files
	})
	let outputElement = document.getElementById('log');
	worker.onmessage = function (event) {
		console.log('event', event);
		var message = event.data;
		if (message.type == "ready") {
		  isWorkerLoaded = true;
		  worker.postMessage({
			type: "command",
			arguments: ["-help"]
		  });
		} else if (message.type == "stdout") {
		  outputElement.textContent += message.data + "\n";
		} else if (message.type == "start") {
		  outputElement.textContent = "Worker has received command\n";
		} else if (message.type == "done") {
		  // stopRunning();
		  var buffers = message.data;
		  if (buffers.length) {
			outputElement.className = "closed";
		  }
		  buffers.forEach(function(file) {
			filesElement.appendChild(getDownloadLink(file.data, file.name));
		  });
		}
	  };
	  worker.onerror = function(event){
		console.error(event);
	  }

	

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

function parseArguments(text) {
text = text.replace(/\s+/g, ' ');
var args = [];
// Allow double quotes to not split args.
text.split('"').forEach(function(t, i) {
	t = t.trim();
	if ((i % 2) === 1) {
	args.push(t);
	} else {
	args = args.concat(t.split(" "));
	}
});
return args;
}
function getDownloadLink(fileData, fileName) {
if (fileName.match(/\.jpeg|\.gif|\.jpg|\.png/)) {
	var blob = new Blob([fileData]);
	var src = window.URL.createObjectURL(blob);
	var img = document.createElement('img');

	img.src = src;
	return img;
}
else {
	var a = document.createElement('a');
	a.download = fileName;
	var blob = new Blob([fileData]);
	var src = window.URL.createObjectURL(blob);
	a.href = src;
	a.textContent = 'Click here to download ' + fileName + "!";
	return a;
}
}

export { convertStreamsNew, accessWorderNew };