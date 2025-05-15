const db = require("../config/db");
const DeviceDetector = require("device-detector-js");
const deviceDetector = new DeviceDetector();

exports.registerUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userAgent = req.headers["user-agent"];
    const result = await db.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    const user = result.rows[0];

    const device = deviceDetector.parse(userAgent);
    await db.query(
      `INSERT INTO device_logs (user_id, device_type, os, client, raw_user_agent) VALUES ($1, $2, $3, $4, $5)`,
      [
        user.id,
        device.device?.type || "unknown",
        device.os?.name || "unknown",
        device.client?.name || "unknown",
        userAgent,
      ]
    );

    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};