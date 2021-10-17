const { Product, validate } = require("../models/product");
const base = require("./base");
exports.addOne = base.addOne(Product);
exports.getOne = base.getOne(Product);
exports.getAll = base.getAll(Product);
