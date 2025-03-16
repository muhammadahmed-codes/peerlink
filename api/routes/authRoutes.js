const pool = require("../database/config");
const express = require("express");

const router = express.Router();

router.post("/login/:emailaddress/:password", async (req, res) => {
  const { emailaddress, password } = req.params;

  if (!emailaddress) {
    return res
      .status(200)
      .json({ message: "Email Address is a required field." });
  }
  if (!password) {
    return res.status(200).json({ message: "Password is a required field." });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE emailAddress = $1 AND password = $2",
      [emailaddress, password],
    );

    if (result.rowCount == 0) {
      return res.status(200).json({
        success: false,
        message: "User not found with given credentials.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User found.",
      userdata: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
});

router.post("/register/:emailaddress/:password", async (req, res) => {
  const { emailaddress, password } = req.params;

  if (!emailaddress) {
    return res
      .status(200)
      .json({ message: "Email Address is a required field." });
  }
  if (!password) {
    return res.status(200).json({ message: "Password is a required field." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO users (emailaddress, password) VALUES ($1, $2)",
      [emailaddress, password],
    );

    if (result.rowCount == 1) {
      return res.status(200).json({
        success: true,
        message: "User created.",
      });
    }

    return res.status(200).json({
      success: false,
      message: "User could not be created.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.detail });
  }
});

module.exports = router;
