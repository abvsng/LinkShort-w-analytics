const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema({
  longUrl: String,
  userId: String,

  tinyUrl: String,
});

const Pointer = mongoose.model("Pointer", urlSchema);
module.exports = { Pointer };
