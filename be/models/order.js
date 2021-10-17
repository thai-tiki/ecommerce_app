const mongoose = require("mongoose");
const joi = require("joi");
const orderSchema = mongoose.Schema({
  date: String,
  total_before_discount: Number,
  total_after_discount: Number,
  status: {
    type: {
      name: String,
      code: String,
    },
    _id: false,
  },
  address: {
    type: {
      location: String,
      phone: String,
      name: String,
    },
    _id: false,
  },
  voucher: {
    type: {
      code: String,
      value: Number,
    },
    default: null,
    _id: false,
  },
  payment_method: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "paymentmethod",
  },
  shipment_method: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "shipmentmethod",
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
  items_in_time: [
    {
      type: {
        before_discount_price: Number,
        after_discount_price: Number,
        quantity: Number,
      },
      _id: false,
    },
  ],
  items: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "product",
    },
  ],
});
const Order = mongoose.model("order", orderSchema);
module.exports = {
  Order,
};
