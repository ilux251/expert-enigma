const CompareSave = require("../Model/CompareSave");

class CompareSaveController
{
  getCompareSaves = () =>
  {
    return CompareSave.find({}).lean("_id");
  }

  createCompareSave = (data) =>
  {
    return CompareSave.insertMany(data);
  }

  deleteCompareSave = (id) =>
  {
    return CompareSave.deleteOne({_id: id});
  }
}

module.exports = new CompareSaveController();