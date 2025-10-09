const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  urls: [{ tinyUrl: String, longUrl: String }],
});
const User = mongoose.model("User", userSchema);
module.exports = { User };
