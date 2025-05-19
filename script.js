import { setChillMode } from './modes/chillMode.js';
import { setFocusMode } from './modes/focusMode.js';
import { startTimer, pauseTimer, resetTimer, stopTimer } from './timer/timerControl.js';
import { bindButtons } from './buttons/setupButtons.js';
import { bindWindowControls } from './window/windowControls.js';

let isChillMode = false;

// Modo Chill / Foco
const toggleModeBtn = document.getElementById("toggleModeBtn");
toggleModeBtn.addEventListener("click", () => {
  isChillMode = !isChillMode;
  if (isChillMode) {
    setChillMode();
  } else {
    setFocusMode();
  }
});

// Ligações de botões
bindButtons({
  onStart: startTimer,
  onPause: pauseTimer,
  onReset: resetTimer,
  onStop: stopTimer,
});

// Controles da janela
bindWindowControls();