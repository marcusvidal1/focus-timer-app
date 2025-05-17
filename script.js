let timer;
let seconds = 0;
let running = false;
let isChillMode = false;

const timerDisplay = document.querySelector(".timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const stopBtn = document.getElementById("stopBtn");

function updateDisplay() {
  const hrs = Math.floor(seconds / 3600);
  const min = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;

  const formattedHrs = String(hrs).padStart(2, '0');
  const formattedMin = String(min).padStart(2, '0');
  const formattedSec = String(sec).padStart(2, '0');

  timerDisplay.textContent = `${formattedHrs}:${formattedMin}:${formattedSec}`;
}

startBtn.addEventListener("click", () => {
  if (!running) {
    running = true;
    timer = setInterval(() => {
      seconds++;
      updateDisplay();
    }, 1000);
  }
});

pauseBtn.addEventListener("click", () => {
  running = false;
  clearInterval(timer);
});

resetBtn.addEventListener("click", () => {
  seconds = 0;
  updateDisplay();
});

stopBtn.addEventListener("click", () => {
  running = false;
  clearInterval(timer);
  seconds = 0;
  updateDisplay();
});

document.getElementById("minimizeBtn").addEventListener("click", () => {
  window.electronAPI.minimize();
});

document.getElementById("closeBtn").addEventListener("click", () => {
  window.electronAPI.close();
});

const toggleModeBtn = document.getElementById("toggleModeBtn");
const message = document.querySelector(".message");
const gif = document.querySelector(".gif-container img");

toggleModeBtn.addEventListener("click", () => {
  isChillMode = !isChillMode;

  if (isChillMode) {
    document.body.style.background = "#e8f6f3";
    document.body.style.background = "transparent";
    document.querySelector(".window").style.backgroundColor = "#e3fafb";
    document.querySelector(".header").style.backgroundColor = "#a1e5d4";
    document.querySelector(".header").style.borderBottom = "2px solid #73cbbd";
    document.querySelector(".window").style.height = "305px";
    document.querySelector(".mode-btn").style.backgroundColor = "#a1e5d4"
    document.getElementById("startBtn").querySelector("img").src = "icons/play-chill.png";
    document.getElementById("pauseBtn").querySelector("img").src = "icons/pause-chill.png";
    document.getElementById("resetBtn").querySelector("img").src = "icons/repeat-chill.png";
    document.getElementById("stopBtn").querySelector("img").src = "icons/end-chill.png";
    message.textContent = "Hora de relaxar 😌";
    toggleModeBtn.textContent = "Foco";
    toggleModeBtn.innerHTML = `Focus Time <img src="icons/foco.png" class="icon" />`;
    gif.src = "meugif.gif";
    timerDisplay.style.color = "#408080";
  } else {
    document.body.style.background = "transparent";
    document.querySelector(".window").style.backgroundColor = "#fffef8";
    document.querySelector(".header").style.backgroundColor = "#f2c94c";
    document.querySelector(".header").style.borderBottom = "2px solid #d8b44c"
    document.querySelector(".window").style.height = "305px";
    document.querySelector(".mode-btn").style.backgroundColor = "#f2c94c"
    document.getElementById("startBtn").querySelector("img").src = "icons/play.png";
    document.getElementById("pauseBtn").querySelector("img").src = "icons/pause.png";
    document.getElementById("resetBtn").querySelector("img").src = "icons/repeat.png";
    document.getElementById("stopBtn").querySelector("img").src = "icons/end.png";
    message.textContent = "Hora de focar!";
    toggleModeBtn.innerHTML = `Chill Time <img src="icons/gamepad.png" class="icon" /> `;
    gif.src = "meugif2.gif";
    timerDisplay.style.color = "#5e503f";
  }
});

