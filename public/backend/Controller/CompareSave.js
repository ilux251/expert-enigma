const Datastore = require("nedb-promises");
const NvFile = require("../Model/NvFile");

class NvFileController
{
  constructor () {
    const dbPath = `${process.cwd()}/compare.db`;

    this.db = Datastore.create({
      filename: dbPath,
      timestampData: true
    });
  }

  getFiles = () => {
    return this.db.find({});
  }

  createFile = (data) => {
    return this.db.insert(data);
  }

  deleteFile = (id) => {
    return this.db.deleteOne({_id: id}).then(response => {
      return response;
    });
  }
}

module.exports = new NvFileController();