const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");
const resultDiv = document.getElementById("result");
const victoriesSpan = document.getElementById("victories");
const defeatsSpan = document.getElementById("defeats");
const tiesSpan = document.getElementById("ties");

let victories = 0;
let defeats = 0;
let ties = 0;

function computerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerSelection) {
  const computerSelection = computerChoice();
  let result;

  if (playerSelection === computerSelection) {
    result = "¡Empate!";
    ties++;
  } else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    result = "¡Ganaste!";
    victories++;
  } else {
    result = "Perdiste...";
    defeats++;
  }

  resultDiv.textContent = `Elegiste ${translateChoice(
    playerSelection
  )}. La computadora eligió ${translateChoice(computerSelection)}. ${result}`;
  updateScore();
  checkGameEnd();
}

function translateChoice(choice) {
  const translations = {
    rock: "🥌 Piedra",
    paper: "📄 Papel",
    scissors: "✂️ Tijeras",
  };
  return translations[choice];
}

function updateScore() {
  victoriesSpan.textContent = victories;
  defeatsSpan.textContent = defeats;
  tiesSpan.textContent = ties;
}

function checkGameEnd() {
  if (victories === 2 || defeats === 2) {
    const winner =
      victories === 2
        ? "¡TÚ eres el GANADOR!"
        : "La COMPUTADORA es la GANADORA";
    setTimeout(() => {
      alert(`Juego terminado. ${winner}`);
      resetGame();
    }, 100);
  }
}

function resetGame() {
  victories = 0;
  defeats = 0;
  ties = 0;
  updateScore();
  resultDiv.textContent = "";
}

rockButton.addEventListener("click", () => playRound("rock"));
paperButton.addEventListener("click", () => playRound("paper"));
scissorsButton.addEventListener("click", () => playRound("scissors"));
