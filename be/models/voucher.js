const mongoose = require("mongoose");
const joi = require("joi");
const voucherSchema = mongoose.Schema({
  name: String,
  type: String,
  value: Number,
  code: String,
  end: {
    type: String,
    default: "",
  },
  limit_discount: {
    type: Number,
    default: 0,
  },
  limit_use: {
    type: Number,
    default: 1,
  },
  min_order_value: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: "",
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
});
const validate = (voucher) => {
  const schema = joi
    .object({
      code: joi.string().required(),
      name: joi.string().min(1).required(),
      type: joi.string().required(),
      value: joi.number().min(1).required(),
      min_order_value: joi.number().min(0),
      products: joi.array().items(joi.string()),
    })
    .unknown(true);
  return schema.validate(voucher);
};
const Voucher = mongoose.model("voucher", voucherSchema);
module.exports = { Voucher, validate };
