let timer;
let seconds = 0;
let running = false;

const timerDisplay = document.querySelector(".timer");

function updateDisplay() {
  const hrs = Math.floor(seconds / 3600);
  const min = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;

  const formatted = [hrs, min, sec].map(n => String(n).padStart(2, '0')).join(':');
  timerDisplay.textContent = formatted;
}

export function startTimer() {
  if (!running) {
    running = true;
    timer = setInterval(() => {
      seconds++;
      updateDisplay();
    }, 1000);
  }
}

export function pauseTimer() {
  running = false;
  clearInterval(timer);
}

export function resetTimer() {
  seconds = 0;
  updateDisplay();
}

export function stopTimer() {
  running = false;
  clearInterval(timer);
  seconds = 0;
  updateDisplay();
}