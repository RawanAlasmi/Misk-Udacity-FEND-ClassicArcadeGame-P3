
// Enemies our player must avoid
const Enemy = function(xCor, yCor, speed) {

    // Variables applied to each of our instances go here,
    this.xCor = xCor;
    this.yCor = yCor;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.xCor += this.speed * dt;

    // to return the bugs to the left side
    if (this.xCor > 550) {
        this.xCor = -200;
        // to return the bugs back with different speed
        this.speed = randomSpeed();
    
    }
    // collision detection
    if (this.xCor < player.xCor + 80 &&
        this.xCor + 80 > player.xCor &&
        this.yCor < player.yCor + 80 &&
        this.yCor + 80 > player.yCor) {
        // to return the player to the starting position
        player.xCor = 200;
        player.yCor = 400;

    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xCor, this.yCor);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(xCor, yCor, speed) {
    this.xCor = xCor;
    this.yCor = yCor;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

// Update method for Player
Player.prototype.update = function() {
    if (this.yCor == -25) {
        // return the player back to the starting point
        this.xCor = 200;
        this.yCor = 400;
    }
};

// renders the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xCor, this.yCor);
};

Player.prototype.handleInput = function (keyCode) {

    switch (keyCode) {
        case 'left':
            if (this.xCor > 0) {
                this.xCor -= 100;
            }
            break;
        case 'up':
            if (this.yCor > -25) {
                this.yCor -= 85;
                if (this.yCor === 606){
                    gameOver();
                }
            }
            break;
        case 'right':
            if (this.xCor < 400) {
                this.xCor += 100;
            }
            break;
        case 'down':
            if (this.yCor < 400) {
                this.yCor += 85;
            }
            break;
    }
};

const randomSpeed = () => Math.floor((Math.random() * 150) + 50);


// resets the player to default position
Player.prototype.reset = function() {
    this.x = 202.5;
    this.y = 383;
};

// All enemy objects in an array called allEnemies
// The player object in a variable called player
    const e1 = new Enemy(300, 140, randomSpeed());
    const e2 = new Enemy(3, 225, randomSpeed());
    const e3 = new Enemy(100, 60, randomSpeed());
    const e4 = new Enemy(5, 170, randomSpeed());
    const e5 = new Enemy(50, 240, randomSpeed());

    const allEnemies = [e1, e2, e3, e4, e5];

    const player = new Player(200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

