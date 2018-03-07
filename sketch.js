var snake;
var scl = 15;
var start = 0;

var food;

function setup() {
  // canvas
  background(255, 255, 0);
  
  createCanvas(750, 750);
  snake = new Snake();
  frameRate(10);

  // pick a location for the food
  pickLocation();
}

function mousePressed() {
  snake.total++;
}

function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);

  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function startScreen() {

  img.loadPixels();
  image(img, 0, 0, width, height);

  textSize(32);
  text('Press S to play.', canvas.height / 2, canvas.width / 2);
  if (keyCode === 83) {
    background(125);
    start = true;
  }

}

function draw() {

    background(125);

    snake.death();
    snake.update();
    snake.show();

    if(snake.eat(food)){
      pickLocation();
    }

    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
 
}

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
