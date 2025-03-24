const express = require("express");
const peerlinkApp = express();
const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");
const cors = require("cors");

require("dotenv").config();

peerlinkApp.use(cors());
peerlinkApp.use(express.json());

peerlinkApp.use(process.env.AUTH_ROUTE, authRoutes);
peerlinkApp.use(process.env.FILE_ROUTE, fileRoutes);

peerlinkApp.listen(process.env.API_PORT, async () => {
  console.log("[peerlink-main.js] PeerLink API active");
});
