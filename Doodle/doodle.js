const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 600;

let platforms = [];
let player;
let gravity = 0.5;
let leftArrow = false;
let rightArrow = false;
let gameRunning = true;
let score = 0;

let baseSpeed = 1; // Base speed of platforms
let speedIncrement = 0.1; // Increment for each jump

const spacing = 60; // Define a minimum spacing between platforms

class Platform {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 10;
    }
    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.dy = 0;
        this.jumping = true;
    }
    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    jump() {
        this.dy = -10;
        this.jumping = true;
        score++; // increase the score when the player jumps
    }
    move() {
        if (rightArrow) this.x += 5;
        if (leftArrow) this.x -= 5;
    }
}

function setup() {
    player = new Player(200, 300);
    for (let i = 0; i < 10; i++) {
        platforms.push(new Platform(Math.random() * (canvas.width - 50), i * spacing));
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move platforms down continuously
    platforms.forEach((p, i) => {
        p.y += baseSpeed + speedIncrement * score; // Increase speed with score
        if (p.y > canvas.height) {
            let highestPlatform = Math.min(...platforms.map(p => p.y));
            platforms[i] = new Platform(Math.random() * (canvas.width - 50), highestPlatform - spacing);
        }
    });

    for (let i = 0; i < platforms.length; i++) {
        platforms[i].draw();
    }

    player.draw();
    player.y += player.dy;
    player.dy += gravity;
    player.move();

    if (player.y > canvas.height) {
        gameRunning = false;
    }

    for (let i = 0; i < platforms.length; i++) {
        let plat = platforms[i];
        if (player.dy > 0 && player.y < plat.y && player.y + player.height > plat.y && player.x < plat.x + plat.width && player.x + player.width > plat.x) {
            player.jump();
        }
    }

    if (gameRunning) {
        requestAnimationFrame(update);
    } else {
        gameOver();
    }
}

function gameOver() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
    ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2 + 50); // display the score
}

setup();
update();

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') leftArrow = true;
    if (e.key === 'ArrowRight') rightArrow = true;
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') leftArrow = false;
    if (e.key === 'ArrowRight') rightArrow = false;
});

window.addEventListener('deviceorientation', (e) => {
    let tilt = Math.round(e.beta); // Get the device tilt
    if (tilt > 30) rightArrow = true;
    else if (tilt < -30) leftArrow = true;
    else {
        rightArrow = false;
        leftArrow = false;
    }
});


// Your previous JavaScript code...

let leftButton = document.getElementById('left-button');
let rightButton = document.getElementById('right-button');

leftButton.addEventListener('touchstart', () => leftArrow = true);
leftButton.addEventListener('touchend', () => leftArrow = false);

rightButton.addEventListener('touchstart', () => rightArrow = true);
rightButton.addEventListener('touchend', () => rightArrow = false);


let lastTouchTime = 0;
const doubleTapThreshold = 100; // Time in milliseconds between taps to consider it a double tap

document.addEventListener("touchstart", (event) => {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - lastTouchTime;

    // Ignore double taps
    if (timeDifference < doubleTapThreshold) {
        return;
    }

    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;

    lastTouchTime = currentTime;
}, false);