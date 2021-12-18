const express = require("express");
const router = express.Router();
const controller = require("../controllers/site");
router.get("/home", controller.getHomeInfo);
router.get("/admin", controller.getAdminInfo);
router.get("/location", controller.getLocation);
module.exports = router;
