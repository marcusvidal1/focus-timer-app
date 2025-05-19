export function bindButtons({ onStart, onPause, onReset, onStop }) {
  document.getElementById("startBtn").addEventListener("click", onStart);
  document.getElementById("pauseBtn").addEventListener("click", onPause);
  document.getElementById("resetBtn").addEventListener("click", onReset);
  document.getElementById("stopBtn").addEventListener("click", onStop);
}