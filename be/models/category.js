const mongoose = require("mongoose");
const joi = require("joi");
const categorySchema = mongoose.Schema(
  {
    name: String,
    image: String,
  },
  {
    versionKey: false,
  }
);
const validate = (category) => {
  const schema = joi
    .object({
      name: joi.string().min(1).required(),
      image: joi.string().min(0).required(),
    })
    .unknown(true);
  return schema.validate(category);
};
const Category = mongoose.model("category", categorySchema);
module.exports = {
  Category,
  validate,
};
