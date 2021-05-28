var mousePressed = false;
var lastX, lastY;
var ctx;

function initCanvas() {
    ctx = document.getElementById("drawArea").getContext("2d");

    document.getElementById("drawArea").addEventListener('mousedown', function (e) {
        mousePressed = true;
        Draw(e.pageX - this.getBoundingClientRect().x, e.pageY - this.getBoundingClientRect().y, false);
    });

    document.getElementById("drawArea").addEventListener('mousemove', function (e) {
        if(mousePressed)
            Draw(e.pageX - this.getBoundingClientRect().x, e.pageY - this.getBoundingClientRect().y, true);
    });

    document.getElementById("drawArea").addEventListener('mouseup', function (e) {
        mousePressed = false;
        predict();
    });

    document.getElementById("drawArea").addEventListener('mouseleave', function (e) {
        if(mousePressed)
            predict();
        mousePressed = false;
    });

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, document.getElementById("drawArea").width, document.getElementById("drawArea").height);
}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 25;
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}

function clearArea() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, document.getElementById("drawArea").width, document.getElementById("drawArea").height);
}

function convertToImage() {
    let canvas = document.getElementById("drawArea");
    return dataURItoBlob(canvas.toDataURL());
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {
        type: mimeString
    });
}

function ArrayBufferToString(buffer) {
    return BinaryToString(String.fromCharCode.apply(null, Array.prototype.slice.apply(new Uint8Array(buffer))));
}

function BinaryToString(binary) {
    var error;

    try {
        return decodeURIComponent(escape(binary));
    } catch (_error) {
        error = _error;
        if (error instanceof URIError) {
            return binary;
        } else {
            throw error;
        }
    }
}
  
function predict() {
    var request = new XMLHttpRequest();
    request.open('POST', '/predict');
    
    request.addEventListener('load', function(event) {
        if (request.status >= 200 && request.status < 300) {
            console.log(request.responseText);

            var prediction = JSON.parse(request.responseText)
            console.log(prediction);

            document.getElementById("letter").innerText = prediction.value;

            document.getElementById("percent-0").innerText = parsePercentage(prediction.zero);
            document.getElementById("percent-1").innerText = parsePercentage(prediction.one);
            document.getElementById("percent-2").innerText = parsePercentage(prediction.two);
            document.getElementById("percent-3").innerText = parsePercentage(prediction.three);
            document.getElementById("percent-4").innerText = parsePercentage(prediction.four);
            document.getElementById("percent-5").innerText = parsePercentage(prediction.five);
            document.getElementById("percent-6").innerText = parsePercentage(prediction.six);
            document.getElementById("percent-7").innerText = parsePercentage(prediction.seven);
            document.getElementById("percent-8").innerText = parsePercentage(prediction.eight);
            document.getElementById("percent-9").innerText = parsePercentage(prediction.nine);
        } else {
            console.warn(request.statusText, request.responseText);
        }
    });

    request.send(convertToImage());
}

function parsePercentage(number) {
    return Math.round(parseFloat(number)*10000)/100 + "%"
}

document.addEventListener('DOMContentLoaded', function () {
    initCanvas();
  }, false);