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
    });

    document.getElementById("drawArea").addEventListener('mouseleave', function (e) {
        mousePressed = false;
    });

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, document.getElementById("drawArea").width, document.getElementById("drawArea").height);
}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 12;
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
    let image = new Image();
    image.src = canvas.toDataURL();
    return image;
  }

document.addEventListener('DOMContentLoaded', function () {
    initCanvas();
  }, false);