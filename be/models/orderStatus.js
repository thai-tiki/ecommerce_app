const mongoose = require("mongoose");
const orderStatusSchema = mongoose.Schema({
  code: String,
  name: String,
});
const OrderStatus = mongoose.model("orderstatus", orderStatusSchema);
module.exports = { OrderStatus };
