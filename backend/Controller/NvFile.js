const NvFile = require("../Model/NvFile");

class NvFileController
{
  createFile = async (data) => {
    return NvFile.insertMany(data);
  }

  deleteFile = async (id) => {
    return NvFile.deleteOne({_id: id}).then(response =>
      {return response;}
    )
  }
}

module.exports = NvFileController;