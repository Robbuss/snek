var snake;
var scl = 10;
var gameManager;
var food;
var socket;

function setup() {
  // canvas
  background(220, 220, 220);
  createCanvas(500, 500);
  img = loadImage("/images/food.png"); 

  snake = new Snake();
  gameManager = new GameManager();

  // initialize the score and leveldisplay
  gameManager.showScore();
  gameManager.showLevel();

  // set the gamespeed
  frameRate(gameManager.gameSpeed);

  // pick a location for the food
  pickLocation();

  socket = io.connect('http://localhost:3000');
}

// divide screen by cols, otherwise the snake and the food dont line up nicely
function pickLocation() {
  let cols = floor(width / scl);
  let rows = floor(height / scl);

  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {

    background(220, 220, 220);

    snake.death();
    snake.update();
    snake.show();

    // if the snake eats the food, update the score and pick a new location for the food
    if(snake.eat(food)){
      pickLocation();
      gameManager.score += 10;
      gameManager.updateScore(gameManager.score);
    }

    // draw the food 
    // stroke(255);
    // fill(255, 0, 100);
    //rect(food.x, food.y, scl, scl);
    image(img, food.x - 3, food.y - 6);  

    let snakeData = {
      "input": snakeInputData(),
      "output": snakeOutputData()
    }
    // emit the snake data to the socket
    socket.emit('sendSnakeData', snakeData);

    // listen for data
    socket.on('receiveSnakeData', function(receivedData){
      if(receivedData){
        nnSnakeControl(receivedData);
      }
    });
}

// calculate the distance to the from the snake, with Pythagoras
function distanceToFood(){
  let a2 = (snake.x - food.x) * (snake.x - food.x);
  let b2 = (snake.y - food.y) * (snake.y - food.y);
  let c2 = a2 + b2;
  let distanceToFood = sqrt(c2);
  return distanceToFood;
}

function snakeInputData(){
  let input = {
    "y": snake.y,
    "x": snake.x,
    "yspeed": snake.yspeed,
    "xspeed": snake.xspeed,
    "distance": distanceToFood(),
    };

  return input;
}

function snakeOutputData(){
  // determine direction by x and y speed
  // let output = [0, 0, 0, 0];
  // if(snake.xspeed = 1){ // snake going up
  //   if(snake.x = 0){
  //     let output = [1, 0, 0, 0];
  //   }
  // } 
  // // if the snake is going up, check obstacles, check if its getting closer to food
  // // if the snake is going down, check obstacles, check if its getting closer to food
  // return output;
}

// NN snake Control
function nnSnakeControl(decision){
  // [1, 0, 0 , 0] = moveLeft
  // [0, 1, 0 , 0] = moveRight
  // [0, 0, 1 , 0] = moveUp
  // [0, 0, 0 , 1] = moveDown
  // [0, 0, 0, 0] = dont move
  let threshold = 0.9;
  if (decision[0] > threshold){
    snake.dir(-1, 0); // left
  } else if(decision[1] > threshold){
    snake.dir(1, 0); // right
  } else if (decision[2] > threshold) {
    snake.dir(0, -1); // up
  } else if (decision[3] > threshold) {
    snake.dir(0, 1); // down
  }  
}

// game controls 
function keyPressed(){
  if (keyCode === UP_ARROW) {
    snake.dir(0, -1);
  } else if (keyCode === RIGHT_ARROW) {
    snake.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    snake.dir(-1, 0);
  } else if (keyCode === DOWN_ARROW) {
    snake.dir(0 , 1);
  }
}
