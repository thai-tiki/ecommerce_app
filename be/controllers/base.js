const c = require("../constants");
exports.addOne = (Model) => async (req, res) => {
  try {
    const data = await Model.create(req.body);
    res.status(201).json({
      status: c.SUCCESS,
      msg: c.SUCCESS,
      data,
    });
  } catch (err) {
    console.log(err);
    req.status(500).json({
      status: c.FAILURE,
      msg: c.CODE_500,
    });
  }
};
exports.getAll = (Model) => async (req, res) => {
  console.log(req.query);
  try {
    const data = await Model.find(req.query).lean();
    res.status(200).json({
      total: data.length,
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
exports.getOne = (Model) => async (req, res) => {
  try {
    const data = await Model.findById(req.params.id).lean();
    if (!data) {
      res.status(401).json({
        status: c.FAILURE,
        msg: c.CODE_401,
      });
      return;
    }
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
