const { User } = require("../db/userSchema");

const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId is required" });
    }
    const user = await User.findOne({ userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json(user.urls);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = { getUserData };
