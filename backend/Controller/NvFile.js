const NvFile = require("../Model/NvFile");

class NvFileController
{
  getFiles = () => {
    return NvFile.find({}).lean("_id");
  }

  createFile = (data) => {
    return NvFile.insertMany(data);
  }

  deleteFile = (id) => {
    return NvFile.deleteOne({_id: id});
  }
}

module.exports = new NvFileController();