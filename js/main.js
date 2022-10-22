// htmlのidから読み込み
// canvas
const canvas = document.getElementById('canvassample');
const ctx = canvas.getContext('2d');

// ペンorスタンプ
const toolinfo = document.getElementById('tool');
const changeToolBtn = document.getElementById('changeToolBtn');

// color
const colorinfo = document.getElementById('color');
const changeRedBtn = document.getElementById('changeRedBtn');
const changeBlueBtn = document.getElementById('changeBlueBtn');
const changeBlackBtn = document.getElementById('changeBlackBtn');

// リセット，進む，戻るボタン
const resetBtn = document.getElementById('resetBtn');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');

// 画像変換ボタン
const changeImgBtn = document.getElementById('changeImgBtn');

// 画像リンク
const img = document.getElementById("newImg");
const downloadLink = document.getElementById('download');

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
// ペンorスタンプ
let is_pen = 1;


// canvasを用いて，コートを初期化
const initCanvas = () => {
    // 緑で塗りつぶす
    ctx.fillStyle = "mediumseagreen";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // コートの線
    ctx.strokeStyle = 'white';//#808080';
    ctx.lineWidth = 3;

    // 即時実行関数を使う
    // コート左側のline
    (function () {
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(50, canvas.height-50);
        ctx.closePath();
        ctx.stroke();
    }());

    // コート右側のline
    (function () {
        ctx.beginPath();
        ctx.moveTo(canvas.width-50, 50);
        ctx.lineTo(canvas.width-50, canvas.height-50);
        ctx.closePath();
        ctx.stroke();
    }());
    
    // コート下のline
    (function() {
        ctx.beginPath();
        ctx.moveTo(50, canvas.height-50);
        ctx.lineTo(canvas.width-50, canvas.height-50);
        ctx.closePath();
        ctx.stroke();
    }());

    // コート上のline
    (function() {
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(canvas.width-50, 50);
        ctx.closePath();
        ctx.stroke();
    }());

    // コート左の25yard line
    (function() {
        ctx.beginPath();
        ctx.moveTo(279, 50);
        ctx.lineTo(279, canvas.height-50);
        ctx.closePath();
        ctx.stroke();
    }());

    // コート中央のline
    (function() {
        ctx.beginPath();
        ctx.moveTo(507, 50);
        ctx.lineTo(507, canvas.height-50);
        ctx.closePath();
        ctx.stroke();
    }());

    // コート右の75yard line
    (function() {
        ctx.beginPath();
        ctx.moveTo(735, 50);
        ctx.lineTo(735, canvas.height-50);
        ctx.closePath();
        ctx.stroke();
    }());

    //ペナルティスポット(右)
    (function(){
        ctx.beginPath();
        ctx.arc(114, canvas.height/2, 5, 0, 2*Math.PI, true);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.stroke();
    }());

    //ペナルティスポット(左)
    (function(){
        ctx.beginPath();
        ctx.arc(canvas.width - 114, canvas.height/2, 5, 0, 2*Math.PI, true);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.stroke();
    }());

    //コート左側のサークルライン
    (function(){
        ctx.beginPath();
        ctx.arc(50, canvas.height/2, 146.3, 3*Math.PI/2, Math.PI/2, false);
        ctx.stroke();
    }());

    //コート左側のサークルライン(外側)
    (function(){
        ctx.beginPath();
        ctx.setLineDash([10,7.5]);
        ctx.arc(50, canvas.height/2, 196.3, 3*Math.PI/2, Math.PI/2, false);
        ctx.stroke();
    }());

    //コート右側のサークルライン
    (function(){
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.arc(canvas.width-50, canvas.height/2, 146.3, -3*Math.PI/2, -Math.PI/2, false);
        ctx.stroke();
    }());

    //コート右側のサークルライン(外側)
    (function(){
        ctx.beginPath();
        ctx.setLineDash([10,7.5]);
        ctx.arc(canvas.width-50, canvas.height/2, 196.3, -3*Math.PI/2, -Math.PI/2, false);
        ctx.stroke();
    }());

    // 左コート下部のゴールライン
    (function() {
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.moveTo(50, canvas.height/2 + 25);
        ctx.lineTo(20, canvas.height/2 + 25);
        ctx.closePath();
        ctx.stroke();
    }());

    // 左コート上部のゴールライン
    (function() {
        ctx.beginPath();
        ctx.moveTo(50, canvas.height/2 - 25);
        ctx.lineTo(20, canvas.height/2 - 25);
        ctx.closePath();
        ctx.stroke();
    }());

    // 左コートのゴールライン
    (function() {
        ctx.beginPath();
        ctx.moveTo(20, canvas.height/2 - 25);
        ctx.lineTo(20, canvas.height/2 + 25);
        ctx.closePath();
        ctx.stroke();
    }());

    // 右コート下部のゴールライン
    (function() {
        ctx.beginPath();
        ctx.moveTo(canvas.width-50, canvas.height/2 + 25);
        ctx.lineTo(canvas.width - 20, canvas.height/2 + 25);
        ctx.closePath();
        ctx.stroke();
    }());

    // 右コート上部のゴールライン
    (function() {
        ctx.beginPath();
        ctx.moveTo(canvas.width-50, canvas.height/2 - 25);
        ctx.lineTo(canvas.width - 20, canvas.height/2 - 25);
        ctx.closePath();
        ctx.stroke();
    }());

    // 右コートのゴールライン
    (function() {
        ctx.beginPath();
        ctx.moveTo(canvas.width - 20, canvas.height/2 - 25);
        ctx.lineTo(canvas.width - 20, canvas.height/2 + 25);
        ctx.closePath();
        ctx.stroke();
    }());
}

// ローカルストレージを初期化
const initLocalStorage = () => {
    myStorage.setItem("__log", JSON.stringify([]));
}

// ローカルストレージを準備
const setLocalStoreage = () => {
    let png = canvas.toDataURL();
    let logs = JSON.parse(myStorage.getItem("__log"));
    setTimeout(function(){
        logs.unshift({png:png});
        myStorage.setItem("__log", JSON.stringify(logs));
        temp = [];
    }, 0);
}

// ペンに変更
const changePenMode = () => {
    // スタンプ機能を解除
    canvas.removeEventListener('click', stamped);
    
    // PC対応
    canvas.addEventListener('mousedown', startPoint, false);
    canvas.addEventListener('mousemove', movePoint, false);
    canvas.addEventListener('mouseup', endPoint, false);
    // スマホ対応
    canvas.addEventListener('touchstart', startPoint, false);
    canvas.addEventListener('touchmove', movePoint, false);
    canvas.addEventListener('touchend', endPoint, false);
}

// スタンプに変更
const changeStampMode = () => {
    // マウス・タッチイベントを解除
    canvas.removeEventListener('mousedown', startPoint);
    canvas.removeEventListener('mousemove', movePoint);
    canvas.removeEventListener('mouseup', endPoint);
    canvas.removeEventListener('touchstart', startPoint);
    canvas.removeEventListener('touchmove', movePoint);
    canvas.removeEventListener('touchend', endPoint);
    
    //プレイヤーを配置
    canvas.addEventListener('click', stamped);
}

// スタンプ描画
const stamped = (e) => {
    ctx.beginPath();
    ctx.arc(e.layerX-5, e.layerY-5, 5, 0, Math.PI*2);
    ctx.strokeStyle = defColor;
    ctx.stroke();
    setLocalStoreage();
}

// ペンの描き始め
const startPoint = (e) => {
    e.preventDefault();
    ctx.beginPath();
    // ペンがずれてたらここを修正
    Xpoint = e.layerX-5;
    Ypoint = e.layerY;
  ctx.moveTo(Xpoint, Ypoint);
}

// ペンの移動
const movePoint = (e) => {
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
const endPoint = (e) => {
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

// prev, nextボタンの時に用いる関数
const draw = (src) => {
    let img = new Image();
    img.src = src; 
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    }
}

// canvasをきれいにして，img, downloadのソースを削除
const resetCanvas = () => {
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    initCanvas();    
    img.src=null;
    img.removeAttribute('src');
    downloadLink.removeAttribute('href')
    downloadLink.removeAttribute('download')
}

// ストレージの初期化
window.onload = initLocalStorage();

// canvasを初期化
initCanvas();

// 最初はペンモード
// PC対応
canvas.addEventListener('mousedown', startPoint, false);
canvas.addEventListener('mousemove', movePoint, false);
canvas.addEventListener('mouseup', endPoint, false);
// スマホ対応
canvas.addEventListener('touchstart', startPoint, false);
canvas.addEventListener('touchmove', movePoint, false);
canvas.addEventListener('touchend', endPoint, false);

// モード変更
changeToolBtn.addEventListener('click', () => {
    // ペンならスタンプに変更
    if (is_pen) {
        toolinfo.innerText = 'スタンプ';
        changeToolBtn.innerText = 'ペンに変更'
        changeStampMode();
        is_pen = 0
    } else {
        toolinfo.innerText = 'ペン';
        changeToolBtn.innerText = 'スタンプに変更'
        changePenMode();
        is_pen = 1
    }
})

// 色を赤に変更
changeRedBtn.addEventListener('click', () => {
    defColor = '#F00';
    colorinfo.innerText = "赤"
});

// 色を青に変更
changeBlueBtn.addEventListener('click', () => {
    defColor = '#00F';
    colorinfo.innerText = "青"
});

// 色を黒に変更
changeBlackBtn.addEventListener('click', () => {
    defColor = '#000';
    colorinfo.innerText = "黒"
});

// canvasに関わるものを初期化
resetBtn.addEventListener('click', () => {
    if(confirm('Canvasを初期化しますか？'))
    {
        initLocalStorage();
        temp = [];
        resetCanvas();
    }
});

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
