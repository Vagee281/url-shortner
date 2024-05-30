const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongodb } = require("./connection.js");
const PORT = 8001;

const app = express();
connectToMongodb("mongodb://127.0.0.1:27017/url-shortner").then(() => {
  console.log("connected to database");
});
app.use(express.json());
app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log(`you are listening at: ${PORT}`);
});
