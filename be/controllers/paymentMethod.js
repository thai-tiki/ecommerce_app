const { PaymentMethod } = require("../models/paymentMethod");
const base = require("./base");
exports.addOne = base.addOne(PaymentMethod);
exports.getAll = base.getAll(PaymentMethod);
