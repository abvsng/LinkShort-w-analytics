const mongoose = require("mongoose");
const { User } = require("../db/userSchema");
const { nanoId } = require("../utils/nanoId");
const { Pointer } = require("../db/urlSchema");

const inputValidation = (req) => {
  const { url, userId } = req.body;
  if (!url) {
    return { isValid: false, message: "Url is required" };
  }

  if (!userId) {
    return { isValid: false, message: "UserId is required" };
  }
  return { isValid: true };
};

const addUrl = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const validation = inputValidation(req);
    if (!validation.isValid) {
      return res.status(400).json({ success: false, message: validation.message });
    }

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

    const userExists = await User.findOne({ userId }).session(session);
    if (userExists) {
      const alreadyExists = userExists.urls.some(
        (item) => item.longUrl === url
      );
      if (alreadyExists) {
        await session.abortTransaction();
        return res
          .status(400)
          .json({ success: false, message: "URL already exists" });
      }
      await User.updateOne(
        { userId },
        { $push: { urls: data.urls[0] } },
        { session }
      );
      const newPointer = new Pointer({
        userId: userId,
        longUrl: data.urls[0].longUrl,
        tinyUrl: data.urls[0].tinyUrl,
      });
      await newPointer.save({ session });
      await session.commitTransaction();
      return res.status(201).json({
        success: true,
        message: "user exists and URL added to DB",
        tinyUrl: data.urls[0].tinyUrl,
      });
    }

    const newUser = new User(data);
    await newUser.save({ session });
    const newPointer = new Pointer({
      userId: userId,
      longUrl: data.urls[0].longUrl,
      tinyUrl: data.urls[0].tinyUrl,
    });
    await newPointer.save({ session });
    await session.commitTransaction();
    return res.status(201).json({
      success: true,
      message: "user created and URL added to DB",
      tinyUrl: data.urls[0].tinyUrl,
    });
  } catch (err) {
    await session.abortTransaction();
    res
      .status(500)
      .json({
        success: false,
        message: err.message,
        name: err.name,
        stack: err.stack,
      });
  } finally {
    await session.endSession();
  }
};

module.exports = { addUrl };
