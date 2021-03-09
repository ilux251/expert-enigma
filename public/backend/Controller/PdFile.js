const Datastore = require("nedb-promises");
const PdFile = require("../Model/PdFile");

class PdFileController
{
  constructor () {
    const dbPath = `${process.cwd()}/pdFile.db`;

    this.db = Datastore.create({
      filename: dbPath,
      timestampData: true
    });
  }

  getFiles = () => {
    return this.db.find({}).sort({date: -1});
  }

  createFile = (data) => {
    return this.db.insert(data);
  }

  deleteFiles = async (ids) => {
    for (let id of ids)
    {
      this.db.remove({_id: id});
    }
  }
}

module.exports = new PdFileController();