const mongoose = require("mongoose");
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
module.exports = { dbConnect };
