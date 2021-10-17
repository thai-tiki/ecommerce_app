const joi = require("joi");
const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
  total_before_discount: {
    type: Number,
    default: 0,
  },
  total_after_discount: {
    type: Number,
    default: 0,
  },
  voucher: {
    type: {
      code: String,
      value: Number,
    },
    default: null,
  },
  items_in_time: {
    type: [
      {
        quantity: Number,
      },
    ],
    default: [],
  },
  items: {
    type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "product" }],
    default: [],
  },
});
cartSchema.pre("save", async function (next) {
  if (!this.isModified("items_in_time")) return next();
  let totalBefore = this.items.reduce(
    (rs, v, i) => rs + v.before_discount_price * this.items_in_time[i].quantity,
    0
  );
  let totalAfter = this.items.reduce(
    (rs, v, i) => rs + v.after_discount_price * this.items_in_time[i].quantity,
    0
  );
  if (this.voucher) totalAfter = totalAfter - this.voucher.value;
  this.total_before_discount = totalBefore;
  this.total_after_discount = totalAfter;
  next();
});
const validate = (item) => {
  const schema = joi.object({
    quantity: joi.number().min(0).required(),
    product_id: joi.string().required(),
  });
  return schema.validate(item);
};
const Cart = mongoose.model("cart", cartSchema);
module.exports = { Cart, validate };
