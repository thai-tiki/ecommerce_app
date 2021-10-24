const express = require("express");
const router = express.Router();
const productValidate = require("../models/product").validate;
const orderValidate = require("../models/order").validate;
const validator = require("../middlewares/validate");
const orderController = require("../controllers/order");
router.get("/order", orderController.getAllAdmin);
router.put("/order/:id", validator(orderValidate), orderController.updateOne);
module.exports = router;
