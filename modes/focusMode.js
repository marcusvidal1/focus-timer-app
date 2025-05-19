export function setFocusMode() {
  document.body.style.background = "transparent";
  document.querySelector(".window").style.backgroundColor = "#fffef8";
  document.querySelector(".header").style.backgroundColor = "#f2c94c";
  document.querySelector(".header").style.borderBottom = "2px solid #d8b44c";
  document.querySelector(".mode-btn").style.backgroundColor = "#f2c94c";
  document.getElementById("startBtn").querySelector("img").src = "assets/icons/play.png";
  document.getElementById("pauseBtn").querySelector("img").src = "assets/icons/pause.png";
  document.getElementById("resetBtn").querySelector("img").src = "assets/icons/repeat.png";
  document.getElementById("stopBtn").querySelector("img").src = "assets/icons/end.png";
  document.querySelector(".message").textContent = "Hora de focar 📖";
  document.getElementById("toggleModeBtn").innerHTML = `Chill <img src="assets/icons/gamepad.png" class="icon" />`;
  document.querySelector(".gif-container img").src = "assets/gifs/focusGif.gif";
  document.querySelector(".timer").style.color = "#5e503f";
}
