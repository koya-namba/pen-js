let canvas = document.getElementById('canvassample'),
    ctx = canvas.getContext('2d'),
    moveflg = 0,
    Xpoint,
    Ypoint;

//初期値（サイズ、色、アルファ値）の決定
let defSize = 3
let defColor = "#000";

let temp;

function colorBlack() {
    defSize = 3
    defColor = '#000';
}

function colorRed() {
    defSize = 3
    defColor = '#F00';
}

function colorBlue() {
    defSize = 3
    defColor = '#00F';
}

function init() {
    // 白で塗りつぶす
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#808080';
    ctx.lineWidth = 3;

    let drawLeftLine = function() {
        ctx.beginPath();
        ctx.moveTo(10, 10);
        ctx.lineTo(10, canvas.height-10);
        ctx.closePath();
        ctx.stroke();
    }

    let drawRightLine = function() {
        ctx.beginPath();
        ctx.moveTo(canvas.width-10, 10);
        ctx.lineTo(canvas.width-10, canvas.height-10);
        ctx.closePath();
        ctx.stroke();
    }

    let drawTopLine = function() {
        ctx.beginPath();
        ctx.moveTo(10, canvas.height-10);
        ctx.lineTo(canvas.width-10, canvas.height-10);
        ctx.closePath();
        ctx.stroke();
    }

    let drawBottomLine = function() {
        ctx.beginPath();
        ctx.moveTo(10, 10);
        ctx.lineTo(canvas.width-10, 10);
        ctx.closePath();
        ctx.stroke();
    }

    let drawCenterLine = function() {
        ctx.beginPath();
        ctx.moveTo(canvas.width/2, 10);
        ctx.lineTo(canvas.width/2, canvas.height-10);
        ctx.closePath();
        ctx.stroke();
    }

    let drawCenterCircle = function() {
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, 100, 0, Math.PI*2, true);
        ctx.stroke();
    }

    let drawLeftTopLine = function() {
        ctx.beginPath();
        ctx.moveTo(10, canvas.height/2 + 100);
        ctx.lineTo(100, canvas.height/2 + 100);
        ctx.closePath();
        ctx.stroke();
    }

    let drawLeftBottomLine = function() {
        ctx.beginPath();
        ctx.moveTo(10, canvas.height/2 - 100);
        ctx.lineTo(100, canvas.height/2 - 100);
        ctx.closePath();
        ctx.stroke();
    }

    let drawGoalLeftLine = function() {
        ctx.beginPath();
        ctx.moveTo(100, canvas.height/2 - 100);
        ctx.lineTo(100, canvas.height/2 + 100);
        ctx.closePath();
        ctx.stroke();
    }

    let drawRightTopLine = function() {
        ctx.beginPath();
        ctx.moveTo(canvas.width-10, canvas.height/2 + 100);
        ctx.lineTo(canvas.width - 100, canvas.height/2 + 100);
        ctx.closePath();
        ctx.stroke();
    }

    let drawRightBottomLine = function() {
        ctx.beginPath();
        ctx.moveTo(canvas.width-10, canvas.height/2 - 100);
        ctx.lineTo(canvas.width - 100, canvas.height/2 - 100);
        ctx.closePath();
        ctx.stroke();
    }

    let drawGoalRightLine = function() {
        ctx.beginPath();
        ctx.moveTo(canvas.width - 100, canvas.height/2 - 100);
        ctx.lineTo(canvas.width - 100, canvas.height/2 + 100);
        ctx.closePath();
        ctx.stroke();
    }

    drawTopLine();
    drawBottomLine();
    drawLeftLine();
    drawRightLine();

    drawCenterLine();
    drawCenterCircle();

    drawLeftTopLine();
    drawLeftBottomLine();
    drawGoalLeftLine();
    drawRightTopLine();
    drawRightBottomLine();
    drawGoalRightLine();
}

init();

// ストレージの初期化
let myStorage = localStorage;
window.onload = initLocalStorage();

// PC対応
canvas.addEventListener('mousedown', startPoint, false);
canvas.addEventListener('mousemove', movePoint, false);
canvas.addEventListener('mouseup', endPoint, false);
// スマホ対応
canvas.addEventListener('touchstart', startPoint, false);
canvas.addEventListener('touchmove', movePoint, false);
canvas.addEventListener('touchend', endPoint, false);
 
function startPoint(e){
  e.preventDefault();
  ctx.beginPath();
 
  Xpoint = e.layerX-5;
  Ypoint = e.layerY;
   
  ctx.moveTo(Xpoint, Ypoint);
}
 
function movePoint(e){
  if(e.buttons === 1 || e.witch === 1 || e.type == 'touchmove'){
    Xpoint = e.layerX-5;
    Ypoint = e.layerY-5;
    moveflg = 1;
     
    ctx.lineTo(Xpoint-5, Ypoint-5);
    ctx.lineCap = "round";
    ctx.lineWidth = defSize * 2;
    ctx.strokeStyle = defColor;
    ctx.stroke();  
  }
}

function endPoint(e)
{
    if(moveflg === 0){
       ctx.lineTo(Xpoint-6, Ypoint-6);
       ctx.lineCap = "round";
       ctx.lineWidth = defSize * 2;
       ctx.strokeStyle = defColor;
       ctx.stroke();
        
    }
    moveflg = 0;
    setLocalStoreage();
}
 
function clearCanvas(){
    if(confirm('Canvasを初期化しますか？'))
    {
        initLocalStorage();
        temp = [];
        resetCanvas();
    }
}
 
function resetCanvas() {
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    init();
    const img = document.getElementById("newImg");
    const downloadLink = document.getElementById('download');
    img.src=null;
    img.removeAttribute('src');
    downloadLink.removeAttribute('href')
    downloadLink.removeAttribute('download')
}
 
function chgImg()
{
    let png = canvas.toDataURL();
    document.getElementById("newImg").src = png;
    const downloadLink = document.getElementById('download');
    downloadLink.href = png;
    downloadLink.download = 'test.png';
}

function initLocalStorage(){
    myStorage.setItem("__log", JSON.stringify([]));
}
function setLocalStoreage(){
    let png = canvas.toDataURL();
    let logs = JSON.parse(myStorage.getItem("__log"));
 
    setTimeout(function(){
        logs.unshift({png:png});
        myStorage.setItem("__log", JSON.stringify(logs));
        temp = [];
    }, 0);
}
 
function prevCanvas(){
    var logs = JSON.parse(myStorage.getItem("__log"));
 
    if(logs.length > 0){
        temp.unshift(logs.shift());
 
        setTimeout(function(){
            myStorage.setItem("__log", JSON.stringify(logs));
            resetCanvas();
            draw(logs[0]['png']);
        }, 0);
    }
}

function nextCanvas(){
    var logs = JSON.parse(myStorage.getItem("__log"));
 
    if(temp.length > 0){
        logs.unshift(temp.shift());
 
        setTimeout(function(){
            myStorage.setItem("__log", JSON.stringify(logs));
            resetCanvas();
            draw(logs[0]['png']);
        }, 0);
    }
}
 
function draw(src) {
    let img = new Image();
    img.src = src;
 
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    }
}
