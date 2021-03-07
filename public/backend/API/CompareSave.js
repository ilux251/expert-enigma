const CompareSaveController = require("../Controller/CompareSave");
const {ipcMain} = require("electron");

module.exports = (win) => {
  ipcMain.on("compare-save/create", (_, data) => {
    CompareSaveController.createFile(data)
      .then((_) => {
        win.send("compare-save/create/reply", "Compare Save wurde erstellt.");
      })
      .catch(console.error);
  });

  ipcMain.on("compare-save/get-all", (_) => {
    CompareSaveController.getFiles()
      .then((data) => {
        win.send("compare-save/get-all/reply", data);
      })
      .catch(console.error);
  });
}