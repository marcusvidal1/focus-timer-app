const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 300,
    height: 310,
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    backgroundColor: '#00000000',
    icon: path.join(__dirname, 'icons/icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.setMenu(null);
  win.setHasShadow(false);
  win.loadFile('index.html');

  win.once('ready-to-show', () => {
    win.show();
  });

  ipcMain.on('minimize', () => win.minimize());
  ipcMain.on('close', () => win.close());
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
