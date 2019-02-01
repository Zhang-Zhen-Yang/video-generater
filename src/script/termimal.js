var workerPath = window.ffmpeg;
var worker;
var sampleImageData;
var sampleVideoData;
var outputElement;
var filesElement;
var running = false;
var isWorkerLoaded = false;
var isSupported = (function() {
  return document.querySelector && window.URL && window.Worker;
})();

function isReady() {
  return !running && isWorkerLoaded ;// && sampleImageData && sampleVideoData;
}

function startRunning() {
  // document.querySelector("#image-loader").style.visibility = "visible";
  outputElement.className = "";
  // filesElement.innerHTML = "";
  running = true;
}
function stopRunning() {
  // document.querySelector("#image-loader").style.visibility = "hidden";
  running = false;
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


function runCommand(text,files) {
  if (isReady()) {
    startRunning();
    var args = parseArguments(text);
    console.log(args);
    worker.postMessage({
      type: "command",
      arguments: args,
      files
    });
  }
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

function initWorker() {
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


	worker = new Worker(blob);
	worker.onmessage = function (event) {
		var message = event.data;
		console.log('message', message);
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
			alert('done');
			let logDOM = document.querySelector("#log")
			logDOM.innerHTML="";
			logDOM.appendChild(getDownloadLink(file.data, file.name));
		});
		}
	};
	worker.onerror = function(event){
		console.error(event);
	}
}

document.addEventListener("DOMContentLoaded", function() {
	retrieveSampleImage();
  initWorker();
  

  var inputElement = document.querySelector("#input");
  outputElement = document.querySelector("#log");
  filesElement = document.querySelector("#files");

  /*inputElement.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
      runCommand(inputElement.value);
    }
  }, false);
  document.querySelector("#run").addEventListener("click", function() {
    runCommand(inputElement.value);
  });*/

  [].forEach.call(document.querySelectorAll(".sample"), function(link) {
    link.addEventListener("click", function(e) {
      inputElement.value = this.getAttribute("data-command");
      runCommand(inputElement.value, []);
      e.preventDefault();
    });
  });

});
function retrieveSampleImage() {
	var oReq = new XMLHttpRequest();
	oReq.open("GET", `${window.assets}p.jpg`, true);
	oReq.responseType = "arraybuffer";

	oReq.onload = function (oEvent) {
		var arrayBuffer = oReq.response;
		if (arrayBuffer) {
		sampleImageData = new Uint8Array(arrayBuffer);
	}
};

oReq.send(null);
}

function covertNew(imagesArray, audio, {f, t, b}) {
	if(!sampleImageData){
		alert('无图片');
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
	/*let files = [
			{
			  "name": "input.",
			  "data": sampleImageData
			},
			{
			  "name": "input2.jpeg",
			  "data": sampleImageData
			},
			{
			  "name": "input3.jpeg",
			  "data": sampleImageData
			},
			{
			  "name": "input4.jpeg",
			  "data": sampleImageData
			},
			{
			  "name": "input5.jpeg",
			  "data": sampleImageData
			},
			{
			  "name": "input6.jpeg",
			  "data": sampleImageData
			},
	]*/
	runCommand(
		// `-r 24 -t ${t} -f image2 -i input%d.jpeg output.mp4`,
		// `-r 24 -t ${t} -f image2 -i input%d.jpeg  -preset slow output.mp4`,
		// `-r 24 -t ${t} -f image2 -i input%d.jpeg ${audio? '-i input.wav' :  '' } -vcodec mpeg4 output.mp4`,
		`-r ${f} -t ${t} -f image2 -i input%d.jpeg ${audio? '-i input.wav' :  '' }  -strict -2 -b:v ${b}k output.mp4`,
		files);

}

export {covertNew};