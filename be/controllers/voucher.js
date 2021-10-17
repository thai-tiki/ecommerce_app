const base = require("./base");
const { Voucher } = require("../models/voucher");
exports.addOne = base.addOne(Voucher);
exports.getOne = base.getOne(Voucher);
exports.getAll = base.getAll(Voucher);
