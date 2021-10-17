const express = require("express");
const router = express.Router();
const validator = require("../middlewares/validate");
const { validate } = require("../models/shipmentMethod");
const controller = require("../controllers/shipmentMethod");
router.post("/", validator(validate), controller.addOne);
router.get("/", controller.getAll);
module.exports = router;
