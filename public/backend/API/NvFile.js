const NvFileController = require("../Controller/NvFile");
const {ipcMain} = require("electron");

module.exports = (win) => {
  ipcMain.on("nv/create-file", (_, data) => {
    NvFileController.createFile(data)
      .then((_) => {
        win.send("nv/create-file/reply", "Nv-Datei wurde in die Datenbank hinzugefügt.");
      })
      .catch(console.error);
  });

  ipcMain.on("nv/get-files", (_) => {
    NvFileController.getFiles()
      .then(response => {
        win.send("nv/get-files/reply", response);
      })
      .catch(error => console.log("get-files", error))
  });

  ipcMain.on("nv/delete-files", async (_, ids) => {
    await NvFileController.deleteFiles(ids);

    win.send("nv/delete-files/reply", "Dateien wurden gelöscht");
  });
}