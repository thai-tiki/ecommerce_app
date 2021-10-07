const { User } = require("../models/user");
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
