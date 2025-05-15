const express = require("express");
const router = express.Router();
const { getDevicesByUser } = require("../controllers/device.controller");

router.get("/:user_id", getDevicesByUser);

module.exports = router;