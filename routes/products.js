const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    console.error("Database query failed:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
