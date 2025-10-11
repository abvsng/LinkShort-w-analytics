const { Pointer } = require("../db/urlSchema");
const { TempUrl } = require("../db/tempUrlSchema");

const getUrl = async (req, res) => {
  try {
    const { tinyUrl } = req.params;
    if (!tinyUrl) {
      return res
        .status(400)
        .json({ success: false, message: "tinyUrl is required" });
    }
    let urlMapping = await Pointer.findOne({ tinyUrl });

    if (!urlMapping) {
      urlMapping = await TempUrl.findOne({ tinyUrl });
    }

    if (!urlMapping) {
      return res.status(404).json({ success: false, message: "URL not found" });
    }

    return res.redirect(urlMapping.longUrl);
  } catch (error) {
    res.status(500).json({ message: error.message, name: error.name });
  }
};
module.exports = { getUrl };
