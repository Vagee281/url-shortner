const express = require("express");
const {
  generateNewShortUrlHandler,
  getRedirectedHandler,
  getAllUsers,
  getAnalyticsHandler,
  getPageHandler,
} = require("../controllers/url");
const router = express.Router();

router.post("/", generateNewShortUrlHandler);

router.get("/:id", getRedirectedHandler);

router.get("/", getAllUsers);

router.get("/analytics/:id", getAnalyticsHandler);

router.get("/users/info", getPageHandler);
module.exports = router;
