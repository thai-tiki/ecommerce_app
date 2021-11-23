const joi = require("joi");
const mongoose = require("mongoose");
const newsSchema = mongoose.Schema({
  title: String,
  content: String,
  date: String,
  img: String,
  view: {
    type: Number,
    default: 0,
  },
});
const validate = (news) => {
  const schema = joi.object({
    title: joi.string().required(),
    date: joi.string().required(),
    content: joi.string().required(),
    view: joi.number(),
    img: joi.string().required(),
  });
  return schema.validate(news);
};
const News = mongoose.model("news", newsSchema);
module.exports = { News, validate };
