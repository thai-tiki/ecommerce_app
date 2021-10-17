const { Banner } = require("../models/banner");
const { Product } = require("../models/product");
const { Category } = require("../models/category");
const c = require("../constants");
const location = require("../location");
exports.getHomeInfo = async (req, res) => {
  try {
    const banners = await Banner.find({}).sort({ _id: -1 }).limit(5).lean();
    const hot_products = await Product.find({})
      .sort({ _id: 1 })
      .limit(6)
      .lean();
    const new_products = await Product.find({})
      .sort({ _id: -1 })
      .limit(6)
      .lean();
    const categories = await Category.find({}).lean();
    res.status(200).json({
      status: c.SUCCESS,
      msg: c.SUCCESS,
      data: {
        banners,
        hot_products,
        new_products,
        categories,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: c.FAILURE,
      msg: c.CODE_500,
    });
  }
};
exports.getLocation = async (req, res) => {
  try {
    res.status(200).json({
      status: c.SUCCESS,
      msg: c.SUCCESS,
      data: location,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: c.FAILURE,
      msg: c.CODE_500,
    });
  }
};
