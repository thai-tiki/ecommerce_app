const mongoose = require("mongoose");
const joi = require("joi");
const c = require("../constants");
const productSchema = new mongoose.Schema({
  name: String,
  rating: {
    type: Number,
    default: 0,
  },
  before_discount_price: {
    type: Number,
    default: 0,
  },
  after_discount_price: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: c.IN_STOCK,
  },
  discount: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: "",
  },
  quantity: {
    type: Number,
    default: 0,
  },
  distributes: {
    type: [
      {
        name: String,
        value: String,
      },
    ],
    default: [],
  },
  attributes: {
    type: [
      {
        name: String,
        value: String,
      },
    ],
    default: [],
  },
  images: [String],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }],
});
const validate = (product) => {
  const schema = joi
    .object({
      name: joi.string().min(1).required(),
      quantity: joi.number().min(0).required(),
      images: joi.array().items(joi.string()).required(),
      after_discount_price: joi.number().min(0).required(),
      before_discount_price: joi.number().min(0).required(),
      categories: joi.array().items(joi.string()).required(),
    })
    .unknown(true);
  return schema.validate(product);
};
const Product = mongoose.model("product", productSchema);
module.exports = {
  Product,
  validate,
};
