const mongoose = require("mongoose");
const { DB_NAME } = require("../constants");

async function dbConnect() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_URI}/${DB_NAME}`
    );
    console.log(`DB connected. DB Host: ${connectionInstance.connection.host}`);
  } catch (err) {
    console.log("DB connection failed:", err);
    process.exit(1);
  }
}
module.exports = { dbConnect };
