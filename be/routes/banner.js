const express = require("express");
const router = express.Router();
const { validate } = require("../models/banner");
const controller = require("../controllers/banner");
const validator = require("../middlewares/validate");
router.post("/", validator(validate), controller.addOne);
module.exports = router;
