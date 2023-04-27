const express = require("express");
const { handleFetchCrab } = require("../controller/productController");
const router = express.Router();
const initApiRoutes = (app) => {
  router.get("/fetch-crab", handleFetchCrab);
  app.use("/", router);
};
module.exports = { initApiRoutes };
