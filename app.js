const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");
const articleRoutes = require("./routes/article.routes");
const deviceRoutes = require("./routes/device.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const db = require("./config/db");

app.use(express.json());

app.use("/", userRoutes);
app.use("/articles", articleRoutes);
app.use("/devices", deviceRoutes);
app.use("/analytics", analyticsRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));