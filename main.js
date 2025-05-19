const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

// Cria a janela principal da aplicação
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 230,
    height: 239,
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    backgroundColor: '#00000000',
    icon: path.join(__dirname, 'assets/icons/icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // Remove o menu padrão da janela
  mainWindow.setMenu(null);

  // Remove sombra da janela (por estética)
  mainWindow.setHasShadow(false);

  // Carrega o HTML principal
  mainWindow.loadFile('index.html');

  // Mostra a janela só quando estiver pronta
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Configura os eventos de minimizar e fechar
  setupWindowControls();
}

// Define os eventos para minimizar e fechar a janela
function setupWindowControls() {
  ipcMain.on('minimize', () => {
    if (mainWindow) mainWindow.minimize();
  });

  ipcMain.on('close', () => {
    if (mainWindow) mainWindow.close();
  });
}

// Cria a janela quando o app estiver pronto
app.whenReady().then(createMainWindow);

// Fecha o app quando todas as janelas forem fechadas (menos no macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// No macOS, recria a janela se o ícone do dock for clicado e não houver janelas abertas
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
