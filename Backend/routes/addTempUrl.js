const { TempUrl } = require("../db/tempUrlSchema");
const { nanoId } = require("../utils/nanoId");

const addTempUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).send("URL is required");
    }

    const tinyUrl = nanoId();
    const newTempUrl = new TempUrl({
      longUrl: url,
      tinyUrl: tinyUrl,
    });

    await newTempUrl.save();

    return res.status(201).json({
      message: "Temporary URL added to DB, will expire in 2 days.",
      tinyUrl: tinyUrl,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message, name: err.name, stack: err.stack });
  }
};

module.exports = { addTempUrl };
