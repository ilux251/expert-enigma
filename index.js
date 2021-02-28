const { app, BrowserWindow, ipcMain } = require('electron');
const mongoose = require("mongoose");
const path = require("path");
const NvFileApi = require("./backend/API/NvFile");
const PdFileApi = require("./backend/API/PdFile");
const CompareSaveApi = require("./backend/API/CompareSave");
const {spawn} = require("child_process");
const os = require("os");
const fs = require("fs");


require('electron-reload')(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron")
});

const url = 'mongodb://localhost:27018/testdb';

const databasepath = path.join(os.homedir(),"sanrit-data");
console.log(databasepath);

if (!fs.existsSync(databasepath)) {
  fs.mkdirSync(databasepath);
}

const pipe = spawn("mongod", ["-dbpath=" + databasepath, "-port", "27018"]);

pipe.stdout.on("data", function (data) {
  console.log(data.toString("utf8"));

  mongoose.connect(url, { useNewUrlParser: true }, err => {
    if (!err) console.log("Successful connection to database");
    else console.log("Connection to database failed.");
  });
});

pipe.stderr.on("data", (data) => {
  console.log(data.toString("utf8"));
});

pipe.on("close", (code) => {
  console.log("Process exited with code: "+ code);
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
  PdFileApi(win);
  CompareSaveApi(win);

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