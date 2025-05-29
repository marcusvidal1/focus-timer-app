// Importa as funções que alteram o visual do modo (foco ou descanso)
import { setChillMode } from '../modes/chillMode.js';
import { setFocusMode } from '../modes/focusMode.js';

// Importa as funções principais do cronômetro
import { startTimer, pauseTimer, resetTimer, stopTimer } from '../timer/timerControl.js';

// Liga os botões da interface às suas funções
import { bindButtons } from '../buttons/setupButtons.js';

// Adiciona funcionalidade para os botões da janela (minimizar e fechar)
import { bindWindowControls } from '../window/windowControls.js';

// Estado atual: estamos no modo foco (false) ou no modo descanso/chill (true)?
let isChillMode = false;

// Quando o usuário clica para alternar entre os modos (foco ↔ descanso)
const toggleModeBtn = document.getElementById("toggleModeBtn");
toggleModeBtn.addEventListener("click", () => {
  // Inverte o modo atual
  isChillMode = !isChillMode;

  // Aplica o visual e a lógica do modo correspondente
  if (isChillMode) {
    setChillMode();    // Interface mais relaxante
  } else {
    setFocusMode();    // Interface focada para produtividade
  }

  // Ao trocar de modo, o timer é reiniciado do zero com o novo contexto
  stopTimer();               // Garante que o timer anterior pare
  startTimer(isChillMode);   // Começa um novo timer com o modo atual
});

// Liga os botões da interface principal às ações do cronômetro
bindButtons({
  onStart: () => startTimer(isChillMode),  // Inicia no modo atual
  onPause: pauseTimer,                     // Pausa o cronômetro
  onReset: resetTimer,                     // Reinicia do zero
  onStop: stopTimer                        // Para completamente e limpa
});

// Habilita os controles da janela para funcionar fora do navegador
bindWindowControls();
