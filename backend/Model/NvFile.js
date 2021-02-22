const {Schema, model} = require("mongoose");

const NvFile = new Schema({
  filename: String,
  date: Date,
  isDone: Boolean,
  content: Array
});

module.exports = model("NvFile", NvFile);