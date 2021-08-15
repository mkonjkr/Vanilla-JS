const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const color = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;


ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function onMouseMove (event){
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function startPainting (){
    painting = true;
}
function stopPainting (event){
    painting = false;
}

function handColorClick (event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handlerangeChange (event){
    const stroke = event.target.value;
    ctx.lineWidth = stroke;
}

function handleModeClick (event){
    if(filling === true){
        filling = false;
        mode.innerText ="Fill";
    }
    else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick (){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function handleCM (event){
    event.preventDefault();
}

function handleSaveclick (){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");

    link.href = image;
    link.download = "jsPaintArt"
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(color).forEach(color => color.addEventListener("click", handColorClick)
);

if (range){
    range.addEventListener("input", handlerangeChange);
}

if (mode){
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn){
    saveBtn.addEventListener("click", handleSaveclick);
}