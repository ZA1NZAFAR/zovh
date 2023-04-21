// Set up the canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set up the snake
let snake = {
    x: 10,
    y: 10,
    dx: 100,
    dy: 0,
    cells: [],
    maxCells: 4
};

// Set up the food
let food = {};

// Set up the score
let score = 0;

// Set up the game loop
function loop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move the snake
    snake.x += snake.dx;
    snake.y += snake.dy;

    // Wrap the snake around the screen
    if (snake.x < 0) {
        snake.x = canvas.width - 10;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - 10;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    // Add a new cell to the snake
    snake.cells.unshift({ x: snake.x, y: snake.y });

    // Remove cells beyond the maxCells limit
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // Draw the snake
    ctx.fillStyle = "green";
    snake.cells.forEach(cell => {
        ctx.fillRect(cell.x, cell.y, 10, 10);
    });

    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);

    // Check if the snake has eaten the food
    if (snake.x === food.x && snake.y === food.y) {
        food = generateFood();
        snake.maxCells++; // Increase the snake's size
        score++ // Increment the score
    }

    // Check if the snake has collided with itself
    snake.cells.forEach((cell, index) => {
        if (index !== 0 && snake.x === cell.x && snake.y === cell.y) {
            snake = resetSnake();
            score = 0; // Reset the score
        }
    });

    // Draw the score
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 10, 20);

    // Schedule the next frame
    requestAnimationFrame(loop);
}

// ...
// (Rest of the code remains the same)
``


// Set up the controls
document.addEventListener("keydown", event => {
    switch (event.keyCode) {
        case 37: // Left arrow
            if (snake.dx === 0) {
                snake.dx = -10;
                snake.dy = 0;
            }
            break;
        case 38: // Up arrow
            if (snake.dy === 0) {
                snake.dy = -10;
                snake.dx = 0;
            }
            break;
        case 39: // Right arrow
            if (snake.dx === 0) {
                snake.dx = 10;
                snake.dy = 0;
            }
            break;
        case 40: // Down arrow
            if (snake.dy === 0) {
                snake.dy = 10;
                snake.dx = 0;
            }
            break;
    }
});

// Start the game loop
food = generateFood();
requestAnimationFrame(loop);

// Helper function to generate new food
function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
        y: Math.floor(Math.random() * (canvas.height / 10)) * 10
    };
}

// Helper function to reset the snake
// Helper function to reset the snake
function resetSnake() {
    // Show the popup with the score
    const popup = document.getElementById("game-over-popup");
    const scoreSpan = document.getElementById("score");
    scoreSpan.textContent = score;
    popup.style.display = "block";

    // Add an event listener to the Play Again button
    const playAgainBtn = document.getElementById("play-again-btn");
    playAgainBtn.addEventListener("click", () => {
        // Hide the popup
        popup.style.display = "none";

        // Reset the score
        score = 0;

        // Reset the snake
        return {
            x: 10,
            y: 10,
            dx: 10,
            dy: 0,
            cells: [],
            maxCells: 4
        };
    });
}


const upBtn = document.getElementById("up");
upBtn.addEventListener("click", () => {
    if (snake.dy === 0) {
        snake.dy = -10;
        snake.dx = 0;
    }
});

const downBtn = document.getElementById("down");
downBtn.addEventListener("click", () => {
    if (snake.dy === 0) {
        snake.dy = 10;
        snake.dx = 0;
    }
});

const leftBtn = document.getElementById("left");
leftBtn.addEventListener("click", () => {
    if (snake.dx === 0) {
        snake.dx = -10;
        snake.dy = 0;
    }
});

const rightBtn = document.getElementById("right");
rightBtn.addEventListener("click", () => {
    if (snake.dx === 0) {
        snake.dx = 10;
        snake.dy = 0;
    }
});

let touchStartX = null;
let touchStartY = null;
const minSwipeDistance = 5; // Adjust this value to change the swipe sensitivity

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


document.addEventListener("touchmove", (event) => {
    // Prevent scrolling while swiping on the canvas
    event.preventDefault();
}, false);

document.addEventListener("touchend", (event) => {
    if (!touchStartX || !touchStartY) {
        return;
    }

    let deltaX = event.changedTouches[0].clientX - touchStartX;
    let deltaY = event.changedTouches[0].clientY - touchStartY;

    if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0 && snake.dx === 0) {
                // Swipe right
                snake.dx = 10;
                snake.dy = 0;
            } else if (deltaX < 0 && snake.dx === 0) {
                // Swipe left
                snake.dx = -10;
                snake.dy = 0;
            }
        } else {
            if (deltaY > 0 && snake.dy === 0) {
                // Swipe down
                snake.dy = 10;
                snake.dx = 0;
            } else if (deltaY < 0 && snake.dy === 0) {
                // Swipe up
                snake.dy = -10;
                snake.dx = 0;
            }
        }
    }

    // Reset the touch coordinates
    touchStartX = null;
    touchStartY = null;
}, false);


