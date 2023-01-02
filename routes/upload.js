const express = require("express");

const router = express.Router();

const { register_route } = require("../utils/routes");

// ************************
// Meta Data
// ************************
const uploadFile = require("../controllers/upload/uploadFile");

const getFile = require("../controllers/upload/getFile");

// ************************
// Routes
// ************************

register_route({
  router,
  route: "/",
  put_method: uploadFile,
});

register_route({
  router,
  route: "/",
  get_method: getFile,
});

module.exports = router;
