import express from "express";
const router = express.Router();
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export default router;
