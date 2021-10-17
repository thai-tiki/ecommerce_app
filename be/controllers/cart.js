const c = require("../constants");
const { getDate } = require("../helper");
const { Cart } = require("../models/cart");
const { Order } = require("../models/order");
const { Product } = require("../models/product");
const { Voucher } = require("../models/voucher");
const { PaymentMethod } = require("../models/paymentMethod");
const { ShipmentMethod } = require("../models/shipmentMethod");
exports.getOne = async (req, res) => {
  try {
    const data = await Cart.findOne({ user: req.user._id }).populate(
      "items",
      "-distributes -attributes -rating -description -categories"
    );
    if (!data) {
      res.status(401).json({
        status: c.FAILURE,
        msg: c.NO_USER,
      });
      return;
    }
    //cal price
    let totalBefore = data.items.reduce(
      (rs, v, i) =>
        rs + v.before_discount_price * data.items_in_time[i].quantity,
      0
    );
    let totalAfter = data.items.reduce(
      (rs, v, i) =>
        rs + v.after_discount_price * data.items_in_time[i].quantity,
      0
    );
    data.total_before_discount = totalBefore;
    data.total_after_discount = totalAfter;
    data.voucher = null;
    await data.save();
    //send res
    res.status(200).json({
      status: c.SUCCESS,
      msg: c.SUCCESS,
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
exports.addCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    //check product exist
    const product = await Product.findById(product_id).lean();
    if (!product) {
      res.status(404).json({
        status: c.FAILURE,
        msg: c.NO_PRODUCT,
      });
      return;
    }
    //check cart
    const data = await Cart.findOne({ user: req.user._id }).populate(
      "items",
      "-distributes -attributes -rating -description -categories"
    );
    let idList = data.items.map((v) => v._id.toString());
    let index = idList.indexOf(product_id);
    let itemInfo = { quantity };
    if (index !== -1) {
      data.items_in_time[index] = itemInfo;
    } else {
      data.items.push(product);
      data.items_in_time.push(itemInfo);
    }
    //cal price
    let totalBefore = data.items.reduce(
      (rs, v, i) =>
        rs + v.before_discount_price * data.items_in_time[i].quantity,
      0
    );
    let totalAfter = data.items.reduce(
      (rs, v, i) =>
        rs + v.after_discount_price * data.items_in_time[i].quantity,
      0
    );
    if (data.voucher) totalAfter = totalAfter - data.voucher.value;
    data.total_before_discount = totalBefore;
    data.total_after_discount = totalAfter;
    //update current cart
    await data.save();
    res.status(200).json({
      status: c.SUCCESS,
      msg: c.SUCCESS,
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
exports.applyDiscount = async (req, res) => {
  console.log(req.body);
  try {
    const { type, value } = req.body;
    if (!type) {
      res.status(400).json({
        status: c.FAILURE,
        msg: c.MISSING_INFO,
      });
      return;
    }
    //check cart
    const data = await Cart.findOne({ user: req.user._id }).populate(
      "items",
      "-distributes -attributes -rating -description -categories"
    );
    if (!data) {
      res.status(401).json({
        status: c.FAILURE,
        msg: c.NO_USER,
      });
      return;
    }
    //cal price
    let totalBefore = data.items.reduce(
      (rs, v, i) =>
        rs + v.before_discount_price * data.items_in_time[i].quantity,
      0
    );
    let totalAfter = data.items.reduce(
      (rs, v, i) =>
        rs + v.after_discount_price * data.items_in_time[i].quantity,
      0
    );
    if (type === "voucher") {
      let voucher = await Voucher.findOne({ code: value }).lean();
      if (!value) {
        data.total_before_discount = totalBefore;
        data.total_after_discount = totalAfter;
        data.voucher = null;
        await data.save();
        res.status(200).json({
          status: c.SUCCESS,
          msg: c.SUCCESS,
          data,
        });
        return;
      }
      if (!voucher) {
        data.total_before_discount = totalBefore;
        data.total_after_discount = totalAfter;
        data.voucher = null;
        await data.save();
        res.status(404).json({
          status: c.FAILURE,
          msg: c.NO_VOUCHER,
          data,
        });
        return;
      }
      if (totalBefore < voucher.min_order_value) {
        data.total_before_discount = totalBefore;
        data.total_after_discount = totalAfter;
        data.voucher = null;
        await data.save();
        res.status(400).json({
          status: c.FAILURE,
          msg: c.VOUCHER_ORDER_TOTAL_ERROR,
          data,
        });
        return;
      }
      let voucherDiscount = 0;
      if (voucher.type === c.PERCENT_DISCOUNT) {
        voucherDiscount = (voucher.value * totalAfter) / 100;
        voucherDiscount =
          voucherDiscount > voucher.limit_discount
            ? voucher.limit_discount
            : voucherDiscount;
        totalAfter = totalAfter - voucherDiscount;
      }
      if (voucher.type === c.VALUE_DISCOUNT) {
        voucherDiscount = voucher.value;
        totalAfter = totalAfter - voucher.value;
      }
      data.voucher = {
        code: voucher.code,
        value: voucherDiscount,
      };
    }
    data.total_before_discount = totalBefore;
    data.total_after_discount = totalAfter;
    //update current cart
    await data.save();
    res.status(200).json({
      status: c.SUCCESS,
      msg: c.SUCCESS,
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
exports.order = async (req, res) => {
  const { shipment_method, payment_method, address } = req.body;
  if (!shipment_method || !payment_method || !address) {
    res.status(400).json({
      status: c.FAILURE,
      msg: c.MISSING_INFO,
    });
    return;
  }
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items",
      "-distributes -attributes -rating -description -categories"
    );
    const paymentMethod = await PaymentMethod.findById(req.body.payment_method);
    const shipmentMethod = await ShipmentMethod.findById(
      req.body.shipment_method
    );
    if (!cart) {
      res.status(401).json({
        status: c.FAILURE,
        msg: c.NO_USER,
      });
      return;
    }
    if (cart.items.length === 0) {
      res.status(401).json({
        status: c.FAILURE,
        msg: c.EMPTY_CART,
      });
      return;
    }
    if (!paymentMethod) {
      res.status(401).json({
        status: c.FAILURE,
        msg: c.NO_PAYMENT_METHOD,
      });
      return;
    }
    if (!shipmentMethod) {
      res.status(401).json({
        status: c.FAILURE,
        msg: c.NO_SHIPMENT_METHOD,
      });
      return;
    }
    let items = cart.items.map((v) => v._id);
    let items_in_time = cart.items.map((v, i) => {
      return {
        before_discount_price: v.before_discount_price,
        after_discount_price: v.after_discount_price,
        quantity: cart.items_in_time[i].quantity,
      };
    });
    let orderInfo = {
      items,
      items_in_time,
      date: getDate(),
      user: req.user._id,
      voucher: cart.voucher,
      address: req.body.address,
      status: {
        code: c.WAITING_FOR_PROGRESSING,
        name: "Chờ xử lý",
      },
      payment_method: req.body.payment_method,
      shipment_method: req.body.shipment_method,
      total_after_discount: cart.total_after_discount,
      total_before_discount: cart.total_before_discount,
    };
    let data = await Order.create(orderInfo);
    cart.items = [];
    (cart.items_in_time = []), (cart.total_after_discount = 0);
    cart.total_before_discount = 0;
    cart.voucher = null;
    await cart.save();
    res.status(200).json({
      status: c.SUCCESS,
      msg: c.SUCCESS,
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
exports.changeItemQuantity = async (req, res) => {
  const { id, quantity } = req.body;
  if (!id || quantity === null) {
    res.status(400).json({
      status: c.FAILURE,
      msg: c.MISSING_INFO,
    });
    return;
  }
  try {
    const data = await Cart.findOne({ user: req.user._id }).populate(
      "items",
      "-distributes -attributes -rating -description -categories"
    );
    let index = data.items_in_time.findIndex(
      (v) => v._id.toString() === req.body.id
    );
    if (index === -1) {
      res.status(404).json({
        status: c.FAILURE,
        msg: c.NO_CART_ITEM,
      });
      return;
    }
    data.items_in_time[index].quantity = req.body.quantity;
    if (!req.body.quantity) {
      console.log(index);
      data.items_in_time.splice(index, 1);
      data.items.splice(index, 1);
    }
    await data.save();
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
