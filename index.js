const { app, BrowserWindow, ipcMain } = require('electron');
const mongoose = require("mongoose");
const path = require("path");
const NvFileController = require("./backend/Controller/NvFile");
const NvFileApi = require("./backend/API/NvFile");

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron")
});

const url = 'mongodb://localhost:27017/testdb';

mongoose.connect(url, { useNewUrlParser: true }, err => {
  if (!err) console.log("Successful connection to database");
  else console.log("Connection to database failed.");
});

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

  win.loadURL(path.join(__dirname, "dist", "index.html"));

  win.webContents.openDevTools();
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