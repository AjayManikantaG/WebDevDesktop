/** @format */

const express = require("express");
const router = express.Router();
const path = require("path");

const rootDir = path.dirname(process.mainModule.filename);

router.get("/products", (req, res, next) => {
  res.status(200).sendFile(path.join(rootDir, "views", "index.html"));
});

router.get('/', (req, res, next) => {
  res.status(200).sendFile(path.join(rootDir, "views", "index.html"));
})

module.exports = router;
