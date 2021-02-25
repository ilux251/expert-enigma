const {Schema, model} = require("mongoose");

const PdFile = new Schema({
  filename: String,
  date: Date,
  isDone: Boolean,
  content: Array
});

module.exports = model("PdFile", PdFile);