const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");
const status = document.getElementById("status");
const restartButton = document.getElementById("restartButton");
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (
    cell.classList.contains("x") ||
    cell.classList.contains("o") ||
    !gameActive
  )
    return;

  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWin()) {
    gameActive = false;
    status.textContent = `¡${currentPlayer} ha ganado!`;
    highlightWinningCells();
  } else if (isDraw()) {
    gameActive = false;
    status.textContent = "¡Empate!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Turno de ${currentPlayer}`;

    // Si el siguiente turno es del PC (O), hacer que juegue
    if (currentPlayer === "O" && gameActive) {
      setTimeout(jugadaPC, 500);
    }
  }
}

function checkWin() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentPlayer.toLowerCase());
    });
  });
}

function isDraw() {
  return Array.from(cells).every(
    (cell) => cell.classList.contains("x") || cell.classList.contains("o")
  );
}

function highlightWinningCells() {
  const winningCombo = winningCombinations.find((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentPlayer.toLowerCase());
    });
  });

  winningCombo.forEach((index) => {
    cells[index].style.backgroundColor = "#4CAF50";
    cells[index].style.color = "white";
  });
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  status.textContent = `Turno de ${currentPlayer}`;
  cells.forEach((cell) => {
    cell.classList.remove("x", "o");
    cell.style.backgroundColor = "";
    cell.style.color = "";
  });
}

// Función para obtener las casillas vacías
function obtenerCasillasVacias() {
  return Array.from(cells).filter(
    (cell) => !cell.classList.contains("x") && !cell.classList.contains("o")
  );
}

// Función para que el PC elija una casilla aleatoria
function jugadaPC() {
  if (!gameActive) return;

  const casillasVacias = obtenerCasillasVacias();
  if (casillasVacias.length === 0) return; // No hay casillas vacías

  const casillaElegida =
    casillasVacias[numeroAleatorio(0, casillasVacias.length - 1)];

  // Simular un clic en la casilla elegida
  casillaElegida.click();
}

// Función para generar números aleatorios
function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);

status.textContent = `Turno de ${currentPlayer}`;
