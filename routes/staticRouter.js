const express = require("express");
const router = express.Router();
const { urlModel } = require("../models/url");
router.get("/", async (req, res) => {
  const allUrls = await urlModel.find({});
  return res.render("home", { urls: allUrls });
});
module.exports = router;
