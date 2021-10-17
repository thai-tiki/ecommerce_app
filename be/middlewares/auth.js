const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const c = require("../constants");
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        msg: c.NO_ROLE,
        status: c.FAILURE,
      });
      return;
    }
    next();
  };
exports.protect = async (req, res, next) => {
  try {
    let token = req.headers.token;
    if (!token) {
      res.status(401).json({
        status: c.FAILURE,
        msg: c.NO_TOKEN,
      });
      return;
    }
    const decode = await promisify(jwt.verify)(token, c.JWT_SECRET);
    req.user = decode.user;
    next();
  } catch (err) {
    res.status(401).json({
      msg: c.NO_TOKEN,
    });
    next(err);
  }
};
