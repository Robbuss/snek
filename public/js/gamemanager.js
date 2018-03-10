function GameManager() {
    this.score = 0;
    this.gameSpeed = 10;
    this.level = 100; // at each multiple of this points, the gameSpeed goes up., so after 10x food of 10 points at a 100
    this.currentLevel = 1;

    this.showScore = function() {
        // show the Your score element
        scoreDisplay = createP('Your score: ' + this.score);
        scoreDisplay.class('score');
        scoreDisplay.position(5, -15); // not sure why we should have to set the Y value to negative, maybe its the default margin
    }

    this.updateScore = function (score) {
        scoreDisplay.html('Your score: ' + this.score);
        this.changeGameSpeed(this.score);
    }
    
    this.showLevel = function () {
        // show the level element
        levelDisplay = createP('Level: ' + this.currentLevel);
        levelDisplay.class('score');
        levelDisplay.position(width - 100, -15); // not sure why we should have to set the Y value to negative, maybe its the default margin
    }    
    
    this.updateLevel = function () {
        levelDisplay.html('Level: ' + this.currentLevel);
    }

    this.changeGameSpeed = function(score){
        if (this.score === 0) {
            this.gameSpeed = 10;
            frameRate(this.gameSpeed);
        }

        // at each 'this.level' points, the player reached a new level. We increase the speed a little bit
        if (this.score != 0 && this.score % this.level === 0 && this.gameSpeed < 60) {
            this.gameSpeed = this.gameSpeed + 5;
            frameRate(this.gameSpeed);
            this.currentLevel = this.currentLevel + 1;
            this.updateLevel();
        }
    }

    // this is called in Snake when the snake hits the wall or itself
    this.resetGame = function() {
        console.log('You died.');

        // reset the score 
        this.score = 0;
        this.updateScore(this.score);
        this.currentLevel = 1;
        this.updateLevel();


        // reset snake position and speed
        snake.x = width / 2;
        snake.y = height / 2; 
        snake.xspeed = 0;
        snake.yspeed = 1;

        // reset the total count and the snake's tail
        snake.total = 2;
        snake.tail = [createVector(snake.x, snake.y + scl), createVector(snake.x, snake.y + scl + scl)];
        // snake.total = 2;
        // snake.tail[0] = createVector(snake.x + scl, snake.y);
        // snake.tail[1] = createVector(snake.x, snake.y);
    }

}