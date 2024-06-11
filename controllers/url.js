const shortid = require("shortid");
const { urlModel } = require("../models/url");
async function generateNewShortUrlHandler(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ msg: "please enter a url" });
  const short = shortid();

  await urlModel.create({
    shortUrl: short,
    redirectUrl: body.url,
    visitHistory: [],
  });

  // return res.status(201).json({ msg: short });
  return res.render("home", { id: short });
}

async function getRedirectedHandler(req, res) {
  const shortId = req.params.id;
  const entry = await urlModel.findOneAndUpdate(
    {
      shortUrl: shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true }
  );
  console.log(entry);
  if (entry !== null && entry.redirectUrl !== null)
    res.redirect(entry.redirectUrl);
  else {
    res.status(400).json({ msg: "we encountered some issue" });
  }
}

async function getAllUsers(req, res) {
  const result = await urlModel.find({});
  return res.status(201).json(result);
}

async function getAnalyticsHandler(req, res) {
  const shortId = req.params.id;
  const result = await urlModel.findOne({ shortUrl: shortId });
  return res.status(201).json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function getPageHandler(req, res) {
  const users = await urlModel.find({});

  return res.status(200).render("home", {
    users: users,
  });
}

module.exports = {
  generateNewShortUrlHandler,
  getRedirectedHandler,
  getAllUsers,
  getAnalyticsHandler,
  getPageHandler,
};
