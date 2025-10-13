const { TempUrl } = require("../db/tempUrlSchema");
const { nanoId } = require("../utils/nanoId");

const addTempUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res
        .status(400)
        .json({ success: false, message: "Url is required" });
    }

    const tinyUrl = nanoId();
    const newTempUrl = new TempUrl({
      longUrl: url,
      tinyUrl: tinyUrl,
    });

    await newTempUrl.save();

    return res.status(201).json({
      success: true,
      message: "Temporary URL added to DB, will expire in 2 days.",
      tinyUrl: tinyUrl,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: err.message,
        name: err.name,
        stack: err.stack,
      });
  }
};

module.exports = { addTempUrl };
