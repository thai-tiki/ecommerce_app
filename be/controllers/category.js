const c = require("../constants");
const base = require("./base");
const { Category, validate } = require("../models/category");
exports.addOne = base.addOne(Category);
exports.getAll = base.getAll(Category);
exports.getOne = base.getOne(Category);
exports.updateOne = base.updateOne(Category);
