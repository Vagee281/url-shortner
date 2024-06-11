const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter.js");
const { urlModel } = require("./models/url.js");
//const staticRoute=require("./routes/staticPath");
const { connectToMongodb } = require("./connection.js");

const PORT = 8001;

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
connectToMongodb("mongodb://127.0.0.1:27017/url-shortner").then(() => {
  console.log("connected to database");
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url", urlRoute);
app.use("/", staticRoute);

// app.get("/test", async (req, res) => {
//   const allUrls = await urlModel.find({});
//   return res.render("home", { urls: allUrls });
// });

app.listen(PORT, () => {
  console.log(`you are listening at: ${PORT}`);
});
