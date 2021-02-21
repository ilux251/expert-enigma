const NvFileController = require("../Controller/NvFile");
const {ipcMain} = require("electron");

module.exports = (win) => {
  ipcMain.on("nv/create-file", (_, data) => {
    console.log("xxxx", data);
  
    NvFileController.createFile(data)
      .then((response) => {
        console.log(response)
        win.send("nv/create-file/reply", {response});
      })
      .catch(console.error);
  });

  ipcMain.on("nv/get-files", (_) => {
    NvFileController.getFiles()
      .then(response => {
        win.send("nv/get-files/reply", response);
      })
      .catch(console.error)
  })
}