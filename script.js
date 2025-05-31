let colors = [];
let pickedColor;
let score = 0;
let timer;
let timeLeft = 10;
let numButtons = 3;

const colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.getElementById("message");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const buttonsContainer = document.getElementById("colorButtons");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateColors(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function startGame() {
  clearInterval(timer);
  timeLeft = 10;
  timerDisplay.textContent = timeLeft;
  messageDisplay.textContent = "";
  colors = generateColors(numButtons);
  pickedColor = colors[Math.floor(Math.random() * numButtons)];
  colorDisplay.textContent = pickedColor;

  buttonsContainer.innerHTML = "";
  colors.forEach(color => {
    const btn = document.createElement("button");
    btn.className = "color-btn";
    btn.style.backgroundColor = color;
    btn.onclick = function () {
      if (this.style.backgroundColor === pickedColor) {
        messageDisplay.textContent = "✅ Correct!";
        correctSound.play();
        score++;
        scoreDisplay.textContent = score;
        startGame(); // next round
      } else {
        messageDisplay.textContent = "❌ Try Again";
        wrongSound.play();
      }
    };
    buttonsContainer.appendChild(btn);
  });

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      messageDisplay.textContent = "⏰ Time's Up! Try Again.";
    }
  }, 1000);
}

function setMode(num) {
  numButtons = num;
  startGame();
}
