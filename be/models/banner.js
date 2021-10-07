const mongoose = require("mongoose");
const joi = require("joi");

const bannerSchema = mongoose.Schema({
  image: String,
  from: {
    type: String,
    default: "",
  },
  to: {
    type: String,
    default: "",
  },
});
const validate = (banner) => {
  const schema = joi.object({
    image: joi.string().min(1).required(),
  });
  return schema.validate(banner);
};
const Banner = mongoose.model("banner", bannerSchema);
module.exports = {
  Banner,
  validate,
};
