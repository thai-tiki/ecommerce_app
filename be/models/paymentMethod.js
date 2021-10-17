const mongoose = require("mongoose");
const joi = require("joi");
const paymentMethodSchema = mongoose.Schema({
  name: String,
});
const validate = (paymentMethod) => {
  const schema = joi.object({
    name: joi.string().min(1).required(),
  });
  return schema.validate(paymentMethod);
};
const PaymentMethod = mongoose.model("paymentmethod", paymentMethodSchema);
module.exports = { PaymentMethod, validate };
