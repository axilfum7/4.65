const db = require("../config/db");

exports.createArticle = async (req, res) => {
  try {
    const { user_id, title, content } = req.body;

    const result = await db.query(
      "INSERT INTO articles (user_id, title, content) VALUES ($1, $2, $3) RETURNING *", [user_id, title, content]
    );

    res.status(201).json({ message: "Article created", article: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getArticlesByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const result = await db.query(
      "SELECT * FROM articles WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );

    res.status(200).json({ articles: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};