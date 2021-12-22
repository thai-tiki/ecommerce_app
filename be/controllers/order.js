const { Order } = require("../models/order");
const c = require("../constants");
const base = require("./base");
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
exports.getAllCustomer = async (req, res) => {
  console.log(req.query);
  try {
    let page = req.query.page ? req.query.page : 1;
    let code = req.query.code ? req.query.code : "";
    let query = { user: req.user._id };
    if (code) query["status.code"] = code;
    let data = await Order.find(query)
      .sort({ _id: -1 })
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
exports.getAllAdmin = base.getAll(Order, [
  "items",
  "payment_method",
  "shipment_method",
]);
exports.updateOne = async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    if (req.user.role !== c.ADMIN) filter.user = req.user._id;
    const data = await Order.findOneAndUpdate(filter, req.body);
    if (!data) {
      res.status(401).json({
        status: c.FAILURE,
        msg: c.NO_ORDER,
      });
      return;
    }
    res.status(200).json({
      status: c.SUCCESS,
      msg: c.UPDATE_ORDER_SUCCCESS,
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: c.FAILURE,
      msg: c.CODE_500,
    });
  }
};
exports.cancel = async (req, res) => {
  try {
    const data = await Order.findByIdAndUpdate(req.params.id, {
      status: {
        name: "Đã hủy",
        code: c.CUSTOMER_CANCELED,
      },
    });
    if (!data) {
      res.status(401).json({
        status: c.FAILURE,
        msg: c.NO_ORDER,
      });
      return;
    }
    res.status(200).json({
      status: c.SUCCESS,
      msg: c.UPDATE_ORDER_SUCCCESS,
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: c.FAILURE,
      msg: c.CODE_500,
    });
  }
};
