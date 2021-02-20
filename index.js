const { app, BrowserWindow, ipcMain } = require('electron');
const mongoose = require("mongoose");
const NvFileApi = require("./backend/API/NvFile");

require('electron-reload')(__dirname);

const url = 'mongodb://localhost:27017/testdb';

NvFileApi();

mongoose.connect(url, { useNewUrlParser: true }, err => {
  if (!err) console.log("Successful connection to database");
  else console.log("Connection to database failed.");
});

// const FileSchema = new mongoose.Schema({
//   filename: String,
//   date: String,
//   isDone: Boolean
// });

// const FileModel = mongoose.model("File", FileSchema);

// FileModel.insertMany({
//   name: "Filename 1",
//   date: "20.02.2021",
//   isDone: false
// });

// FileModel.find({}).then(docs => console.log("xxx", docs));

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname + '/preload.js'
    }
  })

  win.loadURL("http://localhost:5000");
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on("create-file", (event, data) => {
  console.log("xxxx", event, data);

  NvFileController.createFile(data)
    .then((response) => {
      console.log("create-file", response);
      event.reply(response);
    })
    .catch(console.errror);
});

app.on("create-file", (event, data) => {
  console.log("xxxx", event, data);

  NvFileController.createFile(data)
    .then((response) => {
      console.log("create-file", response);
      event.reply(response);
    })
    .catch(console.errror);
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})