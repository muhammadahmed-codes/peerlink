const express = require("express");
const peerlinkApp = express();
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

require("dotenv").config();

peerlinkApp.use(process.env.AUTH_ROUTE, authRoutes);
peerlinkApp.use(cors());
peerlinkApp.use(express.json());

peerlinkApp.listen(process.env.API_PORT, async () => {
  console.log("[peerlink-main.js] PeerLink API active");
});
