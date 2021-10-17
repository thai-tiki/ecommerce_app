const express = require("express");
const router = express.Router();
const controller = require("../controllers/paymentMethod");
const { validate } = require("../models/paymentMethod");
const validator = require("../middlewares/validate");
router.post("/", validator(validate), controller.addOne);
router.get("/", controller.getAll);
module.exports = router;
