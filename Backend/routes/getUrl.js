const { Pointer } = require("../db/urlSchema");

const getUrl = async (req, res) => {
  try {
    const { tinyUrl } = req.params;
    if (!tinyUrl) {
      return res.status(400).json({ message: "tinyUrl is required" });
    }
    const tinyUrlExists = await Pointer.findOne({ tinyUrl });
    if (!tinyUrlExists) {
      return res.status(404).json({ message: "URL not found" });
    }

    return res.redirect(tinyUrlExists.longUrl);
  } catch (error) {
    res.status(500).json({ message: error.message, name: error.name });
  }
};
module.exports = { getUrl };
