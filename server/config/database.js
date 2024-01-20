const mongoose = require("mongoose");
require("dotenv").config();

const DBConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CLOUD_DATABASE_URL);
    console.log("Database Connection Successfull");
  } catch (error) {
    console.log("Database Connection Failed");
    console.error(error);
    process.exit(1);
  }
};

module.exports = DBConnect;