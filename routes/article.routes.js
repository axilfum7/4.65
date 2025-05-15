const express = require("express");
const router = express.Router();
const { createArticle, getArticlesByUser
  } = require("../controllers/article.controller");

router.post("/", createArticle);
router.get("/:user_id", getArticlesByUser);

module.exports = router;