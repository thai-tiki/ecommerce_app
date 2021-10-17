const mongoose = require("mongoose");
const joi = require("joi");
const shipmentMethodSchema = mongoose.Schema({
  name: String,
  fee: Number,
});
const validate = (shipmentMethod) => {
  const schema = joi.object({
    name: joi.string().required(),
    fee: joi.number().min(0).required(),
  });
  return schema.validate(shipmentMethod);
};
const ShipmentMethod = mongoose.model("shipmentmethod", shipmentMethodSchema);
module.exports = { ShipmentMethod, validate };
