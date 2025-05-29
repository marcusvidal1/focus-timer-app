let interval;
let startTime;
let accumulatedTime = 0;
let running = false;

const timerDisplay = document.querySelector(".timer");

function updateDisplay(elapsed) {
  const hrs = Math.floor(elapsed / 3600);
  const min = Math.floor((elapsed % 3600) / 60);
  const sec = elapsed % 60;
  const formatted = [hrs, min, sec].map(n => String(n).padStart(2, '0')).join(':');
  timerDisplay.textContent = formatted;
}

export function startTimer() {
  if (!running) {
    running = true;
    startTime = Date.now() - accumulatedTime * 1000;
    let notified = false;

    interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      accumulatedTime = elapsed;
      updateDisplay(elapsed);

      if (elapsed >= 1500 && !notified) {
        notified = true;

        if (Notification.permission === "granted") {
          new Notification("Focus Timer", {
            body: "25 minutos! Hora de fazer uma pausa 🧘",
          });
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then(permission => {
            if (permission === "granted") {
              new Notification("Focus Timer", {
                body: "25 minutos! Hora de fazer uma pausa 🧘",
              });
            }
          });
        }
      }
    }, 1000);
  }
}

export function pauseTimer() {
  if (running) {
    running = false;
    clearInterval(interval);
  }
}

export function resetTimer() {
  clearInterval(interval);
  startTime = Date.now();
  accumulatedTime = 0;
  running = true;

  updateDisplay(0);

  interval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    accumulatedTime = elapsed;
    updateDisplay(elapsed);
  }, 1000);
}

export function stopTimer() {
  clearInterval(interval);
  running = false;
  accumulatedTime = 0;
  updateDisplay(0);
}