const express = require("express");
const router = express.Router();
const path = require("path");

const viewsPath = path.join(__dirname, "..", "views", "index.html");

router.get("/", (req, res) => {
  res.sendFile(viewsPath);
});

router.get("/index", (req, res) => {
  res.sendFile(viewsPath);
});

router.get("/index.html", (req, res) => {
  res.sendFile(viewsPath);
});

module.exports = router;
