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
function getDate() {
  let date = new Date();
  let dateStr = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  let monthStr =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth()}`;
  return `${dateStr}-${monthStr}-${date.getFullYear()}`;
}
module.exports = { dbConnect, createToken, comparePassword, getDate };
