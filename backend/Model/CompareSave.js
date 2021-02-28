const {Schema, model} = require("mongoose");

const CompareSave = new Schema({
  compare: Object,
  date: Date
});

module.exports = model("CompareSave", CompareSave);