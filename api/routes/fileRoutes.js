const express = require("express");
const router = express.Router();
const multer = require("multer");
// const path = require("path");

const upload = multer({ dest: "uploads/" });

router.post("/folder/upload", upload.array("files"), (req, res) => {
  res.json({ message: "Files uploaded successfully" });
});

module.exports = router;
