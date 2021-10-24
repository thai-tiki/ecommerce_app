const base = require("./base");
const c = require("../constants");
const { Order } = require("../models/order");
exports.getAllOrder = base.getAll(Order, [
  "items",
  "payment_method",
  "shipment_method",
]);
exports.updateOrder = async (req, res) => {
  try {
    const data = await Order.findByIdAndUpdate(req.params.id, req.body);
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
