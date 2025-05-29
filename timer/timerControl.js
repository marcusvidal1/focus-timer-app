// Controla o intervalo de tempo e o estado do cronômetro
let interval;
let startTime;
let accumulatedTime = 0;
let running = false;

// Exibe o tempo formatado na tela
const timerDisplay = document.querySelector(".timer");

// Flags para garantir que notificações só sejam disparadas uma vez por ciclo
let notifiedFocus = false;
let notifiedShortPause = false;
let notifiedLongPause = false;

/**
 * Atualiza o conteúdo visual do cronômetro no formato HH:MM:SS
 */
function updateDisplay(elapsed) {
  const hrs = Math.floor(elapsed / 3600);
  const min = Math.floor((elapsed % 3600) / 60);
  const sec = elapsed % 60;
  const formatted = [hrs, min, sec].map(n => String(n).padStart(2, '0')).join(':');
  timerDisplay.textContent = formatted;
}

/**
 * Inicia o cronômetro com base no modo selecionado
 * Se for modo foco, notifica aos 25min
 * Se for modo chill, notifica aos 5min e depois aos 30min
 */
export function startTimer(isChillMode = false) {
  if (!running) {
    running = true;
    startTime = Date.now() - accumulatedTime * 1000;

    // Reinicia as flags de notificação ao iniciar
    notifiedFocus = false;
    notifiedShortPause = false;
    notifiedLongPause = false;

    interval = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      accumulatedTime = elapsed;
      updateDisplay(elapsed);

      // Modo Foco: dispara notificação após 25 minutos
      if (!isChillMode && elapsed >= 1500 && !notifiedFocus) {
        notifiedFocus = true;
        playNotificationSound();
        sendNotification("Focus Timer", "25 minutos! Hora de fazer uma pausa 🧘");
      }

      // Modo Chill: notifica após 5 minutos e depois aos 30 minutos
      if (isChillMode) {
        if (elapsed >= 300 && !notifiedShortPause) {
          notifiedShortPause = true;
          playNotificationSound();
          sendNotification("Pausa Curta", "5 minutos de descanso! Volte quando estiver pronto.");
        }
        if (elapsed >= 1800 && !notifiedLongPause) {
          notifiedLongPause = true;
          playNotificationSound();
          sendNotification("Pausa Longa", "30 minutos se passaram. Hora de retomar o foco.");
        }
      }
    }, 1000);
  }
}

/**
 * Reproduz um som quando a notificação é ativada
 */
function playNotificationSound() {
  const audio = new Audio('assets/sounds/alert.mp3');
  audio.play();
}

/**
 * Exibe uma notificação nativa do sistema
 */
function sendNotification(title, body) {
  if (Notification.permission === "granted") {
    new Notification(title, { body });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification(title, { body });
      }
    });
  }
}

/**
 * Pausa o cronômetro mantendo o tempo acumulado
 */
export function pauseTimer() {
  if (running) {
    running = false;
    clearInterval(interval);
  }
}

/**
 * Reinicia o cronômetro do zero e começa a contar imediatamente
 */
export function resetTimer() {
  clearInterval(interval);
  startTime = Date.now();
  accumulatedTime = 0;
  running = true;

  // Reseta notificações também
  notifiedFocus = false;
  notifiedShortPause = false;
  notifiedLongPause = false;

  updateDisplay(0);

  interval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    accumulatedTime = elapsed;
    updateDisplay(elapsed);
  }, 1000);
}

/**
 * Para o cronômetro e limpa tudo (inclusive a tela)
 */
export function stopTimer() {
  clearInterval(interval);
  running = false;
  accumulatedTime = 0;

  notifiedFocus = false;
  notifiedShortPause = false;
  notifiedLongPause = false;

  updateDisplay(0);
}
