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
  try {
    let page = req.query.page ? req.query.page : 1;
    const data = await Model.find(req.query)
      .limit(c.PER_PAGE)
      .skip((page - 1) * c.PER_PAGE)
      .lean();
    let total = await Model.count({}).lean();
    console.log(total);
    let total_page = Math.ceil(total / c.PER_PAGE);
    res.status(200).json({
      data,
      total,
      total_page,
      msg: c.SUCCESS,
      status: c.SUCCESS,
      current_page: page,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 500,
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
