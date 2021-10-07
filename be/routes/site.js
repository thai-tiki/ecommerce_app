const express = require("express");
const router = express.Router();
const controller = require("../controllers/site");
router.get("/home", controller.getHomeInfo);
module.exports = router;
