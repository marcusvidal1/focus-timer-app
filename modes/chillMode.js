export function setChillMode() {
  document.body.style.background = "transparent";
  document.querySelector(".window").style.backgroundColor = "#e3fafb";
  document.querySelector(".header").style.backgroundColor = "#a1e5d4";
  document.querySelector(".header").style.borderBottom = "2px solid #73cbbd";
  document.querySelector(".mode-btn").style.backgroundColor = "#a1e5d4";
  document.getElementById("startBtn").querySelector("img").src = "assets/icons/play-chill.png";
  document.getElementById("pauseBtn").querySelector("img").src = "assets/icons/pause-chill.png";
  document.getElementById("resetBtn").querySelector("img").src = "assets/icons/repeat-chill.png";
  document.getElementById("stopBtn").querySelector("img").src = "assets/icons/end-chill.png";
  document.querySelector(".message").textContent = "Hora de relaxar 😌";
  document.getElementById("toggleModeBtn").innerHTML =`Focus <img src="assets/icons/foco.png" class="icon" />`;
  document.querySelector(".gif-container img").src = "assets/gifs/chillGif.gif";
  document.querySelector(".timer").style.color = "#408080";
}
