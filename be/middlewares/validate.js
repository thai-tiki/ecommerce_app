const c = require("../constants");
module.exports = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) {
      res.status(400).json({
        status: c.FAILURE,
        msg: error.details[0].message.replace(/"/g, ""),
      });
      return;
    }
    next();
  };
};
