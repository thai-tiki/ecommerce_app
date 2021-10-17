const base = require("./base");
const { ShipmentMethod } = require("../models/shipmentMethod");
exports.addOne = base.addOne(ShipmentMethod);
exports.getOne = base.getOne(ShipmentMethod);
exports.getAll = base.getAll(ShipmentMethod);
