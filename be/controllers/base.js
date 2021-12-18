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
exports.getAll = (Model, populate, select) => async (req, res) => {
  try {
    let page = req.query.page ? req.query.page : 1;
    let query = { ...req.query };
    let sortOptions = { _id: -1 };
    if (query.name) query.name = { $regex: req.query.name, $options: "i" };
    if (query.sort_by)
      sortOptions = {
        [query.sort_by]: query.descending === "false" ? 1 : -1,
      };
    if (sortOptions.price)
      sortOptions = {
        after_discount_price: sortOptions.price,
      };
    const data = await Model.find(req.query ? query : {})
      .limit(c.PER_PAGE)
      .skip((page - 1) * c.PER_PAGE)
      .populate(populate)
      .select(select)
      .sort(sortOptions)
      .lean();
    let total = await Model.count({}).lean();
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
exports.updateOne = (Model) => async (req, res) => {
  try {
    let data = await Model.findByIdAndUpdate(req.params.id, req.body, {
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
