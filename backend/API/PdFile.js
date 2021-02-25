const PdFileController = require("../Controller/PdFile");
const {ipcMain} = require("electron");

module.exports = (win) => {
  ipcMain.on("pd/create-file", (_, data) => {
    PdFileController.createFile(data)
      .then((response) => {
        win.send("pd/create-file/reply", response);
      })
      .catch(console.error);
  });

  ipcMain.on("pd/get-files", (_) => {
    PdFileController.getFiles()
      .then(response => {
        win.send("pd/get-files/reply", response);
      })
      .catch(error => console.log("get-files", error))
  })
}