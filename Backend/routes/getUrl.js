const { Pointer } = require("../db/urlSchema");

const getUrl = async (req, res) => {
  const { tinyUrl } = req.params;
  const tinyUrlExists = await Pointer.findOne({ tinyUrl });
  if (!tinyUrlExists) {
    return res.status(404).json({ message: "URL not found" });
  }

  return res.redirect(tinyUrlExists.longUrl);
};
module.exports = { getUrl };
