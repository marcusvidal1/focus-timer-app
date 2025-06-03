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

// Elemento principal que recebe o fundo (no seu caso, o <body>)
const container = document.body;

// Quando o usuário clica para alternar entre os modos (foco ↔ descanso)
const toggleModeBtn = document.getElementById("toggleModeBtn");
toggleModeBtn.addEventListener("click", () => {
  // Inverte o modo atual
  isChillMode = !isChillMode;

  // Adiciona classe de transição (caso ainda não exista)
  container.classList.add("fade");

  // Aplica fade-out (efeitos visuais de saída)
  container.classList.add("fade-out");

  // Aguarda a transição terminar antes de aplicar o novo modo
  setTimeout(() => {
    // Aplica o visual do modo correspondente
    if (isChillMode) {
      setChillMode();    // Interface mais relaxante
    } else {
      setFocusMode();    // Interface focada para produtividade
    }

    // Apenas reinicia e zera o timer, não inicia automaticamente
    stopTimer();

    // Remove imediatamente o efeito de desfoque
    container.classList.remove("fade-out");
  }, 450); // mesmo tempo da transição no CSS
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
