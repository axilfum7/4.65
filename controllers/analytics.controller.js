const db = require("../config/db");

exports.getAnalytics = async (req, res) => {
  try {
    const { user_id } = req.params;

    const osStat = await db.query(
      `SELECT os, COUNT(*) as count FROM device_logs WHERE user_id = $1 GROUP BY os ORDER BY count DESC LIMIT 1`, [user_id]
    );

    const clientStat = await db.query(
      `SELECT client, COUNT(*) as count FROM device_logs WHERE user_id = $1 GROUP BY client ORDER BY count DESC LIMIT 1`,
      [user_id]
    );

    res.status(200).json({
      most_used_os: osStat.rows[0] || null,
      most_used_client: clientStat.rows[0] || null,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};