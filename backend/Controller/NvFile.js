const NvFile = require("../Model/NvFile");

class NvFileController
{
  getFiles = () => {
    return NvFile.find({})
      .then(response => {
        return response;
      })
      .error(error => {
        return error
      });
  }

  createFile = (data) => {
    return NvFile.insertMany(data)
      .then(response => {
        return response;
      })
      .error(error => {
        return error
      });
  }

  deleteFile = (id) => {
    return NvFile.deleteOne({_id: id}).then(response => {
      return response;
    });
  }
}

module.exports = new NvFileController();