const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");
const NvFileApi = require("./backend/API/NvFile");
const PdFileApi = require("./backend/API/PdFile");
const CompareSaveApi = require("./backend/API/CompareSave");

function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  NvFileApi(win);
  PdFileApi(win);
  CompareSaveApi(win);

  win.loadURL(path.join(__dirname, "..", "build", "index.html"));

  // win.webContents.openDevTools();
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})