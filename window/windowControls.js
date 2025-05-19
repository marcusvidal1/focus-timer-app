export function bindWindowControls() {
  document.getElementById("minimizeBtn").addEventListener("click", () => {
    window.electronAPI.minimize();
  });

  document.getElementById("closeBtn").addEventListener("click", () => {
    window.electronAPI.close();
  });
}