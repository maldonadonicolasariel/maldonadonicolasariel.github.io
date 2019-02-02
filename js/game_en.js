var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 3;
var dy = -3;
var ballRadius = 8;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 7;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for (c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for(r=0; r<brickRowCount;r++){
		bricks[c][r] = { x:0, y:0, status:1};
	}
}
var score = 0;
var lives = 3;
var pausePressed = true;


document.addEventListener("keydown", keyDownHandler,false);
document.addEventListener("keyup", keyUpHandler,false);

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37){
		leftPressed = true;
	}
}

function keyUpHandler(e){
	if(e.keyCode==39) {
		rightPressed = false;
	}
	else if (e.keyCode ==37){
		leftPressed = false;
	}
}

function collisionDetection() {
	for(c=0; c<brickColumnCount; c++){
		for(r=0; r<brickRowCount; r++){
			var b= bricks[c][r];
			if(b.status == 1) {
    			if(x > b.x && x < b.x+brickWidth+5 && y > b.y && y < b.y + brickHeight+5){
    				dy =-dy;
    				b.status = 0;
    				score++;
    				if(score >= brickRowCount*brickColumnCount) {
    					alert("You Win, Congratulations!");
    					reset();
    				}
    			}
			}
		}
	}
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#d971dd";
	ctx.fillText("Score: "+score, 8, 20);
}

function drawLives(){
	ctx.font = "16px Arial";
	ctx.fillStyle = "#d971dd";
	ctx.fillText("Lifes: "+lives, canvas.width-65,20);
}

function reset() {
	score = 0;
	lives = 3;
	x = canvas.width/2;
	y = canvas.height-30;
	paddleX = (canvas.width-paddleWidth)/2;
	for (c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for(r=0; r<brickRowCount;r++){
		bricks[c][r] = { x:0, y:0, status:1};
	}
}
	draw();
}

function pauseButton(){
	if(pausePressed == true) {
		pausePressed = false;
	}else if(pausePressed == false){
		pausePressed = true;
	}
}

function resetButton(){
	reset();
}

function drawPause() {
	ctx.beginPath();
	ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#222222";
	ctx.fill();
	ctx.closePath();

	ctx.font = "25px Arial";
	ctx.fillStyle= "#d971dd";
	ctx.fillText("Game is Paused", canvas.width/3, canvas.height/2);
	ctx.fillText("Use ArrowKeys to move", canvas.width/4, (canvas.height/2)+35);

}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,Math.PI*2);
	ctx.fillStyle = "#e8a9ea";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#b24466";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
	for(c=0; c<brickColumnCount; c++){
		for(r=0; r<brickRowCount;r++){
			if(bricks[c][r].status == 1){
    			var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
   				var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
    			bricks[c][r].x=brickX;
    			bricks[c][r].y=brickY;
    			ctx.beginPath();
    			ctx.rect(brickX,brickY,brickWidth,brickHeight);
    			ctx.fillStyle = "#DD9500";
    			ctx.fill();
    			ctx.closePath();
    		}
		}
	}
}

function draw() {
	ctx.clearRect(0,0,canvas.width, canvas.height);
	if(pausePressed == true){
		drawPause();
	}else{
		drawBall();
		drawPaddle();
		drawScore();
		drawLives();
		collisionDetection();
		drawBricks();
		
		
		if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
			dx = -dx;
		}

		if(y + dy < ballRadius) {
			dy = -dy;
			}
			else if(y + dy > canvas.height-ballRadius){
				if(x > paddleX && x < paddleX + paddleWidth){
					dy=-dy;
				}
				else{
					lives--;
					if(lives <= 0) {
						alert("Game Over");
						reset();
					}
					else{
						x = canvas.width/2;
						y = canvas.height-30;
						dx = 3 ;
						dy = -3;
						paddleX = (canvas.width-paddleWidth)/2;
					}			
				}
			}
		
		if(rightPressed && paddleX < canvas.width-paddleWidth){
			paddleX += 5;
		}
		else if(leftPressed && paddleX > 0){
			paddleX -=5;
		}

		x += dx;
		y += dy;
	}
	//requestAnimationFrame(draw);
}


setInterval(draw,15);
//draw();