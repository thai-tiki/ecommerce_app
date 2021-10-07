const express = require("express");
const router = express.Router();
const { validate } = require("../models/user");
const controller = require("../controllers/user");
const validator = require("../middlewares/validate");
router.post("/login", controller.login);
router.post("/phone_check", controller.phoneCheck);
router.post("/register", validator(validate), controller.register);
module.exports = router;
