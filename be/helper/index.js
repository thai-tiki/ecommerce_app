const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const c = require("../constants");
async function dbConnect() {
  try {
    await mongoose.connect(c.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect to database successfully!");
  } catch (error) {
    console.log("Fail to connect the database!", error);
  }
}
const createToken = (user) => {
  return jwt.sign({ user }, c.JWT_SECRET);
};
const comparePassword = async (typed, original) =>
  await bcrypt.compare(typed, c.SALT_SECRET.concat(original));
module.exports = { dbConnect, createToken, comparePassword };
