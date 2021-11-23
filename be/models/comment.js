const joi = require("joi");
const mongoose = require("mongoose");
const commentSchema = mongoose.Schema({
  date: String,
  stars: Number,
  content: String,
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
  order: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "order",
  },
  product: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "product",
  },
  images: [String],
});
const validate = (comment) => {
  const schema = joi.object({
    stars: joi.number().min(0).max(5).required(),
    content: joi.string().required(),
    date: joi.string().required(),
    user: joi.string().required(),
    order: joi.string().required(),
    product: joi.string().required(),
    images: joi.array().items(joi.string()).required(),
  });
  return schema.validate(comment);
};
const Comment = mongoose.model("comment", commentSchema);
module.exports = { Comment, validate };
