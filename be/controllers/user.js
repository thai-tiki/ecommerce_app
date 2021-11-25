const { User } = require("../models/user");
const { Cart } = require("../models/cart");
const helper = require("../helper");
const c = require("../constants");
const _ = require("lodash");
exports.phoneCheck = async (req, res) => {
  try {
    const data = await User.findOne({ phone: req.body.phone }).lean();
    res.status(200).json({
      status: c.SUCCESS,
      msg: c.SUCCESS,
      is_registered: data !== null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: c.SUCCESS,
      msg: c.CODE_500,
    });
  }
};
exports.register = async (req, res) => {
  try {
    const data = await User.create(req.body);
    await Cart.create({ user: data._id });
    const token = helper.createToken(_.pick(data, ["_id", "role", "phone"]));
    data.password = undefined;
    res.status(201).json({
      status: c.SUCCESS,
      msg: c.SUCCESS,
      data: data,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: c.SUCCESS,
      msg: c.CODE_500,
    });
  }
};
exports.login = async (req, res) => {
  const { phone, password } = req.body;
  console.log(req.body);
  if (!phone || !password) {
    res.status(400).json({
      status: c.FAILURE,
      msg: c.LOGIN_MISSING_INFO,
    });
    return;
  }
  try {
    const data = await User.findOne({ phone: phone });
    if (!data) {
      res.status(400).json({
        status: c.FAILURE,
        msg: c.PHONE_NOT_REGISTERED,
      });
      return;
    }
    const passwordCheckResult = await helper.comparePassword(
      password,
      data.password
    );
    const token = helper.createToken(_.pick(data, ["_id", "role", "phone"]));
    data.password = undefined;
    if (passwordCheckResult) {
      res.status(200).json({
        status: c.SUCCESS,
        msg: c.SUCCESS,
        data,
        token,
      });
      return;
    }
    res.status(400).json({
      status: c.FAILURE,
      msg: c.WRONG_PASSWORD,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: c.SUCCESS,
      msg: c.CODE_500,
    });
  }
};
exports.getAddress = async (req, res) => {
  try {
    const data = await User.findById(req.user._id).select("address").lean();
    if (!data) {
      res.status(404).json({
        status: c.FAILURE,
        msg: c.NO_USER,
      });
      return;
    }
    res.status(200).json({
      status: c.SUCCESS,
      msg: c.SUCCESS,
      data: data.address,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: c.FAILURE,
      msg: c.CODE_500,
    });
  }
};
exports.addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({
        status: c.FAILURE,
        msg: c.NO_USER,
      });
      return;
    }
    let index = user.address.findIndex((v) => v.is_default);
    if (index !== -1) user.address[index].is_default = false;
    user.address.push(req.body);
    await user.save();
    res.status(200).json({
      status: c.SUCCESS,
      msg: c.SUCCESS,
      data: user.address,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: c.FAILURE,
      msg: c.CODE_500,
    });
  }
};
exports.deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({
        status: c.FAILURE,
        msg: c.NO_USER,
      });
      return;
    }
    user.address.splice(req.params.index, 1);
    await user.save();
    res.status(200).json({
      status: c.SUCCESS,
      msg: c.SUCCESS,
      data: user.address,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: c.FAILURE,
      msg: c.CODE_500,
    });
  }
};
exports.updateAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({
        status: c.FAILURE,
        msg: c.NO_USER,
      });
      return;
    }
    if (req.body.is_default) {
      let index = user.address.findIndex((v) => v.is_default);
      if (index !== req.params.index) user.address[index].is_default = false;
    }
    user.address[req.params.index] = req.body;
    await user.save();
    res.status(200).json({
      status: c.SUCCESS,
      msg: c.SUCCESS,
      data: user.address,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: c.FAILURE,
      msg: c.CODE_500,
    });
  }
};
