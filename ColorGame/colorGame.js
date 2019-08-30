var h1 = document.querySelector("h1");
var shownColor = document.querySelector("#pickedColor");
var squares = document.getElementsByClassName("square");
var modeButtons = document.querySelectorAll(".mode");
var resetButton = document.querySelector("#reset");
var message = document.querySelector("#message");
var rgbButton =  document.querySelector("#rgb");
var container = document.querySelector(".container");

var pickedColor;
var maxSquares = 9;
var numSquares = 6;
var colors = [];


resetButton.addEventListener("click", function(){
    reset();
});

rgbButton.addEventListener("click", function(){
    if(this.textContent === "¿QUE ES RGB?"){
        container.classList.add("open");
        rgbButton.textContent = "CERRAR";
    } else { 
        container.classList.remove("open");
        rgbButton.textContent = "¿QUE ES RGB?";
    }
});

init();



function init (){
    clickedSquares();
    changeDifficulty();
    colors = createColors(numSquares);
    pickColor(numSquares);
    assignColors();
}

function reset() {
    colors = createColors(numSquares);
    pickColor(numSquares);
    assignColors();
    message.textContent = "";
    message.style.animation = "";

}

function clickedSquares(){
    for (var i = 0 ; i < maxSquares ; i++){
        squares[i].addEventListener("click", function(){
            var clickedSquare = this.style.background;
            if (clickedSquare === pickedColor){
                for (var i = 0 ; i < numSquares ; i++){
                    squares[i].style.background = pickedColor;
                }
                message.style.animation = "blinker 1s linear infinite";
                message.textContent = "GANASTE";
            } else {
                this.style.background = "rgba(0, 0, 0, 0)";
                message.textContent = "VOLVE A INTENTAR";
                message.style.animation = "blinker 0.4s linear";
                setTimeout(function(){ message.style.animation = "none";},400);
            }
        });
    }
}

function changeDifficulty() {
    for (var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            modeButtons[2].classList.remove("selected");
            this.classList.add("selected");
            if(this.textContent === "Extremo"){
                numSquares = 9;
            } else if (this.textContent === "Dificil"){
                numSquares = 6;
            } else {
                numSquares = 3;
            }            
            reset();
        });
    }
}

//cantidad de colores random basado en dificultad
function createColors(num) {
    var arr = [];
    for (var i = 0 ; i < num; i++){
        var r = Math.floor(Math.random() *256);
        var g = Math.floor(Math.random() *256);
        var b = Math.floor(Math.random() *256);
        arr.push("rgb(" + r + ", " + g + ", " + b + ")");
    }
    return arr;
}


function pickColor(num){
    pickedColor = colors[Math.floor(Math.random() * num)];
    shownColor.innerHTML = pickedColor;
}

function assignColors() {
    for (var i = 0; i < squares.length ; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
}

