
function Snake() {

    // set up the snakes variables
    this.x = width / 2;
    this.y = height / 2;
    this.xspeed = 0;
    this.yspeed = 1;
    this.total = 2;
    this.tail = [createVector(this.x, this.y + scl), createVector(this.x, this.y + scl + scl)];

    // snake can eat something and grow 
    this.eat = (pos) => {
        let d = dist(this.x, this.y, pos.x, pos.y);

        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    // set the direction of the snake 
    this.dir = (x, y) => {
        if(Math.abs(this.xspeed - x) != 2){ // prevent dieing from pressing the opposite direction button
            this.xspeed = x;
        } 
        if(Math.abs(this.yspeed - y) != 2){
            this.yspeed = y;
        }
    }

    // Checks if the snake dies, if so reset the gameSpeed and the Score
    this.death = () => {
        for (let i = 0; i < this.tail.length; i++) {
            let pos = this.tail[i];
            let d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                gameManager.resetGame();
            }
        }
    }

    // update the snake, draw the tail 
    this.update = () => {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        this.tail[this.total - 1] = createVector(this.x, this.y);
        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
    }

    // show the snake 
    this.show = () => {
        stroke(0, 100, 0);
        fill(89, 152, 47);
        for (let i = 0; i < this.total; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);
    }
}