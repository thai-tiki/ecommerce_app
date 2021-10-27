const { Product, validate } = require("../models/product");
const base = require("./base");
const c = require("../constants");
exports.addOne = base.addOne(Product);
exports.getOne = base.getOne(Product);
exports.getAll = base.getAll(Product, ["categories"], "-rating");
exports.updateOne = async (req, res) => {
  try {
    let data = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: c.SUCCESS,
      msg: c.SUCCESS,
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
