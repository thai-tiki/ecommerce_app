const express = require("express");
const router = express.Router();
const { validate } = require("../models/product");
const validator = require("../middlewares/validate");
const controller = require("../controllers/product");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", validator(validate), controller.addOne);

module.exports = router;
