const express = require("express");

const router = express.Router();

const version = process.env.version;

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: `Assignment ${version}` });
});

module.exports = router;
