const palabras = ["javascript", "programacion", "tenis", "ahorcado"];
let palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
let palabraGuiones = Array(palabraSeleccionada.length).fill("_");
let intentosRestantes = 6;

const wordContainer = document.getElementById("word-container");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");

function mostrarPalabra() {
  wordContainer.textContent = palabraGuiones.join(" ");
}

function crearTeclado() {
  const letras = "abcdefghijklmnopqrstuvwxyz".split("");
  letras.forEach((letra) => {
    const boton = document.createElement("button");
    boton.textContent = letra;
    boton.addEventListener("click", () => manejarIntento(letra, boton));
    keyboard.appendChild(boton);
  });
}

function manejarIntento(letra, boton) {
  boton.disabled = true;
  if (palabraSeleccionada.includes(letra)) {
    palabraSeleccionada.split("").forEach((char, index) => {
      if (char === letra) palabraGuiones[index] = letra;
    });
  } else {
    intentosRestantes--;
    message.textContent = `Intentos restantes: ${intentosRestantes}`;
  }

  mostrarPalabra();
  verificarFinJuego();
}

function verificarFinJuego() {
  if (!palabraGuiones.includes("_")) {
    message.textContent = "¡Ganaste!";
    deshabilitarTeclado();
  } else if (intentosRestantes === 0) {
    message.textContent = `Perdiste. La palabra era: ${palabraSeleccionada}`;
    deshabilitarTeclado();
  }
}

function deshabilitarTeclado() {
  const botones = document.querySelectorAll("button");
  botones.forEach((boton) => (boton.disabled = true));
}

// Permitir el uso del teclado físico
window.addEventListener("keydown", (e) => {
  const letra = e.key.toLowerCase();
  if (
    letra.match(/^[a-z]$/) &&
    !document.querySelector(`button[disabled][text="${letra}"]`)
  ) {
    const boton = [...keyboard.children].find(
      (btn) => btn.textContent === letra
    );
    if (boton) manejarIntento(letra, boton);
  }
});

mostrarPalabra();
crearTeclado();
