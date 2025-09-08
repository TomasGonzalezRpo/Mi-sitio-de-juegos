document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("snakeCanvas");
  const ctx = canvas.getContext("2d");
  const startButton = document.getElementById("startButton");
  const scoreSpan = document.getElementById("scoreSpan");

  const gridSize = 20;
  const tileCount = canvas.width / gridSize;
  let snake = [{ x: 10, y: 10 }];
  let food = {};
  let dx = 0;
  let dy = 0;
  let score = 0;
  let gameLoop;

  function drawGame() {
    clearCanvas();
    moveSnake();
    drawSnake();
    drawFood();
    checkCollision();
    updateScore();
  }

  function clearCanvas() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score++;
      generateFood();
    } else {
      snake.pop();
    }
  }

  function drawSnake() {
    ctx.fillStyle = "green";
    snake.forEach((segment) => {
      ctx.fillRect(
        segment.x * gridSize,
        segment.y * gridSize,
        gridSize - 2,
        gridSize - 2
      );
    });
  }

  function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(
      food.x * gridSize,
      food.y * gridSize,
      gridSize - 2,
      gridSize - 2
    );
  }

  function generateFood() {
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
    };
  }

  function checkCollision() {
    const head = snake[0];
    if (
      head.x < 0 ||
      head.x >= tileCount ||
      head.y < 0 ||
      head.y >= tileCount
    ) {
      gameOver();
    }

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        gameOver();
      }
    }
  }

  function gameOver() {
    clearInterval(gameLoop);
    alert(`Game Over! Tu puntuación final es ${score}`);
    startButton.disabled = false;
  }

  function updateScore() {
    scoreSpan.textContent = score;
  }

  function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;

    if (keyPressed === LEFT_KEY && dx === 0) {
      dx = -1;
      dy = 0;
    }
    if (keyPressed === UP_KEY && dy === 0) {
      dx = 0;
      dy = -1;
    }
    if (keyPressed === RIGHT_KEY && dx === 0) {
      dx = 1;
      dy = 0;
    }
    if (keyPressed === DOWN_KEY && dy === 0) {
      dx = 0;
      dy = 1;
    }
  }

  function startGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    generateFood();
    clearInterval(gameLoop);
    gameLoop = setInterval(drawGame, 100);
    startButton.disabled = true;
  }

  document.addEventListener("keydown", changeDirection);
  startButton.addEventListener("click", startGame);
});
