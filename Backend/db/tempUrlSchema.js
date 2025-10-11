const mongoose = require("mongoose");

const tempUrlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  tinyUrl: { type: String, required: true, unique: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "2d", // TTL index for 2 days
  },
});

const TempUrl = mongoose.model("TempUrl", tempUrlSchema);
module.exports = { TempUrl };
