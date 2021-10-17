const mongoose = require("mongoose");
const joi = require("joi");
const bcrypt = require("bcrypt");
const c = require("../constants");
const userSchema = mongoose.Schema({
  name: String,
  password: String,
  phone: String,
  email: String,
  sex: Number,
  address: {
    type: [
      {
        name: String,
        ward: Number,
        phone: String,
        email: String,
        detail: String,
        province: Number,
        district: Number,
        is_default: Boolean,
      },
    ],
    default: [],
  },
  role: {
    type: String,
    default: c.CUSTOMER,
  },
});
const validate = (user) => {
  const schema = joi
    .object({
      name: joi.string().min(1).required(),
      email: joi.string().min(1).required(),
      password: joi.string().min(6).required(),
      phone: joi.string().min(7).required(),
      sex: joi.number().required(),
    })
    .unknown(true);
  return schema.validate(user);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  let salt = c.SALT_SECRET;
  this.password = (await bcrypt.hash(this.password, salt)).slice(salt.length);
  next();
});
const User = mongoose.model("user", userSchema);
module.exports = {
  User,
  validate,
};
