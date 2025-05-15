const express = require("express");
const router = express.Router();
const { getAnalytics } = require("../controllers/analytics.controller");

router.get("/:user_id", getAnalytics);

module.exports = router;