// htmlのidから読み込み
const canvas = document.getElementById('canvassample');
const ctx = canvas.getContext('2d');

const changeRedBtn = document.getElementById('changeRedBtn');
const changeBlueBtn = document.getElementById('changeBlueBtn');
const changeBlackBtn = document.getElementById('changeBlackBtn');

const resetBtn = document.getElementById('resetBtn');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');

const changeImgBtn = document.getElementById('changeImgBtn');

const img = document.getElementById("newImg");
const downloadLink = document.getElementById('download');

// canvasを用いて，コートを初期化
function init() {
    // 白で塗りつぶす
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // コートの線
    ctx.strokeStyle = '#808080';
    ctx.lineWidth = 3;

    // 即時実行関数を使う
    // コート左側のline
    (function () {
        ctx.beginPath();
        ctx.moveTo(10, 10);
        ctx.lineTo(10, canvas.height-10);
        ctx.closePath();
        ctx.stroke();
    }());

    // コート右側のline
    (function () {
        ctx.beginPath();
        ctx.moveTo(canvas.width-10, 10);
        ctx.lineTo(canvas.width-10, canvas.height-10);
        ctx.closePath();
        ctx.stroke();
    }());
    
    // コート上のline
    (function() {
        ctx.beginPath();
        ctx.moveTo(10, canvas.height-10);
        ctx.lineTo(canvas.width-10, canvas.height-10);
        ctx.closePath();
        ctx.stroke();
    }());

    // コート下のline
    (function() {
        ctx.beginPath();
        ctx.moveTo(10, 10);
        ctx.lineTo(canvas.width-10, 10);
        ctx.closePath();
        ctx.stroke();
    }());

    // コート中央のline
    (function() {
        ctx.beginPath();
        ctx.moveTo(canvas.width/2, 10);
        ctx.lineTo(canvas.width/2, canvas.height-10);
        ctx.closePath();
        ctx.stroke();
    }());

    // コート中央の円
    (function() {
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, 100, 0, Math.PI*2, true);
        ctx.stroke();
    }());

    // 左コート上部のゴールライン
    (function() {
        ctx.beginPath();
        ctx.moveTo(10, canvas.height/2 + 100);
        ctx.lineTo(100, canvas.height/2 + 100);
        ctx.closePath();
        ctx.stroke();
    }());

    // 左コート下部のゴールライン
    (function() {
        ctx.beginPath();
        ctx.moveTo(10, canvas.height/2 - 100);
        ctx.lineTo(100, canvas.height/2 - 100);
        ctx.closePath();
        ctx.stroke();
    }());

    // 左コートのゴールライン
    (function() {
        ctx.beginPath();
        ctx.moveTo(100, canvas.height/2 - 100);
        ctx.lineTo(100, canvas.height/2 + 100);
        ctx.closePath();
        ctx.stroke();
    }());

    // 右コート上部のゴールライン
    (function() {
        ctx.beginPath();
        ctx.moveTo(canvas.width-10, canvas.height/2 + 100);
        ctx.lineTo(canvas.width - 100, canvas.height/2 + 100);
        ctx.closePath();
        ctx.stroke();
    }());

    // 右コート下部のゴールライン
    (function() {
        ctx.beginPath();
        ctx.moveTo(canvas.width-10, canvas.height/2 - 100);
        ctx.lineTo(canvas.width - 100, canvas.height/2 - 100);
        ctx.closePath();
        ctx.stroke();
    }());

    // 右コートのゴールライン
    (function() {
        ctx.beginPath();
        ctx.moveTo(canvas.width - 100, canvas.height/2 - 100);
        ctx.lineTo(canvas.width - 100, canvas.height/2 + 100);
        ctx.closePath();
        ctx.stroke();
    }());
}

// ローカルストレージを初期化
function initLocalStorage(){
    myStorage.setItem("__log", JSON.stringify([]));
}

// ローカルストレージを準備
function setLocalStoreage(){
    let png = canvas.toDataURL();
    let logs = JSON.parse(myStorage.getItem("__log"));
    setTimeout(function(){
        logs.unshift({png:png});
        myStorage.setItem("__log", JSON.stringify(logs));
        temp = [];
    }, 0);
}

// 変数を定義
let moveflg = 0;
let Xpoint;
let Ypoint;
let temp;
let myStorage = localStorage;

// ペンのサイズ定義
let defSize = 3
// ペンのカラー定義
let defColor = "#000";

// ストレージの初期化
window.onload = initLocalStorage();

// canvasを初期化
init();

// ペンの色を赤に変更
changeRedBtn.addEventListener('click', () => {
    defColor = '#F00';
});

// ペンの色を青に変更
changeBlueBtn.addEventListener('click', () => {
    defColor = '#00F';
});

// ペンの色を黒に変更
changeBlackBtn.addEventListener('click', () => {
    defColor = '#000';
});

// PC対応
canvas.addEventListener('mousedown', startPoint, false);
canvas.addEventListener('mousemove', movePoint, false);
canvas.addEventListener('mouseup', endPoint, false);
// スマホ対応
canvas.addEventListener('touchstart', startPoint, false);
canvas.addEventListener('touchmove', movePoint, false);
canvas.addEventListener('touchend', endPoint, false);
 
// ペンの描き始め
function startPoint(e){
    e.preventDefault();
    ctx.beginPath();
    // ペンがずれてたらここを修正
    Xpoint = e.layerX-5;
    Ypoint = e.layerY;
  ctx.moveTo(Xpoint, Ypoint);
}

// ペンの移動
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

// ペンは離す時
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

// canvasに関わるものを初期化
resetBtn.addEventListener('click', () => {
    if(confirm('Canvasを初期化しますか？'))
    {
        initLocalStorage();
        temp = [];
        resetCanvas();
    }
});

// canvasをきれいにして，img, downloadのソースを削除
function resetCanvas() {
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    init();    
    img.src=null;
    img.removeAttribute('src');
    downloadLink.removeAttribute('href')
    downloadLink.removeAttribute('download')
}

// canvasに書いてあるものを画像データに変換し，img, downloadにソースを載せる
changeImgBtn.addEventListener('click', () => {
    let png = canvas.toDataURL();
    img.src = png;
    downloadLink.href = png;
    downloadLink.download = 'test.png';
});

// 戻るボタンの関数
backBtn.addEventListener("click", () => {
    let logs = JSON.parse(myStorage.getItem("__log")); 
    if(logs.length > 0){
        temp.unshift(logs.shift());
    
        setTimeout(function(){
            myStorage.setItem("__log", JSON.stringify(logs));
            resetCanvas();
            draw(logs[0]['png']);
        }, 0);
    }
})

// 進むボタンの関数
nextBtn.addEventListener('click', () => {
    let logs = JSON.parse(myStorage.getItem("__log"));
    if(temp.length > 0){
        logs.unshift(temp.shift());
    
        setTimeout(function(){
            myStorage.setItem("__log", JSON.stringify(logs));
            resetCanvas();
            draw(logs[0]['png']);
        }, 0);
    }
});

// prev, nextボタンの時に用いる関数
function draw(src) {
    let img = new Image();
    img.src = src; 
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    }
}
