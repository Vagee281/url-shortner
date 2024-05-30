const mongoose = require("mongoose");

async function connectToMongodb(url) {
  return await mongoose.connect(url);
}

module.exports = { connectToMongodb };
