const mongoose = require("mongoose");
const { User } = require("../db/userSchema");
const { Pointer } = require("../db/urlSchema");

const inputValidation = (req) => {
  const { tinyUrl, userId } = req.body;
  if (!tinyUrl) {
    return { isValid: false, message: "tinyUrl is required" };
  }
  if (!userId) {
    return { isValid: false, message: "userId is required" };
  }
  return { isValid: true };
};

const deleteUrl = async (req, res) => {
  const validation = inputValidation(req);
  if (!validation.isValid) {
    return res
      .status(400)
      .json({ success: false, message: validation.message });
  }

  const { tinyUrl, userId } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const pointerResult = await Pointer.deleteOne({
      tinyUrl: tinyUrl,
      userId: userId,
    }).session(session);

    if (pointerResult.deletedCount === 0) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: "URL not found or user does not have permission to delete it.",
      });
    }

    const userResult = await User.updateOne(
      { userId: userId },
      { $pull: { urls: { tinyUrl: tinyUrl } } }
    ).session(session);

    if (userResult.modifiedCount === 0) {
      await session.abortTransaction();
      return res
        .status(404)
        .json({ success: false, message: "URL not found in user's list." });
    }

    await session.commitTransaction();

    return res
      .status(200)
      .json({ success: true, message: "URL deleted successfully." });
  } catch (err) {
    await session.abortTransaction();
    return res.status(500).json({
      success: false,
      message: err.message,
      name: err.name,
      stack: err.stack,
    });
  } finally {
    await session.endSession();
  }
};

module.exports = { deleteUrl };
