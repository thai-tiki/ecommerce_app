const { News } = require("../models/news");
const c = require("../constants");
const base = require("./base");
exports.getOne = base.getOne(News);
exports.getAll = base.getAll(News);
exports.addOne = base.addOne(News);
exports.updateOne = base.updateOne(News);
exports.getLatest = async (req, res) => {
  try {
    const data = await News.find({}).sort({ _id: -1 }).limit(5).lean();
    res.status(200).json({
      msg: c.SUCCESS,
      status: c.SUCCESS,
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: c.SUCCESS,
      msg: c.CODE_500,
    });
  }
};
