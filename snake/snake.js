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
        snake.maxCells++;
        score++; // Increment the score
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
function resetSnake() {
    return {
        x: 10,
        y: 10,
        dx: 10,
        dy: 0,
        cells: [],
        maxCells: 4
    };
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
