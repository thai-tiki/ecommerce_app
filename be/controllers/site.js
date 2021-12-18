const { Banner } = require("../models/banner");
const { Product } = require("../models/product");
const { Category } = require("../models/category");
const { Voucher } = require("../models/voucher");
const { Order } = require("../models/order");
const { User } = require("../models/user");
const c = require("../constants");
const location = require("../location");
exports.getHomeInfo = async (req, res) => {
  try {
    const banners = await Banner.find({}).sort({ _id: -1 }).limit(5).lean();
    const hot_products = await Product.find({})
      .sort({ _id: 1 })
      .select("-rating")
      .limit(6)
      .lean();
    const new_products = await Product.find({})
      .sort({ _id: -1 })
      .select("-rating")
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
exports.getAdminInfo = async (reeq, res) => {
  try {
    const orders = await Order.find({}).lean();
    const products = await Product.find({}).lean();
    const vouchers = await Voucher.find({}).lean();
    let totalIncome = orders.reduce((rs, v) => {
      if (v.status.code === c.COMPLETED) return rs + v.total_after_discount;
      return rs;
    }, 0);
    res.status(200).json({
      status: c.SUCCESS,
      data: {
        orders: orders.length,
        products: products.length,
        vouchers: vouchers.length,
        income: totalIncome,
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
