const { default: mongoose } = require("mongoose");
const { User } = require("../db/userSchema");
const { nanoId } = require("../utils/nanoId");
const inputValidation = (req, res) => {
  const { url, userId } = req.body;
  if (!url) {
    res.status(400).send("URL is required");
    return false;
  }

  if (!userId) {
    res.status(400).send("UserId is required");
    return false;
  }
  return true;
};
const addUrl = async (req, res) => {
  try {
    if (!inputValidation(req, res)) return;
    // TODO: Add url to DB
    const { userId, url } = req.body;
    const data = {
      userId: userId,
      urls: [
        {
          longUrl: url,
          tinyUrl: nanoId(),
        },
      ],
    };
    //chk userId and push to DB
    const userExists = await User.findOne({ userId });
    if (userExists) {
      //chking for already existing url
      const alreadyExists = userExists.urls.some(
        (item) => item.longUrl === url
      );
      if (alreadyExists) {
        res.status(400).send("URL already exists");
        return;
      }
      await User.updateOne({ userId }, { $push: { urls: data.urls[0] } });
      return res.send("URL added to DB");
    }
    //if userId not in db create new user
    const newUser = new User(data);
    await newUser.save();
    res.send("URL added to DB");
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message, name: err.name, stack: err.stack });
  }
};
module.exports = { addUrl };
