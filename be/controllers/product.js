const { Product } = require("../models/product");
const { Comment } = require("../models/comment");
const { Order } = require("../models/order");
const mongoose = require("mongoose");
const base = require("./base");
const c = require("../constants");
function handleError(res, code, msg) {
  res.status(code).json({
    status: c.FAILURE,
    msg,
  });
}
function handleSuccess(res, code, data) {
  res.status(code).json({
    status: c.SUCCESS,
    msg: c.SUCCESS,
    data,
  });
}
exports.addOne = base.addOne(Product);
exports.getAll = base.getAll(
  Product,
  ["categories"],
  "-rating -like -description"
);
exports.getOne = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id).lean();
    if (!data) {
      handleError(res, 404, c.NO_PRODUCT);
      return;
    }
    const likeArr = data.like.map((v) => v.toString());
    let index = req.user ? likeArr.indexOf(req.user._id) : -1;
    data.isLiked = index === -1 ? false : true;
    handleSuccess(res, 200, data);
  } catch (err) {
    console.log(err);
    handleError(res, 500, c.CODE_500);
  }
};
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
exports.rating = async (req, res) => {
  try {
    //check order exists
    const order = await Order.findById(req.body.order);
    if (!order) {
      handleError(res, 404, c.NO_ORDER);
      return;
    }
    //check product exists
    const product = await Product.findById(req.params.id);
    if (!product) {
      handleError(res, 404, c.NO_PRODUCT);
      return;
    }
    //check product in order
    const productPos = order.items.indexOf(req.params.id);
    if (productPos === -1) {
      handleError(res, 400, c.PRODUCT_NOT_IN_ORDER);
      return;
    }
    //already comment
    if (order.items_in_time[productPos].is_rated) {
      handleError(res, 400, c.ALREADY_COMMENT);
      return;
    }
    //all OK
    const comment = await Comment.create(req.body);
    const nComment = product.rating.list.length;
    product.rating.stars =
      (product.rating.stars * nComment) / (nComment + 1) +
      comment.stars / (nComment + 1);
    product.rating.list.push(comment._id);
    await product.save();
    order.items_in_time[productPos].is_rated = true;
    await order.save();
    handleSuccess(res, 200, product);
  } catch (err) {
    console.log(err);
    handleError(res, 500, c.CODE_500);
  }
};
exports.getAllComment = async (req, res) => {
  try {
    let data = await Comment.find({ product: req.params.id })
      .populate({ path: "order", select: "address -_id" })
      .select("-user -product")
      .lean();
    data = data.map((v) => {
      return {
        ...v,
        user: v.order.address.name,
        order: undefined,
      };
    });
    handleSuccess(res, 200, data);
  } catch (err) {
    console.log(err);
    handleError(res, 500, c.CODE_500);
  }
};
exports.getSimilar = async (req, res) => {
  try {
    const data = await Product.find({})
      .select("name images after_discount_price before_discount_price")
      .limit(10)
      .lean();
    handleSuccess(res, 200, data);
  } catch (err) {
    console.log(err);
    handleError(res, 500, c.CODE_500);
  }
};
exports.like = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    if (!data) {
      handleError(res, 404, c.NO_PRODUCT);
      return;
    }
    let index = data.like.indexOf(req.user._id);
    if (index === -1) data.like.push(req.user._id);
    else data.like.splice(index, 1);
    await data.save();
    await this.getOne(req, res);
  } catch (err) {
    console.log(err);
    handleError(res, 500, c.CODE_500);
  }
};
exports.getFavorite = async (req, res) => {
  try {
    let data = await Product.find({ like: { $in: [req.user._id] } }).lean();
    handleSuccess(res, 200, data);
  } catch (err) {
    handleError(res, 500, c.CODE_500);
  }
};
