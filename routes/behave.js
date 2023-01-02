const express = require("express");

const router = express.Router();

const { register_route } = require("../utils/routes");

// ************************
// Meta Data
// ************************
const addNewBehave = require("../controllers/behave/addNewBehave");

const getBehaveByQueryParams = require("../controllers/behave/getBehaveByQueryParams");

const updateBehave = require("../controllers/behave/updateBehave");

const deleteBehave = require("../controllers/behave/deleteBehave");

// ************************
// Routes
// ************************

register_route({
  router,
  route: "/",
  post_method: addNewBehave,
});

register_route({
  router,
  route: "/",
  get_method: getBehaveByQueryParams,
});

register_route({
  router,
  route: "/:behaveId",
  patch_method: updateBehave,
});

register_route({
  router,
  route: "/:behaveId",
  delete_method: deleteBehave,
});

module.exports = router;
