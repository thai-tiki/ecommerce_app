const { Order } = require("../models/order");
const c = require("../constants");
exports.getOne = async (req, res) => {
  try {
    let data = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    })
      .populate(["items", "payment_method", "shipment_method"])
      .lean();
    if (!data) {
      res.status(404).json({
        status: c.FAILURE,
        msg: c.NO_ORDER,
      });
      return;
    }
    res.status(200).json({
      status: c.SUCCESS,
      data,
      msg: c.SUCCESS,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: c.FAILURE,
      msg: c.CODE_500,
    });
  }
};
exports.getAll = async (req, res) => {
  console.log(req.user._id);
  try {
    let page = req.query.page ? req.query.page : 1;
    let data = await Order.find({ user: req.user._id })
      .limit(c.PER_PAGE)
      .skip((page - 1) * c.PER_PAGE)
      .populate(["items", "payment_method", "shipment_method"])
      .lean();
    let total = await Order.count({ user: req.user._id }).lean();
    let total_page = Math.ceil(total / c.PER_PAGE);
    if (!data) {
      res.status(404).json({
        status: c.FAILURE,
        msg: c.NO_ORDER,
      });
      return;
    }
    res.status(200).json({
      data,
      current_page: page,
      total_page,
      msg: c.SUCCESS,
      status: c.SUCCESS,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: c.FAILURE,
      msg: c.CODE_500,
    });
  }
};
