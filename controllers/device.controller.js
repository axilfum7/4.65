const db = require("../config/db");

exports.getDevicesByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const result = await db.query(
      "SELECT * FROM device_logs WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );

    res.status(200).json({ devices: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};