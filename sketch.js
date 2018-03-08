var snake;
var scl = 10;
var start = 0;
var gameManager;
var food;

function setup() {
  // canvas
  background(255, 255, 0);
  createCanvas(500, 500);

  snake = new Snake();
  gameManager = new GameManager();

  // initialize the score display
  gameManager.showScore();
  gameManager.showLevel();

  // set the gamespeed
  frameRate(gameManager.gameSpeed);

  // pick a location for the food
  pickLocation();
}

// divide screen by cols, otherwise the snake and the food dont line up nicely
function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);

  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
    background(125);

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
    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
 
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
