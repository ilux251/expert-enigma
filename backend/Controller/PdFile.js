const PdFile = require("../Model/PdFile");

class PdFileController
{
  getFiles = () => {
    return PdFile.find({}).lean("_id");
  }

  createFile = (data) => {
    return PdFile.insertMany(data)
      .then(response => {
        return response;
      })
      .catch(error => {
        return error
      });
  }

  deleteFile = (id) => {
    return PdFile.deleteOne({_id: id}).then(response => {
      return response;
    });
  }
}

module.exports = new PdFileController();